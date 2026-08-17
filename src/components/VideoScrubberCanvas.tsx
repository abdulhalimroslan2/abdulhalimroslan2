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

  const targetSrc = isMobile
    ? '/media/from_teacher_to_technology_mobile.mp4'
    : '/media/from_teacher_to_technology_desktop.mp4';

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
    const dur = video.duration || 20.8;
    setVideoDuration(dur);
    setIsVideoReady(true);
    if (onVideoLoaded) onVideoLoaded(dur);

    // Initial seek to match progress
    video.currentTime = progress * dur;
  }, [onVideoLoaded, progress]);

  // Update video currentTime based on progress with RAF optimization
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideoReady) return;

    const targetTime = Math.max(0, Math.min(videoDuration, progress * videoDuration));

    // If difference is greater than 0.008s (~1/120s), update currentTime
    if (Math.abs(video.currentTime - targetTime) > 0.008) {
      if ('fastSeek' in video && typeof (video as unknown as { fastSeek: (t: number) => void }).fastSeek === 'function') {
        (video as unknown as { fastSeek: (t: number) => void }).fastSeek(targetTime);
      } else {
        video.currentTime = targetTime;
      }
    }
  }, [progress, videoDuration, isVideoReady]);

  // Dynamic chromatic aberration & lens distortion based on scroll velocity
  const velocityDistort = Math.min(8, Math.abs(velocity) * 1.5);

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
        className="w-full h-full object-cover will-change-transform transition-opacity duration-700"
        style={{
          opacity: isVideoReady ? 1 : 0.4,
          filter: `contrast(1.06) saturate(1.1) brightness(0.95)`,
          transform: `scale(${1 + velocityDistort * 0.004})`
        }}
      />

      {/* Cinematic Vignette & Atmospheric Gradients */}
      <div 
        className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,rgba(3,3,8,0.75)_100%] pointer-events-none"
      />
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#030308]/60 via-transparent to-[#030308]/80 pointer-events-none"
      />

      {/* Cybernetic Scanlines */}
      <div className="absolute inset-0 hud-scanlines opacity-40 pointer-events-none" />

      {/* Velocity Motion Blur Simulator Overlay */}
      {velocityDistort > 1.5 && (
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-20 transition-opacity duration-150"
          style={{
            backdropFilter: `blur(${velocityDistort * 0.6}px)`
          }}
        />
      )}

      {/* Loading state indicator */}
      {!isVideoReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#030308]/90 z-10">
          <div className="relative w-16 h-16 mb-4">
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
