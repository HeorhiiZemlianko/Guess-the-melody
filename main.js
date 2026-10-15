// ===== Конфигурация =====
const CONFIG = {
    PROXY_URL: 'https://guessthemelody-482baoika-wild-happines.vercel.app/api/proxy', // URL вашего прокси
    ROUND_DURATION: 60, // Длительность раунда в секундах
    START_TIME: 15, // С какого момента начинать воспроизведение (в секундах)
    GENRES: ['pop', 'rock', 'hip-hop', 'electronic', 'jazz'], // Жанры для поиска
    PLAYLIST_ID: 'PL45_r-J4SdAFM0PbG6QeqVpLu975CK9Ip' // Пример ID плейлиста
};

// ===== Состояние игры =====
const state = {
    player: null, // Ссылка на объект плеера YouTube
    currentTrack: null,
    options: [],
    guessedSongs: 0,
    timer: null,
    timeLeft: CONFIG.ROUND_DURATION,
    isPlaying: false
};

// ===== DOM-элементы =====
const viewContent = document.querySelector('#viewContent');
const buttonsBlock = document.querySelector('#ButtonsBlock');
const scoreValue = document.querySelector('#scoreValue');
const timerValue = document.querySelector('#timerValue');
const progressFill = document.querySelector('#progressFill');
const finalScreen = document.querySelector('#finalScreen');
const finalScore = document.querySelector('#finalScore');

// ===== Утилиты =====
const createButton = (text, className) => {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.className = className;
    return btn;
};

// ===== Загрузка YouTube IFrame API =====
function loadYouTubeAPI() {
    return new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
            resolve(window.YT);
            return;
        }
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = () => {
            resolve(window.YT);
        };
    });
}

// ===== Инициализация =====
async function init() {
    await loadYouTubeAPI();
    addStartButton();
}

function addStartButton() {
    const startBtn = createButton('Начать игру', 'startButton');
    viewContent.appendChild(startBtn);
    startBtn.addEventListener('click', startGame);
}

async function startGame() {
    document.querySelector('.startButton')?.remove();
    await loadNextRound();
}

// ===== Загрузка раунда =====
async function loadNextRound() {
    // 1. Получаем случайный трек из плейлиста (через прокси)
    const tracks = await fetchPlaylistTracks();
    if (!tracks || tracks.length === 0) {
        viewContent.innerHTML = '<div class="error">Не удалось загрузить треки. Попробуйте позже.</div>';
        return;
    }
    
    // Выбираем случайный трек как правильный ответ
    const correctTrack = tracks[Math.floor(Math.random() * tracks.length)];
    state.currentTrack = correctTrack;

    // 2. Генерируем неправильные варианты
    state.options = generateOptions(correctTrack.title, tracks);
    
    // 3. Обновляем кнопки
    updateButtons();
    
    // 4. Создаем или обновляем плеер (таймер запустится сам, когда видео начнет играть)
    createOrUpdatePlayer(correctTrack.videoId);
    
    // 5. Сбрасываем таймер (чтобы он не висел с прошлого раунда)
    clearInterval(state.timer);
    state.timeLeft = CONFIG.ROUND_DURATION;
    timerValue.textContent = state.timeLeft;
    updateProgress();
}

// ===== Получение треков из плейлиста YouTube =====
async function fetchPlaylistTracks() {
    try {
        // Используем прокси для обхода CORS
        const response = await fetch(`${CONFIG.PROXY_URL}?endpoint=playlistItems&part=snippet&playlistId=${CONFIG.PLAYLIST_ID}&maxResults=20`);
        const data = await response.json();
        
        // Преобразуем данные в удобный формат
        return data.items.map(item => ({
            title: item.snippet.title,
            videoId: item.snippet.resourceId.videoId,
            channelTitle: item.snippet.channelTitle
        })).filter(track => track.videoId);
    } catch (error) {
        console.error('Ошибка загрузки плейлиста:', error);
        return [];
    }
}

// ===== Генерация вариантов ответа =====
function generateOptions(correctTitle, allTracks) {
    const options = [correctTitle];
    const otherTitles = allTracks
        .map(t => t.title)
        .filter(title => title !== correctTitle);

    // Перемешиваем и берем 3 неправильных ответа
    const shuffled = otherTitles.sort(() => 0.5 - Math.random());
    while (options.length < 4 && shuffled.length > 0) {
        const wrongAnswer = shuffled.pop();
        if (!options.includes(wrongAnswer)) {
            options.push(wrongAnswer);
        }
    }

    // Перемешиваем итоговый список
    return options.sort(() => 0.5 - Math.random());
}

// ===== Создание или обновление плеера =====
function createOrUpdatePlayer(videoId) {
    // Убираем только сообщения об ошибках или кнопку старта, не трогаем плеер
    const errorMsg = viewContent.querySelector('.error, .loading, .startButton');
    if (errorMsg) errorMsg.remove();

    let playerContainer = document.getElementById('youtube-player');
    
    // Если контейнера нет, создаём его
    if (!playerContainer) {
        playerContainer = document.createElement('div');
        playerContainer.id = 'youtube-player';
        // Вставляем плеер ПЕРЕД оверлеем, чтобы оверлей был сверху
        const overlay = viewContent.querySelector('.video-overlay');
        if (overlay) {
            viewContent.insertBefore(playerContainer, overlay);
        } else {
            viewContent.appendChild(playerContainer);
        }
    }

    // Если плеер уже создан, просто загружаем новое видео
    if (state.player) {
        state.player.loadVideoById({
            videoId: videoId,
            startSeconds: CONFIG.START_TIME
        });
    } else {
        // Инициализируем плеер в первый раз
        state.player = new YT.Player('youtube-player', {
            height: '100%',
            width: '100%',
            videoId: videoId,
            playerVars: {
                'autoplay': 0, 
                'controls': 0, 
                'disablekb': 1,
                'modestbranding': 1,
                'rel': 0,
                'start': CONFIG.START_TIME, 
                'end': CONFIG.START_TIME + CONFIG.ROUND_DURATION,
                'origin': window.location.origin
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
}

function onPlayerReady(event) {
    // Плеер готов, можно запускать воспроизведение
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    // Логика для отслеживания состояния
    const controlButton = document.querySelector('#controlButton');
    
    // Если видео начало играть
    if (event.data === YT.PlayerState.PLAYING) {
        startTimer(); // Запускаем таймер ТОЛЬКО сейчас
        if (controlButton) controlButton.innerHTML = '<i class="fa fa-pause"></i>';
    } 
    // Если видео на паузе
    else if (event.data === YT.PlayerState.PAUSED) {
        clearInterval(state.timer); // Останавливаем таймер
        if (controlButton) controlButton.innerHTML = '<i class="fa fa-play"></i>';
    }
}

// ===== Управление плеером =====
function addControlButton() {
    const btn = createButton('', '');
    btn.id = 'controlButton';
    btn.innerHTML = '<i class="fa fa-play"></i>';
    viewContent.appendChild(btn);
    btn.addEventListener('click', () => togglePlay());
}

function togglePlay() {
    if (!state.player) return;
    if (state.player.getPlayerState() === YT.PlayerState.PLAYING) {
        state.player.pauseVideo();
    } else {
        state.player.playVideo();
    }
}

// ===== Обновление кнопок ответов =====
function updateButtons() {
    buttonsBlock.innerHTML = '';
    buttonsBlock.style.display = 'grid';
    
    state.options.forEach(option => {
        const btn = createButton(option, 'Buttons');
        btn.style.display = 'block';
        buttonsBlock.appendChild(btn);
    });
}

// ===== Таймер =====
function startTimer() {
    state.timeLeft = CONFIG.ROUND_DURATION;
    timerValue.textContent = state.timeLeft;
    updateProgress();
    
    clearInterval(state.timer);
    state.timer = setInterval(() => {
        state.timeLeft--;
        timerValue.textContent = state.timeLeft;
        updateProgress();
        
        if (state.timeLeft <= 0) {
            clearInterval(state.timer);
            timeOut();
        }
    }, 1000);
}

function updateProgress() {
    const percent = (state.timeLeft / CONFIG.ROUND_DURATION) * 100;
    progressFill.style.width = `${percent}%`;
}

function timeOut() {
    // Показываем правильный ответ
    document.querySelectorAll('.Buttons').forEach(btn => {
        if (btn.textContent === state.currentTrack.title) {
            btn.classList.add('trueAnswer');
        }
    });
    setTimeout(nextRound, 1500);
}

// ===== Обработка ответа =====
buttonsBlock.addEventListener('click', (e) => {
    if (!e.target.classList.contains('Buttons')) return;
    
    const target = e.target;
    const selectedAnswer = target.textContent;
    clearInterval(state.timer);
    
    // Останавливаем воспроизведение
    if (state.player && state.player.getPlayerState() === YT.PlayerState.PLAYING) {
        state.player.pauseVideo();
    }

    if (selectedAnswer === state.currentTrack.title) {
        target.classList.add('trueAnswer');
        state.guessedSongs++;
        scoreValue.textContent = state.guessedSongs;
    } else {
        target.classList.add('falseAnswer');
        // Показываем правильный ответ
        document.querySelectorAll('.Buttons').forEach(btn => {
            if (btn.textContent === state.currentTrack.title) {
                btn.classList.add('trueAnswer');
            }
        });
    }
    
    setTimeout(nextRound, 1500);
});

// ===== Следующий раунд =====
async function nextRound() {
    // Сброс классов
    document.querySelectorAll('.Buttons').forEach(btn => {
        btn.classList.remove('trueAnswer', 'falseAnswer');
    });

    // Проверка на конец игры
    if (state.guessedSongs >= 10) {
        endGame();
        return;
    }

    // Загружаем следующий раунд
    await loadNextRound();
}

// ===== Конец игры =====
function endGame() {
    clearInterval(state.timer);
    if (state.player) {
        state.player.destroy();
    }
    finalScore.textContent = state.guessedSongs;
    finalScreen.classList.remove('hidden');
    document.querySelector('#restartButton').addEventListener('click', () => location.reload());
}

// ===== Запуск =====
init();
