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
  const [videoDuration, setVideoDuration] = useState(20.8);
  const currentSrcRef = useRef<string>('');
  
  // Smooth target and current interpolated time for buttery 60fps gliding
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  const targetSrc = isMobile
    ? '/media/from_teacher_to_technology_mobile.mp4'
    : '/media/from_teacher_to_technology_desktop.mp4';

  // Handle source switching dynamically
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
    const dur = video.duration || 20.8;
    setVideoDuration(dur);
    setIsVideoReady(true);
    if (onVideoLoaded) onVideoLoaded(dur);

    targetTimeRef.current = progress * dur;
    currentTimeRef.current = progress * dur;
    video.currentTime = progress * dur;
  }, [onVideoLoaded, progress]);

  // Update target time whenever scroll progress changes
  useEffect(() => {
    targetTimeRef.current = Math.max(0, Math.min(videoDuration, progress * videoDuration));
  }, [progress, videoDuration]);

  // Continuous Sub-Frame Lerp Animation Loop for Buttery Gliding
  useEffect(() => {
    if (!isVideoReady) return;

    const smoothScrubLoop = () => {
      const video = videoRef.current;
      if (video) {
        // High-precision lerp damping (0.16 for butter-smooth momentum follow)
        const diff = targetTimeRef.current - currentTimeRef.current;
        
        if (Math.abs(diff) > 0.003) {
          currentTimeRef.current += diff * 0.18;
          
          if ('fastSeek' in video && typeof (video as unknown as { fastSeek: (t: number) => void }).fastSeek === 'function') {
            (video as unknown as { fastSeek: (t: number) => void }).fastSeek(currentTimeRef.current);
          } else {
            video.currentTime = currentTimeRef.current;
          }
        }
      }
      rafIdRef.current = requestAnimationFrame(smoothScrubLoop);
    };

    rafIdRef.current = requestAnimationFrame(smoothScrubLoop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isVideoReady]);

  // Dynamic subtle scale based on velocity
  const subtleScale = 1 + Math.min(0.03, Math.abs(velocity) * 0.003);

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-[#030308] pointer-events-none select-none">
      {/* Pinned 60fps Keyframe-4 HTML5 Video Element */}
      <video
        ref={videoRef}
        playsInline
        muted
        preload="auto"
        poster="/media/journey_poster.jpg"
        onLoadedMetadata={handleLoadedMetadata}
        className="w-full h-full object-cover will-change-transform transition-all duration-300"
        style={{
          opacity: isVideoReady ? 1 : 0.4,
          filter: `contrast(1.08) saturate(1.12) brightness(0.92)`,
          transform: `scale(${subtleScale})`
        }}
      />

      {/* Luxury Cinematic Vignette & Ambient Radial Gradients */}
      <div 
        className="absolute inset-0 bg-radial-[circle_at_center,transparent_35%,rgba(3,3,8,0.72)_100%] pointer-events-none"
      />
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#030308]/70 via-transparent to-[#030308]/85 pointer-events-none"
      />

      {/* Cybernetic Scanlines */}
      <div className="absolute inset-0 hud-scanlines opacity-30 pointer-events-none" />

      {/* Loading state indicator */}
      {!isVideoReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#030308]/90 z-10">
          <div className="relative w-14 h-14 mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping" />
            <div className="absolute inset-0 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-cyan-500/40 border-l-transparent animate-spin" />
          </div>
          <div className="font-mono text-xs tracking-widest text-cyan-400 uppercase">
            CALIBRATING 60FPS QUANTUM STREAM...
          </div>
          <div className="font-mono text-[10px] text-slate-500 mt-1">
            KEYFRAME-4 HARDWARE ACCELERATION ENABLED
          </div>
        </div>
      )}
    </div>
  );
};
