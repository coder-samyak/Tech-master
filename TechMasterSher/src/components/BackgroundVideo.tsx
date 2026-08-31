import React, { useCallback, useEffect, useRef } from "react";

/**
 * PERFORMANCE-OPTIMIZED BACKGROUND VIDEO
 *
 * Main improvements:
 * - Only ONE video is loaded initially.
 * - preload="none"
 * - Videos are loaded only when required.
 * - No GSAP / ScrollTrigger.
 * - No React re-render on every scroll.
 * - Next video is preloaded only near the transition point.
 * - Video playback starts after the browser gets a chance to render the page.
 * - Old videos are unloaded to reduce memory/network pressure.
 */

interface VideoTrio {
  hero: string;
  mid: string;
  feature: string;
}

/* -------------------------------------------------------------------------- */
/* VIDEO LIBRARY                                                              */
/* -------------------------------------------------------------------------- */

const pageVideos: Record<string, VideoTrio> = {
  home: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-fluid-flow-43224-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-abstract-dark-waves-fluid-loop-43093-large.mp4",
    feature:
      "https://assets.mixkit.co/videos/preview/mixkit-liquid-smoke-swirling-background-43031-large.mp4",
  },

  about: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-abstract-dark-waves-fluid-loop-43093-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-liquid-smoke-swirling-background-43031-large.mp4",
    feature:
      "https://assets.mixkit.co/videos/preview/mixkit-glowing-neon-connections-loop-42861-large.mp4",
  },

  journey: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-fluid-flow-43224-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-abstract-dark-waves-fluid-loop-43093-large.mp4",
    feature:
      "https://assets.mixkit.co/videos/preview/mixkit-glowing-bokeh-particles-floating-slowly-43048-large.mp4",
  },

  mission: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-glowing-neon-connections-loop-42861-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-abstract-lines-glowing-neon-lights-42880-large.mp4",
    feature:
      "https://assets.mixkit.co/videos/preview/mixkit-liquid-fluid-shifting-refractions-43242-large.mp4",
  },

  "what-we-do": {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-digital-connection-lines-glowing-in-dark-42898-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-liquid-fluid-shifting-refractions-43242-large.mp4",
    feature:
      "https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-fluid-flow-43224-large.mp4",
  },

  services: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-glowing-neon-connections-loop-42861-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-abstract-lines-glowing-neon-lights-42880-large.mp4",
    feature:
      "https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-technology-particles-background-42998-large.mp4",
  },

  collaborations: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-digital-connection-lines-glowing-in-dark-42898-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-fluid-flow-43224-large.mp4",
    feature:
      "https://assets.mixkit.co/videos/preview/mixkit-liquid-smoke-swirling-background-43031-large.mp4",
  },

  campaigns: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-aurora-borealis-lights-glowing-in-dark-sky-43187-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-glowing-bokeh-particles-floating-slowly-43048-large.mp4",
    feature:
      "https://assets.mixkit.co/videos/preview/mixkit-abstract-ink-smoke-spreading-in-water-43075-large.mp4",
  },

  "product-launches": {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-aurora-borealis-lights-glowing-in-dark-sky-43187-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-fluid-flow-43224-large.mp4",
    feature:
      "https://assets.mixkit.co/videos/preview/mixkit-digital-connection-lines-glowing-in-dark-42898-large.mp4",
  },

  events: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-beams-in-dark-background-42940-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-glowing-neon-connections-loop-42861-large.mp4",
    feature:
      "https://assets.mixkit.co/videos/preview/mixkit-abstract-lines-glowing-neon-lights-42880-large.mp4",
  },

  portfolio: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-technology-particles-background-42998-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-digital-connection-lines-glowing-in-dark-42898-large.mp4",
    feature:
      "https://assets.mixkit.co/videos/preview/mixkit-liquid-fluid-shifting-refractions-43242-large.mp4",
  },

  gallery: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-liquid-smoke-swirling-background-43031-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-liquid-fluid-shifting-refractions-43242-large.mp4",
    feature:
      "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-beams-in-dark-background-42940-large.mp4",
  },

  media: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-beams-in-dark-background-42940-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-glowing-neon-connections-loop-42861-large.mp4",
    feature:
      "https://assets.mixkit.co/videos/preview/mixkit-abstract-lines-glowing-neon-lights-42880-large.mp4",
  },

  testimonials: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-glowing-bokeh-particles-floating-slowly-43048-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-abstract-ink-smoke-spreading-in-water-43075-large.mp4",
    feature:
      "https://assets.mixkit.co/videos/preview/mixkit-liquid-fluid-shifting-refractions-43242-large.mp4",
  },

  career: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-abstract-lines-glowing-neon-lights-42880-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-technology-particles-background-42998-large.mp4",
    feature:
      "https://assets.mixkit.co/videos/preview/mixkit-digital-connection-lines-glowing-in-dark-42898-large.mp4",
  },

  blog: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-abstract-ink-smoke-spreading-in-water-43075-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-liquid-fluid-shifting-refractions-43242-large.mp4",
    feature:
      "https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-fluid-flow-43224-large.mp4",
  },

  faq: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-liquid-fluid-shifting-refractions-43242-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-abstract-ink-smoke-spreading-in-water-43075-large.mp4",
    feature:
      "https://assets.mixkit.co/videos/preview/mixkit-glowing-neon-connections-loop-42861-large.mp4",
  },

  contact: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-glowing-bokeh-particles-floating-slowly-43048-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-aurora-borealis-lights-glowing-in-dark-sky-43187-large.mp4",
    feature:
      "https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-fluid-flow-43224-large.mp4",
  },
};

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

const getVideos = (page: string): VideoTrio => {
  return pageVideos[page] || pageVideos.home;
};

const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const isMobileDevice = (): boolean => {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(max-width: 768px)").matches;
};

/* -------------------------------------------------------------------------- */
/* COMPONENT                                                                  */
/* -------------------------------------------------------------------------- */

interface BackgroundVideoProps {
  activePage: string;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  activePage,
}) => {
  const videoARef = useRef<HTMLVideoElement | null>(null);
  const videoBRef = useRef<HTMLVideoElement | null>(null);

  const activeVideoRef = useRef<"A" | "B">("A");

  const loadedSourcesRef = useRef<Set<string>>(new Set());

  const currentPageRef = useRef(activePage);

  const currentVideosRef = useRef<VideoTrio>(getVideos(activePage));

  const scrollFrameRef = useRef<number | null>(null);

  const preloadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [heroLoaded, setHeroLoaded] = React.useState(false);

  /* ------------------------------------------------------------------------ */
  /* LOAD VIDEO                                                               */
  /* ------------------------------------------------------------------------ */

  const loadVideo = useCallback(
    (
      video: HTMLVideoElement | null,
      src: string,
      shouldPlay: boolean = false
    ) => {
      if (!video || !src) return;

      if (video.src === src || loadedSourcesRef.current.has(src)) {
        if (shouldPlay) {
          video.play().catch(() => { });
        }

        return;
      }

      video.src = src;
      video.preload = "metadata";

      loadedSourcesRef.current.add(src);

      video.load();

      if (shouldPlay) {
        const playWhenReady = () => {
          video
            .play()
            .catch(() => { })
            .finally(() => {
              video.removeEventListener("canplay", playWhenReady);
            });
        };

        video.addEventListener("canplay", playWhenReady, {
          once: true,
        });
      }
    },
    []
  );

  /* ------------------------------------------------------------------------ */
  /* PAGE CHANGE                                                              */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    currentPageRef.current = activePage;

    const videos = getVideos(activePage);

    currentVideosRef.current = videos;

    activeVideoRef.current = "A";

    setHeroLoaded(false);

    const videoA = videoARef.current;
    const videoB = videoBRef.current;

    if (videoA) {
      videoA.pause();
      videoA.removeAttribute("src");
      videoA.load();

      videoA.style.opacity = "0";
      videoA.style.transform = "scale(1)";
    }

    if (videoB) {
      videoB.pause();
      videoB.removeAttribute("src");
      videoB.load();

      videoB.style.opacity = "0";
      videoB.style.transform = "scale(1)";
    }

    loadedSourcesRef.current.clear();

    /*
     * IMPORTANT:
     * Do not load video during the first critical render.
     *
     * Let browser paint the website first.
     */
    const startLoadingHero = () => {
      const currentVideo = videoARef.current;

      if (!currentVideo) return;

      loadVideo(currentVideo, videos.hero, true);

      currentVideo.style.opacity = "0.25";

      setHeroLoaded(true);
    };

    /*
     * Mobile gets slightly more delay because mobile CPUs/network
     * are much more sensitive to heavy video decoding.
     */
    const delay = isMobileDevice() ? 1800 : 1000;

    preloadTimerRef.current = setTimeout(() => {
      if ("requestIdleCallback" in window) {
        (
          window as Window & {
            requestIdleCallback?: (
              callback: () => void,
              options?: { timeout: number }
            ) => number;
          }
        ).requestIdleCallback?.(startLoadingHero, {
          timeout: 2500,
        });
      } else {
        startLoadingHero();
      }
    }, delay);

    return () => {
      if (preloadTimerRef.current) {
        clearTimeout(preloadTimerRef.current);
      }
    };
  }, [activePage, loadVideo]);

  /* ------------------------------------------------------------------------ */
  /* PRELOAD NEXT VIDEO                                                       */
  /* ------------------------------------------------------------------------ */

  const preloadNextVideo = useCallback(
    (nextVideo: "mid" | "feature") => {
      const videos = currentVideosRef.current;

      const nextSrc = videos[nextVideo];

      if (!nextSrc) return;

      if (loadedSourcesRef.current.has(nextSrc)) return;

      const inactiveVideo =
        activeVideoRef.current === "A"
          ? videoBRef.current
          : videoARef.current;

      loadVideo(inactiveVideo, nextSrc, false);
    },
    [loadVideo]
  );

  /* ------------------------------------------------------------------------ */
  /* SWITCH VIDEO                                                             */
  /* ------------------------------------------------------------------------ */

  const switchVideo = useCallback(
    (target: "mid" | "feature") => {
      const videos = currentVideosRef.current;

      const targetSrc = videos[target];

      if (!targetSrc) return;

      const currentActive = activeVideoRef.current;

      const currentVideo =
        currentActive === "A" ? videoARef.current : videoBRef.current;

      const nextVideo =
        currentActive === "A" ? videoBRef.current : videoARef.current;

      if (!nextVideo) return;

      /*
       * If target is already loaded in current video, don't reload.
       */
      if (
        nextVideo.src !== targetSrc &&
        !loadedSourcesRef.current.has(targetSrc)
      ) {
        loadVideo(nextVideo, targetSrc, false);
      }

      /*
       * Wait until enough data is available.
       */
      const performSwitch = () => {
        if (currentPageRef.current !== activePage) return;

        nextVideo.currentTime = 0;

        nextVideo
          .play()
          .catch(() => { });

        nextVideo.style.opacity = "0.25";
        nextVideo.style.transform = "scale(1.03)";

        if (currentVideo) {
          currentVideo.style.opacity = "0";
        }

        activeVideoRef.current = currentActive === "A" ? "B" : "A";

        nextVideo.removeEventListener("canplay", performSwitch);
      };

      if (nextVideo.readyState >= 3) {
        performSwitch();
      } else {
        nextVideo.addEventListener("canplay", performSwitch, {
          once: true,
        });
      }
    },
    [activePage, loadVideo]
  );

  /* ------------------------------------------------------------------------ */
  /* SCROLL HANDLER                                                           */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    let lastProgress = -1;

    const handleScroll = () => {
      if (scrollFrameRef.current !== null) return;

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null;

        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;

        if (maxScroll <= 0) return;

        const progress = Math.min(
          1,
          Math.max(0, window.scrollY / maxScroll)
        );

        /*
         * Avoid unnecessary DOM work.
         */
        if (Math.abs(progress - lastProgress) < 0.01) {
          return;
        }

        lastProgress = progress;

        const activeVideo =
          activeVideoRef.current === "A"
            ? videoARef.current
            : videoBRef.current;

        if (activeVideo) {
          /*
           * Very light parallax.
           *
           * We intentionally keep this tiny.
           * Large transforms cause expensive GPU work.
           */
          const scale = 1 + progress * 0.025;
          const translateY = progress * -15;

          activeVideo.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
        }

        /*
         * Preload next video BEFORE transition.
         *
         * This means browser has time to download it.
         */
        if (progress >= 0.12 && progress < 0.42) {
          preloadNextVideo("mid");
        }

        if (progress >= 0.50 && progress < 0.85) {
          preloadNextVideo("feature");
        }

        /*
         * Switch around the middle of each scroll zone.
         */
        if (progress >= 0.40 && progress < 0.55) {
          switchVideo("mid");
        }

        if (progress >= 0.80) {
          switchVideo("feature");
        }
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (scrollFrameRef.current !== null) {
        cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }
    };
  }, [preloadNextVideo, switchVideo]);

  /* ------------------------------------------------------------------------ */
  /* CLEANUP                                                                  */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    return () => {
      if (preloadTimerRef.current) {
        clearTimeout(preloadTimerRef.current);
      }

      const videoA = videoARef.current;
      const videoB = videoBRef.current;

      [videoA, videoB].forEach((video) => {
        if (!video) return;

        video.pause();
        video.removeAttribute("src");
        video.load();
      });
    };
  }, []);

  /* ------------------------------------------------------------------------ */
  /* RENDER                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <div
      className="fixed inset-0 w-full h-screen pointer-events-none bg-[#030303] overflow-hidden"
      style={{
        zIndex: 1,
        contain: "strict",
      }}
      aria-hidden="true"
    >
      {/* ------------------------------------------------------------------ */}
      {/* VIDEO A                                                            */}
      {/* ------------------------------------------------------------------ */}

      <video
        ref={videoARef}
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: heroLoaded ? 0.25 : 0,
          transform: "translate3d(0,0,0) scale(1)",
          transition: "opacity 700ms ease, transform 900ms ease",
          willChange: "opacity, transform",
          backfaceVisibility: "hidden",
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* VIDEO B                                                            */}
      {/* ------------------------------------------------------------------ */}

      <video
        ref={videoBRef}
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: 0,
          transform: "translate3d(0,0,0) scale(1)",
          transition: "opacity 700ms ease, transform 900ms ease",
          willChange: "opacity, transform",
          backfaceVisibility: "hidden",
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* DARK OVERLAY                                                        */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #030303 0%, transparent 45%, rgba(3,3,3,0.82) 100%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(3,3,3,0.18), transparent 50%, rgba(3,3,3,0.18))",
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* MOBILE DARKENING                                                    */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="absolute inset-0 pointer-events-none md:hidden"
        style={{
          background: "rgba(0,0,0,0.12)",
        }}
      />
    </div>
  );
};