import { state } from '../state.js';
import { timerValue, progressFill, roundValue, roundsProgress } from '../dom.js';

let onTimeoutHandler = null;

export function setOnTimeoutHandler(fn) {
    onTimeoutHandler = fn;
}

export function startTimer() {
    if (state.globalTimerMode && state.timer) return;
    clearInterval(state.timer);
    state.timer = setInterval(() => {
        // Не уходим в минус
        if (state.timeLeft <= 0) {
            clearInterval(state.timer);
            if (onTimeoutHandler) onTimeoutHandler();
            return;
        }
        state.timeLeft--;
        timerValue.textContent = state.timeLeft;
        updateProgress();
        if (state.timeLeft <= 0) {
            clearInterval(state.timer);
            if (onTimeoutHandler) onTimeoutHandler();
        }
    }, 1000);
}

export function updateProgress() {
    const total = state.globalTimerMode ? 60 : (state.difficulty.duration || 60);
    const percent = Math.min(100, (state.timeLeft / total) * 100);
    progressFill.style.width = `${Math.max(0, percent)}%`;
}

export function updateRoundCounter() {
    if (state.mode.key === 'survival') {
        roundValue.textContent = `∞`;
    } else {
        const current = Math.min(state.roundsPlayed + 1, state.difficulty.totalRounds);
        roundValue.textContent = `${current}/${state.difficulty.totalRounds}`;
    }
    renderRoundsProgress();
}

export function renderRoundsProgress() {
    if (!roundsProgress) return;
    const total = state.mode.key === 'survival'
        ? state.roundResults.length + 5
        : state.difficulty.totalRounds;
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
