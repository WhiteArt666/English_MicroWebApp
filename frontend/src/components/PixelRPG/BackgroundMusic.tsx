import React, { useEffect, useRef, useState } from 'react';
import { RPGIcon } from './PixelComponents';
import { ChiptuneMusicGenerator } from '../../utils/ChiptuneMusicGenerator';

interface BackgroundMusicProps {
  autoPlay?: boolean;
  volume?: number;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ 
  autoPlay = false,
  volume = 0.3
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const musicGeneratorRef = useRef<ChiptuneMusicGenerator | null>(null);

  useEffect(() => {
    musicGeneratorRef.current = new ChiptuneMusicGenerator();

    if (autoPlay) {
      // Small delay to allow user interaction first (required for audio context)
      setTimeout(() => {
        handlePlayInternal();
      }, 1000);
    }

    return () => {
      if (musicGeneratorRef.current) {
        musicGeneratorRef.current.stop();
      }
    };
  }, [autoPlay]);

  const handlePlayInternal = async () => {
    if (!musicGeneratorRef.current) return;

    try {
      await musicGeneratorRef.current.playAdventureTheme();
      setIsPlaying(true);
    } catch (error) {
      console.warn('Could not start background music:', error);
    }
  };

  const handlePlay = async () => {
    if (!musicGeneratorRef.current) return;

    if (isPlaying) {
      musicGeneratorRef.current.stop();
      setIsPlaying(false);
    } else {
      await handlePlayInternal();
    }
  };

  const handleMute = async () => {
    if (musicGeneratorRef.current && isPlaying) {
      if (isMuted) {
        // Unmute - restart music
        musicGeneratorRef.current.stop();
        setTimeout(async () => {
          await handlePlayInternal();
        }, 100);
      } else {
        // Mute - stop music
        musicGeneratorRef.current.stop();
        setIsPlaying(false);
      }
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="background-music-controls">
      <div className="music-control-panel">
        <button 
          className="rpg-button rpg-button--small music-btn breathe" 
          onClick={handlePlay}
          title={isPlaying ? "Stop Music" : "Play Music"}
        >
          <RPGIcon iconId={isPlaying ? "fa200" : "fa201"} size={16} />
        </button>
        
        <button 
          className="rpg-button rpg-button--small music-btn" 
          onClick={handleMute}
          title={isMuted ? "Unmute" : "Mute"}
        >
          <RPGIcon iconId={isMuted ? "fa202" : "fa203"} size={16} />
        </button>
      </div>
    </div>
  );
};

// Simple background music using Web Audio API for pixel-style sounds
export const PixelSoundEngine = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const playSound = (frequency: number, duration: number, type: OscillatorType = 'square') => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  };

  const playButtonClick = () => playSound(800, 0.1);
  const playSuccess = () => playSound(523.25, 0.2); // C5
  const playError = () => playSound(207.65, 0.3); // G#3
  const playCoin = () => {
    playSound(659.25, 0.1); // E5
    setTimeout(() => playSound(783.99, 0.1), 100); // G5
  };

  return {
    playButtonClick,
    playSuccess,
    playError,
    playCoin
  };
};
