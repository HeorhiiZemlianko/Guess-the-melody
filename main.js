// main.js

// ===== Конфигурация =====
const CONFIG = {
    PROXY_URL: 'https://guessthemelody-482baoika-wild-happines.vercel.app/api/proxy',
    ROUND_DURATION: 60,        // Длительность раунда в секундах
    START_TIME: 15,            // С какой секунды начинать воспроизведение
    PLAYLIST_IDS: [
        'PL45_r-J4SdAFM0PbG6QeqVpLu975CK9Ip',
        'PL0GvsLQil0MmYC96KEs_7dTNsLm1PS6JX',
        'PLVQ7g3e6O27cH8KG9mktLWH8zcqiwTntP',
        'PLGBuKfnErZlAdX8X5LC9ODeHaxoxTuV2z',
        'PLn4GvABOzCQursVQ7qMU9CkNaKz4RgrVM',
        'PLplXQ2cg9B_qrCVd1J_iId5SvP8Kf_BfS',
        'PLa2a9FJY91_0x1s4eq6mf9b91m3Pahv0G',
        'PLLRIXAxtV8zwSNxHwvdMVsxshybCCyuRT',
        'PLDIoUOhQQPlXr63I_vwF9GD8sAKh77dWU',
        'PLDIoUOhQQPlWc-Kd6TCjTRIl0Z6fSQV0X',
        'PL7DA3D097D6FDBC02',
        'PLK8eO9itnhzfKFSQJ28kExpwZAv7TdvnA',
        'PLvMVt4c68EeXRV2R1fdieei9HwpuUKXKL',
        'PLpxuOeEi0yCQtge9JUBOH--_yqg-jUm4h',
        'PL4sJ8-_X2ESCrsyPWS8sUyU6z1Ssv6a9V',
        'PLmXxqSJJq-yXrCPGIT2gn8b34JjOrl4Xf',
        'PLG5FRq89_oJ40pbXEQ2AxA5rYu7hefUor',
        'PLMZxug3Hi7FaQ4HE-NEt9qpG2lvABRiwf',
        'PLGBuKfnErZlBUh0KAYO3MvJ0bGqVZkhuG',
        'PLw-VjHDlEOgtH-Ce-dJzPOtIm5xTVC4t2',
        'PL9WAfiI0yDE-EQjgQ3eoD_WKP-FvwuwoW',
        'PL2hGGKKbxvqKJltSpqWA-IsKrZjJGkN0f',
        'PL4fGSI1pDJn4E_HoW5HB-w5vFPkYfo3dB',
        'PL-X-RdKBc6bZn4ikgv6ePzT5huW9Skp22',
        'PLUU0HxYhx6SYAXu61BOGo8RmmHU38DThS',
        'PLw7pKYWfLkB7BE3_vJDhREZMX9ygFE89D',
        'PLXAfqIM-LFu5zBMsv-wK4h6-OfLtSyBYG',
        'PLNgxbIxenTkPp6etGScybfrECfbXm2ZUz',
        'PLxD4o4XAOgl8Hx3AKFLb9st5TKs2oVMRv',
        'PLd5lauRj72uJdKMqnZK6gqQRdr5nGlHlg'
    ]
};

// ===== Состояние игры =====
const state = {
    player: null,
    currentTrack: null,
    options: [],
    guessedSongs: 0,
    roundsPlayed: 0,
    timer: null,
    timeLeft: CONFIG.ROUND_DURATION
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
    // Убираем стартовую кнопку
    document.querySelector('.startButton')?.remove();
    // Добавляем кнопку паузы/воспроизведения
    addControlButton();
    // Загружаем первый раунд
    await loadNextRound();
}

// ===== Управление плеером =====
function addControlButton() {
    if (document.querySelector('#controlButton')) return; // Уже создана
    const btn = createButton('', '');
    btn.id = 'controlButton';
    btn.innerHTML = '<i class="fa fa-play"></i>';
    viewContent.appendChild(btn);
    btn.addEventListener('click', togglePlay);
}

function togglePlay() {
    if (!state.player) return;
    if (state.player.getPlayerState() === YT.PlayerState.PLAYING) {
        state.player.pauseVideo();
    } else {
        state.player.playVideo();
    }
}

// ===== Загрузка раунда =====
async function loadNextRound() {
    // 1. Получаем треки из случайного плейлиста
    const tracks = await fetchPlaylistTracks();
    if (!tracks || tracks.length < 4) {
        viewContent.innerHTML = '<div class="error">Не удалось загрузить треки. Попробуйте позже.</div>';
        return;
    }

    // 2. Выбираем случайный трек как правильный ответ
    const correctTrack = tracks[Math.floor(Math.random() * tracks.length)];
    state.currentTrack = correctTrack;

    // 3. Генерируем варианты ответа
    state.options = generateOptions(correctTrack.title, tracks);

    // 4. Обновляем кнопки ответов
    updateButtons();

    // 5. Создаём или обновляем плеер
    createOrUpdatePlayer(correctTrack.videoId);

    // 6. Сбрасываем таймер (запустится автоматически, когда видео начнёт играть)
    clearInterval(state.timer);
    state.timeLeft = CONFIG.ROUND_DURATION;
    timerValue.textContent = state.timeLeft;
    updateProgress();
}

// ===== Получение треков из плейлиста YouTube =====
async function fetchPlaylistTracks() {
    try {
        const randomPlaylistId = CONFIG.PLAYLIST_IDS[Math.floor(Math.random() * CONFIG.PLAYLIST_IDS.length)];
        const response = await fetch(`${CONFIG.PROXY_URL}?endpoint=playlistItems&part=snippet&playlistId=${randomPlaylistId}&maxResults=30`);
        const data = await response.json();

        if (!data.items) return [];

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

    const shuffled = otherTitles.sort(() => 0.5 - Math.random());
    while (options.length < 4 && shuffled.length > 0) {
        const wrongAnswer = shuffled.pop();
        if (!options.includes(wrongAnswer)) {
            options.push(wrongAnswer);
        }
    }

    return options.sort(() => 0.5 - Math.random());
}

// ===== Создание или обновление плеера =====
function createOrUpdatePlayer(videoId) {
    // Убираем сообщения об ошибках, если есть
    viewContent.querySelectorAll('.error, .loading').forEach(el => el.remove());

    let playerContainer = document.getElementById('youtube-player');

    // Создаём контейнер один раз
    if (!playerContainer) {
        playerContainer = document.createElement('div');
        playerContainer.id = 'youtube-player';
        const overlay = viewContent.querySelector('.video-overlay');
        if (overlay) {
            viewContent.insertBefore(playerContainer, overlay);
        } else {
            viewContent.appendChild(playerContainer);
        }
    }

    if (state.player && typeof state.player.loadVideoById === 'function') {
        // Плеер уже есть — просто грузим новое видео
        state.player.loadVideoById({
            videoId: videoId,
            startSeconds: CONFIG.START_TIME
        });
    } else {
        // Первая инициализация
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
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    const controlButton = document.querySelector('#controlButton');

    if (event.data === YT.PlayerState.PLAYING) {
        startTimer();
        if (controlButton) controlButton.innerHTML = '<i class="fa fa-pause"></i>';
    } else if (event.data === YT.PlayerState.PAUSED) {
        clearInterval(state.timer);
        if (controlButton) controlButton.innerHTML = '<i class="fa fa-play"></i>';
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

    if (state.player && state.player.getPlayerState() === YT.PlayerState.PLAYING) {
        state.player.pauseVideo();
    }

    if (selectedAnswer === state.currentTrack.title) {
        target.classList.add('trueAnswer');
        state.guessedSongs++;
        scoreValue.textContent = state.guessedSongs;
    } else {
        target.classList.add('falseAnswer');
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
    document.querySelectorAll('.Buttons').forEach(btn => {
        btn.classList.remove('trueAnswer', 'falseAnswer');
    });

    state.roundsPlayed++;

    if (state.roundsPlayed >= 10) {
        endGame();
        return;
    }

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
