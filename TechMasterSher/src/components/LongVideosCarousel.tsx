import React, { useState, useCallback, useEffect } from "react";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { PanInfo } from "framer-motion";
import {
  extractYouTubeId,
  parseTimeToSeconds,
  getYouTubeThumbnail,
  fetchYouTubeMetadata,
} from "../utils/youtube";

interface LongVideosCarouselProps {
  videos?: any[];
  isHomePage?: boolean;
}



const DEFAULT_YOUTUBE_VIDEOS = [
  { youtubeUrl: "https://www.youtube.com/watch?v=8H272rF60dc", videoId: "8H272rF60dc", startTime: "0:20", views: "1.4M", fallbackTitle: "Building Enterprise Infrastructure" },
  { youtubeUrl: "https://www.youtube.com/watch?v=onV7l4H5EyM", videoId: "onV7l4H5EyM", startTime: "5:41", endTime: "6:33", views: "890K", fallbackTitle: "Advanced Next.js Architecture" },
  { youtubeUrl: "https://www.youtube.com/watch?v=jbEzCIqhTV8", videoId: "jbEzCIqhTV8", startTime: "0:19", endTime: "0:39", views: "1.1M", fallbackTitle: "Full-Stack System Design" },
  { youtubeUrl: "https://www.youtube.com/watch?v=4_n-ZnjIBVc", videoId: "4_n-ZnjIBVc", startTime: "0:00", views: "2.3M", fallbackTitle: "Mastering Cloud Native Systems" },
  { youtubeUrl: "https://www.youtube.com/watch?v=CvqxRkjvsxY", videoId: "CvqxRkjvsxY", startTime: "0:20", views: "950K", fallbackTitle: "Scalable Microservices Tutorial" },
  { youtubeUrl: "https://www.youtube.com/watch?v=udwDWFERyRw", videoId: "udwDWFERyRw", startTime: "0:20", views: "1.7M", fallbackTitle: "High-Performance Web Applications" },
  { youtubeUrl: "https://www.youtube.com/watch?v=_Db6aKavN1U", videoId: "_Db6aKavN1U", startTime: "0:04", views: "3.1M", fallbackTitle: "Master Wheels Technology Showcase" },
  { youtubeUrl: "https://www.youtube.com/watch?v=FSzP30YegeM", videoId: "FSzP30YegeM", startTime: "0:00", views: "2.8M", fallbackTitle: "Automotive Engineering & Tech" },
  { youtubeUrl: "https://www.youtube.com/watch?v=q-l_F3yQK88", videoId: "q-l_F3yQK88", startTime: "0:10", views: "1.9M", fallbackTitle: "EV Hardware & Control Systems" }
];

export const LongVideosCarousel: React.FC<LongVideosCarouselProps> = ({ videos, isHomePage = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [videoMetaMap, setVideoMetaMap] = useState<Record<string, { title: string; authorName: string }>>({});

  // Check if passed videos have valid YouTube ID/URL
  const hasYouTubeVideos = videos && videos.some((v: any) => v.youtubeUrl || v.videoId || extractYouTubeId(v.url || v.videoUrl || ""));
  const listToRender = hasYouTubeVideos ? videos : DEFAULT_YOUTUBE_VIDEOS;

  // Fetch dynamic YouTube oEmbed metadata for video titles and channel names
  useEffect(() => {
    listToRender.forEach((v: any) => {
      const vId = v.videoId || extractYouTubeId(v.youtubeUrl || v.url || v.videoUrl || "");
      if (vId && !videoMetaMap[vId]) {
        fetchYouTubeMetadata(vId).then((meta) => {
          setVideoMetaMap((prev) => ({ ...prev, [vId]: meta }));
        });
      }
    });
  }, [listToRender]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % listToRender.length);
  }, [listToRender.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + listToRender.length) % listToRender.length);
  }, [listToRender.length]);

  const handleDragEnd = (_e: any, { offset }: PanInfo) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold) {
      handleNext();
    } else if (offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  // Sort and order items symmetrically around activeIndex (showing 1.5 cards on left & right)
  const displayVideos = listToRender
    .map((video: any, originalIndex: number) => {
      let diff = originalIndex - activeIndex;
      if (diff > listToRender.length / 2) diff -= listToRender.length;
      if (diff < -listToRender.length / 2) diff += listToRender.length;
      return { video, originalIndex, diff };
    })
    .filter(({ diff }) => Math.abs(diff) <= 2)
    .sort((a, b) => a.diff - b.diff);

  return (
    <div className="relative flex flex-col w-full px-2 sm:px-4 md:px-8 pt-0 pb-1 md:pt-0 md:pb-2 max-w-[1600px] mx-auto overflow-hidden items-center justify-center">

      {/* Chevron Navigation Controls */}
      {listToRender.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-1 sm:left-2 md:left-6 z-50 p-2 sm:p-2.5 rounded-full border border-gold/40 hover:border-gold hover:scale-110 bg-black/70 hover:bg-black text-gold backdrop-blur-md transition-all shadow-lg cursor-pointer flex items-center justify-center"
            aria-label="Previous video"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-1 sm:right-2 md:right-6 z-50 p-2 sm:p-2.5 rounded-full border border-gold/40 hover:border-gold hover:scale-110 bg-black/70 hover:bg-black text-gold backdrop-blur-md transition-all shadow-lg cursor-pointer flex items-center justify-center"
            aria-label="Next video"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </>
      )}

      {/* Edge Fade Gradients for smooth blending of outermost peeking cards */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 md:w-28 bg-gradient-to-r from-black via-black/60 to-transparent z-40 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 md:w-28 bg-gradient-to-l from-black via-black/60 to-transparent z-40 pointer-events-none" />

      {/* Symmetrical Carousel Track with True 3D Book Perspective */}
      <div 
        style={{ perspective: 1000, transformStyle: "preserve-3d" }} 
        className="w-full relative flex justify-center items-center py-2 [perspective:1000px] [transform-style:preserve-3d]"
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          style={{ transformStyle: "preserve-3d" }}
          className="flex flex-row justify-center items-center gap-[8px] sm:gap-[12px] md:gap-[16px] h-[270px] sm:h-[350px] md:h-[500px] w-full py-2 cursor-grab active:cursor-grabbing relative [transform-style:preserve-3d]"
        >
          <AnimatePresence initial={false} custom={direction}>
            {displayVideos.map(({ video, originalIndex, diff }) => {
              const isActive = diff === 0;
              const absDiff = Math.abs(diff);
              const zIndex = isActive ? 50 : 40 - absDiff;

              const videoId = video.videoId || extractYouTubeId(video.youtubeUrl || video.url || video.videoUrl || "");
              const startSec = parseTimeToSeconds(video.startTime || 0);
              const endSec = parseTimeToSeconds(video.endTime);
              const ytDirectUrl = video.youtubeUrl || (videoId ? `https://www.youtube.com/watch?v=${videoId}&t=${startSec}s` : (video.url || video.videoUrl || "https://www.youtube.com"));
              const thumbnailUrl = (videoId ? getYouTubeThumbnail(videoId) : "") || video.thumbnail || video.url;
              const meta = videoMetaMap[videoId] || { title: "", authorName: "" };
              const displayTitle = video.title && !video.title.toLowerCase().includes("subscribe") ? video.title : (meta.title || video.fallbackTitle || "Featured Tech Mastery");
              const channelName = video.channelName || video.channel || meta.authorName || "TechMaster";
              const displayViews = (video.views || "1.2M").toString().replace(/views/gi, "").trim();

              // Width calculation: Center video wider (680px), Side 1 = 1 full card (170px), Side 2 = 0.5 peek card (70px)
              const getWidth = () => {
                const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
                const isSmallMobile = typeof window !== "undefined" && window.innerWidth < 390;
                if (isActive) return isSmallMobile ? "270px" : (isMobile ? "300px" : "680px");

                const desktopWidths = [170, 70];
                const mobileWidths = [55, 20];
                const arr = isMobile ? mobileWidths : desktopWidths;
                const idx = absDiff - 1;
                const w = idx < arr.length ? arr[idx] : arr[arr.length - 1];
                return `${w}px`;
              };

              // Prominent 3D Book Page Flip Angle Calculation
              const getRotateY = () => {
                if (diff === 0) return 0;
                if (diff === -1) return 25;
                if (diff === -2) return 45;
                if (diff === 1) return -25;
                if (diff === 2) return -45;
                return 0;
              };

              // Book page hinge origin: Symmetrical bottom hinge lift
              const getTransformOrigin = () => {
                if (diff < 0) return "left bottom";
                if (diff > 0) return "right bottom";
                return direction > 0 ? "right bottom" : "left bottom";
              };

              return (
                <motion.div
                  key={video.id || videoId || originalIndex}
                  data-cursor="VIEW"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (ytDirectUrl && ytDirectUrl !== "#") {
                      window.open(ytDirectUrl, "_blank", "noopener,noreferrer");
                    }
                  }}
                  initial={{
                    rotateY: diff < 0 ? 25 : diff > 0 ? -25 : 0,
                    rotateX: 0,
                    y: 0,
                    opacity: 0.9
                  }}
                  animate={{
                    flex: "0 0 auto",
                    width: getWidth(),
                    scale: 1,
                    rotateY: getRotateY(),
                    rotateX: 0,
                    y: 0,
                    transformOrigin: getTransformOrigin(),
                    opacity: 1,
                    zIndex: zIndex,
                  }}
                  transition={{
                    duration: 0.38,
                    ease: [0.16, 1, 0.3, 1], // Ultra-fast lag-free 60FPS Apple-style spring curve
                  }}
                  style={{ 
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    willChange: "transform" 
                  }}
                  className={`relative h-full ${isHomePage ? "rounded-none" : "rounded-2xl"} overflow-hidden cursor-pointer shrink-0 bg-zinc-950 group border [transform-style:preserve-3d] ${isActive
                      ? "border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                      : absDiff === 1
                        ? "border-black/80 hover:border-black opacity-85 hover:opacity-100"
                        : "border-black/50 hover:border-black opacity-50 hover:opacity-100"
                    }`}
                >
                  {/* Transparent Click-Capturing Overlay (z-[60] captures cursor & blocks iframe pointer interference) */}
                  <div 
                    className="absolute inset-0 z-[60] cursor-pointer" 
                    data-cursor="VIEW" 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (ytDirectUrl && ytDirectUrl !== "#") {
                        window.open(ytDirectUrl, "_blank", "noopener,noreferrer");
                      }
                    }}
                  />

                  {/* 3D Book Page Fold Crease & Spine Shadow */}
                  <div 
                    className={`absolute inset-0 pointer-events-none z-37 transition-opacity duration-300 ${
                    diff < 0 
                      ? "bg-gradient-to-r from-transparent via-black/20 to-black/75 border-r border-white/10" 
                      : diff > 0 
                        ? "bg-gradient-to-l from-transparent via-black/20 to-black/75 border-l border-white/10"
                        : "shadow-[inset_0_0_35px_rgba(0,0,0,0.6)]"
                  }`} 
                />
                {/* Instant Video Stream & Zero-Delay Poster Underlay */}
                {/* 1. Original YouTube High-Res Thumbnail Poster (Underlay at z-20 so zero dark frame) */}
                <img
                  src={thumbnailUrl}
                  alt={displayTitle}
                  loading="eager"
                  className="w-full h-full object-cover absolute inset-0 z-20 opacity-90 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                />

                {/* 2. Instant Video Stream iFrame (Guaranteed 100% Full Bleed Edge-To-Edge Video with ZERO Letterbox Black Bars on ALL Cards) */}
                {videoId && (
                  <div className="absolute inset-0 z-30 overflow-hidden flex items-center justify-center pointer-events-none">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1&enablejsapi=1&start=${startSec}${endSec ? `&end=${endSec}` : ""}`}
                      title={displayTitle}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      style={{
                        height: "120%",
                        aspectRatio: "16/9",
                        minWidth: isActive ? "170%" : "550%"
                      }}
                      className="object-cover border-0 pointer-events-none origin-center transform scale-110"
                    />
                  </div>
                )}

                {/* Multi-Layer Dark Vignette Overlays */}
                {isActive ? (
                  <>
                    {/* Bottom-to-Top Dark Gradient for crisp text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none z-35 transition-opacity duration-300" />
                    {/* Soft Top Ambient Shadow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none z-35" />

                    {/* Retro + Grainy Film Overlay Effect */}
                    <div className="absolute inset-0 pointer-events-none z-38 overflow-hidden">
                      {/* 1. Real Analogue Film Grain Noise Layer */}
                      <div 
                        className="absolute inset-0 opacity-[0.22] mix-blend-overlay pointer-events-none"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "repeat",
                        }}
                      />
                      {/* 2. Vintage CRT Scanlines Overlay */}
                      <div 
                        className="absolute inset-0 opacity-[0.15] pointer-events-none"
                        style={{
                          background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.35) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))",
                          backgroundSize: "100% 4px, 6px 100%"
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`absolute inset-0 transition-opacity duration-300 pointer-events-none z-35 ${absDiff === 1 ? "bg-black/40 group-hover:bg-black/20" : "bg-black/60 group-hover:bg-black/30"}`} />
                    {/* Subtle Film Grain for side cards */}
                    <div 
                      className="absolute inset-0 opacity-[0.16] mix-blend-overlay pointer-events-none z-36"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "repeat"
                      }}
                    />
                  </>
                )}

                {/* Overlay Details (Active Video) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ delay: 0.2 }}
                      className="absolute inset-0 z-40 p-6 md:p-8 flex flex-col justify-between pointer-events-none"
                    >
                      {/* Top Badge & Live Indicator */}
                      <div className="flex justify-between items-start">
                        <span className={`px-4 py-1.5 ${isHomePage ? "rounded-none" : "rounded-full"} bg-black/70 backdrop-blur-xl border border-white/20 text-[10px] uppercase font-mono tracking-[3px] text-white/90 shadow-lg flex items-center gap-1.5`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          {channelName}
                        </span>
                      </div>

                      {/* Bottom Title & Dynamic Views */}
                      <div className="flex flex-col gap-2">
                        <h3 className="font-serif text-2xl md:text-4xl font-bold text-white shadow-black drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] leading-tight tracking-tight line-clamp-2">
                          {displayTitle}
                        </h3>
                        <div className="flex items-center gap-2 text-white/80 text-xs font-mono tracking-widest uppercase font-semibold">
                          <Eye className="w-4 h-4 text-white/80" />
                          <span>{displayViews} views</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  </div>
);
};

