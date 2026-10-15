// ===== Состояние игры =====
const state = {
    videoIndex: 0,
    guessedSongs: 0,
    timer: null,
    timeLeft: 30,
    currentTrack: null,
    options: []
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

// ===== API Deezer =====
const DEEZER_API = 'https://api.deezer.com';

async function searchTrack(query) {
    try {
        const response = await fetch(`${DEEZER_API}/search?q=${encodeURIComponent(query)}&limit=10`);
        const data = await response.json();
        // Фильтруем треки, у которых есть превью
        const tracksWithPreview = data.data.filter(track => track.preview);
        return tracksWithPreview;
    } catch (error) {
        console.error('Ошибка поиска трека:', error);
        return [];
    }
}

async function getRandomTrack(genre = 'pop') {
    // Список популярных исполнителей для разнообразия
    const artists = ['Madonna', 'Michael Jackson', 'Queen', 'The Beatles', 'ABBA', 'Elton John', 'David Bowie', 'Prince', 'Whitney Houston', 'George Michael'];
    const randomArtist = artists[Math.floor(Math.random() * artists.length)];
    const tracks = await searchTrack(randomArtist);
    if (tracks.length > 0) {
        return tracks[Math.floor(Math.random() * tracks.length)];
    }
    return null;
}

async function getWrongAnswers(correctTrack, count = 3) {
    const wrongAnswers = [];
    const usedTitles = new Set([correctTrack.title]);
    const artists = ['Adele', 'Ed Sheeran', 'Taylor Swift', 'Bruno Mars', 'Rihanna', 'Beyonce', 'Lady Gaga', 'Katy Perry', 'Justin Timberlake', 'Coldplay'];
    
    while (wrongAnswers.length < count) {
        const randomArtist = artists[Math.floor(Math.random() * artists.length)];
        const tracks = await searchTrack(randomArtist);
        for (const track of tracks) {
            if (!usedTitles.has(track.title)) {
                wrongAnswers.push(track.title);
                usedTitles.add(track.title);
                break;
            }
        }
    }
    return wrongAnswers;
}

// ===== Инициализация =====
function init() {
    addStartButton();
}

function addStartButton() {
    const startBtn = createButton('Начать игру', 'startButton');
    viewContent.appendChild(startBtn);
    startBtn.addEventListener('click', startGame);
}

async function startGame() {
    document.querySelector('.startButton')?.remove();
    addControlButton();
    await loadNextRound();
}

// ===== Загрузка раунда =====
async function loadNextRound() {
    // Показываем загрузку
    viewContent.innerHTML = '<div class="loading">Загрузка...</div>';
    
    // Получаем правильный трек
    const correctTrack = await getRandomTrack();
    if (!correctTrack) {
        viewContent.innerHTML = '<div class="error">Не удалось загрузить трек. Попробуйте еще раз.</div>';
        return;
    }
    state.currentTrack = correctTrack;

    // Получаем неправильные ответы
    const wrongAnswers = await getWrongAnswers(correctTrack);
    state.options = [correctTrack.title, ...wrongAnswers];
    
    // Перемешиваем варианты
    state.options = state.options.sort(() => Math.random() - 0.5);

    // Обновляем видео/аудио
    updateVideoElement(correctTrack.preview);
    
    // Обновляем кнопки
    updateButtons();
    
    // Запускаем таймер
    startTimer();
}

function updateVideoElement(previewUrl) {
    // Очищаем область
    viewContent.innerHTML = '';
    
    // Создаем видео элемент (или аудио, если видео нет)
    // Deezer предоставляет только аудио-превью, поэтому используем audio
    const audio = document.createElement('audio');
    audio.setAttribute('src', previewUrl);
    audio.setAttribute('autoplay', '');
    audio.setAttribute('controls', 'false');
    audio.classList.add('video'); // Используем тот же класс для стилизации
    audio.loop = false;
    viewContent.appendChild(audio);
    
    // Добавляем кнопку управления
    addControlButton();
}

function updateButtons() {
    // Очищаем блок кнопок
    buttonsBlock.innerHTML = '';
    buttonsBlock.style.display = 'grid';
    
    // Создаем кнопки для каждого варианта
    state.options.forEach(option => {
        const btn = createButton(option, 'Buttons');
        btn.style.display = 'block';
        buttonsBlock.appendChild(btn);
    });
}

// ===== Управление аудио =====
function addControlButton() {
    const btn = createButton('', '');
    btn.id = 'controlButton';
    btn.innerHTML = '<i class="fa fa-play"></i>';
    viewContent.appendChild(btn);
    btn.addEventListener('click', () => togglePlay(btn));
}

function togglePlay(btn) {
    const audio = viewContent.querySelector('audio');
    if (!audio) return;
    if (audio.paused) {
        audio.play();
        btn.innerHTML = '<i class="fa fa-pause"></i>';
    } else {
        audio.pause();
        btn.innerHTML = '<i class="fa fa-play"></i>';
    }
}

// ===== Таймер =====
function startTimer() {
    state.timeLeft = 30;
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
    const percent = (state.timeLeft / 30) * 100;
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

// ===== Игровой раунд =====
buttonsBlock.addEventListener('click', async (e) => {
    if (!e.target.classList.contains('Buttons')) return;
    const target = e.target;
    const selectedAnswer = target.textContent;
    clearInterval(state.timer);

    if (selectedAnswer === state.currentTrack.title) {
        target.classList.add('trueAnswer');
        state.guessedSongs++;
        scoreValue.textContent = state.guessedSongs;
    } else {
        target.classList.add('falseAnswer');
        // Показываем правильный ответ
        document.querySelectorAll('.Buttons').forEach(btn => {
            if (btn.textContent === state.currentTrack.title) btn.classList.add('trueAnswer');
        });
    }
    setTimeout(nextRound, 1500);
});

async function nextRound() {
    // Сброс классов
    document.querySelectorAll('.Buttons').forEach(btn => {
        btn.classList.remove('trueAnswer', 'falseAnswer');
    });

    // Проверка на конец игры (например, после 10 раундов)
    if (state.guessedSongs >= 10) {
        endGame();
        return;
    }

    // Загружаем следующий раунд
    await loadNextRound();
}

function endGame() {
    clearInterval(state.timer);
    finalScore.textContent = state.guessedSongs;
    finalScreen.classList.remove('hidden');
    document.querySelector('#restartButton').addEventListener('click', () => location.reload());
}

// ===== Запуск =====
init();
