import React, { useState } from 'react';
import { 
  Sparkles, 
  GraduationCap, 
  Award, 
  Layers, 
  BookOpen, 
  Share2, 
  CheckCircle, 
  ChevronRight, 
  Cpu, 
  Radio, 
  Eye, 
  Lightbulb,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  UserCheck
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

export const ChapterStoryOverlay: React.FC<ChapterStoryOverlayProps> = ({ progress }) => {
  const [selectedApp, setSelectedApp] = useState<AppEcosystemItem | null>(null);
  const [showPortraitModal, setShowPortraitModal] = useState(false);

  return (
    <div className="relative z-20 w-full min-h-screen pointer-events-none">
      
      {/* ========================================================================= */}
      {/* CHAPTER 01: THE INITIATION (Progress 0.00 - 0.20)                         */}
      {/* ========================================================================= */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-24 pointer-events-auto max-w-7xl mx-auto">
        <div className="max-w-3xl animate-fade-in">
          
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>BAB 01 • THE INITIATION • TITIK MULA</span>
          </div>

          {/* Main Monumental Heading */}
          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            FROM TEACHER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 text-glow-cyan">
              TO TECHNOLOGY
            </span>
          </h1>

          {/* Core Storyline Paragraph */}
          <p className="text-base sm:text-xl text-slate-200 font-outfit leading-relaxed max-w-2xl mb-8">
            Sebuah perjalanan kamera makro berterusan tanpa henti. Bermula daripada sentuhan stylus seorang pendidik berwawasan, menerobos dunia mikroskopik semikonduktor, hingga menjadi gelombang pengetahuan yang memancar ke minda generasi masa hadapan.
          </p>

          {/* Candidate Profile Card */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel-glow max-w-2xl mb-8 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="relative group cursor-pointer" onClick={() => setShowPortraitModal(true)}>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-cyan-400/60 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                    <img 
                      src="/media/halim_portrait.png" 
                      alt={CANDIDATE_PROFILE.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded bg-cyan-500 text-[9px] font-mono text-slate-950 font-bold">
                    PROFIL
                  </div>
                </div>

                <div>
                  <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                    {CANDIDATE_PROFILE.name}
                  </h2>
                  <div className="text-sm font-space text-cyan-300 font-medium mt-0.5">
                    {CANDIDATE_PROFILE.grade}
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-1">
                    {CANDIDATE_PROFILE.school}
                  </div>
                </div>
              </div>

              {/* Fast Stats */}
              <div className="flex sm:flex-col justify-around sm:justify-center border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6 gap-3">
                <div>
                  <div className="font-mono text-xs text-slate-400">PENGALAMAN</div>
                  <div className="font-cinzel text-lg sm:text-xl font-bold text-cyan-300">16+ TAHUN</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-slate-400">STATUS</div>
                  <div className="font-mono text-xs text-emerald-400 font-bold">AKTIF MENGAJAR</div>
                </div>
              </div>
            </div>

            {/* Philosophy Quote */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <blockquote className="text-xs sm:text-sm text-slate-300 italic font-outfit border-l-2 border-cyan-400 pl-3">
                "{CANDIDATE_PROFILE.corePhilosophy}"
              </blockquote>
            </div>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs text-slate-400">
            <span className="animate-bounce">↓</span>
            <span>SKROL KE BAWAH UNTUK MENERUSKAN PERJALANAN MIKROSKOPIK</span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 02: THE QUANTUM TRANSIT (Progress 0.20 - 0.40)                    */}
      {/* ========================================================================= */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-24 pointer-events-auto max-w-7xl mx-auto">
        <div className="max-w-4xl">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-mono mb-4">
            <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>BAB 02 • THE QUANTUM TRANSIT • SUB-PIXEL KE KABEL PITA</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            LATAR BELAKANG AKADEMIK & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-amber-400 text-glow-crimson">
              REKOD PERKHIDMATAN
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-outfit mb-8 max-w-2xl">
            Arus elektrik bergerak melintasi ribuan sambungan mikro, mencerminkan perjalanan 16 tahun perkhidmatan berterusan dari pedalaman Sarawak hingga ke persada antarabangsa.
          </p>

          {/* Grid: Academic vs Service Records */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Academic Credentials */}
            <div className="p-6 rounded-3xl glass-panel border border-red-500/20">
              <h3 className="font-cinzel text-lg font-bold text-white flex items-center space-x-2 mb-4">
                <GraduationCap className="w-5 h-5 text-red-400" />
                <span>KELAYAKAN AKADEMIK</span>
              </h3>

              <div className="space-y-4">
                {ACADEMIC_BACKGROUND.map((acad, idx) => (
                  <div key={idx} className="relative pl-4 border-l border-red-500/30">
                    <div className="font-mono text-xs text-red-400 font-bold">{acad.year} • {acad.qualification}</div>
                    <div className="text-sm font-semibold text-slate-200 font-outfit">{acad.institution}</div>
                    <div className="text-xs text-slate-400 font-outfit mt-0.5">{acad.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Record & Performance */}
            <div className="p-6 rounded-3xl glass-panel border border-red-500/20 flex flex-col justify-between">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-white flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-red-400" />
                  <span>REKOD PERKHIDMATAN & PRESTASI</span>
                </h3>

                <div className="space-y-3.5 mb-6">
                  {SERVICE_RECORDS.map((srv, idx) => (
                    <div key={idx} className="relative pl-4 border-l border-amber-500/30">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-amber-400 font-bold">{srv.period}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">{srv.workplace}</span>
                      </div>
                      <div className="text-xs text-slate-300 font-outfit mt-0.5">{srv.highlight}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Annual Performance Scores */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <div className="font-mono text-xs text-slate-400 mb-2">MARKAH PRESTASI TAHUNAN KONSISTEN TINGGI</div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {ANNUAL_PERFORMANCE_METRICS.map((m, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="font-mono text-[10px] text-slate-400">{m.year}</div>
                      <div className="font-cinzel text-lg font-bold text-red-300">{m.score}</div>
                      <div className="text-[9px] font-mono text-emerald-400">{m.status}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 03: THE COMPUTATIONAL CORE (Progress 0.40 - 0.60)                 */}
      {/* ========================================================================= */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-24 pointer-events-auto max-w-7xl mx-auto">
        <div className="max-w-6xl">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4">
            <Cpu className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>BAB 03 • THE COMPUTATIONAL CORE • EKOSISTEM 6 APLIKASI</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            EKOSISTEM APLIKASI PENDIDIKAN & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 text-glow-cyan">
              PENERBITAN DIGITAL
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-outfit mb-8 max-w-3xl">
            Di dalam pemproses silikon, jutaan logik perduaan 0 & 1 menjelmakan 6 aplikasi pendidikan bersepadu yang menyokong murid, guru, dan pengurusan akademik sekolah.
          </p>

          {/* 6 Apps Interactive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
            {APP_ECOSYSTEM.map((app) => (
              <div
                key={app.id}
                onClick={() => {
                  audioSynth.playClick(1300);
                  setSelectedApp(app);
                }}
                className="group p-5 rounded-3xl glass-panel hover:glass-panel-glow border border-purple-500/20 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${app.badgeColor}`}>
                    {app.category}
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>

                <h4 className="font-cinzel text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {app.name}
                </h4>
                <p className="text-xs font-space text-slate-300 mt-1 mb-3">
                  {app.tagline}
                </p>

                <p className="text-xs text-slate-400 font-outfit line-clamp-2 mb-4">
                  {app.description}
                </p>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-cyan-400">
                  <span>KLIK UNTUK TERPERINCI</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Digital Publications Strip */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10">
            <h3 className="font-cinzel text-lg font-bold text-white flex items-center space-x-2 mb-4">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <span>PENULISAN & PENERBITAN DIGITAL</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PUBLICATIONS.map((pub, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="font-mono text-[10px] text-purple-400 mb-1">{pub.type}</div>
                  <div className="font-cinzel text-sm font-bold text-white mb-1">{pub.title}</div>
                  <div className="text-xs text-slate-400 font-outfit">{pub.description}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 04: THE WAVE PROPAGATION (Progress 0.60 - 0.80)                   */}
      {/* ========================================================================= */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-24 pointer-events-auto max-w-7xl mx-auto">
        <div className="max-w-5xl">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-500/30 text-blue-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>BAB 04 • THE WAVE PROPAGATION • WI-FI & ENJIN OPTIK</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            PENCAPAIAN INOVASI & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 text-glow-cyan">
              SUMBANGAN PAKAR KEBANGSAAN
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-outfit mb-8 max-w-3xl">
            Gelombang elektromagnetik dipancarkan merentasi ruang bilik darjah dan disambut oleh enjin optik projektor, selari dengan sumbangan ilmu sebagai panel pakar dan pelbagai anugerah pingat emas.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            
            {/* Awards & STEM Recognitions */}
            <div className="p-6 rounded-3xl glass-panel border border-blue-500/20">
              <h3 className="font-cinzel text-lg font-bold text-white flex items-center space-x-2 mb-4">
                <Award className="w-5 h-5 text-amber-400" />
                <span>PENCAPAIAN INOVASI & STEM</span>
              </h3>

              <div className="space-y-3.5">
                {AWARDS.map((aw, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded font-mono text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {aw.award}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{aw.year} • {aw.level}</span>
                      </div>
                      <div className="text-sm font-bold text-white font-outfit mt-1">{aw.title}</div>
                      <div className="text-xs text-slate-400 font-outfit mt-0.5">{aw.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expert Panels & Cultural Sharing */}
            <div className="space-y-6">
              
              <div className="p-6 rounded-3xl glass-panel border border-blue-500/20">
                <h3 className="font-cinzel text-lg font-bold text-white flex items-center space-x-2 mb-4">
                  <UserCheck className="w-5 h-5 text-cyan-400" />
                  <span>SUMBANGAN PROFESIONAL & PAKAR</span>
                </h3>

                <div className="space-y-3">
                  {EXPERT_PANELS.map((ep, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-cyan-300 font-outfit">{ep.role}</span>
                        <span className="text-[10px] font-mono text-slate-400">{ep.period}</span>
                      </div>
                      <div className="text-xs font-mono text-slate-300 mt-0.5">{ep.body}</div>
                      <div className="text-[11px] text-slate-400 font-outfit mt-1">{ep.domain}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Digital Speaker / Culture */}
              <div className="p-5 rounded-3xl bg-cyan-950/20 border border-cyan-500/20">
                <div className="font-mono text-xs text-cyan-400 mb-2 flex items-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  <span>PERKONGSIAN & PEMBUDAYAAN DIGITAL</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1 font-outfit">
                  <p>• Penceramah Perkongsian Amalan Terbaik Fizik — PPD Kerian</p>
                  <p>• Penceramah penggunaan NotebookLM & Google Gemini dalam PdP</p>
                  <p>• Penceramah integrasi NotebookLM, Gemini & Apps Script Automasi</p>
                  <p>• Urus setia Perkongsian Inovasi dan Bahan Digital Daerah Kerian</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 05: THE APEX RETINA & LEGACY (Progress 0.80 - 1.00)               */}
      {/* ========================================================================= */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-24 pointer-events-auto max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto w-full text-center">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs font-mono mb-6 mx-auto">
            <Eye className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>BAB 05 • THE APEX RETINA • KEMUNCAK IMPAK & LEGASI</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            PENCIPTA EKOSISTEM <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 text-glow-gold">
              DIGITAL PENDIDIKAN
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-200 font-outfit max-w-2xl mx-auto mb-10 leading-relaxed">
            Kekuatan utama calon bukan sekadar menghasilkan aplikasi secara berasingan, tetapi membina sebuah ekosistem digital pendidikan yang holistik—menghubungkan guru, murid, dan pengurusan akademik dalam satu kitaran impak berkekalan.
          </p>

          {/* Professional Network Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 text-left">
            {PROFESSIONAL_RECOGNITION.map((rec, idx) => (
              <div key={idx} className="p-4 rounded-2xl glass-panel border border-amber-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-amber-500/20 text-amber-300 font-bold">
                    {rec.badge}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{rec.year}</span>
                </div>
                <div className="font-cinzel text-sm font-bold text-white mb-1">{rec.title}</div>
                <div className="text-[11px] font-mono text-amber-400/90 mb-1">{rec.organization}</div>
                <div className="text-xs text-slate-400 font-outfit">{rec.description}</div>
              </div>
            ))}
          </div>

          {/* Climax Tactile Hold-to-Unlock Action */}
          <div className="mb-12">
            <TactileClimaxAction />
          </div>

          {/* Closing Footer Credit */}
          <div className="pt-8 border-t border-white/10 text-center font-mono text-xs text-slate-500">
            <p>PORTFOLIO PENCALONAN ANUGERAH PENCIPTA KANDUNGAN DIGITAL • ABDUL HALIM BIN ROSLAN</p>
            <p className="text-[10px] text-slate-600 mt-1">
              60FPS KEYFRAME-4 CINEMATIC ENGINE • REACT 19 • GSAP HARDWARE ACCELERATION
            </p>
          </div>

        </div>
      </section>

      {/* Holographic App Detail Modal */}
      <HolographicAppModal app={selectedApp} onClose={() => setSelectedApp(null)} />

      {/* Portrait Full View Modal */}
      {showPortraitModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl pointer-events-auto"
          onClick={() => setShowPortraitModal(false)}
        >
          <div className="relative max-w-2xl rounded-3xl overflow-hidden border border-cyan-500/40 shadow-[0_0_60px_rgba(0,240,255,0.3)]">
            <img 
              src="/media/halim_portrait.png" 
              alt="Cikgu Halim" 
              className="w-full h-auto object-cover"
            />
            <div className="p-4 bg-[#030308]/90 text-center">
              <div className="font-cinzel text-lg font-bold text-white">Abdul Halim bin Roslan</div>
              <div className="font-mono text-xs text-cyan-400">Guru Akademik DG10 • SMK Agama Kerian</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
