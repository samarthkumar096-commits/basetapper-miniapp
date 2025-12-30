'use client';

import { useState, useEffect } from 'react';

interface SoundEffect {
  name: string;
  audio: HTMLAudioElement | null;
}

export function useSoundEffects() {
  const [sounds, setSounds] = useState<Record<string, HTMLAudioElement>>({});
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Create sound effects using Web Audio API
    const createBeep = (frequency: number, duration: number) => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      return { oscillator, audioContext, duration };
    };

    // Load from localStorage
    const savedMute = localStorage.getItem('soundMuted');
    if (savedMute) {
      setIsMuted(savedMute === 'true');
    }
  }, []);

  const playTap = () => {
    if (isMuted) return;
    const { oscillator, audioContext, duration } = createBeep(800, 0.1);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  };

  const playLevelUp = () => {
    if (isMuted) return;
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Play ascending notes
    [523, 659, 784, 1047].forEach((freq, i) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = freq;
      oscillator.type = 'sine';
      
      const startTime = audioContext.currentTime + (i * 0.1);
      gainNode.gain.setValueAtTime(0.2, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.2);
    });
  };

  const playAchievement = () => {
    if (isMuted) return;
    const { oscillator, audioContext, duration } = createBeep(1200, 0.3);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  };

  const playCoin = () => {
    if (isMuted) return;
    const { oscillator, audioContext, duration } = createBeep(1000, 0.05);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  };

  const playError = () => {
    if (isMuted) return;
    const { oscillator, audioContext, duration } = createBeep(200, 0.2);
    oscillator.type = 'sawtooth';
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem('soundMuted', String(newMuted));
  };

  return {
    playTap,
    playLevelUp,
    playAchievement,
    playCoin,
    playError,
    isMuted,
    toggleMute,
  };
}

export function SoundToggle() {
  const { isMuted, toggleMute } = useSoundEffects();

  return (
    <button
      onClick={toggleMute}
      className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition"
      title={isMuted ? 'Unmute' : 'Mute'}
    >
      <span className="text-2xl">{isMuted ? '🔇' : '🔊'}</span>
    </button>
  );
}
