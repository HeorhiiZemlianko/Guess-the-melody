// main.js
const CONFIG = {
    PROXY_URL: 'https://guessthemelody-482baoika-wild-happines.vercel.app/api/proxy',
    ROUND_DURATION: 60,
    START_TIME: 15,
    TOTAL_ROUNDS: 10,
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

const state = {
    player: null,
    currentTrack: null,
    options: [],
    guessedSongs: 0,
    roundsPlayed: 0,
    timer: null,
    timeLeft: CONFIG.ROUND_DURATION,
    running: false,
    locked: false           // блокировка кликов на 1.5 с после ответа
};

// ===== DOM =====
const viewContent   = document.querySelector('#viewContent');
const buttonsBlock  = document.querySelector('#ButtonsBlock');
const scoreValue    = document.querySelector('#scoreValue');
const timerValue    = document.querySelector('#timerValue');
const progressFill  = document.querySelector('#progressFill');
const startScreen   = document.querySelector('#startScreen');
const finalScreen   = document.querySelector('#finalScreen');
const finalScore    = document.querySelector('#finalScore');
const finalRating   = document.querySelector('#finalRating');
const exitButton    = document.querySelector('#exitButton');

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
    document.querySelector('#startButton').addEventListener('click', startGame);
    document.querySelector('#restartButton').addEventListener('click', () => location.reload());
    document.querySelector('#menuButton').addEventListener('click', returnToMenu);
    exitButton.addEventListener('click', returnToMenu);
    buttonsBlock.addEventListener('click', handleAnswerClick);
}

// ===== Старт / меню =====
async function startGame() {
    state.running = true;
    state.locked = false;
    state.guessedSongs = 0;
    state.roundsPlayed = 0;
    scoreValue.textContent = '0';

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
    timerValue.textContent = CONFIG.ROUND_DURATION;
    progressFill.style.width = '0%';
    buttonsBlock.innerHTML = '';
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

    if (!tracks || tracks.length < 4) {
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
    state.timeLeft = CONFIG.ROUND_DURATION;
    timerValue.textContent = state.timeLeft;
    updateProgress();
}

async function fetchPlaylistTracks() {
    try {
        const id = CONFIG.PLAYLIST_IDS[Math.floor(Math.random() * CONFIG.PLAYLIST_IDS.length)];
        const url = `${CONFIG.PROXY_URL}?endpoint=playlistItems&part=snippet&playlistId=${id}&maxResults=30`;
        const res = await fetch(url);
        const data = await res.json();
        if (!data.items) return [];
        return data.items
            .map(i => ({ title: i.snippet.title, videoId: i.snippet.resourceId.videoId }))
            .filter(t => t.videoId);
    } catch (e) {
        console.error('Ошибка загрузки плейлиста:', e);
        return [];
    }
}

// ===== Варианты ответа (дедуп по videoId) =====
function generateOptions(correctTrack, allTracks) {
    const seen = new Set([correctTrack.videoId]);
    const options = [{ title: correctTrack.title, videoId: correctTrack.videoId }];

    const others = allTracks
        .filter(t => !seen.has(t.videoId))
        .sort(() => 0.5 - Math.random());

    while (options.length < 4 && others.length) {
        const cand = others.pop();
        if (seen.has(cand.videoId)) continue;
        if (options.some(o => o.title === cand.title)) continue; // защита от одинаковых заголовков
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

    const endSeconds = CONFIG.START_TIME + CONFIG.ROUND_DURATION;

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
    state.options.forEach(opt => {
        buttonsBlock.appendChild(createButton(opt.title, 'Buttons'));
    });
}

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
    progressFill.style.width = `${(state.timeLeft / CONFIG.ROUND_DURATION) * 100}%`;
}

function timeOut() {
    if (state.locked) return;
    state.locked = true;
    document.querySelectorAll('.Buttons').forEach(btn => {
        if (btn.textContent === state.currentTrack.title) btn.classList.add('trueAnswer');
    });
    setTimeout(nextRound, 1500);
}

// ===== Следующий раунд / конец =====
async function nextRound() {
    state.locked = false;
    state.roundsPlayed++;
    if (state.roundsPlayed >= CONFIG.TOTAL_ROUNDS) {
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

    if (state.guessedSongs >= 9)       finalRating.textContent = '🏆 Вы музыкальный гений!';
    else if (state.guessedSongs >= 7)  finalRating.textContent = '🎵 Отличный слух!';
    else if (state.guessedSongs >= 4)  finalRating.textContent = '🎧 Неплохо, но можно лучше!';
    else                               finalRating.textContent = '📻 Попробуйте ещё раз!';

    exitButton.classList.add('hidden');
    finalScreen.classList.remove('hidden');
}

init();
