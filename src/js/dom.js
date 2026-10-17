export const viewContent       = document.querySelector('#viewContent');
export const buttonsBlock      = document.querySelector('#ButtonsBlock');
export const scoreValue        = document.querySelector('#scoreValue');
export const streakValue       = document.querySelector('#streakValue');
export const streakHud         = document.querySelector('#streakHud');
export const timerValue        = document.querySelector('#timerValue');
export const roundValue        = document.querySelector('#roundValue');
export const progressFill      = document.querySelector('#progressFill');
export const pointsPopup       = document.querySelector('#pointsPopup');
export const startScreen       = document.querySelector('#startScreen');
export const finalScreen       = document.querySelector('#finalScreen');
export const finalScore        = document.querySelector('#finalScore');
export const finalGuessed      = document.querySelector('#finalGuessed');
export const finalTotal        = document.querySelector('#finalTotal');
export const finalBestStreak   = document.querySelector('#finalBestStreak');
export const finalRating       = document.querySelector('#finalRating');
export const finalDifficulty   = document.querySelector('#finalDifficulty');
export const finalMode         = document.querySelector('#finalMode');
export const newRecordBadge    = document.querySelector('#newRecordBadge');
export const highScoreBadge    = document.querySelector('#highScoreBadge');
export const highScoreValue    = document.querySelector('#highScoreValue');
export const highScoreDiff     = document.querySelector('#highScoreDiff');
export const exitButton        = document.querySelector('#exitButton');
export const hintsRow          = document.querySelector('#hintsRow');
export const artistHint        = document.querySelector('#artistHint');
export const roundsProgress    = document.querySelector('#roundsProgress');
export const turnIndicator     = document.querySelector('#turnIndicator');

export const scoreHud          = document.querySelector('#scoreHud');
export const duelHud           = document.querySelector('#duelHud');
export const livesHud          = document.querySelector('#livesHud');
export const p1ScoreValue      = document.querySelector('#p1ScoreValue');
export const p2ScoreValue      = document.querySelector('#p2ScoreValue');
export const livesValue        = document.querySelector('#livesValue');

export const finalSinglePlayer = document.querySelector('#finalSinglePlayer');
export const finalDuel         = document.querySelector('#finalDuel');
export const finalP1           = document.querySelector('#finalP1');
export const finalP2           = document.querySelector('#finalP2');
export const duelWinner        = document.querySelector('#duelWinner');

export const modeGrid          = document.querySelector('#modeGrid');
export const genreSelection    = document.querySelector('#genreSelection');
export const stepMode          = document.querySelector('#stepMode');
export const stepDifficulty    = document.querySelector('#stepDifficulty');

export const backToModeBtn     = document.querySelector('#backToModeBtn');
export const startGameBtn      = document.querySelector('#startGameBtn');
export const restartButton     = document.querySelector('#restartButton');
export const menuButton        = document.querySelector('#menuButton');

export const createButton = (text, className) => {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.className = className;
    return btn;
};
