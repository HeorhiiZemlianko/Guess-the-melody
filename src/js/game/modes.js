import { state } from '../state.js';

export const ModeStrategies = {
    classic: {
        init: (state) => {
            state.globalTimerMode = false;
        },
        checkGameOver: (state) => {
            return state.roundsPlayed >= state.difficulty.totalRounds;
        },
        onRoundEnd: (state, isCorrect) => {
            // В классике нет доп. логики
        }
    },
    
    blitz: {
        init: (state) => {
            state.globalTimerMode = true;
            state.timeLeft = 60;
        },
        checkGameOver: (state) => {
            return state.timeLeft <= 0;
        },
        onRoundEnd: (state, isCorrect) => {
            if (isCorrect) state.timeLeft += 5;
            else state.timeLeft -= 3;
        }
    },
    
    survival: {
        init: (state) => {
            state.globalTimerMode = false;
            state.lives = 3;
        },
        checkGameOver: (state) => {
            return state.lives <= 0;
        },
        onRoundEnd: (state, isCorrect) => {
            if (!isCorrect) {
                state.lives--;
            }
        }
    },
    
    duel: {
        init: (state) => {
            state.globalTimerMode = false;
            state.currentPlayer = 1;
        },
        checkGameOver: (state) => {
            return state.roundsPlayed >= state.difficulty.totalRounds;
        },
        onRoundEnd: (state, isCorrect) => {
            state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;
        }
    },
    
    thematic: {
        init: (state) => {
            state.globalTimerMode = false;
        },
        checkGameOver: (state) => {
            return state.roundsPlayed >= state.difficulty.totalRounds;
        },
        onRoundEnd: (state, isCorrect) => {
            // То же самое, что и классика, просто другие плейлисты
        }
    }
};
