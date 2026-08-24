import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { GlassSphere } from "./GlassSphere";
import { ParticleField } from "./ParticleField";

interface SceneContainerProps {}

export const SceneContainer: React.FC<SceneContainerProps> = () => {
  const mouse = useRef({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse positions to range [-1, 1]
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 w-full h-screen pointer-events-none bg-transparent"
      style={{ zIndex: 2 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Cinematic Studio Lighting */}
        <ambientLight intensity={0.2} />
        
        {/* Main dramatic key light */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
          color="#ffffff"
          castShadow
        />

        {/* Soft fill light */}
        <directionalLight
          position={[-5, -5, -5]}
          intensity={0.5}
          color="#00E5FF"
        />

        {/* Golden accent glowing point light */}
        <pointLight
          position={[2, 3, 2]}
          intensity={2.0}
          distance={10}
          color="#D4AF37"
        />

        {/* Purple glow backing */}
        <pointLight
          position={[-2, -3, 2]}
          intensity={2.5}
          distance={10}
          color="#aa3bff"
        />

        {/* Render 3D Objects based on the current page context */}
        
        {/* Render the Logo (GlassSphere) on all pages */}
        <GlassSphere scrollProgress={scrollProgress} mouse={mouse} />
        
        {/* ParticleField rendered once globally */}
        <ParticleField scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};
