import { GAME_MODES, DIFFICULTIES } from './config.js';
import { state } from './state.js';
import {
    modeGrid, genreSelection, stepMode, stepDifficulty,
    backToModeBtn, startGameBtn, restartButton, menuButton,
    exitButton, buttonsBlock, hintsRow
} from './dom.js';
import { loadYouTubeAPI } from './utils/youtube.js';
import { refreshHighScoreBadge } from './core/storage.js';
import { startGame, returnToMenu, handleAnswerClick, handleHintClick } from './game/engine.js';

export async function init() {
    await loadYouTubeAPI();
    refreshHighScoreBadge();
    wireEvents();
}

function wireEvents() {
    modeGrid.querySelectorAll('.mode-card').forEach(card => {
        card.addEventListener('click', () => {
            modeGrid.querySelectorAll('.mode-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            state.mode = GAME_MODES[card.dataset.mode];

            stepMode.classList.add('hidden');
            stepDifficulty.classList.remove('hidden');

            if (state.mode.key === 'thematic') genreSelection.classList.remove('hidden');
            else genreSelection.classList.add('hidden');
        });
    });

    backToModeBtn.addEventListener('click', () => {
        stepDifficulty.classList.add('hidden');
        stepMode.classList.remove('hidden');
        genreSelection.classList.add('hidden');
    });

    genreSelection.querySelectorAll('.genre-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            genreSelection.querySelectorAll('.genre-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.theme = btn.dataset.genre;
        });
    });

    document.querySelectorAll('.difficulty-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.difficulty-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            const diffKey = card.dataset.difficulty;
            // Для Блица используем отдельный набор сложностей
            if (state.mode.key === 'blitz' && BLITZ_DIFFICULTIES[diffKey]) {
                state.difficulty = BLITZ_DIFFICULTIES[diffKey];
            } else {
                state.difficulty = DIFFICULTIES[diffKey];
            }
        });
    });

    startGameBtn.addEventListener('click', () => startGame());
    restartButton.addEventListener('click', () => startGame());
    menuButton.addEventListener('click', returnToMenu);
    exitButton.addEventListener('click', returnToMenu);
    buttonsBlock.addEventListener('click', handleAnswerClick);
    hintsRow.addEventListener('click', handleHintClick);
}
