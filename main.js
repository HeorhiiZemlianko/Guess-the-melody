// ===== Уровни сложности =====
const DIFFICULTIES = {
    easy:     { key: 'easy',     name: 'Лёгкий',   optionsCount: 4, duration: 60, totalRounds: 10, hardcore: false, multiplier: 1    },
    medium:   { key: 'medium',   name: 'Средний',  optionsCount: 4, duration: 30, totalRounds: 15, hardcore: false, multiplier: 1.25 },
    hard:     { key: 'hard',     name: 'Сложный',  optionsCount: 6, duration: 15, totalRounds: 20, hardcore: false, multiplier: 1.5  },
    hardcore: { key: 'hardcore', name: 'Хардкор',  optionsCount: 0, duration: 60, totalRounds: 10, hardcore: true,  multiplier: 2    }
};

// ===== Режимы игры =====
const GAME_MODES = {
    classic:  { key: 'classic',  name: 'Классический' },
    blitz:    { key: 'blitz',    name: 'Блиц' },
    survival: { key: 'survival', name: 'Выживание' },
    duel:     { key: 'duel',     name: 'Дуэль' },
    thematic: { key: 'thematic', name: 'Тематический' }
};

const HINT_COSTS = { remove2: 100, artist: 150, time: 75, skip: 200 };

// ===== Конфигурация =====
const CONFIG = {
    PROXY_URL: 'https://guessthemelody-482baoika-wild-happines.vercel.app/api/proxy',
    START_TIME: 15,
    HIGH_SCORE_KEY: 'musicBattleHighScore_v1',
    // Базовые плейлисты (все подряд)
    PLAYLISTS: [
        'PL45_r-J4SdAFM0PbG6QeqVpLu975CK9Ip', 'PL0GvsLQil0MmYC96KEs_7dTNsLm1PS6JX', 'PLVQ7g3eO27cH8KG9mktLWH8zcqiwTntP', 'PLGBuKfnErZlAdX8X5LC9ODeHaxoxTuV2z',
        'PLn4GvABOzCQursVQ7qMU9CkNaKz4RgrVM', 'PLplXQ2cg9B_qrCVd1J_iId5SvP8Kf_BfS', 'PLa2a9FJY91_0x1s4eq6mf9b91m3Pahv0G', 'PLLRIXAxtV8zwSNxHwvdMVsxshybCCyuRT',
        'PLDIoUOhQQPlXr63I_vwF9GD8sAKh77dWU', 'PLDIoUOhQQPlWc-Kd6TCjTRIl0Z6fSQV0X', 'PLK8eO9itnhzfKFSQJ28kExpwZAv7TdvnA', 'PLvMVt4c68EeXRV2R1fdieei9HwpuUKXKL',
        'PLpxuOeEi0yCQtge9JUBOH--_yqg-jUm4h', 'PL4sJ8-_X2ESCrsyPWS8sUyU6z1Ssv6a9V', 'PLmXxqSJJq-yXrCPGIT2gn8b34JjOrl4Xf', 'PLG5FRq89_oJ40pbXEQ2AxA5rYu7hefUor',
        'PLMZxug3Hi7FaQ4HE-NEt9qpG2lvABRiwf', 'PLGBuKfnErZlBUh0KAYO3MvJ0bGqVZkhuG', 'PLw-VjHDlEOgtH-Ce-dJzPOtIm5xTVC4t2', 'PL9WAfiI0yDE-EQjgQ3eoD_WKP-FvwuwoW',
        'PL2hGGKKbxvqKJltSpqWA-IsKrZjJGkN0f', 'PL4fGSI1pDJn4E_HoW5HB-w5vFPkYfo3dB', 'PL-X-RdKBc6bZn4ikgv6ePzT5huW9Skp22', 'PLUU0HxYhx6SYAXu61BOGo8RmmHU38DThS',
        'PLw7pKYWfLkB7BE3_vJDhREZMX9ygFE89D', 'PLXAfqIM-LFu5zBMsv-wK4h6-OfLtSyBYG', 'PLNgxbIxenTkPp6etGScybfrECfbXm2ZUz', 'PLxD4o4XAOgl8Hx3AKFLb9st5TKs2oVMRv',
        'PLd5lauRj72uJdKMqnZK6gqQRdr5nGlHlg'
    ],
    // Тематические плейлисты (примеры, можно заменить на свои)
    THEMES: {
        rock: ['PLVQ7g3e6O27cH8KG9mktLWH8zcqiwTntP', 'PLGBuKfnErZlAdX8X5LC9ODeHaxoxTuV2z', 'PL6Lt9p1lIRZ311J9ZHuzkR5A3xesae2pk','PL9faRedFTjILdTd-x9I8Tr8Gf_EsqNJHd', 'PLFPDSa9XlTPDiUr-fwfDodSzAeY5F90mD', 'PLWUuMxUJvnuKDF9DncRGZPKssW0G7uyLi', 'PL58q25FsnmT9OeZZphRa0Ab_H1iLlgyB4', 'PL6Lt9p1lIRZ3m2X1Ur8ykG1XRGPFsTsbD'],
        pop:  ['PLa2a9FJY91_0x1s4eq6mf9b91m3Pahv0G', 'PLplXQ2cg9B_qrCVd1J_iId5SvP8Kf_BfS', 'PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG','PLcirGkCPmbmFeQ1sm4wFciF03D_EroIfr', 'PLmXxqSJJq-yXrCPGIT2gn8b34JjOrl4Xf', 'PL3-sRm8xAzY9gpXTMGVHJWy_FMD67NBed', 'PLWxeHRAhDczu5iQNJ_YAXbFpU7MVIbnh0', 'PLun_CS7whKh41vE528IS7DpqnQ7U1fan6', 'PL9WAfiI0yDE-EQjgQ3eoD_WKP-FvwuwoW', 'PLQdn7YisXz3PS9dJjn3H35ohAkXleMoVM'],
        retro:['PLwNv9Hhd8gZjNoQdpd2kBa3fwXNeJjzDX', 'PLTRHNF4SwluwOKMpuKTUqAT3nStpYaNXo', 'PLo3LXdjE00ijKvAX0fR2j5wUKW7Iu7rM-','PLXAfqIM-LFu5zBMsv-wK4h6-OfLtSyBYG', 'PLEXox2R2RxZKyTTlt3kxvtJbI_Cw1K1IX', 'PLMZxug3Hi7FaImYvoXxfzJFa0Y7iTsqOZ', 'PLw-VjHDlEOgtH-Ce-dJzPOtIm5xTVC4t2', 'PLGBuKfnErZlCkRRgt06em8nbXvcV5Sae7']
    }
};

const itunesCache = new Map();
const ITUNES_CACHE_MAX = 200;

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
    difficulty: DIFFICULTIES.easy,
    mode: GAME_MODES.classic,
    theme: 'rock',
    score: 0,
    p1Score: 0, // Для дуэли
    p2Score: 0, // Для дуэли
    currentPlayer: 1, // Для дуэли
    lives: 3,   // Для выживания
    streak: 0,
    bestStreak: 0,
    highScore: null,
    hintsUsed: new Set(),
    roundResults: [],
    globalTimerMode: false, // Для блица
};

// ===== DOM =====
const viewContent = document.querySelector('#viewContent');
const buttonsBlock = document.querySelector('#ButtonsBlock');
const scoreValue = document.querySelector('#scoreValue');
const streakValue = document.querySelector('#streakValue');
const streakHud = document.querySelector('#streakHud');
const timerValue = document.querySelector('#timerValue');
const roundValue = document.querySelector('#roundValue');
const progressFill = document.querySelector('#progressFill');
const pointsPopup = document.querySelector('#pointsPopup');
const startScreen = document.querySelector('#startScreen');
const finalScreen = document.querySelector('#finalScreen');
const finalScore = document.querySelector('#finalScore');
const finalGuessed = document.querySelector('#finalGuessed');
const finalTotal = document.querySelector('#finalTotal');
const finalBestStreak = document.querySelector('#finalBestStreak');
const finalRating = document.querySelector('#finalRating');
const finalDifficulty = document.querySelector('#finalDifficulty');
const finalMode = document.querySelector('#finalMode');
const newRecordBadge = document.querySelector('#newRecordBadge');
const highScoreBadge = document.querySelector('#highScoreBadge');
const highScoreValue = document.querySelector('#highScoreValue');
const highScoreDiff = document.querySelector('#highScoreDiff');
const exitButton = document.querySelector('#exitButton');
const hintsRow = document.querySelector('#hintsRow');
const artistHint = document.querySelector('#artistHint');
const roundsProgress = document.querySelector('#roundsProgress');
const turnIndicator = document.querySelector('#turnIndicator');

const scoreHud = document.querySelector('#scoreHud');
const duelHud = document.querySelector('#duelHud');
const livesHud = document.querySelector('#livesHud');
const p1ScoreValue = document.querySelector('#p1ScoreValue');
const p2ScoreValue = document.querySelector('#p2ScoreValue');
const livesValue = document.querySelector('#livesValue');

const finalSinglePlayer = document.querySelector('#finalSinglePlayer');
const finalDuel = document.querySelector('#finalDuel');
const finalP1 = document.querySelector('#finalP1');
const finalP2 = document.querySelector('#finalP2');
const duelWinner = document.querySelector('#duelWinner');

const modeGrid = document.querySelector('#modeGrid');
const genreSelection = document.querySelector('#genreSelection');

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

// ===== localStorage =====
function loadHighScore() {
    try { const raw = localStorage.getItem(CONFIG.HIGH_SCORE_KEY); return raw ? JSON.parse(raw) : null; } catch { return null; }
}
function saveHighScore(score, difficultyName) {
    const current = loadHighScore();
    if (!current || score > current.score) {
        const record = { score, difficulty: difficultyName, date: new Date().toISOString() };
        try { localStorage.setItem(CONFIG.HIGH_SCORE_KEY, JSON.stringify(record)); } catch {}
        return true;
    }
    return false;
}
function refreshHighScoreBadge() {
    state.highScore = loadHighScore();
    if (state.highScore && state.highScore.score > 0) {
        highScoreBadge.classList.remove('hidden');
        highScoreValue.textContent = state.highScore.score;
        highScoreDiff.textContent = `· ${state.highScore.difficulty}`;
    } else {
        highScoreBadge.classList.add('hidden');
    }
}

// ===== Очки =====
function getStreakMultiplier(streak) {
    if (streak >= 10) return 3;
    if (streak >= 5)  return 2;
    if (streak >= 3)  return 1.5;
    return 1;
}

function calculatePoints(isCorrect, timeLeft, duration, currentStreak) {
    if (!isCorrect) return -50;
    const base = 100;
    const speedBonus = Math.round(Math.max(0, Math.min(1, timeLeft / duration)) * 100);
    const diffMult = state.difficulty.multiplier;
    const streakMult = getStreakMultiplier(currentStreak);
    return Math.round((base + speedBonus) * diffMult * streakMult);
}

function updateScoreDisplay() {
    if (state.mode.key === 'duel') {
        p1ScoreValue.textContent = state.p1Score;
        p2ScoreValue.textContent = state.p2Score;
    } else {
        scoreValue.textContent = state.score;
    }
    if (hintsRow) updateHintsAffordability();
}

function updateStreakDisplay() {
    streakValue.textContent = state.streak;
    if (state.streak >= 3) streakHud.classList.add('active');
    else streakHud.classList.remove('active');
}

function showPointsPopup(points, isCorrect) {
    pointsPopup.textContent = (points > 0 ? '+' : '') + points;
    pointsPopup.classList.remove('visible', 'negative');
    void pointsPopup.offsetWidth;
    if (!isCorrect) pointsPopup.classList.add('negative');
    pointsPopup.classList.add('visible');
    clearTimeout(pointsPopup._t);
    pointsPopup._t = setTimeout(() => pointsPopup.classList.remove('visible', 'negative'), 1500);
}

// ===== Инициализация =====
async function init() {
    await loadYouTubeAPI();
    refreshHighScoreBadge();
    wireEvents();
}

function wireEvents() {
    // Выбор режима
    modeGrid.querySelectorAll('.mode-card').forEach(card => {
        card.addEventListener('click', () => {
            modeGrid.querySelectorAll('.mode-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            state.mode = GAME_MODES[card.dataset.mode];
            if (state.mode.key === 'thematic') genreSelection.classList.remove('hidden');
            else genreSelection.classList.add('hidden');
        });
    });

    // Выбор жанра
    genreSelection.querySelectorAll('.genre-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            genreSelection.querySelectorAll('.genre-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.theme = btn.dataset.genre;
        });
    });

    // Выбор сложности
    document.querySelectorAll('.difficulty-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.difficulty-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            state.difficulty = DIFFICULTIES[card.dataset.difficulty];
        });
    });

    document.querySelector('#startGameBtn').addEventListener('click', () => startGame());
    document.querySelector('#restartButton').addEventListener('click', () => startGame());
    document.querySelector('#menuButton').addEventListener('click', returnToMenu);
    exitButton.addEventListener('click', returnToMenu);
    buttonsBlock.addEventListener('click', handleAnswerClick);
    hintsRow.addEventListener('click', handleHintClick);
}

// ===== Старт игры =====
async function startGame() {
    state.running = true;
    state.locked = false;
    state.guessedSongs = 0;
    state.roundsPlayed = 0;
    state.score = 0;
    state.p1Score = 0;
    state.p2Score = 0;
    state.currentPlayer = 1;
    state.lives = 3;
    state.streak = 0;
    state.bestStreak = 0;
    state.hintsUsed = new Set();
    state.roundResults = [];
    state.timeLeft = state.difficulty.duration;
    state.globalTimerMode = (state.mode.key === 'blitz');

    // Настройка UI под режим
    scoreHud.classList.remove('hidden');
    duelHud.classList.add('hidden');
    livesHud.classList.add('hidden');

    if (state.mode.key === 'duel') {
        scoreHud.classList.add('hidden');
        duelHud.classList.remove('hidden');
        turnIndicator.classList.remove('hidden');
        state.difficulty.totalRounds = 10; // В дуэли всегда чётное кол-во раундов
        updateTurnIndicator();
    } else if (state.mode.key === 'survival') {
        livesHud.classList.remove('hidden');
        state.difficulty.totalRounds = 999; // Бесконечно
    } else if (state.mode.key === 'blitz') {
        state.timeLeft = 60; // Глобальный таймер на 60с
    }

    if (state.mode.key !== 'duel') turnIndicator.classList.add('hidden');

    updateScoreDisplay();
    updateStreakDisplay();
    timerValue.textContent = state.globalTimerMode ? state.timeLeft : state.difficulty.duration;
    updateRoundCounter();
    updateProgress();

    startScreen.classList.add('hidden');
    finalScreen.classList.add('hidden');
    exitButton.classList.remove('hidden');
    hintsRow.classList.remove('hidden');
    roundsProgress.classList.remove('hidden');
    renderRoundsProgress();

    addControlButton();
    await loadNextRound();
}

function returnToMenu() {
    state.running = false;
    state.locked = false;
    clearInterval(state.timer);
    if (state.player && typeof state.player.stopVideo === 'function') state.player.stopVideo();

    state.roundResults = [];
    finalScreen.classList.add('hidden');
    exitButton.classList.add('hidden');
    startScreen.classList.remove('hidden');
    hintsRow.classList.add('hidden');
    roundsProgress.classList.add('hidden');
    turnIndicator.classList.add('hidden');
    artistHint.classList.add('hidden');
    artistHint.innerHTML = '';
    refreshHighScoreBadge();
}

function updateTurnIndicator() {
    turnIndicator.textContent = `Ход Игрока ${state.currentPlayer}`;
    turnIndicator.style.color = state.currentPlayer === 1 ? 'var(--primary-light)' : 'var(--danger)';
    turnIndicator.style.background = state.currentPlayer === 1 ? 'rgba(78,205,196,0.1)' : 'rgba(230,57,70,0.1)';
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

    if (!state.globalTimerMode) {
        clearInterval(state.timer);
        state.timeLeft = state.difficulty.duration;
        timerValue.textContent = state.timeLeft;
    }
    updateRoundCounter();
    updateProgress();
    renderHints();
}

// ===== Плейлисты =====
async function fetchPlaylistTracks() {
    let attempts = 0;
    const maxAttempts = 5;

    let sourceArray = CONFIG.PLAYLISTS;
    if (state.mode.key === 'thematic' && CONFIG.THEMES[state.theme]) {
        sourceArray = CONFIG.THEMES[state.theme];
    }

    while (attempts < maxAttempts) {
        attempts++;
        try {
            const randomPlaylistId = sourceArray[Math.floor(Math.random() * sourceArray.length)];
            const url = `${CONFIG.PROXY_URL}?endpoint=playlistItems&part=snippet&playlistId=${randomPlaylistId}&maxResults=30`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.items && data.items.length >= 4) {
                return data.items.map(item => ({
                    title: item.snippet.title,
                    videoId: item.snippet.resourceId.videoId,
                    channel: item.snippet.videoOwnerChannelTitle || item.snippet.channelTitle
                })).filter(t => t.videoId);
            }
        } catch (error) { console.error('Ошибка загрузки:', error); }
    }
    return [];
}

// ===== Варианты =====
function generateOptions(correctTrack, allTracks) {
    const count = state.difficulty.optionsCount;
    if (count === 0) return [];
    const seen = new Set([correctTrack.videoId]);
    const options = [{ title: correctTrack.title, videoId: correctTrack.videoId }];
    const others = allTracks.filter(t => !seen.has(t.videoId)).sort(() => 0.5 - Math.random());

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
    
    // В блице мы не обрезаем видео жестко, чтобы не сбивать глобальный таймер
    const endSeconds = state.globalTimerMode ? undefined : CONFIG.START_TIME + state.difficulty.duration;
    const pVars = {
        autoplay: 0, controls: 0, disablekb: 1, modestbranding: 1, rel: 0,
        start: CONFIG.START_TIME, origin: window.location.origin
    };
    if (endSeconds) pVars.end = endSeconds;

    if (state.player && typeof state.player.loadVideoById === 'function') {
        state.player.loadVideoById({ videoId, startSeconds: CONFIG.START_TIME, endSeconds });
    } else {
        state.player = new YT.Player('youtube-player', {
            height: '100%', width: '100%', videoId, playerVars: pVars,
            events: { onReady: onPlayerReady, onStateChange: onPlayerStateChange }
        });
    }
}

function onPlayerReady(event) { if (state.running && !state.locked) event.target.playVideo(); }
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
    btn.addEventListener('click', () => {
        if (!state.player) return;
        if (state.player.getPlayerState() === YT.PlayerState.PLAYING) state.player.pauseVideo();
        else state.player.playVideo();
    });
}

// ===== Кнопки =====
function updateButtons() {
    buttonsBlock.innerHTML = '';
    buttonsBlock.classList.remove('hardcore-mode');
    if (state.difficulty.hardcore) {
        renderHardcoreInput();
    } else {
        state.options.forEach(opt => buttonsBlock.appendChild(createButton(opt.title, 'Buttons')));
    }
}

function renderHardcoreInput() {
    buttonsBlock.classList.add('hardcore-mode');
    const wrapper = document.createElement('div');
    wrapper.className = 'hardcore-input-wrapper';
    const input = document.createElement('input');
    input.type = 'text'; input.id = 'hardcoreInput'; input.className = 'hardcore-input';
    input.placeholder = 'Введите название или исполнителя...'; input.autocomplete = 'off';
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitHardcoreAnswer(); });
    const submitBtn = document.createElement('button');
    submitBtn.className = 'btn btn-primary hardcore-submit';
    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Проверить';
    submitBtn.addEventListener('click', submitHardcoreAnswer);
    wrapper.appendChild(input); wrapper.appendChild(submitBtn);
    buttonsBlock.appendChild(wrapper);
    setTimeout(() => input.focus(), 200);
}

function submitHardcoreAnswer() {
    if (!state.running || state.locked) return;
    const input = document.querySelector('#hardcoreInput');
    if (!input || input.disabled) return;
    const userAnswer = input.value.trim();
    if (!userAnswer) { input.focus(); return; }

    state.locked = true; clearInterval(state.timer);
    if (state.player && state.player.getPlayerState() === YT.PlayerState.PLAYING) state.player.pauseVideo();

    input.disabled = true;
    const submitBtn = document.querySelector('.hardcore-submit');
    if (submitBtn) submitBtn.disabled = true;

    const isCorrect = checkHardcoreAnswer(userAnswer, state.currentTrack.title);
    applyRoundResult(isCorrect);
    input.classList.add(isCorrect ? 'trueAnswer' : 'falseAnswer');

    const feedback = document.createElement('div');
    feedback.className = 'hardcore-feedback';
    feedback.innerHTML = `Правильный ответ: <strong>${state.currentTrack.title}</strong>`;
    buttonsBlock.appendChild(feedback);
    setTimeout(nextRound, 2400);
}

// ===== Применение результата =====
function applyRoundResult(isCorrect, kind) {
    const points = calculatePoints(isCorrect, state.timeLeft, state.difficulty.duration, state.streak);
    let realPoints = points;

    if (isCorrect) {
        state.guessedSongs++;
        state.streak++;
        state.bestStreak = Math.max(state.bestStreak, state.streak);
        
        if (state.mode.key === 'duel') {
            if (state.currentPlayer === 1) state.p1Score += points;
            else state.p2Score += points;
        } else {
            state.score += points;
        }

        if (state.mode.key === 'blitz') {
            state.timeLeft += 5;
            realPoints = '+5 сек';
        }
    } else {
        state.streak = 0;
        
        if (state.mode.key === 'duel') {
            if (state.currentPlayer === 1) state.p1Score = Math.max(0, state.p1Score + points);
            else state.p2Score = Math.max(0, state.p2Score + points);
        } else {
            state.score = Math.max(0, state.score + points);
        }

        if (state.mode.key === 'blitz') {
            state.timeLeft -= 3;
            realPoints = '-3 сек';
        }
        if (state.mode.key === 'survival') {
            state.lives--;
            livesValue.textContent = state.lives;
        }
    }

    if (!kind) kind = isCorrect ? 'correct' : 'wrong';
    state.roundResults.push(kind);
    renderRoundsProgress();
    updateScoreDisplay();
    updateStreakDisplay();
    
    // Кастомный попап для блица
    if (state.mode.key === 'blitz') {
        pointsPopup.textContent = realPoints;
        pointsPopup.classList.remove('visible', 'negative');
        void pointsPopup.offsetWidth;
        if (!isCorrect) pointsPopup.classList.add('negative');
        pointsPopup.classList.add('visible');
        setTimeout(() => pointsPopup.classList.remove('visible', 'negative'), 1500);
    } else {
        showPointsPopup(points, isCorrect);
    }
}

// ===== Подсказки =====
function renderHints() {
    state.hintsUsed = new Set();
    artistHint.classList.add('hidden'); artistHint.innerHTML = '';
    hintsRow.querySelectorAll('.hint-btn').forEach(btn => {
        btn.classList.remove('used'); btn.disabled = false;
        if (btn.dataset.hint === 'remove2' && state.difficulty.hardcore) btn.disabled = true;
    });
    updateHintsAffordability();
}

function updateHintsAffordability() {
    const currentScore = state.mode.key === 'duel' ? (state.currentPlayer === 1 ? state.p1Score : state.p2Score) : state.score;
    hintsRow.querySelectorAll('.hint-btn').forEach(btn => {
        if (state.hintsUsed.has(btn.dataset.hint)) return;
        if (state.difficulty.hardcore && btn.dataset.hint === 'remove2') return;
        btn.disabled = currentScore < HINT_COSTS[btn.dataset.hint];
    });
}

async function handleHintClick(e) {
    const btn = e.target.closest('.hint-btn');
    if (!btn || btn.disabled || !state.running || state.locked) return;
    const hintKey = btn.dataset.hint;
    if (state.hintsUsed.has(hintKey)) return;

    const cost = HINT_COSTS[hintKey];
    const currentScore = state.mode.key === 'duel' ? (state.currentPlayer === 1 ? state.p1Score : state.p2Score) : state.score;
    if (currentScore < cost) return;

    let applied = false;
    switch (hintKey) {
        case 'remove2': applied = applyRemove2Hint(); break;
        case 'artist': applied = await applyArtistHint(); break;
        case 'time': applied = applyTimeHint(); break;
        case 'skip': applied = applySkipHint(); break;
    }

    if (applied) {
        if (state.mode.key === 'duel') {
            if (state.currentPlayer === 1) state.p1Score -= cost;
            else state.p2Score -= cost;
        } else {
            state.score -= cost;
        }
        updateScoreDisplay();
        showPointsPopup(-cost, false);
        state.hintsUsed.add(hintKey);
        btn.classList.add('used'); btn.disabled = true;
    }
}

function applyRemove2Hint() {
    if (state.difficulty.hardcore) return false;
    const buttons = Array.from(document.querySelectorAll('.Buttons'));
    const wrong = buttons.filter(b => b.textContent !== state.currentTrack.title && !b.disabled).sort(() => 0.5 - Math.random());
    if (wrong.length < 2) return false;
    wrong.slice(0, 2).forEach(btn => { btn.classList.add('removed-hint'); btn.disabled = true; });
    return true;
}

function cleanArtistName(name) {
    return String(name).replace(/\s*-\s*topic$/i, '').replace(/vevo$/i, '').replace(/\s*official(\s+(music|video|channel|artist|audio))?$/i, '').replace(/\s+records?$/i, '').replace(/\s+music$/i, '').trim();
}

async function fetchArtistFromItunes(trackTitle) {
    if (!trackTitle) return null;
    const cleanQuery = String(trackTitle).replace(/\([^)]*\)/g, ' ').replace(/\[[^\]]*\]/g, ' ').replace(/\b(official|video|audio|hd|hq|lyrics?|remaster(ed)?|clip|music|4k|mv|feat|ft)\b/gi, ' ').replace(/\s+/g, ' ').trim();
    if (cleanQuery.length < 3) return null;
    const cacheKey = cleanQuery.toLowerCase();
    if (itunesCache.has(cacheKey)) return itunesCache.get(cacheKey);

    const url = `${CONFIG.PROXY_URL}?api=itunes&term=${encodeURIComponent(cleanQuery)}&media=music&entity=song&limit=5`;
    let artist = null;
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (response.ok) {
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const normalizedQuery = cleanQuery.toLowerCase();
                let bestMatch = null; let bestScore = 0;
                for (const result of data.results) {
                    const trackName = (result.trackName || '').toLowerCase();
                    const artistName = result.artistName || '';
                    const qWords = normalizedQuery.split(' ').filter(w => w.length >= 3);
                    const tWords = trackName.split(' ').filter(w => w.length >= 3);
                    const matches = qWords.filter(qw => tWords.some(tw => tw.includes(qw) || qw.includes(tw))).length;
                    const score = qWords.length > 0 ? matches / qWords.length : 0;
                    if (score > bestScore && artistName) { bestScore = score; bestMatch = artistName; }
                }
                artist = (bestMatch && bestScore >= 0.4) ? bestMatch : (data.results[0]?.artistName || null);
            }
        }
    } catch (e) { artist = null; }
    if (itunesCache.size >= ITUNES_CACHE_MAX) itunesCache.delete(itunesCache.keys().next().value);
    itunesCache.set(cacheKey, artist);
    return artist;
}

async function applyArtistHint() {
    const track = state.currentTrack;
    if (!track) return false;
    artistHint.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Ищем...';
    artistHint.classList.remove('hidden');
    let artist = await fetchArtistFromItunes(track.title);
    if (!artist) artist = extractArtistFromTitle(track.title);
    if (!artist && track.channel) artist = cleanArtistName(track.channel);
    if (!artist) { artistHint.innerHTML = '🎤 Не удалось определить'; return true; }
    artistHint.innerHTML = `🎤 Исполнитель: <strong>${artist}</strong>`;
    return true;
}

function extractArtistFromTitle(title) {
    if (!title) return null;
    let clean = String(title).replace(/\([^)]*\)/g, '').replace(/\[[^\]]*\]/g, '').trim();
    const match = clean.match(/^(.{2,60}?)\s*[-–—]\s+/);
    if (!match) return null;
    let candidate = match[1].trim().replace(/\b(official|video|audio|hd|hq|lyrics?|mv|4k|clip)\b/gi, '').replace(/\s+/g, ' ').trim();
    return candidate.length >= 2 ? candidate : null;
}

function applyTimeHint() {
    state.timeLeft += 15;
    timerValue.textContent = state.timeLeft;
    updateProgress();
    return true;
}

function applySkipHint() {
    if (state.locked) return false;
    state.locked = true; clearInterval(state.timer);
    if (state.player && state.player.getPlayerState() === YT.PlayerState.PLAYING) state.player.pauseVideo();
    document.querySelectorAll('.Buttons').forEach(btn => { if (btn.textContent === state.currentTrack.title) btn.classList.add('trueAnswer'); });
    state.roundResults.push('skipped');
    renderRoundsProgress();
    setTimeout(nextRound, 1200);
    return true;
}

// ===== Проверка хардкора =====
function normalizeStr(str) {
    return String(str).toLowerCase().replace(/\([^)]*\)/g, ' ').replace(/\[[^\]]*\]/g, ' ').replace(/\b(official|video|audio|hd|hq|remaster(ed)?|lyrics?|clip|music|4k|mv|feat|ft)\b/gi, ' ').replace(/[^a-zа-яё0-9\s]/gi, ' ').replace(/\s+/g, ' ').trim();
}

function checkHardcoreAnswer(userInput, correctTitle) {
    const user = normalizeStr(userInput); const correct = normalizeStr(correctTitle);
    if (!user || user.length < 2) return false;
    if (correct.includes(user)) return true;
    const uWords = user.split(' ').filter(w => w.length >= 2);
    const cWords = correct.split(' ').filter(w => w.length >= 2);
    if (uWords.length === 0 || cWords.length === 0) return false;
    const matches = uWords.filter(w => cWords.some(cw => cw === w || cw.includes(w) || w.includes(cw))).length;
    return (matches / uWords.length) >= 0.6;
}

// ===== Обычный ответ =====
function handleAnswerClick(e) {
    if (!state.running || state.locked) return;
    const target = e.target;
    if (!target.classList.contains('Buttons')) return;

    state.locked = true; clearInterval(state.timer);
    if (state.player && state.player.getPlayerState() === YT.PlayerState.PLAYING) state.player.pauseVideo();

    const selected = target.textContent;
    const isCorrect = selected === state.currentTrack.title;
    if (isCorrect) target.classList.add('trueAnswer');
    else {
        target.classList.add('falseAnswer');
        document.querySelectorAll('.Buttons').forEach(btn => { if (btn.textContent === state.currentTrack.title) btn.classList.add('trueAnswer'); });
    }
    applyRoundResult(isCorrect);
    setTimeout(nextRound, 1500);
}

// ===== Таймер =====
function startTimer() {
    if (state.globalTimerMode && state.timer) return; // Глобальный уже идёт
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
    const total = state.globalTimerMode ? 60 : (state.difficulty.duration || 60);
    const percent = Math.min(100, (state.timeLeft / total) * 100);
    progressFill.style.width = `${Math.max(0, percent)}%`;
}

function updateRoundCounter() {
    if (state.mode.key === 'survival') {
        roundValue.textContent = `∞`;
    } else {
        const current = Math.min(state.roundsPlayed + 1, state.difficulty.totalRounds);
        roundValue.textContent = `${current}/${state.difficulty.totalRounds}`;
    }
    renderRoundsProgress();
}

function renderRoundsProgress() {
    if (!roundsProgress) return;
    const total = state.mode.key === 'survival' ? state.roundResults.length + 5 : state.difficulty.totalRounds;
    roundsProgress.innerHTML = '';
    for (let i = 0; i < total; i++) {
        const dot = document.createElement('span');
        dot.className = 'round-dot';
        const result = state.roundResults[i];
        if (result) dot.classList.add(`round-dot--${result}`);
        else if (i === state.roundsPlayed && state.running) dot.classList.add('round-dot--current');
        roundsProgress.appendChild(dot);
    }
}

function timeOut() {
    if (state.locked) return;
    state.locked = true;
    applyRoundResult(false, 'timeout');
    if (state.difficulty.hardcore) {
        const input = document.querySelector('#hardcoreInput');
        if (input) { input.disabled = true; input.classList.add('falseAnswer'); }
        const submitBtn = document.querySelector('.hardcore-submit');
        if (submitBtn) submitBtn.disabled = true;
        const feedback = document.createElement('div');
        feedback.className = 'hardcore-feedback';
        feedback.innerHTML = `Время вышло! Ответ: <strong>${state.currentTrack.title}</strong>`;
        buttonsBlock.appendChild(feedback);
    } else {
        document.querySelectorAll('.Buttons').forEach(btn => { if (btn.textContent === state.currentTrack.title) btn.classList.add('trueAnswer'); });
    }
    setTimeout(nextRound, 2000);
}

// ===== Следующий раунд =====
async function nextRound() {
    state.locked = false;
    state.roundsPlayed++;

    // Проверки на завершение
    if (state.mode.key === 'survival' && state.lives <= 0) { endGame(); return; }
    if (state.mode.key === 'blitz' && state.timeLeft <= 0) { endGame(); return; }
    if (state.mode.key === 'duel' && state.roundsPlayed >= state.difficulty.totalRounds) { endGame(); return; }
    if (state.mode.key !== 'survival' && state.mode.key !== 'blitz' && state.mode.key !== 'duel') {
        if (state.roundsPlayed >= state.difficulty.totalRounds) { endGame(); return; }
    }

    // Смена игрока в дуэли
    if (state.mode.key === 'duel') {
        state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;
        updateTurnIndicator();
    }

    await loadNextRound();
}

// ===== Конец игры =====
function endGame() {
    state.running = false;
    clearInterval(state.timer);
    if (state.player && typeof state.player.stopVideo === 'function') state.player.stopVideo();

    finalMode.textContent = state.mode.name;
    finalDifficulty.textContent = state.difficulty.name;
    
    if (state.mode.key === 'duel') {
        finalSinglePlayer.classList.add('hidden');
        finalDuel.classList.remove('hidden');
        finalP1.textContent = state.p1Score;
        finalP2.textContent = state.p2Score;
        if (state.p1Score > state.p2Score) duelWinner.textContent = '🏆 Победил Игрок 1!';
        else if (state.p2Score > state.p1Score) duelWinner.textContent = '🏆 Победил Игрок 2!';
        else duelWinner.textContent = '🤝 Ничья!';
        finalRating.textContent = ''; // Скрываем рейтинг для дуэли
        newRecordBadge.classList.add('hidden'); // Рекорд только для одиночных
    } else {
        finalDuel.classList.add('hidden');
        finalSinglePlayer.classList.remove('hidden');
        finalScore.textContent = state.score;
        finalGuessed.textContent = state.guessedSongs;
        finalTotal.textContent = state.mode.key === 'survival' ? '∞' : state.difficulty.totalRounds;
        finalBestStreak.textContent = state.bestStreak;

        const percent = state.mode.key === 'survival' ? 1 : (state.guessedSongs / state.difficulty.totalRounds);
        if (percent >= 0.9)       finalRating.textContent = '🏆 Вы музыкальный гений!';
        else if (percent >= 0.7)  finalRating.textContent = '🎵 Отличный слух!';
        else if (percent >= 0.4)  finalRating.textContent = '🎧 Неплохо, но можно лучше!';
        else                      finalRating.textContent = '📻 Попробуйте ещё раз!';

        if (state.mode.key !== 'survival' && state.mode.key !== 'blitz') {
            const isNewRecord = saveHighScore(state.score, state.difficulty.name);
            newRecordBadge.classList.toggle('hidden', !isNewRecord);
        } else {
            newRecordBadge.classList.add('hidden');
        }
    }

    exitButton.classList.add('hidden');
    finalScreen.classList.remove('hidden');
}

init();
