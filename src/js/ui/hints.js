import { HINT_COSTS } from '../config.js';
import { state } from '../state.js';
import { hintsRow, artistHint } from '../dom.js';

export function renderHints() {
    state.hintsUsed = new Set();
    artistHint.classList.add('hidden');
    artistHint.innerHTML = '';
    hintsRow.querySelectorAll('.hint-btn').forEach(btn => {
        btn.classList.remove('used');
        btn.disabled = false;
        if (btn.dataset.hint === 'remove2' && state.difficulty.hardcore) btn.disabled = true;
    });
    updateHintsAffordability();
}

export function updateHintsAffordability() {
    const currentScore = state.mode.key === 'duel'
        ? (state.currentPlayer === 1 ? state.p1Score : state.p2Score)
        : state.score;
    hintsRow.querySelectorAll('.hint-btn').forEach(btn => {
        if (state.hintsUsed.has(btn.dataset.hint)) return;
        if (state.difficulty.hardcore && btn.dataset.hint === 'remove2') return;
        btn.disabled = currentScore < HINT_COSTS[btn.dataset.hint];
    });
}
