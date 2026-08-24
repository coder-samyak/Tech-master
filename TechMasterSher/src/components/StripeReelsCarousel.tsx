import React, { useState, useCallback, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { mediaUrl } from "../utils/media";

interface StripeReelsCarouselProps {
  reels: any[];
  isHomePage?: boolean;
}

const stripeEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];
const transitionSettings = {
  duration: 0.75,
  ease: stripeEasing,
};

function getEmbedUrl(url: string): { type: "youtube" | "instagram" | "direct"; embedUrl?: string; instId?: string } {
  if (!url) return { type: "direct" };

  let ytId: string | null = null;
  if (url.includes("youtube.com/shorts/")) {
    const parts = url.split("youtube.com/shorts/");
    if (parts[1]) ytId = parts[1].split(/[?#]/)[0];
  } else if (url.includes("youtu.be/")) {
    const parts = url.split("youtu.be/");
    if (parts[1]) ytId = parts[1].split(/[?#]/)[0];
  } else if (url.includes("youtube.com/watch")) {
    const match = url.match(/[?&]v=([^&#]+)/);
    if (match) ytId = match[1];
  }

  if (ytId) {
    return {
      type: "youtube",
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1&enablejsapi=1`
    };
  }

  if (url.includes("instagram.com/reel/") || url.includes("instagram.com/p/") || url.includes("/reel/")) {
    let instId: string | null = null;
    const match = url.match(/\/reel\/([^/?#]+)/) || url.match(/\/p\/([^/?#]+)/);
    if (match) instId = match[1];

    if (instId) {
      return {
        type: "instagram",
        instId,
        embedUrl: `https://www.instagram.com/reel/${instId}/embed/?autoplay=1`
      };
    }
  }

  return { type: "direct" };
}

const DEFAULT_REELS = [
  { id: 'sr-1', title: 'Tech Master Viral Short', url: 'https://youtube.com/shorts/YP4CdON5rrQ?si=DOx4bPZIJPpc2LSa', videoUrl: 'https://youtube.com/shorts/YP4CdON5rrQ?si=DOx4bPZIJPpc2LSa', author: '@techmasterhq', handle: '@techmasterhq', channelName: 'Tech Master', views: '5.4M views', category: 'Short' },
  { id: 'sr-2', title: 'Tech Master Official Video', url: 'https://www.youtube.com/watch?v=3VuyriEkDwg', videoUrl: 'https://www.youtube.com/watch?v=3VuyriEkDwg', author: '@techmasterhq', handle: '@techmasterhq', channelName: 'Tech Master', views: '3.8M views', category: 'Short' },
  { id: 'sr-3', title: 'Tech Master Exclusive Showcase', url: 'https://youtu.be/vW2K0L-vUgw?si=4KrnU7BeuuZIlO97', videoUrl: 'https://youtu.be/vW2K0L-vUgw?si=4KrnU7BeuuZIlO97', author: '@techmasterhq', handle: '@techmasterhq', channelName: 'Tech Master', views: '4.2M views', category: 'Short' },
  { id: 'sr-4', title: 'Tech Master Instagram Reel #1', url: 'https://www.instagram.com/reel/DAs7dOoyU9d/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', videoUrl: 'https://www.instagram.com/reel/DAs7dOoyU9d/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', author: '@techmasterco', handle: '@techmasterco', channelName: 'Tech Master', views: '1.8M views', category: 'Reel' },
  { id: 'sr-5', title: 'Trendz Talk Pop Reel', url: 'https://www.instagram.com/reel/DGdKcjNymR4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', videoUrl: 'https://www.instagram.com/reel/DGdKcjNymR4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', author: '@trendztalk', handle: '@trendztalk', channelName: 'Trendz Talk', views: '2.4M views', category: 'Reel' },
  { id: 'sr-6', title: 'Master Wheels High-Speed Breakdown', url: 'https://youtu.be/iVGAICmKlpk?si=cL_9koXbTowODWEx', videoUrl: 'https://youtu.be/iVGAICmKlpk?si=cL_9koXbTowODWEx', author: '@masterwheel1', handle: '@masterwheel1', channelName: 'Master Wheels', views: '3.2M views', category: 'Short' },
  { id: 'sr-7', title: 'Next Univerz Masterclass', url: 'https://www.youtube.com/watch?v=oXr9B3Hg4fo', videoUrl: 'https://www.youtube.com/watch?v=oXr9B3Hg4fo', author: '@NextUniverz', handle: '@NextUniverz', channelName: 'Next Univerz', views: '2.7M views', category: 'Short' },
  { id: 'sr-8', title: 'Full Circle Creator Story', url: 'https://www.instagram.com/reel/Da1kOKEqys7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', videoUrl: 'https://www.instagram.com/reel/Da1kOKEqys7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', author: '@fullcircle_in', handle: '@fullcircle_in', channelName: 'Full Circle', views: '950K views', category: 'Reel' },
  { id: 'sr-9', title: 'Tech Master Hardware Teardown', url: 'https://www.youtube.com/watch?v=pGdwMZ_O_0A', videoUrl: 'https://www.youtube.com/watch?v=pGdwMZ_O_0A', author: '@techmasterhq', handle: '@techmasterhq', channelName: 'Tech Master', views: '8.4M views', category: 'Short' },
  { id: 'sr-10', title: 'Pop Tech Short-Form Reel', url: 'https://youtube.com/shorts/gP7t0_5qMa4?si=1A54F_DsBGGlaPPF', videoUrl: 'https://youtube.com/shorts/gP7t0_5qMa4?si=1A54F_DsBGGlaPPF', author: '@trendztalk', handle: '@trendztalk', channelName: 'Trendz Talk', views: '9.1M views', category: 'Short' },
  { id: 'sr-11', title: 'Automotive Tech Special', url: 'https://youtu.be/Wnid6auAxbE?si=mJKMPlZLMcCTLnuz', videoUrl: 'https://youtu.be/Wnid6auAxbE?si=mJKMPlZLMcCTLnuz', author: '@masterwheel1', handle: '@masterwheel1', channelName: 'Master Wheels', views: '4.1M views', category: 'Short' },
  { id: 'sr-12', title: 'Developer Deep Dive', url: 'https://www.youtube.com/watch?v=uMW9UyONsOk', videoUrl: 'https://www.youtube.com/watch?v=uMW9UyONsOk', author: '@NextUniverz', handle: '@NextUniverz', channelName: 'Next Univerz', views: '2.2M views', category: 'Short' },
  { id: 'sr-14', title: 'Viral Pop Culture Tech', url: 'https://www.instagram.com/reel/DCRQiCgyu5W/?igsh=ZGVyMTRnOGpqNDVi', videoUrl: 'https://www.instagram.com/reel/DCRQiCgyu5W/?igsh=ZGVyMTRnOGpqNDVi', author: '@trendztalk', handle: '@trendztalk', channelName: 'Trendz Talk', views: '3.1M views', category: 'Reel' },
  { id: 'sr-15', title: 'Full Circle Podcast Highlight', url: 'https://youtu.be/iNtv0Yl1DB4?si=TTeocdaRSPQnL8_U', videoUrl: 'https://youtu.be/iNtv0Yl1DB4?si=TTeocdaRSPQnL8_U', author: '@fullcircle_in', handle: '@fullcircle_in', channelName: 'Full Circle', views: '1.9M views', category: 'Short' },
  { id: 'sr-16', title: 'Tech Master Cinematic Reveal', url: 'https://www.youtube.com/watch?v=CaNEbx-Kwzc', videoUrl: 'https://www.youtube.com/watch?v=CaNEbx-Kwzc', author: '@techmasterhq', handle: '@techmasterhq', channelName: 'Tech Master', views: '4.4M views', category: 'Short' },
  { id: 'sr-17', title: 'Future Gadget Breakdown', url: 'https://www.youtube.com/watch?v=ClgRNy0QBWk', videoUrl: 'https://www.youtube.com/watch?v=ClgRNy0QBWk', author: '@techmasterhq', handle: '@techmasterhq', channelName: 'Tech Master', views: '3.9M views', category: 'Short' },
  { id: 'sr-18', title: 'Supercar Track Telemetry Test', url: 'https://www.youtube.com/watch?v=mAXjgBDK3Gs', videoUrl: 'https://www.youtube.com/watch?v=mAXjgBDK3Gs', author: '@masterwheel1', handle: '@masterwheel1', channelName: 'Master Wheels', views: '7.2M views', category: 'Short' },
  { id: 'sr-19', title: 'Tech Master Instagram Special', url: 'https://www.instagram.com/reel/DW3uoC8CXWf/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', videoUrl: 'https://www.instagram.com/reel/DW3uoC8CXWf/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', author: '@techmasterco', handle: '@techmasterco', channelName: 'Tech Master', views: '2.8M views', category: 'Reel' },
  { id: 'sr-20', title: 'Trendz Talk Pop Reel #2', url: 'https://www.instagram.com/reel/DZHCtuzJzxn/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', videoUrl: 'https://www.instagram.com/reel/DZHCtuzJzxn/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', author: '@trendztalk', handle: '@trendztalk', channelName: 'Trendz Talk', views: '1.7M views', category: 'Reel' },
  { id: 'sr-21', title: 'Full Circle Studio Reel', url: 'https://www.instagram.com/reel/DZt-HodJ94O/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', videoUrl: 'https://www.instagram.com/reel/DZt-HodJ94O/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', author: '@fullcircle_in', handle: '@fullcircle_in', channelName: 'Full Circle', views: '890K views', category: 'Reel' },
  { id: 'sr-22', title: 'Next Univerz Educational Reel', url: 'https://www.instagram.com/reel/DYZnd2FpY7O/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', videoUrl: 'https://www.instagram.com/reel/DYZnd2FpY7O/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', author: '@NextUniverz', handle: '@NextUniverz', channelName: 'Next Univerz', views: '1.4M views', category: 'Reel' },
  { id: 'sr-23', title: 'Master Wheels Track Performance', url: 'https://www.instagram.com/reel/DT7z9b0gTCi/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', videoUrl: 'https://www.instagram.com/reel/DT7z9b0gTCi/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', author: '@masterwheel1', handle: '@masterwheel1', channelName: 'Master Wheels', views: '4.5M views', category: 'Reel' }
];

const CardVideoPlayer: React.FC<{ src: string; isActive: boolean; poster?: string }> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch((err) => {
      console.warn("Video play failed:", err);
    });
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      preload="auto"
      className="w-full h-full object-cover"
    />
  );
};

const InstagramReelPlayer: React.FC<{ instId?: string; embedUrl: string; displayTitle: string; isActive: boolean; poster?: string }> = ({ instId, embedUrl, displayTitle, poster }) => {
  const [useFallback, setUseFallback] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, [instId]);

  if (instId && !useFallback) {
    return (
      <video
        ref={videoRef}
        src={`https://ddinstagram.com/reel/${instId}/video.mp4`}
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        preload="auto"
        onError={() => setUseFallback(true)}
        className="w-full h-full object-cover"
      />
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
      <iframe
        src={`${embedUrl}&autoplay=1&mute=1&loop=1`}
        title={displayTitle}
        className="w-full h-full scale-[2.2] origin-center pointer-events-none border-none bg-black"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        loading="lazy"
      />
    </div>
  );
};

export const StripeReelsCarousel: React.FC<StripeReelsCarouselProps> = ({ reels, isHomePage = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const rawReels = (reels && Array.isArray(reels) && reels.length > 0) ? reels.filter(Boolean) : DEFAULT_REELS;
  const activeReels = rawReels.filter((r: any) => {
    const ch = (r.channelName || r.author || r.handle || r.title || "").toLowerCase();
    return !ch.includes("trendz");
  });

  const changeActiveIndex = (newIndex: number) => {
    if (newIndex === activeIndex) return;
    setActiveIndex(newIndex);
  };

  const handleNext = useCallback(() => {
    if (activeReels.length === 0) return;
    changeActiveIndex((activeIndex + 1) % activeReels.length);
  }, [activeIndex, activeReels.length]);

  const handlePrev = useCallback(() => {
    if (activeReels.length === 0) return;
    changeActiveIndex((activeIndex - 1 + activeReels.length) % activeReels.length);
  }, [activeIndex, activeReels.length]);

  const handleDragEnd = (_e: any, { offset }: PanInfo) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold) {
      handleNext();
    } else if (offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  if (activeReels.length === 0) return null;

  const N = activeReels.length;
  const maxSide = 2; // Show 2 cards on left, 1 active in middle, 2 cards on right
  const numLeft = N <= 1 ? 0 : Math.min(maxSide, Math.floor((N - 1) / 2));
  const numRight = N <= 1 ? 0 : Math.min(maxSide, Math.ceil((N - 1) / 2));

  const offsets: number[] = [];
  for (let i = -numLeft; i <= numRight; i++) {
    offsets.push(i);
  }

  const get3DProps = (offset: number) => {
    const abs = Math.abs(offset);
    if (offset === 0) {
      return { rotateY: 0, scale: 1.0, opacity: 1, zIndex: 50 };
    }
    const sc = abs === 1 ? 0.82 : 0.68;
    const op = abs === 1 ? 0.85 : 0.55;
    return { rotateY: 0, scale: sc, opacity: op, zIndex: 40 - abs };
  };

  return (
    <div className="relative flex flex-col w-full px-2 sm:px-4 md:px-8 pt-2 pb-0 md:pt-4 md:pb-0 max-w-[1600px] mx-auto overflow-hidden items-center justify-center select-none">

      {/* Chevron Navigation Controls */}
      {N > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-1 sm:left-2 md:left-6 z-50 p-2 sm:p-2.5 rounded-full border border-gold/40 hover:border-gold hover:scale-110 bg-black/70 hover:bg-black text-gold backdrop-blur-md transition-all shadow-lg cursor-pointer flex items-center justify-center"
            aria-label="Previous reel"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-1 sm:right-2 md:right-6 z-50 p-2 sm:p-2.5 rounded-full border border-gold/40 hover:border-gold hover:scale-110 bg-black/70 hover:bg-black text-gold backdrop-blur-md transition-all shadow-lg cursor-pointer flex items-center justify-center"
            aria-label="Next reel"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </>
      )}

      {/* Edge Fade Gradients for ultra-smooth blending of outermost cards */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 md:w-28 bg-gradient-to-r from-black via-black/60 to-transparent z-40 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 md:w-28 bg-gradient-to-l from-black via-black/60 to-transparent z-40 pointer-events-none" />

      {/* 3D Coverflow Carousel Track */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ perspective: "1200px" }}
        className="flex flex-row items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3 h-[330px] sm:h-[440px] md:h-[500px] w-full py-2 cursor-grab active:cursor-grabbing relative overflow-hidden"
      >
        {offsets.map((offset) => {
          const originalIndex = (activeIndex + offset + N * 1000) % N;
          const reel = activeReels[originalIndex];
          if (!reel) return null;

          const isActive = offset === 0;
          const absOffset = Math.abs(offset);
          const { rotateY, scale, opacity, zIndex } = get3DProps(offset);

          // Calculate x shift to pull side cards tightly inward, closing empty gaps between card 1 and card 2
          const getXShift = (off: number) => {
            if (off === 0) return 0;
            const abs = Math.abs(off);
            const dir = off < 0 ? 1 : -1;
            if (abs === 1) return dir * 14;
            return dir * 52;
          };
          const xShift = getXShift(offset);

          const targetUrl = (reel.url || reel.videoUrl || "").trim();
          const rawHandle = (reel.username || reel.handle || reel.channelName || reel.author || reel.channel || "").trim();
          const formattedHandle = rawHandle
            ? (rawHandle.startsWith("@") ? rawHandle : `@${rawHandle}`)
            : "";
          const displayTitle = reel.title || reel.name || "";

          const rawViews = String(reel.views || reel.viewCount || "").trim();
          const displayViews = rawViews
            ? rawViews
                .toLowerCase()
                .replace("views", "")
                .replace("likes", "")
                .replace("view", "")
                .replace("like", "")
                .trim()
                .toUpperCase()
            : "";
          const platformLabel = reel.platform === "instagram" ? "Instagram Reel" : "YouTube Short";

          // Smooth GPU Overlay level: center = crisp, sides = subtle dark overlay
          const overlayGlassClass = absOffset === 0
            ? "pointer-events-none"
            : absOffset === 1
              ? "bg-black/20 pointer-events-none transition-all duration-300"
              : "bg-black/35 pointer-events-none transition-all duration-300";

          return (
            <motion.div
              key={reel._id || reel.id || reel.url || originalIndex}
              onClick={() => {
                if (!isActive) {
                  changeActiveIndex(originalIndex);
                } else {
                  if (targetUrl) {
                    window.open(targetUrl, "_blank", "noopener,noreferrer");
                  }
                }
              }}
              initial={false}
              animate={{
                rotateY,
                scale,
                opacity,
                zIndex,
                x: xShift,
              }}
              transition={transitionSettings}
              style={{ transformStyle: "preserve-3d", willChange: "transform" }}
              className={`relative h-[320px] sm:h-[440px] md:h-[490px] w-[185px] sm:w-[240px] md:w-[265px] overflow-hidden cursor-pointer shrink-0 bg-zinc-950 group border transition-all duration-300 ${isHomePage ? "rounded-none" : "rounded-[24px]"
                } ${isHomePage
                  ? isActive
                    ? "border-2 border-black shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
                    : "border border-black/80 hover:border-black opacity-80 hover:opacity-100"
                  : isActive
                    ? "border-gold shadow-[0_25px_60px_rgba(255,215,0,0.25)]"
                    : "border-blue-500/30 hover:border-blue-400/50"
                }`}
            >
              {/* Pointer events overlay to capture drag/click and block iframe interception */}
              <div className="absolute inset-0 z-35 bg-transparent cursor-pointer" />

              {/* Pure Video Element or IFrame - GPU Accelerated for 60fps Smooth Playback */}
              <div
                className="w-full h-full absolute inset-0 z-20 overflow-hidden"
                style={{
                  filter: absOffset === 0 ? "none" : absOffset === 1 ? "blur(3px)" : "blur(6px)",
                  transform: "translateZ(0)"
                }}
              >
                {(() => {
                  const playUrl = (reel.videoUrl || "").trim();
                  const clickUrl = (reel.url || "").trim();

                  const isPlayableDirectVideo = playUrl && 
                    !playUrl.includes("instagram.com") && 
                    !playUrl.includes("youtube.com") && 
                    !playUrl.includes("youtu.be");

                  if (isPlayableDirectVideo) {
                    return <CardVideoPlayer src={mediaUrl(playUrl) || playUrl} isActive={isActive} />;
                  }

                  const embedInfo = getEmbedUrl(clickUrl || playUrl);

                  if (embedInfo.type === "youtube") {
                    return (
                      <iframe
                        src={embedInfo.embedUrl}
                        title={displayTitle}
                        className="w-full h-full object-cover scale-[1.3] pointer-events-none border-none"
                        allow="autoplay; encrypted-media"
                        loading="lazy"
                      />
                    );
                  } else if (embedInfo.type === "instagram") {
                    return (
                      <InstagramReelPlayer
                        instId={embedInfo.instId}
                        embedUrl={embedInfo.embedUrl || ""}
                        displayTitle={displayTitle}
                        isActive={isActive}
                      />
                    );
                  } else if (playUrl) {
                    return <CardVideoPlayer src={mediaUrl(playUrl) || playUrl} isActive={isActive} />;
                  }
                  return null;
                })()}
              </div>

              {/* GPU Glass Blur & Blue Effect Overlay for Side Cards */}
              {absOffset > 0 && (
                <div className={`absolute inset-0 z-30 ${overlayGlassClass}`} />
              )}

              {/* Overlay Gradient at Bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-700 pointer-events-none z-30" />

              {/* Bottom Left Handle Overlay (Shown only on Center and Immediate Side Cards) */}
              {absOffset <= 1 && (
                <div className="absolute bottom-5 left-5 z-40 flex flex-col text-left pointer-events-none transition-opacity duration-300">
                  <span className="text-white font-bold text-sm sm:text-base tracking-wide font-sans drop-shadow-md">
                    {formattedHandle}
                  </span>
                  <span className="text-gray-400 text-[10px] sm:text-xs font-light tracking-wide font-sans drop-shadow-sm mt-0.5">
                    {platformLabel}
                  </span>
                </div>
              )}

              {/* Views Counter & Top Badge */}
              <AnimatePresence>
                {isActive && (
                  <>
                    {/* Top Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: 0.2 }}
                      className="absolute top-4 left-4 z-40 pointer-events-none"
                    >
                      <span className={`px-3 py-1 ${isHomePage ? "rounded-none border-black" : "rounded-full border-white/20"} bg-black/60 backdrop-blur-md border text-[9px] uppercase font-mono tracking-[2px] text-gold shadow-lg`}>
                        Reels & Shorts
                      </span>
                    </motion.div>

                    {/* Views Counter (Bottom Right of Card) */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 0.2 }}
                      className={`absolute bottom-5 right-5 z-40 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-gold/40 rounded-full px-3 py-1 shadow-lg`}
                    >
                      <span className="text-gray-400 text-[9px] uppercase font-mono tracking-[1.5px] font-semibold">VIEWS</span>
                      <span className="text-gold text-xs font-semibold font-mono">{displayViews}</span>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

