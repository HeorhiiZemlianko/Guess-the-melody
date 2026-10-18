/*
 * Guess-the-melody — интерактивная музыкальная викторина.
 * Copyright (C) 2026 Heorhii Zemlianko
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */ 

import { HINT_COSTS } from '../config.js';
import { state } from '../state.js';
import {
    viewContent, buttonsBlock, artistHint, exitButton,
    startScreen, finalScreen, finalScore, finalGuessed, finalTotal,
    finalBestStreak, finalRating, finalDifficulty, finalMode, newRecordBadge,
    scoreHud, duelHud, livesHud, livesValue,
    finalSinglePlayer, finalDuel, finalP1, finalP2, duelWinner,
    stepMode, stepDifficulty, genreSelection, modeGrid,
    hintsRow, roundsProgress, turnIndicator, timerValue,
    modeDifficultyHud, currentModeLabel, currentDifficultyLabel,
    createButton
} from '../dom.js';
import { fetchPlaylistTracks } from '../api/playlists.js';
import { fetchArtistFromItunes } from '../api/itunes.js';
import { calculatePoints } from '../core/scoring.js';
import { saveHighScore, refreshHighScoreBadge } from '../core/storage.js';
import { createOrUpdatePlayer, addControlButton } from '../core/player.js';
import { setOnTimeoutHandler, updateProgress, updateRoundCounter, renderRoundsProgress } from '../core/timer.js';
import { updateButtons } from '../ui/buttons.js';
import { renderHints, updateHintsAffordability } from '../ui/hints.js';
import { updateScoreDisplay, updateStreakDisplay, showPointsPopup, updateTurnIndicator } from '../ui/hud.js';
import { normalizeStr, extractArtistFromTitle, cleanArtistName } from '../utils/strings.js';
import { ModeStrategies } from './modes.js';

/* ===================== УПРАВЛЕНИЕ ИГРОЙ ===================== */

export async function startGame() {
    state.running = true;
    state.locked = false;
    
    // Фикс: клонируем сложность, чтобы режимы не мутировали оригинал
    state.difficulty = { ...state.difficulty }; 

    state.guessedSongs = 0;
    state.roundsPlayed = 0;
    state.score = 0;
    state.p1Score = 0;
    state.p2Score = 0;
    state.streak = 0;
    state.bestStreak = 0;
    state.hintsUsed = new Set();
    state.roundResults = [];
    
    // Инициализируем стратегию для текущего режима
    const strategy = ModeStrategies[state.mode.key];
    strategy.init(state);

    setOnTimeoutHandler(timeOut);

    // Настройка UI
    scoreHud.classList.remove('hidden');
    duelHud.classList.add('hidden');
    livesHud.classList.add('hidden');
    modeDifficultyHud.classList.remove('hidden');
    
    currentModeLabel.textContent = state.mode.name;
    currentDifficultyLabel.textContent = state.difficulty.name;

    if (state.mode.key === 'duel') {
        scoreHud.classList.add('hidden');
        duelHud.classList.remove('hidden');
        turnIndicator.classList.remove('hidden');
        state.difficulty.totalRounds = 10; // Дуэль всегда 10 раундов
        updateTurnIndicator();
    } else if (state.mode.key === 'survival') {
        livesHud.classList.remove('hidden');
        livesValue.textContent = state.lives;
    }

    if (state.mode.key !== 'duel') turnIndicator.classList.add('hidden');

    updateScoreDisplay();
    updateHintsAffordability();
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

export function returnToMenu() {
    state.running = false;
    state.locked = false;
    clearInterval(state.timer);
    state.timer = null;
    if (state.player && typeof state.player.stopVideo === 'function') state.player.stopVideo();

    state.roundResults = [];
    finalScreen.classList.add('hidden');
    exitButton.classList.add('hidden');
    startScreen.classList.remove('hidden');
    hintsRow.classList.add('hidden');
    roundsProgress.classList.add('hidden');
    turnIndicator.classList.add('hidden');
    modeDifficultyHud.classList.add('hidden');
    artistHint.classList.add('hidden');
    artistHint.innerHTML = '';

    stepDifficulty.classList.add('hidden');
    stepMode.classList.remove('hidden');
    genreSelection.classList.add('hidden');
    modeGrid.querySelectorAll('.mode-card').forEach(c => c.classList.remove('active'));

    // Сброс выделения сложности
    document.querySelectorAll('.difficulty-card').forEach(c => c.classList.remove('active'));

    refreshHighScoreBadge();
}

export function endGame() {
    state.running = false;
    clearInterval(state.timer);
    state.timer = null;
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
        finalRating.textContent = '';
        newRecordBadge.classList.add('hidden');
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
    modeDifficultyHud.classList.add('hidden');
    finalScreen.classList.remove('hidden');
}

/* ===================== РАУНДЫ ===================== */

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

    updateButtons(submitHardcoreAnswer);
    createOrUpdatePlayer(correctTrack.videoId);

    if (!state.globalTimerMode) {
        clearInterval(state.timer);
        state.timeLeft = state.difficulty.duration;
        timerValue.textContent = state.timeLeft;
    }
    updateRoundCounter();
    updateProgress();
    renderHints();

    startTimer();
}

async function nextRound() {
    state.locked = false;
    state.roundsPlayed++;

    const strategy = ModeStrategies[state.mode.key];
    
    // Проверяем условия окончания игры через стратегию
    if (strategy.checkGameOver(state)) {
        endGame();
        return;
    }

    // Смена игрока в дуэли
    if (state.mode.key === 'duel') {
        updateTurnIndicator();
    }

    await loadNextRound();
}

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

/* ===================== РЕЗУЛЬТАТ РАУНДА ===================== */

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
    } else {
        state.streak = 0;
        if (state.mode.key === 'duel') {
            if (state.currentPlayer === 1) state.p1Score = Math.max(0, state.p1Score + points);
            else state.p2Score = Math.max(0, state.p2Score + points);
        } else {
            state.score = Math.max(0, state.score + points);
        }
    }

    // Вызываем логику режима
    const strategy = ModeStrategies[state.mode.key];
    strategy.onRoundEnd(state, isCorrect);

    // Обновляем UI после логики режима
    if (state.mode.key === 'blitz') {
        realPoints = isCorrect ? '+5 сек' : '-3 сек';
        pointsPopup.textContent = realPoints;
        pointsPopup.classList.remove('visible', 'negative');
        void pointsPopup.offsetWidth;
        if (!isCorrect) pointsPopup.classList.add('negative');
        pointsPopup.classList.add('visible');
        setTimeout(() => pointsPopup.classList.remove('visible', 'negative'), 1500);
        timerValue.textContent = state.timeLeft; // обновляем цифру таймера на экране
    } else {
        showPointsPopup(points, isCorrect);
    }

    if (state.mode.key === 'survival' && !isCorrect) {
        livesValue.textContent = state.lives;
    }

    if (!kind) kind = isCorrect ? 'correct' : 'wrong';
    state.roundResults.push(kind);
    renderRoundsProgress();
    updateScoreDisplay();
    updateHintsAffordability();
    updateStreakDisplay();
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
        document.querySelectorAll('.Buttons').forEach(btn => {
            if (btn.textContent === state.currentTrack.title) btn.classList.add('trueAnswer');
        });
    }
    setTimeout(nextRound, 2000);
}

/* ===================== ОТВЕТЫ ===================== */

export function handleAnswerClick(e) {
    if (!state.running || state.locked) return;
    const target = e.target;
    if (!target.classList.contains('Buttons')) return;

    state.locked = true;
    clearInterval(state.timer);
    if (state.player && state.player.getPlayerState() === YT.PlayerState.PLAYING) state.player.pauseVideo();

    const selected = target.textContent;
    const isCorrect = selected === state.currentTrack.title;
    if (isCorrect) target.classList.add('trueAnswer');
    else {
        target.classList.add('falseAnswer');
        document.querySelectorAll('.Buttons').forEach(btn => {
            if (btn.textContent === state.currentTrack.title) btn.classList.add('trueAnswer');
        });
    }
    applyRoundResult(isCorrect);
    setTimeout(nextRound, 1500);
}

function submitHardcoreAnswer() {
    if (!state.running || state.locked) return;
    const input = document.querySelector('#hardcoreInput');
    if (!input || input.disabled) return;
    const userAnswer = input.value.trim();
    if (!userAnswer) { input.focus(); return; }

    state.locked = true;
    clearInterval(state.timer);
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

function checkHardcoreAnswer(userInput, correctTitle) {
    const user = normalizeStr(userInput);
    const correct = normalizeStr(correctTitle);
    if (!user || user.length < 2) return false;
    if (correct.includes(user)) return true;
    const uWords = user.split(' ').filter(w => w.length >= 2);
    const cWords = correct.split(' ').filter(w => w.length >= 2);
    if (uWords.length === 0 || cWords.length === 0) return false;
    const matches = uWords.filter(w => cWords.some(cw => cw === w || cw.includes(w) || w.includes(cw))).length;
    return (matches / uWords.length) >= 0.6;
}

/* ===================== ПОДСКАЗКИ ===================== */

export async function handleHintClick(e) {
    const btn = e.target.closest('.hint-btn');
    if (!btn || btn.disabled || !state.running || state.locked) return;
    const hintKey = btn.dataset.hint;
    if (state.hintsUsed.has(hintKey)) return;

    const cost = HINT_COSTS[hintKey];
    const currentScore = state.mode.key === 'duel'
        ? (state.currentPlayer === 1 ? state.p1Score : state.p2Score)
        : state.score;
    if (currentScore < cost) return;

    let applied = false;
    switch (hintKey) {
        case 'remove2': applied = applyRemove2Hint(); break;
        case 'artist':  applied = await applyArtistHint(); break;
        case 'time':    applied = applyTimeHint(); break;
        case 'skip':    applied = applySkipHint(); break;
    }

    if (applied) {
        if (state.mode.key === 'duel') {
            if (state.currentPlayer === 1) state.p1Score -= cost;
            else state.p2Score -= cost;
        } else {
            state.score -= cost;
        }
        updateScoreDisplay();
        updateHintsAffordability();
        showPointsPopup(-cost, false);
        state.hintsUsed.add(hintKey);
        btn.classList.add('used');
        btn.disabled = true;
    }
}

function applyRemove2Hint() {
    if (state.difficulty.hardcore) return false;
    const buttons = Array.from(document.querySelectorAll('.Buttons'));
    const wrong = buttons
        .filter(b => b.textContent !== state.currentTrack.title && !b.disabled)
        .sort(() => 0.5 - Math.random());
    if (wrong.length < 2) return false;
    wrong.slice(0, 2).forEach(btn => { btn.classList.add('removed-hint'); btn.disabled = true; });
    return true;
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

function applyTimeHint() {
    state.timeLeft += 15;
    timerValue.textContent = state.timeLeft;
    updateProgress();
    return true;
}

function applySkipHint() {
    if (state.locked) return false;
    state.locked = true;
    clearInterval(state.timer);
    if (state.player && state.player.getPlayerState() === YT.PlayerState.PLAYING) state.player.pauseVideo();
    document.querySelectorAll('.Buttons').forEach(btn => {
        if (btn.textContent === state.currentTrack.title) btn.classList.add('trueAnswer');
    });
    state.roundResults.push('skipped');
    renderRoundsProgress();
    setTimeout(nextRound, 1200);
    return true;
}
