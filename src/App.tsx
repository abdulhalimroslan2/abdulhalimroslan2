import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VideoScrubberCanvas } from './components/VideoScrubberCanvas';
import { LuxuryHudTelemetry } from './components/LuxuryHudTelemetry';
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
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const autoPlayRafId = useRef<number | null>(null);
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

  // Keyboard shortcut listener (Arrow Keys for Chapter Jump, Spacebar for Play/Pause, M for Mute)
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
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextChapterId = Math.min(10, currentChapter.id + 1);
        if (nextChapterId !== currentChapter.id) {
          handleJumpChapter(nextChapterId);
          audioSynth.playChapterWarp(nextChapterId);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevChapterId = Math.max(1, currentChapter.id - 1);
        if (prevChapterId !== currentChapter.id) {
          handleJumpChapter(prevChapterId);
          audioSynth.playChapterWarp(prevChapterId);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChapter.id]);

  // Update audio synth drone depth as scroll progress changes
  useEffect(() => {
    audioSynth.updateDroneDepth(progress);
  }, [progress]);

  // FPS Counter simulation / calculation
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

  // Handle Manual Window Scroll with velocity tracking
  const handleScroll = useCallback(() => {
    if (isAutoMode && isPlaying) return; // Do not interrupt auto tour unless manual scroll mode

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;

    const currentY = window.scrollY;
    const currentProg = Math.max(0, Math.min(1, currentY / scrollHeight));
    setProgress(currentProg);

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

      setProgress((prev) => {
        // Full duration is ~21.0s, increment by (deltaSec * speed / totalDuration)
        const next = prev + (deltaSec * speed) / 21.0;
        if (next >= 1) {
          setIsPlaying(false);
          return 1;
        }

        // Sync window scroll position smoothly
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight > 0) {
          window.scrollTo({
            top: next * scrollHeight,
            behavior: 'instant' as ScrollBehavior
          });
        }

        return next;
      });

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
    setProgress(clamped);

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight > 0) {
      window.scrollTo({
        top: clamped * scrollHeight,
        behavior: 'instant' as ScrollBehavior
      });
    }
  };

  // Jump to specific chapter with optimal framing
  const handleJumpChapter = (chapterId: number) => {
    const targetCh = CHAPTERS.find((ch) => ch.id === chapterId);
    if (!targetCh) return;
    if (chapterId === 1) {
      handleSeek(0.0);
    } else if (chapterId === 10) {
      handleSeek(1.0);
    } else {
      handleSeek((targetCh.timeRange[0] + targetCh.timeRange[1]) / 2);
    }
  };

  // Toggle Mute
  const handleToggleMute = () => {
    const muted = audioSynth.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div ref={containerRef} className="relative min-h-[500vh] bg-[#030308] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* 60 FPS Keyframe-4 Hardware Scrubbed Video Canvas */}
      <VideoScrubberCanvas
        progress={progress}
        velocity={velocity}
        isMobile={isMobilePortrait}
      />

      {/* Top and Floating HUD Telemetry Overlay */}
      <LuxuryHudTelemetry
        progress={progress}
        currentChapter={currentChapter}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenBlueprint={() => setShowBlueprint(true)}
        fps={fps}
      />

      {/* 10-Chapter Story & Educational Content Overlay */}
      <ChapterStoryOverlay progress={progress} />

      {/* Reconstruction Blueprint Modal Route (/prompt) */}
      {showBlueprint && (
        <BlueprintPromptRoute onClose={() => setShowBlueprint(false)} />
      )}

    </div>
  );
};
