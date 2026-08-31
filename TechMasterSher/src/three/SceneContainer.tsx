import React, { Suspense, lazy, useEffect, useRef, useState } from "react";

const ThreeScene = lazy(() => import("./ThreeScene.tsx"));

interface SceneContainerProps { }

export const SceneContainer: React.FC<SceneContainerProps> = () => {
  const mouse = useRef({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [shouldLoad, setShouldLoad] = useState(false);

  /*
   * Delay WebGL initialization until the main page has had
   * a chance to render its important HTML/content first.
   */
  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const loadScene = () => {
      setShouldLoad(true);
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(loadScene, {
        timeout: 2000,
      });
    } else {
      timeoutId = setTimeout(loadScene, 1200);
    }

    return () => {
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  /*
   * Mouse tracking without React re-renders.
   */
  useEffect(() => {
    let animationFrame = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrame) return;

      animationFrame = requestAnimationFrame(() => {
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;

        animationFrame = 0;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  /*
   * Throttle scroll updates using requestAnimationFrame.
   * This prevents React from rendering on every scroll event.
   */
  useEffect(() => {
    let animationFrame = 0;

    const handleScroll = () => {
      if (animationFrame) return;

      animationFrame = requestAnimationFrame(() => {
        const totalScroll =
          document.documentElement.scrollHeight - window.innerHeight;

        if (totalScroll > 0) {
          setScrollProgress(
            Math.min(1, Math.max(0, window.scrollY / totalScroll))
          );
        }

        animationFrame = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-screen pointer-events-none bg-transparent"
      style={{
        zIndex: 2,
        contain: "layout paint",
      }}
      aria-hidden="true"
    >
      {shouldLoad && (
        <Suspense fallback={null}>
          <ThreeScene
            mouse={mouse}
            scrollProgress={scrollProgress}
          />
        </Suspense>
      )}
    </div>
  );
};