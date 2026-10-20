import { GAME_MODES, DIFFICULTIES, BLITZ_DIFFICULTIES } from './config.js';
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

        // ===== ГОРЯЧИЕ КЛАВИШИ =====
    document.addEventListener('keydown', (e) => {
        // Если игрок печатает в поле ввода (хардкор), игнорируем горячие клавиши
        if (document.activeElement.tagName === 'INPUT') {
            if (e.key === 'Enter' && document.activeElement.id === 'hardcoreInput') {
                const submitBtn = document.querySelector('.hardcore-submit');
                if (submitBtn && !submitBtn.disabled) submitBtn.click();
            }
            return; 
        }

        // Esc — Выход в меню
        if (e.key === 'Escape') {
            returnToMenu();
            return;
        }

        // Enter — Начать игру / Играть снова
        if (e.key === 'Enter') {
            if (!startScreen.classList.contains('hidden') && !startGameBtn.classList.contains('hidden')) {
                startGameBtn.click();
            } else if (!finalScreen.classList.contains('hidden')) {
                restartButton.click();
            }
            return;
        }

        // Space — Пауза/Плей
        if (e.code === 'Space') {
            e.preventDefault(); // Запрещаем прокрутку страницы
            const controlBtn = document.querySelector('#controlButton');
            if (controlBtn && state.running) controlBtn.click();
            return;
        }

        // 1, 2, 3, 4 — Быстрый выбор ответа
        if (['1', '2', '3', '4'].includes(e.key) && state.running && !state.locked) {
            const btns = document.querySelectorAll('.Buttons');
            const index = parseInt(e.key) - 1;
            if (btns[index] && !btns[index].disabled) {
                btns[index].click();
            }
        }
    });
}
