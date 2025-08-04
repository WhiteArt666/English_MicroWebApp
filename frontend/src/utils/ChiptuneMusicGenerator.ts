export class ChiptuneMusicGenerator {
  private audioContext: AudioContext | null = null;
  private isPlaying = false;
  private currentGainNode: GainNode | null = null;
  private stopRequested = false;

  constructor() {
    this.initAudioContext();
  }

  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  private createTone(frequency: number, duration: number, type: OscillatorType = 'square', volume = 0.1) {
    if (!this.audioContext || this.stopRequested) return Promise.resolve();

    return new Promise<void>((resolve) => {
      const oscillator = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext!.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0, this.audioContext!.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, this.audioContext!.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext!.currentTime + duration);

      this.currentGainNode = gainNode;

      oscillator.start(this.audioContext!.currentTime);
      oscillator.stop(this.audioContext!.currentTime + duration);

      oscillator.onended = () => resolve();
    });
  }

  private async playMelody(notes: { frequency: number; duration: number; type?: OscillatorType }[], volume = 0.05) {
    if (this.stopRequested) return;

    for (const note of notes) {
      if (this.stopRequested) break;
      await this.createTone(note.frequency, note.duration, note.type || 'square', volume);
      await new Promise(resolve => setTimeout(resolve, note.duration * 1000 * 0.1)); // Small gap between notes
    }
  }

  public async playAdventureTheme() {
    if (!this.audioContext || this.isPlaying) return;

    this.isPlaying = true;
    this.stopRequested = false;

    // More elaborate adventure-style melody with variations
    const melodyA = [
      { frequency: 523.25, duration: 0.4 }, // C5
      { frequency: 659.25, duration: 0.4 }, // E5
      { frequency: 783.99, duration: 0.4 }, // G5
      { frequency: 1046.5, duration: 0.6 }, // C6
      { frequency: 783.99, duration: 0.3 }, // G5
      { frequency: 659.25, duration: 0.3 }, // E5
      { frequency: 698.46, duration: 0.5 }, // F5
      { frequency: 587.33, duration: 0.4 }, // D5
      { frequency: 523.25, duration: 0.8 }, // C5
    ];

    const melodyB = [
      { frequency: 587.33, duration: 0.4 }, // D5
      { frequency: 698.46, duration: 0.4 }, // F5
      { frequency: 880.00, duration: 0.4 }, // A5
      { frequency: 1174.7, duration: 0.6 }, // D6
      { frequency: 880.00, duration: 0.3 }, // A5
      { frequency: 698.46, duration: 0.3 }, // F5
      { frequency: 783.99, duration: 0.5 }, // G5
      { frequency: 659.25, duration: 0.4 }, // E5
      { frequency: 587.33, duration: 0.8 }, // D5
    ];

    const bassLine = [
      { frequency: 130.81, duration: 1.2, type: 'triangle' as OscillatorType }, // C3
      { frequency: 146.83, duration: 1.2, type: 'triangle' as OscillatorType }, // D3
      { frequency: 174.61, duration: 1.2, type: 'triangle' as OscillatorType }, // F3
      { frequency: 196.00, duration: 1.2, type: 'triangle' as OscillatorType }, // G3
      { frequency: 130.81, duration: 1.6, type: 'triangle' as OscillatorType }, // C3
    ];

    try {
      // Play melody A with bass
      await Promise.all([
        this.playMelody(melodyA, 0.06),
        this.playMelody(bassLine, 0.03)
      ]);

      if (this.stopRequested) return;

      // Short pause
      await new Promise(resolve => setTimeout(resolve, 500));

      if (this.stopRequested) return;

      // Play melody B with bass
      await Promise.all([
        this.playMelody(melodyB, 0.06),
        this.playMelody(bassLine, 0.03)
      ]);

      // Loop the music with variation
      if (!this.stopRequested) {
        setTimeout(() => {
          if (!this.stopRequested) {
            this.playAdventureTheme();
          }
        }, 2000);
      }
    } catch (error) {
      console.warn('Error playing music:', error);
    } finally {
      if (this.stopRequested) {
        this.isPlaying = false;
      }
    }
  }

  public stop() {
    this.stopRequested = true;
    this.isPlaying = false;
    if (this.currentGainNode) {
      try {
        this.currentGainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext!.currentTime + 0.1);
      } catch (error) {
        console.warn('Error stopping music:', error);
      }
    }
  }

  public isCurrentlyPlaying() {
    return this.isPlaying;
  }
}
