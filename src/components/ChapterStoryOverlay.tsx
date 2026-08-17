import React, { useState } from 'react';
import { 
  Sparkles, 
  GraduationCap, 
  Award, 
  Layers, 
  BookOpen, 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Radio, 
  Eye,
  ChevronRight,
  Fingerprint
} from 'lucide-react';
import { 
  CANDIDATE_PROFILE, 
  ACADEMIC_BACKGROUND, 
  SERVICE_RECORDS, 
  APP_ECOSYSTEM, 
  AWARDS, 
  EXPERT_PANELS, 
  PUBLICATIONS, 
  ANNUAL_PERFORMANCE_METRICS
} from '../constants/candidateData';
import { AppEcosystemItem } from '../types/cinematic';
import { HolographicAppModal } from './HolographicAppModal';
import { TactileClimaxAction } from './TactileClimaxAction';
import { audioSynth } from '../services/audioSynth';

interface ChapterStoryOverlayProps {
  progress: number;
}

export const ChapterStoryOverlay: React.FC<ChapterStoryOverlayProps> = ({ progress }) => {
  const [selectedApp, setSelectedApp] = useState<AppEcosystemItem | null>(null);
  const [showPortraitModal, setShowPortraitModal] = useState(false);
  const [showAwardsModal, setShowAwardsModal] = useState(false);

  // Helper to calculate smooth chapter opacity and transform based on scroll progress
  const getChapterStyle = (start: number, peakStart: number, peakEnd: number, end: number) => {
    let opacity = 0;
    let translateY = 20;

    if (progress >= start && progress < peakStart) {
      const t = (progress - start) / (peakStart - start);
      opacity = t;
      translateY = 20 * (1 - t);
    } else if (progress >= peakStart && progress <= peakEnd) {
      opacity = 1;
      translateY = 0;
    } else if (progress > peakEnd && progress <= end) {
      const t = (progress - peakEnd) / (end - peakEnd);
      opacity = 1 - t;
      translateY = -20 * t;
    }

    return {
      opacity: Math.max(0, Math.min(1, opacity)),
      transform: `translate3d(0, ${translateY.toFixed(1)}px, 0)`,
      pointerEvents: opacity > 0.3 ? ('auto' as const) : ('none' as const),
      visibility: opacity > 0.01 ? ('visible' as const) : ('hidden' as const),
      transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    };
  };

  return (
    <div className="relative z-20 w-full min-h-screen pointer-events-none select-none">
      
      {/* ========================================================================= */}
      {/* EDITORIAL WIREFRAME HUD LINES & CROSSHAIRS (IMG_4667 AESTHETIC)           */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none z-10 hidden md:block">
        {/* Left Vertical Coordinate Guide */}
        <div className="absolute left-8 lg:left-16 top-24 bottom-24 w-[1px] bg-white/10">
          <div className="absolute -top-1 -left-[3px] text-cyan-400/60 font-mono text-[9px]">+</div>
          <div className="absolute top-1/4 -left-[3px] text-white/30 font-mono text-[9px]">+</div>
          <div className="absolute top-2/4 -left-[3px] text-white/30 font-mono text-[9px]">+</div>
          <div className="absolute top-3/4 -left-[3px] text-white/30 font-mono text-[9px]">+</div>
          <div className="absolute -bottom-1 -left-[3px] text-cyan-400/60 font-mono text-[9px]">+</div>
          
          {/* Subtle Vertical Coordinate Label */}
          <div className="absolute top-12 -left-6 rotate-90 origin-left text-[9px] font-mono tracking-widest text-slate-500 uppercase">
            5.1687° N // 100.4855° E
          </div>
        </div>

        {/* Right Vertical Coordinate Guide */}
        <div className="absolute right-8 lg:right-16 top-24 bottom-24 w-[1px] bg-white/10">
          <div className="absolute -top-1 -left-[3px] text-cyan-400/60 font-mono text-[9px]">+</div>
          <div className="absolute -bottom-1 -left-[3px] text-cyan-400/60 font-mono text-[9px]">+</div>
          <div className="absolute bottom-12 -right-2 rotate-90 origin-right text-[9px] font-mono tracking-widest text-slate-500 uppercase">
            60 FPS // KEYFRAME-4
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CHAPTER 01: THE INITIATION (0.00 - 0.20)                                  */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.00, 0.02, 0.16, 0.22)}
        className="fixed inset-0 flex items-center justify-start px-6 sm:px-12 lg:px-24"
      >
        <div className="max-w-2xl bg-[#030308]/40 backdrop-blur-xl p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          {/* Category Micro-Pill */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>01 // THE INITIATION</span>
          </div>

          {/* Monumental Editorial Headline */}
          <h1 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-3">
            From Teacher <br />
            <span className="font-cormorant italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-indigo-300">
              to Technology.
            </span>
          </h1>

          {/* Concise Editorial Subtitle */}
          <p className="text-slate-300 font-outfit text-sm sm:text-base leading-relaxed mb-6">
            Satu gerakan kecil daripada seorang pendidik, mengalir melalui litar digital sebelum menjadi pengetahuan yang mencelikkan minda generasi masa hadapan.
          </p>

          {/* Minimalist Profile Strip */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center space-x-3.5">
              <div 
                className="relative w-12 h-12 rounded-xl overflow-hidden border border-cyan-400/50 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:scale-105 transition-transform"
                onClick={() => {
                  audioSynth.playClick(1200);
                  setShowPortraitModal(true);
                }}
              >
                <img src="/media/halim_portrait.png" alt={CANDIDATE_PROFILE.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-playfair text-base font-bold text-white">{CANDIDATE_PROFILE.name}</h3>
                <p className="text-xs font-mono text-cyan-300">{CANDIDATE_PROFILE.grade} • {CANDIDATE_PROFILE.school}</p>
              </div>
            </div>

            <button
              onClick={() => {
                audioSynth.playClick(1200);
                setShowPortraitModal(true);
              }}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono transition-all"
            >
              <span>Profil</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 02: THE QUANTUM TRANSIT (0.20 - 0.40)                             */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.18, 0.23, 0.36, 0.42)}
        className="fixed inset-0 flex items-center justify-end px-6 sm:px-12 lg:px-24"
      >
        <div className="max-w-xl bg-[#030308]/40 backdrop-blur-xl p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          {/* Category Micro-Pill */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            <span>02 // QUANTUM TRANSIT</span>
          </div>

          {/* Monumental Editorial Headline */}
          <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-3">
            Aliran Isyarat. <br />
            <span className="font-cormorant italic font-normal text-rose-300">
              16 Tahun Dedikasi.
            </span>
          </h2>

          {/* Concise Editorial Subtitle */}
          <p className="text-slate-300 font-outfit text-sm sm:text-base leading-relaxed mb-6">
            Dari bilik darjah SMK Agama Yan hingga SMK Agama Kerian, dedikasi diterjemahkan kepada isyarat elektrik dan saluran data yang memartabatkan pendidikan digital.
          </p>

          {/* 3 Streamlined Metric Pills */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-lg sm:text-xl font-bold font-mono text-white">16 Thn</div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Khidmat</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-rose-500/20 text-center">
              <div className="text-lg sm:text-xl font-bold font-mono text-rose-300">96.79%</div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">SKPMg2</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-lg sm:text-xl font-bold font-mono text-white">APC 2021</div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Kecemerlangan</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 03: THE COMPUTATIONAL CORE (0.40 - 0.60)                          */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.38, 0.43, 0.56, 0.62)}
        className="fixed inset-0 flex items-center justify-start px-6 sm:px-12 lg:px-24"
      >
        <div className="max-w-2xl bg-[#030308]/40 backdrop-blur-xl p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          {/* Category Micro-Pill */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span>03 // COMPUTATIONAL CORE</span>
          </div>

          {/* Monumental Editorial Headline */}
          <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-3">
            Enjin Inovasi. <br />
            <span className="font-cormorant italic font-normal text-purple-300">
              Ekosistem 6 Aplikasi.
            </span>
          </h2>

          {/* Concise Editorial Subtitle */}
          <p className="text-slate-300 font-outfit text-sm sm:text-base leading-relaxed mb-6">
            Logik perduaan 0 & 1 diproses menjadi penyelesaian digital menyeluruh: Pengurusan RPH Pintar, CIDS Suites Pro, Sahsiah Murid & Modul STEM Interaktif.
          </p>

          {/* Apps Preview Mini Grid & Action Button */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {APP_ECOSYSTEM.slice(0, 3).map((app) => (
                <div 
                  key={app.id} 
                  onClick={() => {
                    audioSynth.playClick(1000);
                    setSelectedApp(app);
                  }}
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-500/40 cursor-pointer transition-all"
                >
                  <div className="text-xs font-mono font-bold text-white truncate">{app.name}</div>
                  <div className="text-[10px] text-purple-300/80 font-mono truncate">{app.category}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                audioSynth.playClick(1000);
                setSelectedApp(APP_ECOSYSTEM[0]);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all"
            >
              <span>Terokai 6 Aplikasi Digital</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 04: THE WAVE PROPAGATION (0.60 - 0.80)                            */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.58, 0.63, 0.76, 0.82)}
        className="fixed inset-0 flex items-center justify-end px-6 sm:px-12 lg:px-24"
      >
        <div className="max-w-xl bg-[#030308]/40 backdrop-blur-xl p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          {/* Category Micro-Pill */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>04 // WAVE PROPAGATION</span>
          </div>

          {/* Monumental Editorial Headline */}
          <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-3">
            Pancaran Gelombang. <br />
            <span className="font-cormorant italic font-normal text-blue-300">
              Impak Global & Kepakaran.
            </span>
          </h2>

          {/* Concise Editorial Subtitle */}
          <p className="text-slate-300 font-outfit text-sm sm:text-base leading-relaxed mb-6">
            Pancaran gelombang RF dan optik mencerminkan pencapaian Pingat Emas Kebangsaan & Antarabangsa serta khidmat sebagai Panel Penilai Inovasi STEM.
          </p>

          {/* Streamlined Honors Badges */}
          <div className="space-y-2.5 mb-5">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-blue-500/20">
              <div className="flex items-center space-x-2.5">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-outfit text-slate-200">Pingat Emas e-NIIEX 2021 & AI-Driven STEM</span>
              </div>
              <span className="text-[10px] font-mono text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30 font-bold">EMAS</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-xs font-outfit text-slate-200">Panel Penilai STEM & Inovasi Negeri Perak</span>
              </div>
              <span className="text-[10px] font-mono text-blue-300 font-bold">PANEL</span>
            </div>
          </div>

          <button
            onClick={() => {
              audioSynth.playClick(1100);
              setShowAwardsModal(true);
            }}
            className="w-full py-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold uppercase flex items-center justify-center space-x-1.5 transition-all"
          >
            <span>Senarai Lengkap Pengiktirafan</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 05: THE APEX RETINA & LEGACY (0.80 - 1.00)                        */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.78, 0.83, 0.99, 1.00)}
        className="fixed inset-0 flex flex-col items-center justify-center px-6 sm:px-12 text-center"
      >
        <div className="max-w-2xl bg-[#030308]/50 backdrop-blur-2xl p-8 sm:p-12 rounded-3xl border border-amber-500/30 shadow-[0_0_50px_rgba(212,175,55,0.15)]">
          {/* Category Micro-Pill */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>05 // THE APEX RETINA</span>
          </div>

          {/* Monumental Editorial Headline */}
          <h2 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-3">
            Menerangi Minda. <br />
            <span className="font-cormorant italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
              Melakar Masa Depan.
            </span>
          </h2>

          {/* Concise Editorial Subtitle */}
          <p className="text-slate-300 font-outfit text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
            Kitaran lengkap tercapai: Sentuhan ikhlas seorang guru, diperkasa oleh keupayaan teknologi, menerangi potensi tanpa batas generasi akan datang.
          </p>

          {/* Tactile Biometric Action Seal */}
          <div className="pt-2">
            <TactileClimaxAction />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MODALS & DRAWERS                                                          */}
      {/* ========================================================================= */}
      
      {/* Holographic 6-App Modal */}
      {selectedApp && (
        <HolographicAppModal app={selectedApp} onClose={() => setSelectedApp(null)} />
      )}

      {/* Candidate Portrait & Full Bio Modal */}
      {showPortraitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl pointer-events-auto animate-fade-in">
          <div className="relative max-w-lg w-full bg-[#070913] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button 
              onClick={() => setShowPortraitModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 text-xs font-mono"
            >
              ✕ TUTUP
            </button>

            <div className="flex items-center space-x-4 mb-6">
              <img 
                src="/media/halim_portrait.png" 
                alt={CANDIDATE_PROFILE.name} 
                className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              />
              <div>
                <h3 className="font-playfair text-xl font-bold text-white">{CANDIDATE_PROFILE.name}</h3>
                <p className="text-xs font-mono text-cyan-300">{CANDIDATE_PROFILE.grade}</p>
                <p className="text-xs font-mono text-slate-400">{CANDIDATE_PROFILE.school}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300 font-outfit leading-relaxed border-t border-white/10 pt-4">
              <p>
                <strong className="text-white font-mono">Falsafah:</strong> {CANDIDATE_PROFILE.corePhilosophy}
              </p>
              <p>
                <strong className="text-white font-mono">Prinsip Aliran:</strong> {CANDIDATE_PROFILE.quote}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setShowPortraitModal(false)}
                className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-mono font-bold text-xs hover:bg-cyan-400 transition-colors"
              >
                TUTUP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Awards & Panel List Modal */}
      {showAwardsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl pointer-events-auto animate-fade-in">
          <div className="relative max-w-xl w-full max-h-[85vh] overflow-y-auto bg-[#070913] border border-blue-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button 
              onClick={() => setShowAwardsModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 text-xs font-mono"
            >
              ✕ TUTUP
            </button>

            <h3 className="font-playfair text-2xl font-bold text-white mb-2">Pengiktirafan & Kepakaran</h3>
            <p className="text-xs font-mono text-blue-300 mb-6">Pencapaian Inovasi, Panel STEM & Penerbitan Pendidikan</p>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-mono text-amber-300 font-bold uppercase mb-2">Anugerah & Pingat Emas</h4>
                <div className="space-y-2">
                  {AWARDS.map((aw, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">{aw.title}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{aw.organization} • {aw.year}</div>
                      </div>
                      <span className="text-[10px] font-mono text-amber-400 font-bold">{aw.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono text-blue-300 font-bold uppercase mb-2">Panel Penilai & Kepakaran</h4>
                <div className="space-y-2">
                  {EXPERT_PANELS.map((exp, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                      <div className="text-xs font-bold text-white">{exp.role}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{exp.body} • {exp.period}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setShowAwardsModal(false)}
                className="px-5 py-2 rounded-xl bg-blue-500 text-slate-950 font-mono font-bold text-xs hover:bg-blue-400 transition-colors"
              >
                TUTUP
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
