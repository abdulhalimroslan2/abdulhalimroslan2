import React from 'react';
import { X, ExternalLink, Sparkles, CheckCircle2, Layers, Cpu, Award } from 'lucide-react';
import { AppEcosystemItem } from '../types/cinematic';
import { audioSynth } from '../services/audioSynth';

interface HolographicAppModalProps {
  app: AppEcosystemItem | null;
  onClose: () => void;
}

export const HolographicAppModal: React.FC<HolographicAppModalProps> = ({ app, onClose }) => {
  if (!app) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#030308]/80 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel-glow p-6 sm:p-8 border border-cyan-500/30 shadow-[0_0_60px_rgba(0,240,255,0.15)] max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => {
            audioSynth.playClick(900);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>{app.category}</span>
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/50 border border-emerald-500/30 text-emerald-400">
            {app.status}
          </span>
        </div>

        {/* App Title & Tagline */}
        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
          {app.name}
        </h2>
        <p className="text-sm font-space text-cyan-300/90 mt-1 mb-4">
          {app.tagline}
        </p>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6 font-outfit">
          {app.description}
        </p>

        {/* Key Features */}
        <div className="mb-6">
          <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-3 flex items-center space-x-2">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ciri-ciri Utama Inovasi</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {app.features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-200"
              >
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Metric & Tech Stack */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
          <div className="p-3 rounded-2xl bg-cyan-950/20 border border-cyan-500/20">
            <div className="flex items-center space-x-1.5 text-xs font-mono text-cyan-400 mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>IMPAK PENDIDIKAN</span>
            </div>
            <div className="text-sm font-bold text-white font-outfit">
              {app.impactMetric}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-purple-950/20 border border-purple-500/20">
            <div className="flex items-center space-x-1.5 text-xs font-mono text-purple-400 mb-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>TEKNOLOGI / ENJIN</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {app.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 text-purple-200 border border-purple-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
