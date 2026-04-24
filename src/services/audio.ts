function withAudio(callback: (audioCtx: AudioContext) => void) {
  try {
    const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
    const audioCtx = new AudioContextCtor();
    callback(audioCtx);
  } catch {
    // Audio is optional for this experience.
  }
}

export const playRitualSound = () => {
  withAudio((audioCtx) => {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(180, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 3);
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 3);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 3);
  });
};

export const playAccessGranted = () => {
  withAudio((audioCtx) => {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    oscillator.frequency.setValueAtTime(554.37, audioCtx.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5);
  });
};

export const playTerminalClick = () => {
  withAudio((audioCtx) => {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(260, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.08);
  });
};

export const playTerminalSuccess = () => {
  withAudio((audioCtx) => {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(520, audioCtx.currentTime);
    oscillator.frequency.linearRampToValueAtTime(780, audioCtx.currentTime + 0.08);
    gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.12);
  });
};

export const playTerminalError = () => {
  withAudio((audioCtx) => {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(180, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(90, audioCtx.currentTime + 0.25);
    gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.25);
  });
};

export const playTerminalBreach = () => {
  withAudio((audioCtx) => {
    const frequencies = [320, 480, 720, 960];
    frequencies.forEach((frequency, index) => {
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'triangle';
      const start = audioCtx.currentTime + index * 0.06;
      oscillator.frequency.setValueAtTime(frequency, start);
      gainNode.gain.setValueAtTime(0.025, start);
      gainNode.gain.exponentialRampToValueAtTime(0.001, start + 0.2);
      oscillator.start(start);
      oscillator.stop(start + 0.2);
    });
  });
};
