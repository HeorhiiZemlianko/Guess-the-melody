let audioCtx = null;

// Инициализация контекста (должна происходить после первого клика пользователя)
export function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playTone(frequency, type, duration, volume = 0.1) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    
    gain.gain.setValueAtTime(volume, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

export const SFX = {
    click: () => playTone(600, 'sine', 0.1, 0.1),
    correct: () => {
        playTone(523.25, 'sine', 0.1, 0.1); // C5
        setTimeout(() => playTone(659.25, 'sine', 0.2, 0.1), 100); // E5
    },
    wrong: () => {
        playTone(150, 'sawtooth', 0.3, 0.15);
    },
    tick: () => playTone(800, 'square', 0.05, 0.05),
    hint: () => {
        playTone(880, 'sine', 0.1, 0.08);
        setTimeout(() => playTone(1108.73, 'sine', 0.15, 0.08), 80); // C#6
    },
    gameover: () => {
        playTone(440, 'sawtooth', 0.2, 0.1);
        setTimeout(() => playTone(330, 'sawtooth', 0.3, 0.1), 200);
        setTimeout(() => playTone(220, 'sawtooth', 0.4, 0.1), 400);
    }
};
