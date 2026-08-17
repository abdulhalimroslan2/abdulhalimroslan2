/**
 * Procedural Web Audio Synthesizer for Luxury Cinematic HUD Telemetry
 */
class AudioSynthService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private chargeOsc: OscillatorNode | null = null;
  private chargeGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopDrone();
    } else {
      this.startDrone();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Subtle ambient sub-bass drone that breathes with cinematic depth
   */
  public startDrone() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || this.droneOsc) return;

    try {
      this.droneOsc = this.ctx.createOscillator();
      this.droneGain = this.ctx.createGain();

      this.droneOsc.type = 'sine';
      this.droneOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note 55Hz

      this.droneGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.droneGain.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 3);

      this.droneOsc.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);
      this.droneOsc.start();
    } catch {
      // Audio safety fallback
    }
  }

  public stopDrone() {
    if (this.droneOsc && this.droneGain && this.ctx) {
      try {
        this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          this.droneOsc?.stop();
          this.droneOsc?.disconnect();
          this.droneOsc = null;
        }, 500);
      } catch {
        this.droneOsc = null;
      }
    }
  }

  /**
   * Modulate drone frequency based on optical depth and scroll velocity
   */
  public updateDroneDepth(progress: number) {
    if (this.isMuted || !this.droneOsc || !this.ctx) return;
    // Map progress 0.0 -> 1.0 to pitch range 55Hz -> 110Hz
    const targetFreq = 55 + progress * 55;
    this.droneOsc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.1);
  }

  /**
   * Sharp precision telemetry tick
   */
  public playClick(freq = 1200) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio safety fallback
    }
  }

  /**
   * Resonant chapter warp chime
   */
  public playChapterWarp(chapterId: number) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const baseFreqs = [220, 330, 440, 550, 660];
      const rootFreq = baseFreqs[chapterId - 1] || 440;

      [1, 1.5, 2].forEach((mult, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(rootFreq * mult, this.ctx.currentTime + idx * 0.05);
        osc.frequency.exponentialRampToValueAtTime(rootFreq * mult * 1.5, this.ctx.currentTime + 0.8);

        gain.gain.setValueAtTime(0.04, this.ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.9);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.05);
        osc.stop(this.ctx.currentTime + 1.0);
      });
    } catch {
      // Audio safety fallback
    }
  }

  /**
   * Biometric hold-to-unlock continuous charging sound
   */
  public startCharge() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || this.chargeOsc) return;

    try {
      this.chargeOsc = this.ctx.createOscillator();
      this.chargeGain = this.ctx.createGain();

      this.chargeOsc.type = 'sawtooth';
      this.chargeOsc.frequency.setValueAtTime(120, this.ctx.currentTime);
      this.chargeOsc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 2.0);

      this.chargeGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.chargeGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 2.0);

      this.chargeOsc.connect(this.chargeGain);
      this.chargeGain.connect(this.ctx.destination);
      this.chargeOsc.start();
    } catch {
      // Audio safety fallback
    }
  }

  public stopCharge() {
    if (this.chargeOsc && this.chargeGain && this.ctx) {
      try {
        this.chargeGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.1);
        setTimeout(() => {
          this.chargeOsc?.stop();
          this.chargeOsc?.disconnect();
          this.chargeOsc = null;
        }, 120);
      } catch {
        this.chargeOsc = null;
      }
    }
  }

  /**
   * Apex achievement golden unlock fanfare
   */
  public playClimaxFanfare() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C Major luxury chord
      chords.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.08, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + 2.6);
      });
    } catch {
      // Audio safety fallback
    }
  }
}

export const audioSynth = new AudioSynthService();
