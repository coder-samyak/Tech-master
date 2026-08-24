import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis with ultra-smooth momentum config
    const lenis = new Lenis({
      duration: 1.4,
      lerp: 0.08,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2.0,
      infinite: false,
    });

    // Update ScrollTrigger on scroll
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Sync Lenis RAF with GSAP Ticker
    const gsapTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(gsapTicker);
    gsap.ticker.lagSmoothing(0);

    // Provide global access to lenis if needed
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(gsapTicker);
    };
  }, []);

  return <div ref={scrollRef}>{children}</div>;
};
