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
  GraduationCap
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
      {/* CHAPTER 01: THE EDUCATOR (0.00 - 0.10) [FULL NAME MONUMENTAL HERO]         */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.00, 0.00, 0.07, 0.11)}
        className="fixed inset-0 flex items-center justify-start px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-2xl bg-[#030308]/45 backdrop-blur-xl p-6 sm:p-9 rounded-3xl border border-cyan-500/30 shadow-[0_0_40px_rgba(0,240,255,0.1)]">
          {/* Category Micro-Pill */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>01 // THE EDUCATOR • TOKOH PENDIDIK</span>
          </div>

          {/* Monumental Hero Headline with Full Candidate Name */}
          <h1 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-2.5">
            {CANDIDATE_PROFILE.name.toUpperCase()}
          </h1>

          {/* Role & School Badge */}
          <div className="flex flex-wrap items-center gap-2 mb-3.5">
            <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold">
              {CANDIDATE_PROFILE.grade}
            </span>
            <span className="text-xs text-slate-300 font-mono">
              {CANDIDATE_PROFILE.school}
            </span>
          </div>

          {/* Concise Narrative Tagline */}
          <p className="text-slate-200 font-outfit text-sm sm:text-base leading-relaxed mb-6">
            Pendidik berwawasan dengan 16 tahun dedikasi. Satu gerakan kecil daripada seorang guru merintis perjalanan merentas semikonduktor, hingga menjadi pengetahuan yang sampai kepada minda pelajar.
          </p>

          {/* Minimalist Profile Strip */}
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
                <h3 className="font-playfair text-sm font-bold text-white">Biodata & Falsafah Inovasi</h3>
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
      {/* CHAPTER 02: THE INITIATION (0.10 - 0.20) [STYLUS TIP TO DIGITIZER]         */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.09, 0.12, 0.17, 0.21)}
        className="fixed inset-0 flex items-center justify-end px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-xl bg-[#030308]/45 backdrop-blur-xl p-6 sm:p-9 rounded-3xl border border-sky-500/30 shadow-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-500/30 text-sky-300 text-xs font-mono mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>02 // THE INITIATION</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-2.5">
            Sentuhan Pertama. <br />
            <span className="font-cormorant italic font-normal text-sky-300">
              Nadi Input Digital.
            </span>
          </h2>

          <p className="text-slate-300 font-outfit text-sm sm:text-base leading-relaxed mb-5">
            Hujung stylus bersentuhan dengan digitizer kaca. Satu garisan idea bertukar menjadi koordinat voltan mikro dengan resolusi sub-milimeter.
          </p>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-sky-500/20 flex items-center space-x-3">
            <Zap className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="text-xs font-mono text-slate-300">Input Frekuensi Tinggi: 240 Hz Sampling Rate</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 03: QUANTUM LATTICE (0.20 - 0.30) [SUB-PIXEL MICRO MATRIX]         */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.19, 0.22, 0.27, 0.31)}
        className="fixed inset-0 flex items-center justify-start px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-xl bg-[#030308]/45 backdrop-blur-xl p-6 sm:p-9 rounded-3xl border border-cyan-500/30 shadow-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>03 // QUANTUM LATTICE</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-2.5">
            Matriks Sub-Piksel. <br />
            <span className="font-cormorant italic font-normal text-cyan-300">
              Denyutan Isyarat Mikro.
            </span>
          </h2>

          <p className="text-slate-300 font-outfit text-sm sm:text-base leading-relaxed mb-5">
            Kamera menyelam ke skala mikroskopik $10^{'{ -3 }'}$ m $\rightarrow$ $10^{'{ -5 }'}$ m. Setiap sentuhan mengaktifkan kekisi kapasitif di celah matriks piksel RGB.
          </p>

          <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs">
            <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-slate-200">
              <div className="font-bold text-cyan-300">10⁻⁶ m</div>
              <div className="text-[10px] text-slate-400">Skala Matriks</div>
            </div>
            <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-slate-200">
              <div className="font-bold text-cyan-300">0.01 ms</div>
              <div className="text-[10px] text-slate-400">Tindak Balas Isyarat</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 04: DATA HIGHWAY (0.30 - 0.40) [RIBBON CABLE & 16-YR RECORD]       */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.29, 0.32, 0.37, 0.41)}
        className="fixed inset-0 flex items-center justify-end px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-xl bg-[#030308]/45 backdrop-blur-xl p-6 sm:p-9 rounded-3xl border border-rose-500/30 shadow-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-mono mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            <span>04 // DATA HIGHWAY</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-2.5">
            Lebuhraya Data. <br />
            <span className="font-cormorant italic font-normal text-rose-300">
              16 Tahun Khidmat.
            </span>
          </h2>

          <p className="text-slate-300 font-outfit text-sm sm:text-base leading-relaxed mb-5">
            Isyarat elektrik mengalir pantas merentasi kabel reben fleksibel — melambangkan dedikasi 16 tahun perkhidmatan cemerlang tanpa henti.
          </p>

          <div className="grid grid-cols-3 gap-2 text-center font-mono">
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-base font-bold text-white">16 Thn</div>
              <div className="text-[9px] text-slate-400">Khidmat</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-rose-500/30">
              <div className="text-base font-bold text-rose-300">96.79%</div>
              <div className="text-[9px] text-slate-400">SKPMg2</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-base font-bold text-white">APC 2021</div>
              <div className="text-[9px] text-slate-400">Cemerlang</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 05: SILICON SUBSTRATE (0.40 - 0.50) [CHIP WAFER & POWER RAILS]     */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.39, 0.42, 0.47, 0.51)}
        className="fixed inset-0 flex items-center justify-start px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-xl bg-[#030308]/45 backdrop-blur-xl p-6 sm:p-9 rounded-3xl border border-pink-500/30 shadow-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300 text-xs font-mono mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            <span>05 // SILICON SUBSTRATE</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-2.5">
            Substrat Silikon. <br />
            <span className="font-cormorant italic font-normal text-pink-300">
              Seni Bina Semikonduktor.
            </span>
          </h2>

          <p className="text-slate-300 font-outfit text-sm sm:text-base leading-relaxed mb-5">
            Kamera menembusi ke lapisan nanometer $10^{'{ -6 }'}$ m $\rightarrow$ $10^{'{ -8 }'}$ m. Arus elektrik menyalakan litar bersepadu untuk pemprosesan berprestasi tinggi.
          </p>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-pink-500/20 flex items-center space-x-3">
            <Cpu className="w-4 h-4 text-pink-400 shrink-0" />
            <span className="text-xs font-mono text-slate-300">Struktur Nano: Transistor FinFET & Rel Kuasa Pintar</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 06: COMPUTATIONAL CORE (0.50 - 0.60) [6 APPS ECOSYSTEM]           */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.49, 0.52, 0.57, 0.61)}
        className="fixed inset-0 flex items-center justify-end px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-2xl bg-[#030308]/45 backdrop-blur-xl p-6 sm:p-9 rounded-3xl border border-purple-500/30 shadow-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span>06 // COMPUTATIONAL CORE</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-2.5">
            Enjin Inovasi. <br />
            <span className="font-cormorant italic font-normal text-purple-300">
              Ekosistem 6 Aplikasi Digital.
            </span>
          </h2>

          <p className="text-slate-300 font-outfit text-sm sm:text-base leading-relaxed mb-5">
            Logik perduaan 0 & 1 diproses menjadi penyelesaian digital menyeluruh: Pengurusan RPH Pintar, CIDS Suites Pro, Sahsiah Murid & Modul STEM Interaktif.
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
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all cursor-pointer"
            >
              <span>Terokai 6 Aplikasi Digital</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 07: WAVE PROPAGATION (0.60 - 0.70) [WI-FI RF PULSE]               */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.59, 0.62, 0.67, 0.71)}
        className="fixed inset-0 flex items-center justify-start px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-xl bg-[#030308]/45 backdrop-blur-xl p-6 sm:p-9 rounded-3xl border border-indigo-500/30 shadow-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span>07 // WAVE PROPAGATION</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-2.5">
            Pancaran Gelombang. <br />
            <span className="font-cormorant italic font-normal text-indigo-300">
              Penyebaran Tanpa Wayar.
            </span>
          </h2>

          <p className="text-slate-300 font-outfit text-sm sm:text-base leading-relaxed mb-5">
            Data digital ditukarkan kepada gelombang elektromagnetik 5 GHz, berlayar merentasi ruang udara bilik darjah dengan kelajuan cahaya.
          </p>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-indigo-500/20 flex items-center space-x-3">
            <Radio className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-xs font-mono text-slate-300">Protokol Wi-Fi 6: OFDMA & Pancaran RF 5.8 GHz</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 08: THE RECEPTOR (0.70 - 0.80) [PROJECTOR RECEIVER & HONORS]      */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.69, 0.72, 0.77, 0.81)}
        className="fixed inset-0 flex items-center justify-end px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-xl bg-[#030308]/45 backdrop-blur-xl p-6 sm:p-9 rounded-3xl border border-blue-500/30 shadow-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-mono mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>08 // THE RECEPTOR</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-2.5">
            Papan Penerima. <br />
            <span className="font-cormorant italic font-normal text-blue-300">
              Pengiktirafan & Kepakaran.
            </span>
          </h2>

          <p className="text-slate-300 font-outfit text-sm sm:text-base leading-relaxed mb-5">
            Isyarat diserap oleh litar penerima unjuran — mencerminkan pengiktirafan Pingat Emas Kebangsaan serta khidmat Panel Penilai Inovasi STEM.
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-blue-500/20">
              <div className="flex items-center space-x-2">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-xs font-outfit text-slate-200">Pingat Emas e-NIIEX 2021 & AI STEM</span>
              </div>
              <span className="text-[10px] font-mono text-amber-300 font-bold">EMAS</span>
            </div>
          </div>

          <button
            onClick={() => {
              audioSynth.playClick(1100);
              setShowAwardsModal(true);
            }}
            className="w-full py-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold uppercase flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
          >
            <span>Senarai Lengkap Pengiktirafan</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 09: OPTICAL PRISM (0.80 - 0.90) [PRISM REFRACTION & PROJECTION]    */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.79, 0.82, 0.87, 0.91)}
        className="fixed inset-0 flex items-center justify-start px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-xl bg-[#030308]/45 backdrop-blur-xl p-6 sm:p-9 rounded-3xl border border-emerald-500/30 shadow-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>09 // OPTICAL PRISM</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-2.5">
            Pembiasan Prisma. <br />
            <span className="font-cormorant italic font-normal text-emerald-300">
              Pancaran Fotonik Cahaya.
            </span>
          </h2>

          <p className="text-slate-300 font-outfit text-sm sm:text-base leading-relaxed mb-5">
            Enjin optik memecahkan alur cahaya kristal tulen kepada spektrum warna, memancarkan kandungan pengajaran ke layar paparan kelas.
          </p>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-emerald-500/20 flex items-center space-x-3">
            <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs font-mono text-slate-300">Enjin Optik 3-LCD: Pemisahan Spektrum RGB & Unjuran 4K</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 10: APEX RETINA & LEGACY (0.90 - 1.00) [STUDENT EYE & CLIMAX SEAL] */}
      {/* ========================================================================= */}
      <section 
        style={getChapterStyle(0.89, 0.92, 0.99, 1.00)}
        className="fixed inset-0 flex flex-col items-center justify-center px-6 sm:px-12 text-center"
      >
        <div className="max-w-2xl bg-[#030308]/50 backdrop-blur-2xl p-7 sm:p-11 rounded-3xl border border-amber-500/30 shadow-[0_0_50px_rgba(212,175,55,0.15)]">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-mono mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>10 // APEX RETINA & LEGACY</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-2.5">
            Menerangi Minda. <br />
            <span className="font-cormorant italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
              Melakar Masa Depan.
            </span>
          </h2>

          <p className="text-slate-300 font-outfit text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-6">
            Kitaran lengkap: Sentuhan ikhlas seorang guru, diperkasa oleh keupayaan teknologi, menerangi potensi tanpa batas generasi pewaris negara.
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
          <div className="relative max-w-xl w-full max-h-[85vh] overflow-y-auto bg-[#070913] border border-blue-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button 
              onClick={() => setShowAwardsModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 text-xs font-mono cursor-pointer"
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
                className="px-5 py-2 rounded-xl bg-blue-500 text-slate-950 font-mono font-bold text-xs hover:bg-blue-400 transition-colors cursor-pointer"
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
