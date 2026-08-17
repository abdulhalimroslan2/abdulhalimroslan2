import React, { useState } from 'react';
import { 
  Sparkles, 
  Award, 
  ArrowUpRight, 
  ShieldCheck, 
  ChevronRight,
  Zap,
  Cpu,
  Radio,
  Eye,
  Layers,
  Binary,
  Compass,
  GraduationCap,
  BookOpen
} from 'lucide-react';
import { 
  CANDIDATE_PROFILE, 
  APP_ECOSYSTEM, 
  AWARDS, 
  EXPERT_PANELS, 
  CHAPTERS 
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
    let translateY = 18;

    if (progress >= start && progress < peakStart) {
      const t = (progress - start) / Math.max(0.001, peakStart - start);
      opacity = t;
      translateY = 18 * (1 - t);
    } else if (progress >= peakStart && progress <= peakEnd) {
      opacity = 1;
      translateY = 0;
    } else if (progress > peakEnd && progress <= end) {
      const t = (progress - peakEnd) / Math.max(0.001, end - peakEnd);
      opacity = 1 - t;
      translateY = -18 * t;
    }

    return {
      opacity: Math.max(0, Math.min(1, opacity)),
      transform: `translate3d(0, ${translateY.toFixed(1)}px, 0)`,
      pointerEvents: opacity > 0.3 ? ('auto' as const) : ('none' as const),
      visibility: opacity > 0.01 ? ('visible' as const) : ('hidden' as const),
      transition: 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
    };
  };

  return (
    <div className="relative z-20 w-full min-h-screen pointer-events-none select-none">
      
      {/* ========================================================================= */}
      {/* EDITORIAL WIREFRAME HUD LINES & CROSSHAIRS (IMG_4667 AESTHETIC)           */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none z-10 hidden md:block">
        {/* Left Vertical Coordinate Guide */}
        <div className="absolute left-8 lg:left-14 top-24 bottom-24 w-[1px] bg-white/10">
          <div className="absolute -top-1 -left-[3px] text-cyan-400/60 font-mono text-[9px]">+</div>
          <div className="absolute top-1/4 -left-[3px] text-white/30 font-mono text-[9px]">+</div>
          <div className="absolute top-2/4 -left-[3px] text-white/30 font-mono text-[9px]">+</div>
          <div className="absolute top-3/4 -left-[3px] text-white/30 font-mono text-[9px]">+</div>
          <div className="absolute -bottom-1 -left-[3px] text-cyan-400/60 font-mono text-[9px]">+</div>
          
          <div className="absolute top-12 -left-6 rotate-90 origin-left text-[9px] font-mono tracking-widest text-slate-500 uppercase">
            5.1687° N // 100.4855° E
          </div>
        </div>

        {/* Right Vertical Coordinate Guide */}
        <div className="absolute right-8 lg:right-14 top-24 bottom-24 w-[1px] bg-white/10">
          <div className="absolute -top-1 -left-[3px] text-cyan-400/60 font-mono text-[9px]">+</div>
          <div className="absolute -bottom-1 -left-[3px] text-cyan-400/60 font-mono text-[9px]">+</div>
          <div className="absolute bottom-12 -right-2 rotate-90 origin-right text-[9px] font-mono tracking-widest text-slate-500 uppercase">
            10 CHAPTERS // 60 FPS
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BAB 01: THE EDUCATOR (0.00 - 0.10)                                        */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.00, 0.00, 0.07, 0.11)}
        className="fixed inset-0 flex items-center justify-start px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-2xl bg-[#030308]/45 backdrop-blur-xl p-6 sm:p-9 rounded-3xl border border-cyan-500/30 shadow-[0_0_40px_rgba(0,240,255,0.1)]">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>01 // THE EDUCATOR</span>
          </div>

          <h1 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-2.5">
            ABDUL HALIM BIN ROSLAN
          </h1>

          <div className="flex flex-wrap items-center gap-2 mb-3.5">
            <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold">
              16 Tahun Pendidikan
            </span>
            <span className="text-xs text-slate-300 font-mono">
              SMK Agama Kerian • DG10
            </span>
          </div>

          <p className="text-slate-200 font-outfit text-sm sm:text-base leading-relaxed mb-6">
            Guru, pendidik STEM & pencipta kandungan digital. 16 tahun dalam pendidikan.
          </p>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center space-x-3.5">
              <div 
                className="relative w-11 h-11 rounded-xl overflow-hidden border border-cyan-400/50 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:scale-105 transition-transform"
                onClick={() => {
                  audioSynth.playClick(1200);
                  setShowPortraitModal(true);
                }}
              >
                <img src="/media/halim_portrait.png" alt={CANDIDATE_PROFILE.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-playfair text-sm font-bold text-white">Profil Pendidik & Inovasi</h3>
                <p className="text-[11px] font-mono text-cyan-300">16 Tahun Dedikasi Perkhidmatan</p>
              </div>
            </div>

            <button
              onClick={() => {
                audioSynth.playClick(1200);
                setShowPortraitModal(true);
              }}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono transition-all cursor-pointer"
            >
              <span>Profil</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BAB 02: THE VISION (0.10 - 0.20)                                          */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.09, 0.12, 0.17, 0.21)}
        className="fixed inset-0 flex items-center justify-end px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-xl bg-[#030308]/45 backdrop-blur-xl p-6 sm:p-9 rounded-3xl border border-sky-500/30 shadow-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-500/30 text-sky-300 text-xs font-mono mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>02 // THE VISION</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-2.5">
            Dari Guru <br />
            <span className="font-cormorant italic font-normal text-sky-300">
              kepada Inovator.
            </span>
          </h2>

          <p className="text-slate-200 font-outfit text-sm sm:text-base leading-relaxed mb-5">
            Mengubah idea pendidikan menjadi penyelesaian digital.
          </p>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-sky-500/20 flex items-center space-x-3">
            <Zap className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="text-xs font-mono text-slate-300">Transformasi Idea Kepada Aplikasi Nyata</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BAB 03: THE CREATOR (0.20 - 0.30)                                         */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.19, 0.22, 0.27, 0.31)}
        className="fixed inset-0 flex items-center justify-start px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-2xl bg-[#030308]/45 backdrop-blur-xl p-6 sm:p-9 rounded-3xl border border-cyan-500/30 shadow-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>03 // THE CREATOR</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-2.5">
            Membina <br />
            <span className="font-cormorant italic font-normal text-cyan-300">
              Ekosistem Digital.
            </span>
          </h2>

          <p className="text-slate-200 font-outfit text-sm sm:text-base leading-relaxed mb-5">
            MyPhysicsTutor, PhysFlix, PhysPlot, HeadcountPro, CIDS Suites Pro & CikguScan.
          </p>

          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {APP_ECOSYSTEM.slice(0, 3).map((app) => (
                <div 
                  key={app.id} 
                  onClick={() => {
                    audioSynth.playClick(1000);
                    setSelectedApp(app);
                  }}
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 cursor-pointer transition-all"
                >
                  <div className="text-xs font-mono font-bold text-white truncate">{app.name}</div>
                  <div className="text-[10px] text-cyan-300/80 font-mono truncate">{app.category}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                audioSynth.playClick(1000);
                setSelectedApp(APP_ECOSYSTEM[0]);
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all cursor-pointer"
            >
              <span>Terokai Ekosistem Digital</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BAB 04: THE IMPACT (0.30 - 0.40)                                          */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.29, 0.32, 0.37, 0.41)}
        className="fixed inset-0 flex items-center justify-end px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-xl bg-[#030308]/45 backdrop-blur-xl p-6 sm:p-9 rounded-3xl border border-rose-500/30 shadow-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-mono mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            <span>04 // THE IMPACT</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-2.5">
            Teknologi yang <br />
            <span className="font-cormorant italic font-normal text-rose-300">
              Memudahkan.
            </span>
          </h2>

          <p className="text-slate-200 font-outfit text-sm sm:text-base leading-relaxed mb-5">
            Memperkasa pembelajaran murid, PdP guru dan analisis akademik.
          </p>

          <div className="grid grid-cols-3 gap-2 text-center font-mono">
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-xs font-bold text-white">Murid</div>
              <div className="text-[9px] text-slate-400">Pembelajaran</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-rose-500/30">
              <div className="text-xs font-bold text-rose-300">Guru</div>
              <div className="text-[9px] text-slate-400">PdP Pintar</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-xs font-bold text-white">Akademik</div>
              <div className="text-[9px] text-slate-400">Analisis Data</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BAB 05: THE CONTRIBUTOR (0.40 - 0.50)                                     */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.39, 0.42, 0.47, 0.51)}
        className="fixed inset-0 flex items-center justify-start px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-xl bg-[#030308]/45 backdrop-blur-xl p-6 sm:p-9 rounded-3xl border border-pink-500/30 shadow-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300 text-xs font-mono mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            <span>05 // THE CONTRIBUTOR</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-2.5">
            Berkongsi, Membimbing, <br />
            <span className="font-cormorant italic font-normal text-pink-300">
              Membina.
            </span>
          </h2>

          <p className="text-slate-200 font-outfit text-sm sm:text-base leading-relaxed mb-5">
            Panel pakar, pembangunan modul, penceramah & perkongsian inovasi pendidikan.
          </p>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-pink-500/20 flex items-center space-x-3">
            <ShieldCheck className="w-4 h-4 text-pink-400 shrink-0" />
            <span className="text-xs font-mono text-slate-300">Panel Pakar & Pembimbing Inovasi Pendidikan</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BAB 06: THE RECOGNITION (0.50 - 0.60)                                     */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.49, 0.52, 0.57, 0.61)}
        className="fixed inset-0 flex items-center justify-end px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-xl bg-[#030308]/45 backdrop-blur-xl p-6 sm:p-9 rounded-3xl border border-purple-500/30 shadow-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span>06 // THE RECOGNITION</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-2.5">
            Inovasi yang <br />
            <span className="font-cormorant italic font-normal text-purple-300">
              Diiktiraf.
            </span>
          </h2>

          <p className="text-slate-200 font-outfit text-sm sm:text-base leading-relaxed mb-5">
            Emas IIEF 2025, Emas I3EC’25, Perak INNOZILLA & Johan Inovasi Kerian.
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-purple-500/20">
              <div className="flex items-center space-x-2">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-xs font-outfit text-slate-200">Emas IIEF 2025 & Emas I3EC’25</span>
              </div>
              <span className="text-[10px] font-mono text-amber-300 font-bold">EMAS</span>
            </div>
          </div>

          <button
            onClick={() => {
              audioSynth.playClick(1100);
              setShowAwardsModal(true);
            }}
            className="w-full py-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold uppercase flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
          >
            <span>Senarai Lengkap Pengiktirafan</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BAB 07: THE KNOWLEDGE (0.60 - 0.70)                                       */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.59, 0.62, 0.67, 0.71)}
        className="fixed inset-0 flex items-center justify-start px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-xl bg-[#030308]/45 backdrop-blur-xl p-6 sm:p-9 rounded-3xl border border-indigo-500/30 shadow-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span>07 // THE KNOWLEDGE</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-2.5">
            Menulis untuk <br />
            <span className="font-cormorant italic font-normal text-indigo-300">
              Generasi.
            </span>
          </h2>

          <p className="text-slate-200 font-outfit text-sm sm:text-base leading-relaxed mb-5">
            Modul Fizik, CheatNote, bahan digital & penerbitan pendidikan.
          </p>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-indigo-500/20 flex items-center space-x-3">
            <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-xs font-mono text-slate-300">Penerbitan Modul Fizik SPM & Bahan Digital</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BAB 08: THE LEGACY (0.70 - 0.80)                                          */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.69, 0.72, 0.77, 0.81)}
        className="fixed inset-0 flex items-center justify-end px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-xl bg-[#030308]/45 backdrop-blur-xl p-6 sm:p-9 rounded-3xl border border-blue-500/30 shadow-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-mono mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>08 // THE LEGACY</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-2.5">
            Lebih daripada <br />
            <span className="font-cormorant italic font-normal text-blue-300">
              Teknologi.
            </span>
          </h2>

          <p className="text-slate-200 font-outfit text-sm sm:text-base leading-relaxed mb-5">
            Membina budaya inovasi dan pendigitalan pendidikan.
          </p>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-blue-500/20 flex items-center space-x-3">
            <Compass className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="text-xs font-mono text-slate-300">Membudayakan Pemikiran Digital Berterusan</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BAB 09: THE JOURNEY (0.80 - 0.90)                                         */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.79, 0.82, 0.87, 0.91)}
        className="fixed inset-0 flex items-center justify-start px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-xl bg-[#030308]/45 backdrop-blur-xl p-6 sm:p-9 rounded-3xl border border-emerald-500/30 shadow-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>09 // THE JOURNEY</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-2.5">
            16 Tahun. <br />
            <span className="font-cormorant italic font-normal text-emerald-300">
              Satu Visi.
            </span>
          </h2>

          <p className="text-slate-200 font-outfit text-sm sm:text-base leading-relaxed mb-5">
            Daripada pengalaman kepada inovasi yang memberi impak.
          </p>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-emerald-500/20 flex items-center space-x-3">
            <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs font-mono text-slate-300">Dedikasi 16 Tahun Menerusi Saluran Pendidikan Digital</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BAB 10: THE FUTURE (0.90 - 1.00)                                          */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.89, 0.92, 0.99, 1.00)}
        className="fixed inset-0 flex flex-col items-center justify-center px-6 sm:px-12 text-center"
      >
        <div className="max-w-2xl bg-[#030308]/50 backdrop-blur-2xl p-7 sm:p-11 rounded-3xl border border-amber-500/30 shadow-[0_0_50px_rgba(212,175,55,0.15)]">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-mono mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>10 // THE FUTURE</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-2.5">
            ABDUL HALIM BIN ROSLAN
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-amber-300 mb-3">
            Pendidik. Inovator. Pencipta Kandungan Digital.
          </p>

          <p className="text-slate-200 font-outfit text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-6">
            Membina masa depan pendidikan, satu inovasi pada satu masa.
          </p>

          {/* Tactile Biometric Action Seal */}
          <div>
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
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 text-xs font-mono cursor-pointer"
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
                <strong className="text-white font-mono">Falsafah Inovasi:</strong> {CANDIDATE_PROFILE.corePhilosophy}
              </p>
              <p>
                <strong className="text-white font-mono">Prinsip Aliran:</strong> {CANDIDATE_PROFILE.quote}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setShowPortraitModal(false)}
                className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-mono font-bold text-xs hover:bg-cyan-400 transition-colors cursor-pointer"
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
          <div className="relative max-w-xl w-full max-h-[85vh] overflow-y-auto bg-[#070913] border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button 
              onClick={() => setShowAwardsModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 text-xs font-mono cursor-pointer"
            >
              ✕ TUTUP
            </button>

            <h3 className="font-playfair text-2xl font-bold text-white mb-2">Pengiktirafan & Kepakaran</h3>
            <p className="text-xs font-mono text-purple-300 mb-6">Pencapaian Inovasi, Panel STEM & Penerbitan Pendidikan</p>

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
                className="px-5 py-2 rounded-xl bg-purple-500 text-slate-950 font-mono font-bold text-xs hover:bg-purple-400 transition-colors cursor-pointer"
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
