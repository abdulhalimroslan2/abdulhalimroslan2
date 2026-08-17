import React, { useState } from 'react';
import { 
  Sparkles, 
  GraduationCap, 
  Award, 
  Layers, 
  BookOpen, 
  TrendingUp, 
  UserCheck,
  ChevronRight, 
  Cpu, 
  Radio, 
  Eye, 
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { 
  CANDIDATE_PROFILE, 
  ACADEMIC_BACKGROUND, 
  SERVICE_RECORDS, 
  APP_ECOSYSTEM, 
  AWARDS, 
  EXPERT_PANELS, 
  PUBLICATIONS, 
  PROFESSIONAL_RECOGNITION,
  ANNUAL_PERFORMANCE_METRICS
} from '../constants/candidateData';
import { AppEcosystemItem } from '../types/cinematic';
import { HolographicAppModal } from './HolographicAppModal';
import { TactileClimaxAction } from './TactileClimaxAction';
import { audioSynth } from '../services/audioSynth';

interface ChapterStoryOverlayProps {
  progress: number;
}

/**
 * Calculates smooth bell-curve opacity and vertical translation for buttery spatial transitions
 */
function getChapterTransform(progress: number, start: number, end: number) {
  const mid = (start + end) / 2;
  const halfSpan = (end - start) / 2;
  const dist = Math.abs(progress - mid);

  if (progress < start - 0.05 || progress > end + 0.05) {
    return { opacity: 0, pointerEvents: 'none' as const, transform: 'translateY(30px) scale(0.96)', display: 'none' };
  }

  // Smooth ease-in-out cosine curve
  const t = Math.max(0, Math.min(1, 1 - dist / (halfSpan + 0.04)));
  const smooth = t * t * (3 - 2 * t);
  const translateY = (1 - smooth) * 24 * (progress < mid ? 1 : -1);
  const scale = 0.96 + smooth * 0.04;

  return {
    opacity: smooth,
    pointerEvents: smooth > 0.3 ? ('auto' as const) : ('none' as const),
    transform: `translateY(${translateY.toFixed(1)}px) scale(${scale.toFixed(3)})`,
    display: smooth > 0.01 ? 'flex' : 'none'
  };
}

export const ChapterStoryOverlay: React.FC<ChapterStoryOverlayProps> = ({ progress }) => {
  const [selectedApp, setSelectedApp] = useState<AppEcosystemItem | null>(null);
  const [showPortraitModal, setShowPortraitModal] = useState(false);
  const [showFullTimelineModal, setShowFullTimelineModal] = useState(false);

  // Chapter transforms
  const ch1Style = getChapterTransform(progress, 0.0, 0.22);
  const ch2Style = getChapterTransform(progress, 0.18, 0.42);
  const ch3Style = getChapterTransform(progress, 0.38, 0.62);
  const ch4Style = getChapterTransform(progress, 0.58, 0.82);
  const ch5Style = getChapterTransform(progress, 0.78, 1.0);

  return (
    <div className="fixed inset-0 z-20 w-full h-full pointer-events-none flex items-center justify-center px-4 sm:px-8">
      
      {/* ========================================================================= */}
      {/* CHAPTER 01: THE INITIATION (Progress ~ 0.00 - 0.20)                       */}
      {/* ========================================================================= */}
      <div 
        style={ch1Style}
        className="w-full max-w-4xl flex-col items-center text-center transition-all duration-300 will-change-transform"
      >
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono mb-4 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>01 • THE INITIATION • TITIK PERMULAAN</span>
        </div>

        <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
          FROM TEACHER <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 text-glow-cyan">
            TO TECHNOLOGY
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-200 font-outfit max-w-xl mx-auto mb-6 leading-relaxed">
          Satu gerakan stylus seorang guru merentasi dunia mikroskopik semikonduktor, menjelma menjadi aliran pengetahuan ke minda pelajar.
        </p>

        {/* Brief Hero Profile Card */}
        <div className="p-4 sm:p-5 rounded-3xl glass-panel-glow max-w-lg w-full mb-6">
          <div className="flex items-center space-x-4">
            <div 
              className="relative group cursor-pointer shrink-0" 
              onClick={() => {
                audioSynth.playClick(1500);
                setShowPortraitModal(true);
              }}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-cyan-400/60 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                <img 
                  src="/media/halim_portrait.png" 
                  alt={CANDIDATE_PROFILE.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 px-1 py-0.2 rounded bg-cyan-500 text-[8px] font-mono text-slate-950 font-bold">
                FOTO
              </div>
            </div>

            <div className="text-left flex-1 min-w-0">
              <h2 className="font-cinzel text-base sm:text-lg font-bold text-white truncate">
                {CANDIDATE_PROFILE.name}
              </h2>
              <div className="text-xs font-space text-cyan-300 font-medium">
                {CANDIDATE_PROFILE.grade} • {CANDIDATE_PROFILE.school}
              </div>
              <div className="flex items-center space-x-2 mt-1.5">
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                  16+ Tahun Pengalaman
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                  Fizik & STEM
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 font-mono text-[11px] text-slate-400 animate-pulse">
          <span>↓ SKROL UNTUK MENERUSKAN PERJALANAN DATA</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CHAPTER 02: THE QUANTUM TRANSIT (Progress ~ 0.20 - 0.40)                   */}
      {/* ========================================================================= */}
      <div 
        style={ch2Style}
        className="w-full max-w-4xl flex-col items-center text-center transition-all duration-300 will-change-transform"
      >
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-300 text-[11px] font-mono mb-4 backdrop-blur-md">
          <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span>02 • QUANTUM TRANSIT • KREDENSIAL & PRESTASI</span>
        </div>

        <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-white mb-2">
          AKADEMIK & REKOD PERKHIDMATAN
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 font-outfit max-w-lg mx-auto mb-6">
          Dedikasi 16 tahun bermula dari pedalaman Sarawak hingga ke kementerian dan sekolah menengah agama.
        </p>

        {/* 3 Brief Pill Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full max-w-3xl mb-6 text-left">
          
          {/* Card 1: Kelayakan */}
          <div className="p-4 rounded-2xl glass-panel border border-red-500/20">
            <div className="flex items-center space-x-1.5 text-red-400 font-mono text-[11px] font-bold mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>KELAYAKAN</span>
            </div>
            <div className="text-xs font-bold text-white font-cinzel">BSc (Hons) Manchester UK</div>
            <div className="text-[11px] text-slate-300 font-outfit mt-0.5">Master Sains (MSc) USM</div>
            <div className="text-[10px] font-mono text-slate-400 mt-1">IB Diploma MARA Banting • SPM</div>
          </div>

          {/* Card 2: Perkhidmatan */}
          <div className="p-4 rounded-2xl glass-panel border border-amber-500/20">
            <div className="flex items-center space-x-1.5 text-amber-400 font-mono text-[11px] font-bold mb-2">
              <UserCheck className="w-4 h-4" />
              <span>PERKHIDMATAN</span>
            </div>
            <div className="text-xs font-bold text-white font-cinzel">SMKA Kerian (2022–Kini)</div>
            <div className="text-[11px] text-slate-300 font-outfit mt-0.5">BTP KPM (2020–2022)</div>
            <div className="text-[10px] font-mono text-slate-400 mt-1">SMKA Limbang (2010–2017)</div>
          </div>

          {/* Card 3: Prestasi */}
          <div className="p-4 rounded-2xl glass-panel border border-emerald-500/20">
            <div className="flex items-center space-x-1.5 text-emerald-400 font-mono text-[11px] font-bold mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>SKOR PRESTASI</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="font-cinzel text-lg font-bold text-emerald-300">94.60</span>
              <span className="text-[10px] font-mono text-slate-400">(2022)</span>
            </div>
            <div className="text-[11px] font-mono text-slate-300">
              92.92 (2023) • 93.73 (2024)
            </div>
            <div className="text-[10px] font-mono text-emerald-400 mt-1">Prestasi Konsisten Cemerlang</div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* CHAPTER 03: THE COMPUTATIONAL CORE (Progress ~ 0.40 - 0.60)               */}
      {/* ========================================================================= */}
      <div 
        style={ch3Style}
        className="w-full max-w-4xl flex-col items-center text-center transition-all duration-300 will-change-transform"
      >
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-[11px] font-mono mb-4 backdrop-blur-md">
          <Cpu className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>03 • COMPUTATIONAL CORE • EKOSISTEM 6 APLIKASI</span>
        </div>

        <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-white mb-2">
          EKOSISTEM DIGITAL PENDIDIKAN
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 font-outfit max-w-lg mx-auto mb-6">
          Enam aplikasi digital saling melengkapi untuk murid, guru, dan pengurusan akademik.
        </p>

        {/* Sleek 6-App Pills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-3xl mb-6 text-left">
          {APP_ECOSYSTEM.map((app) => (
            <button
              key={app.id}
              onClick={() => {
                audioSynth.playClick(1400);
                setSelectedApp(app);
              }}
              className="p-3 rounded-2xl glass-panel hover:glass-panel-glow border border-purple-500/20 hover:border-cyan-400/50 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-mono text-cyan-400 truncate max-w-[80%]">
                    {app.category.split(' ')[0]}
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 shrink-0" />
                </div>
                <div className="font-cinzel text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {app.name}
                </div>
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-2 flex items-center justify-between">
                <span>{app.tagline.slice(0, 24)}...</span>
                <ChevronRight className="w-3 h-3 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        {/* 4 Publication Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl">
          {PUBLICATIONS.map((pub, idx) => (
            <span 
              key={idx}
              className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300"
            >
              📖 {pub.title}
            </span>
          ))}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* CHAPTER 04: THE WAVE PROPAGATION (Progress ~ 0.60 - 0.80)                 */}
      {/* ========================================================================= */}
      <div 
        style={ch4Style}
        className="w-full max-w-4xl flex-col items-center text-center transition-all duration-300 will-change-transform"
      >
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-500/30 text-blue-300 text-[11px] font-mono mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          <span>04 • WAVE PROPAGATION • INOVASI & PAKAR</span>
        </div>

        <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-white mb-2">
          PENCAPAIAN INOVASI & SUMBANGAN PAKAR
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 font-outfit max-w-lg mx-auto mb-6">
          Pengiktirafan pingat emas antarabangsa dan sumbangan kepakaran kurikulum STEM kebangsaan.
        </p>

        {/* Sleek Award Highlights & Expert Panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-3xl mb-6 text-left">
          
          {/* Awards Column */}
          <div className="p-4 rounded-2xl glass-panel border border-amber-500/20 space-y-2">
            <div className="flex items-center space-x-1.5 text-amber-400 font-mono text-[11px] font-bold mb-2">
              <Award className="w-4 h-4" />
              <span>PENCAPAIAN INOVASI STEM</span>
            </div>
            
            <div className="text-xs text-slate-200 flex items-center justify-between">
              <span>🥇 <strong>Emas IIEF 2025</strong> (Antarabangsa)</span>
              <span className="font-mono text-[10px] text-amber-400">EMAS</span>
            </div>
            <div className="text-xs text-slate-200 flex items-center justify-between">
              <span>🥇 <strong>Emas I3EC'25</strong> (Idea Competition)</span>
              <span className="font-mono text-[10px] text-amber-400">EMAS</span>
            </div>
            <div className="text-xs text-slate-200 flex items-center justify-between">
              <span>🥇 <strong>Johan Inovasi Kerian 2024</strong></span>
              <span className="font-mono text-[10px] text-amber-400">JOHAN</span>
            </div>
            <div className="text-xs text-slate-200 flex items-center justify-between">
              <span>🥈 <strong>Perak Innozilla 2025 & COSCID</strong></span>
              <span className="font-mono text-[10px] text-slate-400">TERBAIK</span>
            </div>
          </div>

          {/* Expert Panels Column */}
          <div className="p-4 rounded-2xl glass-panel border border-cyan-500/20 space-y-2">
            <div className="flex items-center space-x-1.5 text-cyan-400 font-mono text-[11px] font-bold mb-2">
              <UserCheck className="w-4 h-4" />
              <span>PANEL PAKAR KEBANGSAAN</span>
            </div>
            
            <div className="text-xs text-slate-200">
              • <strong>UKM</strong> — Panel Sains Dron
            </div>
            <div className="text-xs text-slate-200">
              • <strong>BPK KPM</strong> — Modul MOBIM Fizik
            </div>
            <div className="text-xs text-slate-200">
              • <strong>BPK KPM</strong> — Panduan PdP SDG & 4IR
            </div>
            <div className="text-xs text-slate-200">
              • <strong>JPN Perak</strong> — Panel Intervensi Menengah Atas
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* CHAPTER 05: THE APEX RETINA & LEGACY (Progress ~ 0.80 - 1.00)             */}
      {/* ========================================================================= */}
      <div 
        style={ch5Style}
        className="w-full max-w-4xl flex-col items-center text-center transition-all duration-300 will-change-transform"
      >
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/40 text-amber-300 text-[11px] font-mono mb-4 backdrop-blur-md">
          <Eye className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>05 • THE APEX RETINA • KEMUNCAK IMPAK</span>
        </div>

        <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-2">
          PENCIPTA EKOSISTEM DIGITAL
        </h2>

        <p className="text-xs sm:text-sm text-slate-200 font-outfit max-w-lg mx-auto mb-6">
          Inovasi holistik yang menghubungkan murid, guru, dan pengurusan akademik dalam satu kitaran impak berkekalan.
        </p>

        {/* 4 Recognition Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 max-w-2xl">
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 border border-amber-500/30 text-amber-300">
            🍏 Apple Learning Coach 2026
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-slate-300">
            🏆 APC (2016 & 2026)
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-slate-300">
            🏛️ Wakil NUTP 2026
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-slate-300">
            🤖 Hakim Robotik Negeri
          </span>
        </div>

        {/* Tactile Hold Climax Action */}
        <div className="w-full max-w-md">
          <TactileClimaxAction />
        </div>

      </div>

      {/* Holographic App Detail Modal */}
      <HolographicAppModal app={selectedApp} onClose={() => setSelectedApp(null)} />

      {/* Portrait Full View Modal */}
      {showPortraitModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl pointer-events-auto animate-fade-in"
          onClick={() => setShowPortraitModal(false)}
        >
          <div className="relative max-w-xl rounded-3xl overflow-hidden border border-cyan-500/40 shadow-[0_0_60px_rgba(0,240,255,0.3)]">
            <img 
              src="/media/halim_portrait.png" 
              alt="Cikgu Halim" 
              className="w-full h-auto object-cover"
            />
            <div className="p-4 bg-[#030308]/95 text-center">
              <div className="font-cinzel text-lg font-bold text-white">Abdul Halim bin Roslan</div>
              <div className="font-mono text-xs text-cyan-400">Guru Akademik DG10 • SMK Agama Kerian</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
