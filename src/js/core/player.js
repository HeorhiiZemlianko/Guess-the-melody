import { CONFIG } from '../config.js';
import { state } from '../state.js';
import { viewContent, createButton } from '../dom.js';
import { startTimer } from './timer.js';

export function createOrUpdatePlayer(videoId) {
    viewContent.querySelectorAll('.error, .loading').forEach(el => el.remove());
    let container = document.getElementById('youtube-player');
    if (!container) {
        container = document.createElement('div');
        container.id = 'youtube-player';
        const overlay = viewContent.querySelector('.video-overlay');
        if (overlay) viewContent.insertBefore(container, overlay);
        else viewContent.appendChild(container);
    }

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
            events: { onReady: onPlayerReady, onStateChange: onPlayerStateChange, onError: onPlayerError }
        });
    }
}

export function onPlayerReady(event) {
    if (state.running && !state.locked) event.target.playVideo();
}

let playDelayTimeout = null;

export function onPlayerStateChange(event) {
    const btn = document.querySelector('#controlButton');
    
    if (event.data === YT.PlayerState.PLAYING) {
        // Если видео начало играть — запускаем таймер с задержкой
        clearTimeout(playDelayTimeout);
        playDelayTimeout = setTimeout(() => {
            // Проверяем, что видео все еще играет (игрок не нажал паузу за эти 1.5 сек)
            if (state.player && state.player.getPlayerState() === YT.PlayerState.PLAYING) {
                startTimer();
            }
        }, 1500); // Задержка 1.5 секунды для буферизации
        
        if (btn) btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else if (event.data === YT.PlayerState.PAUSED) {
        // Если пауза — отменяем запуск таймера и останавливаем его
        clearTimeout(playDelayTimeout);
        clearInterval(state.timer);
        if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

export function addControlButton() {
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

function onPlayerError(event) {
    // Коды 100, 101, 150 означают, что видео недоступно для встраивания
    const isUnavailable = [100, 101, 150].includes(event.data);
    if (isUnavailable) {
        console.warn(`Видео недоступно (код ${event.data}). Пропускаем раунд.`);
        
        // Небольшая задержка, чтобы игрок понял, что произошло
        setTimeout(() => {
            // Вызываем функцию перехода к следующему раунду.
            // Поскольку player.js не знает о game/engine.js напрямую,
            // мы используем событие или передаём колбэк.
            // Простой решение — эмитнуть пользовательское событие на document.
            document.dispatchEvent(new CustomEvent('videoUnavailable'));
        }, 800);
    }
}
