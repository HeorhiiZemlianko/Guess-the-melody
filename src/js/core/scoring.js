import { state } from '../state.js';

export function getStreakMultiplier(streak) {
    if (streak >= 10) return 3;
    if (streak >= 5)  return 2;
    if (streak >= 3)  return 1.5;
    return 1;
}

export function calculatePoints(isCorrect, timeLeft, duration, currentStreak) {
    if (!isCorrect) return -50;
    const base = 100;
    const speedBonus = Math.round(Math.max(0, Math.min(1, timeLeft / duration)) * 100);
    const diffMult = state.difficulty.multiplier;
    const streakMult = getStreakMultiplier(currentStreak);
    return Math.round((base + speedBonus) * diffMult * streakMult);
}
