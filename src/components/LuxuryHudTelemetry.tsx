import React from 'react';
import { Volume2, VolumeX, Terminal, Compass, Zap, Cpu } from 'lucide-react';
import { ChapterData } from '../types/cinematic';
import { audioSynth } from '../services/audioSynth';

interface LuxuryHudTelemetryProps {
  progress: number;
  currentChapter: ChapterData;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenBlueprint: () => void;
  fps: number;
}

export const LuxuryHudTelemetry: React.FC<LuxuryHudTelemetryProps> = ({
  progress,
  currentChapter,
  isMuted,
  onToggleMute,
  onOpenBlueprint,
  fps
}) => {
  // Format simulated microsecond timecode
  const totalSeconds = progress * 21.9;
  const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const secs = String(Math.floor(totalSeconds % 60)).padStart(2, '0');
  const frames = String(Math.floor((totalSeconds % 1) * 60)).padStart(2, '0');
  const micros = String(Math.floor((totalSeconds % 1) * 1000)).padStart(3, '0');

  return (
    <>
      {/* Top Telemetry Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between pointer-events-auto backdrop-blur-md bg-[#030308]/40 border-b border-white/5">
        {/* Left: Brand & Identity */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg bg-cyan-950/40 border border-cyan-500/30">
            <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-cinzel text-xs md:text-sm font-bold tracking-wider text-slate-100 uppercase">
                Abdul Halim bin Roslan
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                DG10
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] md:text-[11px] font-mono text-slate-400">
              <span>FROM TEACHER TO TECHNOLOGY</span>
              <span className="text-slate-600">•</span>
              <span className="hidden md:inline text-cyan-400/80">SMK AGAMA KERIAN</span>
            </div>
          </div>
        </div>

        {/* Center: Live Spatial Telemetry Readout (Desktop only) */}
        <div className="hidden lg:flex items-center space-x-6 px-4 py-1.5 rounded-full bg-[#070913]/70 border border-white/10 text-xs font-mono">
          <div className="flex items-center space-x-1.5 text-slate-400">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>GEO:</span>
            <span className="text-slate-200">{currentChapter.coordinates}</span>
          </div>
          <div className="w-px h-3 bg-white/10" />
          <div className="flex items-center space-x-1.5 text-slate-400">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>SCALE:</span>
            <span className="text-purple-300 font-bold">{currentChapter.depthScale}</span>
          </div>
          <div className="w-px h-3 bg-white/10" />
          <div className="flex items-center space-x-1.5 text-slate-400">
            <span className="text-slate-500">FPS:</span>
            <span className="text-emerald-400 font-bold">{fps || 60}</span>
          </div>
        </div>

        {/* Right: Timecode, Audio Mute Toggle & Blueprint Link */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Real-time Timecode */}
          <div className="flex items-center space-x-1 px-2.5 py-1 rounded bg-[#070913]/60 border border-white/10 font-mono text-[11px] md:text-xs">
            <span className="text-cyan-400 font-bold">{mins}:{secs}:{frames}</span>
            <span className="text-slate-600 text-[9px]">.{micros}</span>
          </div>

          {/* Audio Synthesizer Mute Toggle */}
          <button
            onClick={() => {
              onToggleMute();
              audioSynth.playClick(1500);
            }}
            title={isMuted ? "Aktifkan Audio HUD" : "Bisukan Audio HUD"}
            className={`p-2 rounded-lg border transition-all duration-200 cursor-pointer ${
              isMuted
                ? 'bg-slate-900/60 border-slate-700/50 text-slate-500 hover:text-slate-300'
                : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
          </button>

          {/* Blueprint Route Trigger */}
          <button
            onClick={() => {
              audioSynth.playClick(1800);
              onOpenBlueprint();
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all font-mono text-xs cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PROMPT BLUEPRINT</span>
          </button>
        </div>
      </header>

      {/* Persistent Left HUD Chapter Tracker Bar */}
      <div className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col space-y-4 pointer-events-none">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-cyan-500/50" />
          <div className="font-mono text-[10px] text-cyan-400 tracking-widest -rotate-90 uppercase">
            CHAPTER {currentChapter.chapterNumber}
          </div>
          <div className="w-px h-12 bg-gradient-to-t from-transparent to-cyan-500/50" />
        </div>
      </div>

      {/* Persistent Right HUD Progress Bar Indicator */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center space-y-2 pointer-events-none">
        <div className="font-mono text-[10px] text-slate-400 font-bold">
          {Math.round(progress * 100)}%
        </div>
        <div className="w-1 h-28 bg-white/10 rounded-full overflow-hidden relative">
          <div 
            className="w-full bg-gradient-to-b from-cyan-400 via-purple-500 to-amber-400 transition-all duration-75 rounded-full"
            style={{ height: `${progress * 100}%` }}
          />
        </div>
        <div className="font-mono text-[8px] text-slate-500 tracking-widest">
          SYNC
        </div>
      </div>
    </>
  );
};
