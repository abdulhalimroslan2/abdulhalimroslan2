import React, { useEffect, useRef, useState, useCallback } from 'react';

interface VideoScrubberCanvasProps {
  progress: number; // 0.0 to 1.0
  velocity: number;
  isMobile: boolean;
  onVideoLoaded?: (duration: number) => void;
}

export const VideoScrubberCanvas: React.FC<VideoScrubberCanvasProps> = ({
  progress,
  velocity,
  isMobile,
  onVideoLoaded
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoDuration, setVideoDuration] = useState(21.0);
  const currentSrcRef = useRef<string>('');
  
  const targetProgressRef = useRef(progress);
  const currentProgressRef = useRef(progress);
  const rafIdRef = useRef<number | null>(null);
  const isSeekingRef = useRef(false);
  const pendingSeekTimeRef = useRef<number | null>(null);

  const targetSrc = isMobile
    ? '/media/from_teacher_to_technology_mobile.mp4'
    : '/media/from_teacher_to_technology_desktop.mp4';

  // Keep target progress synced
  useEffect(() => {
    targetProgressRef.current = progress;
  }, [progress]);

  // Handle source switching dynamically if viewport changes between mobile and desktop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (currentSrcRef.current !== targetSrc) {
      currentSrcRef.current = targetSrc;
      setIsVideoReady(false);
      video.src = targetSrc;
      video.load();
    }
  }, [targetSrc]);

  // Handle video metadata loading
  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const dur = video.duration || 21.0;
    setVideoDuration(dur);
    setIsVideoReady(true);
    if (onVideoLoaded) onVideoLoaded(dur);

    // Initial seek to match progress
    video.currentTime = targetProgressRef.current * dur;
  }, [onVideoLoaded]);

  // Smooth seek execution with decoder protection
  const performSeek = useCallback((targetTime: number) => {
    const video = videoRef.current;
    if (!video) return;

    if (isSeekingRef.current) {
      pendingSeekTimeRef.current = targetTime;
      return;
    }

    // Direct seek if difference is significant
    if (Math.abs(video.currentTime - targetTime) > 0.012) {
      isSeekingRef.current = true;
      
      if ('fastSeek' in video && typeof (video as unknown as { fastSeek: (t: number) => void }).fastSeek === 'function') {
        (video as unknown as { fastSeek: (t: number) => void }).fastSeek(targetTime);
      } else {
        video.currentTime = targetTime;
      }
    }
  }, []);

  // Listen for seek completion to drain queued seeks
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (pendingSeekTimeRef.current !== null) {
        const nextTime = pendingSeekTimeRef.current;
        pendingSeekTimeRef.current = null;
        performSeek(nextTime);
      }
    };

    video.addEventListener('seeked', handleSeeked);
    return () => video.removeEventListener('seeked', handleSeeked);
  }, [performSeek]);

  // Buttery-smooth RAF Scrubbing Loop (Linear Interpolation / LERP)
  useEffect(() => {
    if (!isVideoReady) return;

    const smoothScrubLoop = () => {
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;

      // Smooth interpolation factor (0.45 provides instant responsiveness with zero jitter)
      const diff = target - current;
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current = current + diff * 0.45;
        const targetTime = Math.max(0, Math.min(videoDuration, currentProgressRef.current * videoDuration));
        performSeek(targetTime);
      } else if (current !== target) {
        currentProgressRef.current = target;
        performSeek(target * videoDuration);
      }

      rafIdRef.current = requestAnimationFrame(smoothScrubLoop);
    };

    rafIdRef.current = requestAnimationFrame(smoothScrubLoop);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isVideoReady, videoDuration, performSeek]);

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-[#030308] pointer-events-none select-none">
      {/* Hardware-Accelerated Video Layer with translate3d for GPU compositing */}
      <video
        ref={videoRef}
        playsInline
        muted
        preload="auto"
        poster="/media/journey_poster.jpg"
        onLoadedMetadata={handleLoadedMetadata}
        className="w-full h-full object-cover will-change-transform transition-opacity duration-500"
        style={{
          opacity: isVideoReady ? 1 : 0.4,
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      />

      {/* Cinematic Vignette & Atmospheric Gradients (Zero GPU overhead) */}
      <div 
        className="absolute inset-0 bg-radial-[circle_at_center,transparent_45%,rgba(3,3,8,0.7)_100%] pointer-events-none"
      />
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#030308]/55 via-transparent to-[#030308]/75 pointer-events-none"
      />

      {/* Subtle Scanlines */}
      <div className="absolute inset-0 hud-scanlines opacity-25 pointer-events-none" />

      {/* Loading state indicator */}
      {!isVideoReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#030308]/90 z-10">
          <div className="relative w-14 h-14 mb-3">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping" />
            <div className="absolute inset-0 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-cyan-500/40 border-l-transparent animate-spin" />
          </div>
          <div className="font-mono text-xs tracking-widest text-cyan-400 uppercase">
            MEMUATKAN PENGALAMAN SINEMATIK...
          </div>
        </div>
      )}
    </div>
  );
};
