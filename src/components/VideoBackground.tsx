import { useEffect, useRef, useState } from 'react';

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoLoad = () => {
      setIsVideoLoaded(true);
      video.currentTime = 0; // Start at beginning
    };

    const handleScroll = () => {
      if (!video || !isVideoLoaded) return;

      // Calculate scroll progress (0 to 1)
      const scrollTop = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(scrollTop / documentHeight, 1);

      // Map scroll progress to 85% of video duration to prevent blackout
      const videoDuration = video.duration;
      if (videoDuration) {
        video.currentTime = scrollProgress * videoDuration * 0.85;
      }
    };

    // Add event listeners
    video.addEventListener('loadedmetadata', handleVideoLoad);
    video.addEventListener('canplaythrough', handleVideoLoad);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      video?.removeEventListener('loadedmetadata', handleVideoLoad);
      video?.removeEventListener('canplaythrough', handleVideoLoad);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVideoLoaded]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzIyMjIyMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNzc3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TG9hZGluZy4uLjwvdGV4dD48L3N2Zz4="
      >
        <source 
          src="/GTRundefined.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>
      {/* Dynamic overlay that gets lighter as you scroll */}
      <div 
        className="absolute inset-0 bg-black transition-opacity duration-300"
        style={{ 
          opacity: isVideoLoaded ? 0.4 : 0.7 
        }}
      ></div>
      
      {/* Loading indicator */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="glass-card">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-white">Loading cinematic experience...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoBackground;