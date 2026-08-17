import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VideoScrubberCanvas } from './components/VideoScrubberCanvas';
import { LuxuryHudTelemetry } from './components/LuxuryHudTelemetry';
import { AutoTourPlayer } from './components/AutoTourPlayer';
import { ChapterStoryOverlay } from './components/ChapterStoryOverlay';
import { BlueprintPromptRoute } from './components/BlueprintPromptRoute';
import { CHAPTERS } from './constants/candidateData';
import { audioSynth } from './services/audioSynth';

export const App: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showBlueprint, setShowBlueprint] = useState(false);
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);
  const [fps, setFps] = useState(60);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const autoPlayRafId = useRef<number | null>(null);
  const smoothDampRafId = useRef<number | null>(null);
  const lastChapterIdRef = useRef<number>(1);
  const fpsFrameCount = useRef(0);
  const fpsLastTime = useRef(performance.now());

  // Determine current active chapter based on progress
  const currentChapter = CHAPTERS.find(
    (ch) => progress >= ch.timeRange[0] && progress <= ch.timeRange[1]
  ) || CHAPTERS[0];

  // Play audio chime when chapter changes
  useEffect(() => {
    if (currentChapter.id !== lastChapterIdRef.current) {
      lastChapterIdRef.current = currentChapter.id;
      audioSynth.playChapterWarp(currentChapter.id);
    }
  }, [currentChapter.id]);

  // Check viewport aspect ratio for 9:16 mobile portrait auto-switching
  useEffect(() => {
    const handleResize = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobilePortrait(isPortrait && isSmallScreen);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard shortcut listener (Spacebar for Play/Pause, M for Mute, B for Blueprint)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
        audioSynth.playClick(1400);
      } else if (e.key === 'm' || e.key === 'M') {
        const muted = audioSynth.toggleMute();
        setIsMuted(muted);
      } else if (e.key === 'b' || e.key === 'B') {
        setShowBlueprint((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update audio synth drone depth as scroll progress changes
  useEffect(() => {
    audioSynth.updateDroneDepth(progress);
  }, [progress]);

  // FPS Counter calculation
  useEffect(() => {
    let animId: number;
    const calcFps = () => {
      fpsFrameCount.current++;
      const now = performance.now();
      if (now - fpsLastTime.current >= 1000) {
        setFps(fpsFrameCount.current);
        fpsFrameCount.current = 0;
        fpsLastTime.current = now;
      }
      animId = requestAnimationFrame(calcFps);
    };
    animId = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Continuous buttery smooth progress damping loop
  useEffect(() => {
    const dampLoop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0002) {
        currentProgressRef.current += diff * 0.16;
        setProgress(currentProgressRef.current);
      } else if (currentProgressRef.current !== targetProgressRef.current) {
        currentProgressRef.current = targetProgressRef.current;
        setProgress(targetProgressRef.current);
      }
      smoothDampRafId.current = requestAnimationFrame(dampLoop);
    };

    smoothDampRafId.current = requestAnimationFrame(dampLoop);
    return () => {
      if (smoothDampRafId.current) cancelAnimationFrame(smoothDampRafId.current);
    };
  }, []);

  // Handle Manual Window Scroll with velocity tracking
  const handleScroll = useCallback(() => {
    if (isAutoMode && isPlaying) return;

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;

    const currentY = window.scrollY;
    const rawProg = Math.max(0, Math.min(1, currentY / scrollHeight));
    targetProgressRef.current = rawProg;

    // Calculate scroll velocity
    const now = Date.now();
    const dt = Math.max(1, now - lastScrollTime.current);
    const dy = currentY - lastScrollY.current;
    const vel = (dy / dt) * 10;
    setVelocity(vel);

    lastScrollY.current = currentY;
    lastScrollTime.current = now;
  }, [isAutoMode, isPlaying]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Auto Tour Player RAF Loop
  useEffect(() => {
    if (!isPlaying) {
      if (autoPlayRafId.current) cancelAnimationFrame(autoPlayRafId.current);
      return;
    }

    let lastTime = performance.now();

    const tourLoop = (now: number) => {
      const deltaSec = (now - lastTime) / 1000;
      lastTime = now;

      const next = targetProgressRef.current + (deltaSec * speed) / 20.8;
      if (next >= 1) {
        targetProgressRef.current = 1;
        setIsPlaying(false);
        return;
      }

      targetProgressRef.current = next;

      // Sync window scroll position smoothly
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        window.scrollTo({
          top: next * scrollHeight,
          behavior: 'instant' as ScrollBehavior
        });
      }

      autoPlayRafId.current = requestAnimationFrame(tourLoop);
    };

    autoPlayRafId.current = requestAnimationFrame(tourLoop);

    return () => {
      if (autoPlayRafId.current) cancelAnimationFrame(autoPlayRafId.current);
    };
  }, [isPlaying, speed]);

  // Seek handler from scrubber or chapter jumps
  const handleSeek = (newProg: number) => {
    const clamped = Math.max(0, Math.min(1, newProg));
    targetProgressRef.current = clamped;

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight > 0) {
      window.scrollTo({
        top: clamped * scrollHeight,
        behavior: 'instant' as ScrollBehavior
      });
    }
  };

  // Jump to specific chapter
  const handleJumpChapter = (chapterId: number) => {
    const targetCh = CHAPTERS.find((ch) => ch.id === chapterId);
    if (!targetCh) return;
    handleSeek(targetCh.timeRange[0]);
  };

  // Toggle Mute
  const handleToggleMute = () => {
    const muted = audioSynth.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div ref={containerRef} className="relative min-h-[500vh] bg-[#030308] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* 60 FPS Keyframe-4 Hardware Scrubbed Video Canvas with Sub-frame Lerp */}
      <VideoScrubberCanvas
        progress={progress}
        velocity={velocity}
        isMobile={isMobilePortrait}
      />

      {/* Ambient Drifting Photonic Glow Stream */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10 opacity-30">
        <div 
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-[100px] transition-transform duration-1000"
          style={{ transform: `translate3d(${progress * 60}px, ${progress * 120}px, 0)` }}
        />
        <div 
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-purple-500/10 blur-[120px] transition-transform duration-1000"
          style={{ transform: `translate3d(-${progress * 80}px, -${progress * 60}px, 0)` }}
        />
      </div>

      {/* Top and Floating HUD Telemetry Overlay */}
      <LuxuryHudTelemetry
        progress={progress}
        currentChapter={currentChapter}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenBlueprint={() => setShowBlueprint(true)}
        fps={fps}
      />

      {/* 5-Chapter Story & Educational Content Overlay (Minimal & Spacious) */}
      <ChapterStoryOverlay progress={progress} />

      {/* Dual Mode Auto Tour Player Bar */}
      <AutoTourPlayer
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        speed={speed}
        onChangeSpeed={setSpeed}
        progress={progress}
        onSeek={handleSeek}
        chapters={CHAPTERS}
        currentChapterId={currentChapter.id}
        onJumpChapter={handleJumpChapter}
        isAutoMode={isAutoMode}
        onToggleMode={() => {
          setIsAutoMode(!isAutoMode);
          if (!isAutoMode) {
            setIsPlaying(true);
          } else {
            setIsPlaying(false);
          }
        }}
      />

      {/* Reconstruction Blueprint Modal Route (/prompt) */}
      {showBlueprint && (
        <BlueprintPromptRoute onClose={() => setShowBlueprint(false)} />
      )}

    </div>
  );
};
