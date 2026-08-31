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
    return (
        <Canvas
            camera={{
                position: [0, 0, 5],
                fov: 45,
            }}
            dpr={[1, 1.5]}
            frameloop="always"
            gl={{
                antialias: false,
                alpha: true,
                powerPreference: "high-performance",
                preserveDrawingBuffer: false,
            }}
            performance={{
                min: 0.5,
                max: 1,
                debounce: 200,
            }}
        >
            <Suspense fallback={null}>
                {/* Lightweight ambient lighting */}
                <ambientLight intensity={0.2} />

                {/* Main key light */}
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={1.5}
                    color="#ffffff"
                    castShadow={false}
                />

                {/* Soft fill light */}
                <directionalLight
                    position={[-5, -5, -5]}
                    intensity={0.5}
                    color="#00E5FF"
                />

                {/* Golden accent */}
                <pointLight
                    position={[2, 3, 2]}
                    intensity={2}
                    distance={10}
                    color="#D4AF37"
                />

                {/* Purple accent */}
                <pointLight
                    position={[-2, -3, 2]}
                    intensity={2.5}
                    distance={10}
                    color="#aa3bff"
                />

                <GlassSphere
                    scrollProgress={scrollProgress}
                    mouse={mouse}
                />

                <ParticleField
                    scrollProgress={scrollProgress}
                />
            </Suspense>
        </Canvas>
    );
};

export default ThreeScene;