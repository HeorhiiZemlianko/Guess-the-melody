import { CONFIG } from '../config.js';
import { state } from '../state.js';
import { highScoreBadge, highScoreValue, highScoreDiff } from '../dom.js';

export function loadHighScore() {
    try {
        const raw = localStorage.getItem(CONFIG.HIGH_SCORE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch { return null; }
}

export function saveHighScore(score, difficultyName) {
    const current = loadHighScore();
    if (!current || score > current.score) {
        const record = { score, difficulty: difficultyName, date: new Date().toISOString() };
        try { localStorage.setItem(CONFIG.HIGH_SCORE_KEY, JSON.stringify(record)); } catch {}
        return true;
    }
    return false;
}

export function refreshHighScoreBadge() {
    state.highScore = loadHighScore();
    if (state.highScore && state.highScore.score > 0) {
        highScoreBadge.classList.remove('hidden');
        highScoreValue.textContent = state.highScore.score;
        highScoreDiff.textContent = `· ${state.highScore.difficulty}`;
    } else {
        highScoreBadge.classList.add('hidden');
    }
}
