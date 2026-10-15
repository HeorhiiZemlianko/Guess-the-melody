// ===== Данные =====
const videoObj = {
    1: 'Source/1.mp4', 2: 'Source/2.mp4', /* ... все 30 видео ... */
    30: 'Source/30.mp4'
};

// Полный объект songs из вашего кода (сокращён для примера, вставьте свой)
const songs = {
    'Алла Пугачёва и Владимир Кузьмин — Ветер': 0,
    'Павел Смеян и Татьяна Воронина - Ветер перемен': 1,
    // ... остальные песни ...
};

const keys = Object.keys(songs);
const keysInVideo = Object.keys(videoObj);
const answers = [7, 11, 12, 17, 24, 27, 29, 36, 38, 43, 48, 50, 55, 57, 64, 67, 70, 76, 77, 82, 87, 89, 95, 99, 104, 106, 111, 113, 119];

// ===== Состояние игры =====
const state = {
    n: 7,
    videoIndex: 0,
    high: 4,
    index: 1,
    guessedSongs: 0,
    timer: null,
    timeLeft: 30,
    isPlaying: false
};

// ===== DOM-элементы =====
const gameContainer = document.querySelector('.game-container');
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

// ===== Инициализация =====
function init() {
    addStartButton();
    installButtons();
}

function addStartButton() {
    const startBtn = createButton('Начать игру', 'startButton');
    gameContainer.appendChild(startBtn);
    buttonsBlock.style.display = 'none';
    startBtn.addEventListener('click', startGame);
}

function startGame() {
    document.querySelector('.startButton')?.remove();
    gameContainer.style.background = '#0a0a0a';
    addControlButton();
    makeVideoElement();
    showButtons();
    startTimer();
}

function installButtons() {
    for (let i = 0; i < 4; i++) {
        const btn = createButton(keys[i], 'Buttons');
        btn.style.display = 'none';
        buttonsBlock.appendChild(btn);
    }
}

function showButtons() {
    buttonsBlock.style.display = 'grid';
    document.querySelectorAll('.Buttons').forEach(btn => btn.style.display = 'block');
}

function addControlButton() {
    const btn = createButton('', '');
    btn.id = 'controlButton';
    btn.innerHTML = '<i class="fa fa-play"></i>';
    viewContent.appendChild(btn);
    btn.addEventListener('click', () => togglePlay(btn));
}

function makeVideoElement() {
    const existingVideo = viewContent.querySelector('video');
    if (existingVideo) existingVideo.remove();

    const video = document.createElement('video');
    const source = document.createElement('source');
    const key = videoObj[keysInVideo[state.videoIndex]];
    source.setAttribute('src', key);
    video.setAttribute('autoplay', '');
    video.classList.add('video');
    video.appendChild(source);
    viewContent.appendChild(video);
    state.isPlaying = true;
}

function togglePlay(btn) {
    const video = viewContent.querySelector('video');
    if (!video) return;
    if (video.paused) {
        video.play();
        btn.innerHTML = '<i class="fa fa-pause"></i>';
    } else {
        video.pause();
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
    // Автоматически засчитываем как неправильный ответ
    const buttons = document.querySelectorAll('.Buttons');
    buttons.forEach(btn => {
        if (songs[btn.textContent] === 1) {
            btn.classList.add('trueAnswer');
        }
    });
    nextRound();
}

// ===== Игровой раунд =====
buttonsBlock.addEventListener('click', (e) => {
    if (!e.target.classList.contains('Buttons')) return;
    const target = e.target;
    const key = target.textContent;
    clearInterval(state.timer);

    if (songs[key] === 1) {
        target.classList.add('trueAnswer');
        state.guessedSongs++;
        scoreValue.textContent = state.guessedSongs;
    } else {
        target.classList.add('falseAnswer');
        // Показать правильный ответ
        document.querySelectorAll('.Buttons').forEach(btn => {
            if (songs[btn.textContent] === 1) btn.classList.add('trueAnswer');
        });
    }

    setTimeout(nextRound, 1500);
});

function nextRound() {
    // Сброс классов
    document.querySelectorAll('.Buttons').forEach(btn => {
        btn.classList.remove('trueAnswer', 'falseAnswer');
    });

    // Проверка на конец игры
    if (state.high >= 120) {
        endGame();
        return;
    }

    // Обновляем кнопки
    const buttons = document.querySelectorAll('.Buttons');
    buttons.forEach((btn, i) => {
        btn.textContent = keys[state.high + i];
    });
    state.high += 4;

    // Меняем видео и аудио
    state.videoIndex++;
    state.n = answers[state.index];
    state.index++;

    makeVideoElement();
    startTimer();
}

function endGame() {
    clearInterval(state.timer);
    finalScore.textContent = state.guessedSongs;
    finalScreen.classList.remove('hidden');
    document.querySelector('#restartButton').addEventListener('click', () => location.reload());
}

// ===== Запуск =====
init();
