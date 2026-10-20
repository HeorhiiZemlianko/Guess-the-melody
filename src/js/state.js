import { DIFFICULTIES, GAME_MODES } from './config.js';

export const itunesCache = new Map();
export const ITUNES_CACHE_MAX = 200;

export const state = {
    player: null,
    currentTrack: null,
    nextTrack: null, nextOptions: [],
    options: [],
    guessedSongs: 0,
    roundsPlayed: 0,
    timer: null,
    timeLeft: 60,
    running: false,
    locked: false,
    difficulty: DIFFICULTIES.easy,
    mode: GAME_MODES.classic,
    theme: 'rock',
    score: 0,
    p1Score: 0,
    p2Score: 0,
    currentPlayer: 1,
    lives: 3,
    streak: 0,
    bestStreak: 0,
    highScore: null,
    hintsUsed: new Set(),
    roundResults: [],
    globalTimerMode: false,
    cachedTracks: [],
};
