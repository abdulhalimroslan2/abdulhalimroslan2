import React, { useState } from 'react';
import { X, Copy, Check, Terminal, FileCode, Film, Cpu, Sparkles } from 'lucide-react';
import { audioSynth } from '../services/audioSynth';

interface BlueprintPromptRouteProps {
  onClose: () => void;
}

export const BlueprintPromptRoute: React.FC<BlueprintPromptRouteProps> = ({ onClose }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    audioSynth.playClick(1700);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const PROMPT_0 = `You're the sole creative director and senior frontend author for a premium interactive portfolio.
Give me creative ideas (videos) for a scroll-driven commercial landing page.
The video must involve a single, continuous extreme macro camera journey connecting a teacher to digital technology and student impact.`;

  const PROMPT_1 = `Konsep Video — “From Teacher to Technology”

Video ini ialah satu perjalanan kamera ekstrem-makro yang berterusan tanpa sebarang cut, bermula daripada wajah Cikgu Halim yang tersenyum yakin ketika mengajar.
Kamera bergerak semakin dekat sehingga masuk ke hujung stylus, kemudian menyelami dunia mikroskopik di dalam digitizer tablet.

Perjalanan seterusnya mengikuti:
Cikgu Halim → Stylus → Digitizer → Pixel & electrical signal → Ribbon cable → Processor → Binary 0 & 1 → Processed data → Wi-Fi module → Electromagnetic transmission → Projector receiver → Main circuit board → Optical engine → Projector lens → Projected light → Mata pelajar → Retina

Mood: premium, cinematic, futuristic, intelligent, inspirational, technologically sophisticated.
Feel: seperti sebuah Apple-level technology film bertemakan pendidikan, tetapi berpusat pada guru dan impak pengajaran terhadap pelajar.`;

  const FFMPEG_CMD = `# FFMPEG Keyframe-4 60FPS Optimization Standard
ffmpeg -i input.mp4 -an -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -g 4 -keyint_min 4 -sc_threshold 0 -movflags +faststart public/media/from_teacher_to_technology_desktop.mp4

# Dedicated 38MB Mobile 9:16 Stream Command
ffmpeg -i input.mp4 -an -c:v libx264 -preset medium -crf 22 -vf "scale=1280*16/9:1280,crop=720:1280" -pix_fmt yuv420p -g 4 -keyint_min 4 -sc_threshold 0 -movflags +faststart public/media/from_teacher_to_technology_mobile.mp4`;

  const PROMPT_2 = `VIDEO_FILENAME: from_teacher_to_technology_desktop.mp4 & from_teacher_to_technology_mobile.mp4
CONCEPT: FROM TEACHER TO TECHNOLOGY (Abdul Halim bin Roslan - Anugerah Pencipta Kandungan Digital)

STACK:
- React 19 + TypeScript + Vite
- Tailwind CSS v4 (@tailwindcss/vite)
- GSAP with ScrollTrigger 60fps hardware scrubbing
- Dual Mode (Manual Scroll & Auto Tour Player with speed 1x/1.5x/2x)
- Web Audio Procedural Synthesizer
- Luxury Editorial HUD Telemetry & Biometric Hold Climax Action`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#030308]/90 backdrop-blur-2xl overflow-y-auto animate-fade-in pointer-events-auto">
      <div className="relative w-full max-w-4xl rounded-3xl glass-panel-glow p-6 sm:p-10 border border-cyan-500/30 my-8 shadow-[0_0_80px_rgba(0,240,255,0.15)]">
        
        {/* Close Button */}
        <button
          onClick={() => {
            audioSynth.playClick(900);
            onClose();
          }}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
              RECONSTRUCTION BLUEPRINT
            </h2>
            <p className="font-mono text-xs text-cyan-300">
              Master Prompts & FFMPEG Keyframe-4 Engine Architecture
            </p>
          </div>
        </div>

        {/* 4 Prompt Code Blocks */}
        <div className="space-y-6 font-mono text-xs">
          
          {/* Prompt 0 */}
          <div className="p-5 rounded-2xl bg-[#060814] border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>PROMPT 0: Concept Ideation</span>
              </div>
              <button
                onClick={() => copyToClipboard('p0', PROMPT_0)}
                className="flex items-center space-x-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-300 transition cursor-pointer"
              >
                {copiedId === 'p0' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'p0' ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
            <pre className="text-slate-300 whitespace-pre-wrap font-mono text-[11px] leading-relaxed bg-black/40 p-3 rounded-xl">
              {PROMPT_0}
            </pre>
          </div>

          {/* Prompt 1 */}
          <div className="p-5 rounded-2xl bg-[#060814] border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-purple-400 font-bold">
                <Film className="w-4 h-4" />
                <span>PROMPT 1: Macro Video Storyboard & AIGC Narrative</span>
              </div>
              <button
                onClick={() => copyToClipboard('p1', PROMPT_1)}
                className="flex items-center space-x-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-purple-300 transition cursor-pointer"
              >
                {copiedId === 'p1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'p1' ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
            <pre className="text-slate-300 whitespace-pre-wrap font-mono text-[11px] leading-relaxed bg-black/40 p-3 rounded-xl">
              {PROMPT_1}
            </pre>
          </div>

          {/* FFMPEG Command */}
          <div className="p-5 rounded-2xl bg-[#060814] border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                <Cpu className="w-4 h-4" />
                <span>FFMPEG 60FPS KEYFRAME-4 COMPILATION ENGINE</span>
              </div>
              <button
                onClick={() => copyToClipboard('ffmpeg', FFMPEG_CMD)}
                className="flex items-center space-x-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-emerald-300 transition cursor-pointer"
              >
                {copiedId === 'ffmpeg' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'ffmpeg' ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
            <pre className="text-emerald-300 whitespace-pre-wrap font-mono text-[11px] leading-relaxed bg-black/40 p-3 rounded-xl">
              {FFMPEG_CMD}
            </pre>
          </div>

          {/* Prompt 2 */}
          <div className="p-5 rounded-2xl bg-[#060814] border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold">
                <FileCode className="w-4 h-4" />
                <span>PROMPT 2: Full Site Construction Stack</span>
              </div>
              <button
                onClick={() => copyToClipboard('p2', PROMPT_2)}
                className="flex items-center space-x-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-amber-300 transition cursor-pointer"
              >
                {copiedId === 'p2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'p2' ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
            <pre className="text-slate-300 whitespace-pre-wrap font-mono text-[11px] leading-relaxed bg-black/40 p-3 rounded-xl">
              {PROMPT_2}
            </pre>
          </div>

        </div>

      </div>
    </div>
  );
};
