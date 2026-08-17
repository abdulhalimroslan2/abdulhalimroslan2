import React, { useState, useRef, useEffect } from 'react';
import { Award, Sparkles, CheckCircle2, ShieldCheck, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioSynth } from '../services/audioSynth';

interface TactileClimaxActionProps {
  onUnlockComplete?: () => void;
}

export const TactileClimaxAction: React.FC<TactileClimaxActionProps> = ({ onUnlockComplete }) => {
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const holdIntervalRef = useRef<number | null>(null);

  const HOLD_DURATION_MS = 1800; // 1.8 seconds hold to unlock

  const startHold = () => {
    if (isUnlocked) return;
    setIsHolding(true);
    audioSynth.startCharge();
    const startTime = Date.now();

    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);

    holdIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProg = Math.min(1, elapsed / HOLD_DURATION_MS);
      setHoldProgress(currentProg);

      if (currentProg >= 1) {
        clearInterval(holdIntervalRef.current!);
        holdIntervalRef.current = null;
        triggerUnlock();
      }
    }, 16);
  };

  const stopHold = () => {
    if (isUnlocked) return;
    setIsHolding(false);
    audioSynth.stopCharge();
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    setHoldProgress(0);
  };

  const triggerUnlock = () => {
    setIsUnlocked(true);
    setIsHolding(false);
    audioSynth.stopCharge();
    audioSynth.playClimaxFanfare();

    // Trigger celebratory gold & cyan confetti explosion
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#00f0ff', '#d4af37', '#ffffff'] });
    fire(0.2, { spread: 60, colors: ['#ffd700', '#ff0055', '#7928ca'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#00f0ff', '#eab308'] });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ['#ffffff', '#00df8f'] });
    fire(0.1, { spread: 120, startVelocity: 45, colors: ['#d4af37', '#00f0ff'] });

    if (onUnlockComplete) onUnlockComplete();
  };

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl glass-panel-gold max-w-xl mx-auto text-center relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(212,175,55,0.15),transparent_70%] pointer-events-none" />

      {/* Crest Header Icon */}
      <div className="relative mb-4">
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border transition-all duration-500 ${
          isUnlocked 
            ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_40px_rgba(212,175,55,0.6)]' 
            : 'bg-amber-950/40 border-amber-500/30 text-amber-400'
        }`}>
          {isUnlocked ? (
            <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300 animate-bounce" />
          ) : (
            <Award className={`w-8 h-8 sm:w-10 sm:h-10 ${isHolding ? 'animate-pulse text-amber-300' : ''}`} />
          )}
        </div>

        {/* Circular SVG Progress Ring around the Icon */}
        <svg className="absolute -inset-2 w-20 h-20 sm:w-24 sm:h-24 pointer-events-none -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="44"
            className="stroke-white/10 fill-none"
            strokeWidth="3"
          />
          <circle
            cx="48"
            cy="48"
            r="44"
            className="stroke-amber-400 fill-none transition-all duration-75"
            strokeWidth="4"
            strokeDasharray={276}
            strokeDashoffset={276 - 276 * holdProgress}
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Main Title & Status */}
      <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-100 tracking-wide mb-2">
        {isUnlocked ? 'PENGIKTIRAFAN RASMI DIAKTIFKAN' : 'PENGESAHAN MAKLUMAT PENCALONAN'}
      </h3>

      <p className="text-xs sm:text-sm text-slate-300 max-w-md mb-6 font-outfit">
        {isUnlocked 
          ? 'Kredensial, ekosistem aplikasi dan rekod perkhidmatan Abdul Halim bin Roslan telah disahkan.'
          : 'Tekan dan tahan butang di bawah selama 2 saat untuk mengaktifkan pengesahan interaktif dan mengakses pautan rasmi.'}
      </p>

      {/* The Hold-to-Unlock Action Button */}
      {!isUnlocked ? (
        <button
          onMouseDown={startHold}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={startHold}
          onTouchEnd={stopHold}
          className={`relative group px-8 py-3.5 rounded-full font-mono text-xs tracking-wider uppercase font-bold transition-all duration-300 select-none cursor-pointer overflow-hidden border ${
            isHolding
              ? 'bg-amber-400 text-slate-950 border-amber-300 scale-95 shadow-[0_0_30px_rgba(212,175,55,0.8)]'
              : 'bg-gradient-to-r from-amber-500/30 to-amber-600/30 text-amber-200 border-amber-400/50 hover:border-amber-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]'
          }`}
        >
          {/* Internal Progress fill */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-75 opacity-90"
            style={{ width: `${holdProgress * 100}%` }}
          />

          <span className="relative z-10 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform" />
            <span>{isHolding ? `MENJANA PENGESAHAN ${Math.round(holdProgress * 100)}%` : 'TEKAN & TAHAN UNTUK PENGESAHAN'}</span>
          </span>
        </button>
      ) : (
        <div className="flex flex-col items-center space-y-4 animate-fade-in">
          <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>KREDENSIAL DISAHKAN BERJAYA</span>
          </div>

          {/* QR Code Presentation */}
          <div className="p-3 rounded-2xl bg-white p-2 shadow-2xl border border-amber-300/40 mt-2">
            <img 
              src="/media/qr_code.png" 
              alt="QR Code Pencalonan"
              className="w-36 h-36 object-contain"
              onError={(e) => {
                // Fallback QR code icon if image loading fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <div className="font-mono text-[11px] text-amber-300/90 tracking-wide">
            Imbas kod QR di atas untuk capaian dokumen penuh portfolio.
          </div>
        </div>
      )}

    </div>
  );
};
