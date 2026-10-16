// main.js

// ===== Уровни сложности =====
const DIFFICULTIES = {
    easy: {
        key: 'easy',
        name: 'Лёгкий',
        optionsCount: 4,
        duration: 60,
        totalRounds: 10,
        hardcore: false
    },
    medium: {
        key: 'medium',
        name: 'Средний',
        optionsCount: 4,
        duration: 30,
        totalRounds: 15,
        hardcore: false
    },
    hard: {
        key: 'hard',
        name: 'Сложный',
        optionsCount: 6,
        duration: 15,
        totalRounds: 20,
        hardcore: false
    },
    hardcore: {
        key: 'hardcore',
        name: 'Хардкор',
        optionsCount: 0,
        duration: 60,
        totalRounds: 10,
        hardcore: true
    }
};

// ===== Конфигурация =====
const CONFIG = {
    PROXY_URL: 'https://guessthemelody-482baoika-wild-happines.vercel.app/api/proxy',
    START_TIME: 15,
    PLAYLIST_IDS: [
        'PL45_r-J4SdAFM0PbG6QeqVpLu975CK9Ip',
        'PL0GvsLQil0MmYC96KEs_7dTNsLm1PS6JX',
        'PLVQ7g3eO27cH8KG9mktLWH8zcqiwTntP',
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

// ===== Состояние =====
const state = {
    player: null,
    currentTrack: null,
    options: [],
    guessedSongs: 0,
    roundsPlayed: 0,
    timer: null,
    timeLeft: 60,
    running: false,
    locked: false,
    difficulty: DIFFICULTIES.easy
};

// ===== DOM =====
const viewContent     = document.querySelector('#viewContent');
const buttonsBlock    = document.querySelector('#ButtonsBlock');
const scoreValue      = document.querySelector('#scoreValue');
const timerValue      = document.querySelector('#timerValue');
const roundValue      = document.querySelector('#roundValue');
const progressFill    = document.querySelector('#progressFill');
const startScreen     = document.querySelector('#startScreen');
const finalScreen     = document.querySelector('#finalScreen');
const finalScore      = document.querySelector('#finalScore');
const finalTotal      = document.querySelector('#finalTotal');
const finalRating     = document.querySelector('#finalRating');
const finalDifficulty = document.querySelector('#finalDifficulty');
const exitButton      = document.querySelector('#exitButton');

// ===== Утилиты =====
const createButton = (text, className) => {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.className = className;
    return btn;
};

function loadYouTubeAPI() {
    return new Promise((resolve) => {
        if (window.YT && window.YT.Player) return resolve(window.YT);
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const first = document.getElementsByTagName('script')[0];
        first.parentNode.insertBefore(tag, first);
        window.onYouTubeIframeAPIReady = () => resolve(window.YT);
    });
}

async function init() {
    await loadYouTubeAPI();
    wireEvents();
}

function wireEvents() {
    // Кнопки выбора сложности
    document.querySelectorAll('.difficulty-card').forEach(card => {
        card.addEventListener('click', () => startGame(card.dataset.difficulty));
    });

    document.querySelector('#restartButton').addEventListener('click', () => {
        // Перезапуск с той же сложностью
        startGame(state.difficulty.key);
    });
    document.querySelector('#menuButton').addEventListener('click', returnToMenu);
    exitButton.addEventListener('click', returnToMenu);
    buttonsBlock.addEventListener('click', handleAnswerClick);
}

// ===== Старт игры =====
async function startGame(difficultyKey) {
    // Выбираем конфиг сложности
    state.difficulty = DIFFICULTIES[difficultyKey] || DIFFICULTIES.easy;

    state.running = true;
    state.locked = false;
    state.guessedSongs = 0;
    state.roundsPlayed = 0;
    state.timeLeft = state.difficulty.duration;

    scoreValue.textContent = '0';
    timerValue.textContent = state.difficulty.duration;
    updateRoundCounter();
    updateProgress();

    startScreen.classList.add('hidden');
    finalScreen.classList.add('hidden');
    exitButton.classList.remove('hidden');

    addControlButton();
    await loadNextRound();
}

function returnToMenu() {
    state.running = false;
    state.locked = false;
    clearInterval(state.timer);

    if (state.player && typeof state.player.stopVideo === 'function') {
        state.player.stopVideo();
    }

    state.guessedSongs = 0;
    state.roundsPlayed = 0;
    state.options = [];
    state.currentTrack = null;

    scoreValue.textContent = '0';
    timerValue.textContent = '—';
    roundValue.textContent = '0/0';
    progressFill.style.width = '0%';
    buttonsBlock.innerHTML = '';
    buttonsBlock.classList.remove('hardcore-mode');

    finalScreen.classList.add('hidden');
    exitButton.classList.add('hidden');
    startScreen.classList.remove('hidden');
}

// ===== Раунд =====
async function loadNextRound() {
    if (!state.running) return;
    state.locked = false;

    viewContent.querySelectorAll('.spinner, .error').forEach(el => el.remove());
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    viewContent.appendChild(spinner);

    const tracks = await fetchPlaylistTracks();
    spinner.remove();
    if (!state.running) return;

    const required = state.difficulty.hardcore ? 1 : state.difficulty.optionsCount;
    if (!tracks || tracks.length < Math.max(4, required)) {
        const err = document.createElement('div');
        err.className = 'error';
        err.textContent = 'Не удалось загрузить треки. Попробуйте ещё раз.';
        viewContent.appendChild(err);
        return;
    }

    const correctTrack = tracks[Math.floor(Math.random() * tracks.length)];
    state.currentTrack = correctTrack;
    state.options = generateOptions(correctTrack, tracks);

    updateButtons();
    createOrUpdatePlayer(correctTrack.videoId);

    clearInterval(state.timer);
    state.timeLeft = state.difficulty.duration;
    timerValue.textContent = state.timeLeft;
    updateRoundCounter();
    updateProgress();
}

// ===== Плейлисты =====
async function fetchPlaylistTracks() {
    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
        attempts++;
        try {
            const randomPlaylistId = CONFIG.PLAYLIST_IDS[Math.floor(Math.random() * CONFIG.PLAYLIST_IDS.length)];
            const url = `${CONFIG.PROXY_URL}?endpoint=playlistItems&part=snippet&playlistId=${randomPlaylistId}&maxResults=30`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.items && data.items.length >= 4) {
                return data.items
                    .map(item => ({
                        title: item.snippet.title,
                        videoId: item.snippet.resourceId.videoId
                    }))
                    .filter(t => t.videoId);
            }
            console.warn(`Плейлист ${randomPlaylistId} пуст. Пробуем другой...`);
        } catch (error) {
            console.error('Ошибка загрузки плейлиста:', error);
        }
    }
    return [];
}

// ===== Варианты ответа =====
function generateOptions(correctTrack, allTracks) {
    const count = state.difficulty.optionsCount;
    if (count === 0) return []; // Хардкор — без вариантов

    const seen = new Set([correctTrack.videoId]);
    const options = [{ title: correctTrack.title, videoId: correctTrack.videoId }];

    const others = allTracks
        .filter(t => !seen.has(t.videoId))
        .sort(() => 0.5 - Math.random());

    while (options.length < count && others.length) {
        const cand = others.pop();
        if (seen.has(cand.videoId)) continue;
        if (options.some(o => o.title === cand.title)) continue;
        seen.add(cand.videoId);
        options.push({ title: cand.title, videoId: cand.videoId });
    }

    return options.sort(() => 0.5 - Math.random());
}

// ===== Плеер =====
function createOrUpdatePlayer(videoId) {
    viewContent.querySelectorAll('.error, .loading').forEach(el => el.remove());

    let container = document.getElementById('youtube-player');
    if (!container) {
        container = document.createElement('div');
        container.id = 'youtube-player';
        const overlay = viewContent.querySelector('.video-overlay');
        if (overlay) viewContent.insertBefore(container, overlay);
        else viewContent.appendChild(container);
    }

    const endSeconds = CONFIG.START_TIME + state.difficulty.duration;

    if (state.player && typeof state.player.loadVideoById === 'function') {
        state.player.loadVideoById({
            videoId,
            startSeconds: CONFIG.START_TIME,
            endSeconds
        });
    } else {
        state.player = new YT.Player('youtube-player', {
            height: '100%',
            width: '100%',
            videoId,
            playerVars: {
                autoplay: 0,
                controls: 0,
                disablekb: 1,
                modestbranding: 1,
                rel: 0,
                start: CONFIG.START_TIME,
                end: endSeconds,
                origin: window.location.origin
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange
            }
        });
    }
}

function onPlayerReady(event) {
    if (state.running && !state.locked) event.target.playVideo();
}

function onPlayerStateChange(event) {
    const btn = document.querySelector('#controlButton');
    if (event.data === YT.PlayerState.PLAYING) {
        startTimer();
        if (btn) btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else if (event.data === YT.PlayerState.PAUSED) {
        clearInterval(state.timer);
        if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

// ===== Play/Pause =====
function addControlButton() {
    if (document.querySelector('#controlButton')) return;
    const btn = createButton('', '');
    btn.id = 'controlButton';
    btn.innerHTML = '<i class="fa-solid fa-play"></i>';
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

// ===== Кнопки ответа =====
function updateButtons() {
    buttonsBlock.innerHTML = '';
    buttonsBlock.classList.remove('hardcore-mode');

    if (state.difficulty.hardcore) {
        renderHardcoreInput();
    } else {
        state.options.forEach(opt => {
            buttonsBlock.appendChild(createButton(opt.title, 'Buttons'));
        });
    }
}

function renderHardcoreInput() {
    buttonsBlock.classList.add('hardcore-mode');

    const wrapper = document.createElement('div');
    wrapper.className = 'hardcore-input-wrapper';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'hardcoreInput';
    input.className = 'hardcore-input';
    input.placeholder = 'Введите название трека или исполнителя...';
    input.autocomplete = 'off';
    input.spellcheck = false;

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') submitHardcoreAnswer();
    });

    const submitBtn = document.createElement('button');
    submitBtn.className = 'btn btn-primary hardcore-submit';
    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Проверить';
    submitBtn.addEventListener('click', submitHardcoreAnswer);

    wrapper.appendChild(input);
    wrapper.appendChild(submitBtn);
    buttonsBlock.appendChild(wrapper);

    setTimeout(() => input.focus(), 200);
}

function submitHardcoreAnswer() {
    if (!state.running || state.locked) return;
    const input = document.querySelector('#hardcoreInput');
    if (!input || input.disabled) return;

    const userAnswer = input.value.trim();
    if (!userAnswer) {
        input.focus();
        return;
    }

    state.locked = true;
    clearInterval(state.timer);

    if (state.player && state.player.getPlayerState() === YT.PlayerState.PLAYING) {
        state.player.pauseVideo();
    }

    input.disabled = true;
    const submitBtn = document.querySelector('.hardcore-submit');
    if (submitBtn) submitBtn.disabled = true;

    const isCorrect = checkHardcoreAnswer(userAnswer, state.currentTrack.title);

    if (isCorrect) {
        input.classList.add('trueAnswer');
        state.guessedSongs++;
        scoreValue.textContent = state.guessedSongs;
    } else {
        input.classList.add('falseAnswer');
    }

    const feedback = document.createElement('div');
    feedback.className = 'hardcore-feedback';
    feedback.innerHTML = `Правильный ответ: <strong>${state.currentTrack.title}</strong>`;
    buttonsBlock.appendChild(feedback);

    setTimeout(nextRound, 2400);
}

// ===== Проверка ответа хардкор =====
function normalizeStr(str) {
    return String(str)
        .toLowerCase()
        .replace(/\([^)]*\)/g, ' ')
        .replace(/\[[^\]]*\]/g, ' ')
        .replace(/\b(official|video|audio|hd|hq|remaster(ed)?|lyrics?|clip|music|4k|mv|feat|ft)\b/gi, ' ')
        .replace(/[^a-zа-яё0-9\s]/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function checkHardcoreAnswer(userInput, correctTitle) {
    const user = normalizeStr(userInput);
    const correct = normalizeStr(correctTitle);
    if (!user || user.length < 2) return false;

    // Если ответ пользователя целиком входит в правильное название
    if (correct.includes(user)) return true;

    const userWords = user.split(' ').filter(w => w.length >= 2);
    const correctWords = correct.split(' ').filter(w => w.length >= 2);
    if (userWords.length === 0 || correctWords.length === 0) return false;

    // Сколько слов из ответа пользователя совпало с правильным названием
    const matches = userWords.filter(w =>
        correctWords.some(cw => cw === w || cw.includes(w) || w.includes(cw))
    ).length;

    return (matches / userWords.length) >= 0.6;
}

// ===== Обычный ответ =====
function handleAnswerClick(e) {
    if (!state.running || state.locked) return;
    const target = e.target;
    if (!target.classList.contains('Buttons')) return;

    state.locked = true;
    clearInterval(state.timer);

    if (state.player && state.player.getPlayerState() === YT.PlayerState.PLAYING) {
        state.player.pauseVideo();
    }

    const selected = target.textContent;
    if (selected === state.currentTrack.title) {
        target.classList.add('trueAnswer');
        state.guessedSongs++;
        scoreValue.textContent = state.guessedSongs;
    } else {
        target.classList.add('falseAnswer');
        document.querySelectorAll('.Buttons').forEach(btn => {
            if (btn.textContent === state.currentTrack.title) btn.classList.add('trueAnswer');
        });
    }

    setTimeout(nextRound, 1500);
}

// ===== Таймер =====
function startTimer() {
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
    const total = state.difficulty.duration || 60;
    progressFill.style.width = `${Math.max(0, (state.timeLeft / total) * 100)}%`;
}

function updateRoundCounter() {
    const current = Math.min(state.roundsPlayed + 1, state.difficulty.totalRounds);
    roundValue.textContent = `${current}/${state.difficulty.totalRounds}`;
}

function timeOut() {
    if (state.locked) return;
    state.locked = true;

    if (state.difficulty.hardcore) {
        // Для хардкора — просто показать правильный ответ
        const input = document.querySelector('#hardcoreInput');
        if (input) {
            input.disabled = true;
            input.classList.add('falseAnswer');
        }
        const submitBtn = document.querySelector('.hardcore-submit');
        if (submitBtn) submitBtn.disabled = true;

        const feedback = document.createElement('div');
        feedback.className = 'hardcore-feedback';
        feedback.innerHTML = `Время вышло! Правильный ответ: <strong>${state.currentTrack.title}</strong>`;
        buttonsBlock.appendChild(feedback);
    } else {
        document.querySelectorAll('.Buttons').forEach(btn => {
            if (btn.textContent === state.currentTrack.title) btn.classList.add('trueAnswer');
        });
    }

    setTimeout(nextRound, 2000);
}

// ===== Следующий раунд / конец =====
async function nextRound() {
    state.locked = false;
    state.roundsPlayed++;
    if (state.roundsPlayed >= state.difficulty.totalRounds) {
        endGame();
        return;
    }
    await loadNextRound();
}

function endGame() {
    state.running = false;
    clearInterval(state.timer);

    if (state.player && typeof state.player.stopVideo === 'function') {
        state.player.stopVideo();
    }

    finalScore.textContent = state.guessedSongs;
    finalTotal.textContent = state.difficulty.totalRounds;
    finalDifficulty.textContent = state.difficulty.name;

    const percent = state.guessedSongs / state.difficulty.totalRounds;
    if (percent >= 0.9)       finalRating.textContent = '🏆 Вы музыкальный гений!';
    else if (percent >= 0.7)  finalRating.textContent = '🎵 Отличный слух!';
    else if (percent >= 0.4)  finalRating.textContent = '🎧 Неплохо, но можно лучше!';
    else                      finalRating.textContent = '📻 Попробуйте ещё раз!';

    exitButton.classList.add('hidden');
    finalScreen.classList.remove('hidden');
}

init();
