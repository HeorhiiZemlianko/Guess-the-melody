import { state } from '../state.js';
import {
    scoreValue, p1ScoreValue, p2ScoreValue,
    streakValue, streakHud, pointsPopup, turnIndicator
} from '../dom.js';

export function updateScoreDisplay() {
    if (state.mode.key === 'duel') {
        p1ScoreValue.textContent = state.p1Score;
        p2ScoreValue.textContent = state.p2Score;
    } else {
        scoreValue.textContent = state.score;
    }
}

export function updateStreakDisplay() {
    streakValue.textContent = state.streak;
    if (state.streak >= 3) streakHud.classList.add('active');
    else streakHud.classList.remove('active');
}

export function showPointsPopup(points, isCorrect) {
    pointsPopup.textContent = (points > 0 ? '+' : '') + points;
    pointsPopup.classList.remove('visible', 'negative');
    void pointsPopup.offsetWidth;
    if (!isCorrect) pointsPopup.classList.add('negative');
    pointsPopup.classList.add('visible');
    clearTimeout(pointsPopup._t);
    pointsPopup._t = setTimeout(() => pointsPopup.classList.remove('visible', 'negative'), 1500);
}

export function updateTurnIndicator() {
    turnIndicator.textContent = `Ход Игрока ${state.currentPlayer}`;
    turnIndicator.style.color = state.currentPlayer === 1 ? 'var(--primary-light)' : 'var(--danger)';
    turnIndicator.style.background = state.currentPlayer === 1
        ? 'rgba(78,205,196,0.1)'
        : 'rgba(230,57,70,0.1)';
}
