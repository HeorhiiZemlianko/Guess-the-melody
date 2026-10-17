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
            events: { onReady: onPlayerReady, onStateChange: onPlayerStateChange }
        });
    }
}

export function onPlayerReady(event) {
    if (state.running && !state.locked) event.target.playVideo();
}

export function onPlayerStateChange(event) {
    const btn = document.querySelector('#controlButton');
    if (event.data === YT.PlayerState.PLAYING) {
        startTimer();
        if (btn) btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else if (event.data === YT.PlayerState.PAUSED) {
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
