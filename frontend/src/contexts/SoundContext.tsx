import React, { createContext, useContext, useRef, useState } from 'react';

interface SoundContextType {
  playButtonClick: () => void;
  playSuccess: () => void;
  playError: () => void;
  playCoin: () => void;
  playLevel: () => void;
  isMuted: boolean;
  setMuted: (muted: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const useSounds = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSounds must be used within a SoundProvider');
  }
  return context;
};

interface SoundProviderProps {
  children: React.ReactNode;
}

export const SoundProvider: React.FC<SoundProviderProps> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const playTone = (frequency: number, duration: number, type: OscillatorType = 'square') => {
    if (isMuted) return;

    try {
      const audioContext = getAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(volume * 0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  };

  const playButtonClick = () => playTone(800, 0.1);
  
  const playSuccess = () => {
    playTone(523.25, 0.15); // C5
    setTimeout(() => playTone(659.25, 0.15), 100); // E5
    setTimeout(() => playTone(783.99, 0.2), 200); // G5
  };
  
  const playError = () => {
    playTone(207.65, 0.3); // G#3
    setTimeout(() => playTone(185, 0.3), 150); // F#3
  };
  
  const playCoin = () => {
    playTone(659.25, 0.1); // E5
    setTimeout(() => playTone(783.99, 0.1), 100); // G5
    setTimeout(() => playTone(1046.5, 0.15), 200); // C6
  };

  const playLevel = () => {
    const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5]; // C major scale
    notes.forEach((note, index) => {
      setTimeout(() => playTone(note, 0.2), index * 100);
    });
  };

  const setMuted = (muted: boolean) => {
    setIsMuted(muted);
  };

  const contextValue: SoundContextType = {
    playButtonClick,
    playSuccess,
    playError,
    playCoin,
    playLevel,
    isMuted,
    setMuted,
    volume,
    setVolume
  };

  return (
    <SoundContext.Provider value={contextValue}>
      {children}
    </SoundContext.Provider>
  );
};
