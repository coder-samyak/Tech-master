import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { GlassSphere } from "./GlassSphere";
import { ParticleField } from "./ParticleField";

interface ThreeSceneProps {
    mouse: React.MutableRefObject<{
        x: number;
        y: number;
    }>;
    scrollProgress: number;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({
    mouse,
    scrollProgress,
}) => {
    const isMobile =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 768px)").matches;

    const reducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return (
        <Canvas
            camera={{
                position: [0, 0, 5],
                fov: 45,
            }}
            /*
             * Lower DPR reduces GPU workload significantly on
             * Retina / high-density displays.
             */
            dpr={isMobile ? [0.6, 1] : [0.75, 1.25]}
            /*
             * Keep continuous rendering because GlassSphere
             * has a subtle animation.
             */
            frameloop="always"
            gl={{
                antialias: false,
                alpha: true,
                powerPreference: "high-performance",
                preserveDrawingBuffer: false,
                depth: true,
                stencil: false,
            }}
            performance={{
                min: 0.5,
                max: 1,
                debounce: 250,
            }}
            /*
             * Avoid unnecessary canvas interaction calculations.
             */
            events={undefined}
        >
            <Suspense fallback={null}>
                {/* Lightweight ambient light */}
                <ambientLight intensity={0.18} />

                {/* Main key light */}
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={1.1}
                    color="#ffffff"
                    castShadow={false}
                />

                {/* Cyan fill */}
                <directionalLight
                    position={[-5, -5, -5]}
                    intensity={0.35}
                    color="#00E5FF"
                    castShadow={false}
                />

                {/* Gold accent */}
                <pointLight
                    position={[2, 3, 2]}
                    intensity={1.5}
                    distance={8}
                    color="#D4AF37"
                />

                {/* Purple accent */}
                <pointLight
                    position={[-2, -3, 2]}
                    intensity={1.4}
                    distance={8}
                    color="#aa3bff"
                />

                {/* Main 3D logo */}
                <GlassSphere
                    scrollProgress={scrollProgress}
                    mouse={mouse}
                />

                {/* Particles are unnecessary with reduced motion.
            Mobile can also skip them to reduce GPU usage. */}
                {!isMobile && !reducedMotion && (
                    <ParticleField
                        scrollProgress={scrollProgress}
                    />
                )}
            </Suspense>
        </Canvas>
    );
};

export default ThreeScene;