import React from 'react';
import { Play, Pause, FastForward, RotateCcw, Compass, MousePointer } from 'lucide-react';
import { ChapterData } from '../types/cinematic';
import { audioSynth } from '../services/audioSynth';

interface AutoTourPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  speed: number;
  onChangeSpeed: (newSpeed: number) => void;
  progress: number;
  onSeek: (newProgress: number) => void;
  chapters: ChapterData[];
  currentChapterId: number;
  onJumpChapter: (chapterId: number) => void;
  isAutoMode: boolean;
  onToggleMode: () => void;
}

export const AutoTourPlayer: React.FC<AutoTourPlayerProps> = ({
  isPlaying,
  onTogglePlay,
  speed,
  onChangeSpeed,
  progress,
  onSeek,
  chapters,
  currentChapterId,
  onJumpChapter,
  isAutoMode,
  onToggleMode
}) => {
  const speeds = [1.0, 1.5, 2.0];

  const handleNextSpeed = () => {
    const nextIdx = (speeds.indexOf(speed) + 1) % speeds.length;
    onChangeSpeed(speeds[nextIdx]);
    audioSynth.playClick(1400);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl pointer-events-auto">
      <div className="glass-panel rounded-2xl p-2.5 sm:p-3 shadow-2xl border border-white/10 flex flex-col space-y-2 backdrop-blur-xl">
        
        {/* Scrubber Progress Track with Chapter Markers */}
        <div className="relative w-full px-1 flex items-center group">
          <input
            type="range"
            min="0"
            max="1"
            step="0.001"
            value={progress}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              onSeek(val);
            }}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none relative z-10"
          />
          
          {/* Chapter Tick Marks */}
          <div className="absolute inset-x-1 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-0 px-0.5">
            {chapters.map((ch) => {
              const leftPercent = ch.timeRange[0] * 100;
              const isActive = currentChapterId === ch.id;
              return (
                <div
                  key={ch.id}
                  className="absolute -translate-x-1/2 flex flex-col items-center"
                  style={{ left: `${leftPercent}%` }}
                >
                  <div
                    className={`w-1.5 h-3 rounded-full transition-all ${
                      isActive ? 'bg-cyan-400 shadow-[0_0_8px_#00f0ff]' : 'bg-slate-700'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Control Bar: Dual Mode Switch, Controls, Speed & Chapter Jumps */}
        <div className="flex items-center justify-between pt-1">
          {/* Left: Dual Mode Toggle Button */}
          <button
            onClick={() => {
              onToggleMode();
              audioSynth.playClick(1200);
            }}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              isAutoMode
                ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                : 'bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            {isAutoMode ? (
              <>
                <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span>AUTO TOUR</span>
              </>
            ) : (
              <>
                <MousePointer className="w-3.5 h-3.5 text-slate-400" />
                <span>MANUAL SCROLL</span>
              </>
            )}
          </button>

          {/* Center: Play/Pause, Rewind, Speed Button */}
          <div className="flex items-center space-x-2">
            {/* Rewind to Genesis */}
            <button
              onClick={() => {
                onSeek(0);
                audioSynth.playClick(1000);
              }}
              title="Kembali ke Permulaan"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Play / Pause Master Toggle */}
            <button
              onClick={() => {
                onTogglePlay();
                audioSynth.playClick(1600);
              }}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold flex items-center space-x-1.5 transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span className="text-xs font-mono">PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                  <span className="text-xs font-mono">PLAY TOUR</span>
                </>
              )}
            </button>

            {/* Speed Rate Switcher */}
            <button
              onClick={handleNextSpeed}
              title="Tukar Kelajuan Putaran"
              className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-mono text-xs cursor-pointer"
            >
              <FastForward className="w-3 h-3 text-cyan-400" />
              <span>{speed}x</span>
            </button>
          </div>

          {/* Right: Quick Chapter Jump Buttons */}
          <div className="flex items-center space-x-1">
            {chapters.map((ch) => {
              const isCurrent = currentChapterId === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    onJumpChapter(ch.id);
                    audioSynth.playChapterWarp(ch.id);
                  }}
                  title={`Bab ${ch.chapterNumber}: ${ch.title}`}
                  className={`w-6 h-6 rounded-md font-mono text-[10px] flex items-center justify-center transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_#00f0ff]'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200 border border-white/5'
                  }`}
                >
                  {ch.chapterNumber}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
