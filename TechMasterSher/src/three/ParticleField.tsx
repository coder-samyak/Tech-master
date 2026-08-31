import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  scrollProgress: number;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  scrollProgress,
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  /*
   * Keep particle count low.
   * This is a decorative background, so 40 particles
   * are enough for the visual effect.
   */
  const count = 40;

  const scrollRef = useRef(scrollProgress);

  /*
   * Keep the latest scroll value without causing
   * unnecessary React renders inside the particle system.
   */
  scrollRef.current = scrollProgress;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const white = new THREE.Color("#ffffff");
    const blue = new THREE.Color("#00E5FF");
    const purple = new THREE.Color("#aa3bff");

    for (let i = 0; i < count; i++) {
      /*
       * Random spherical distribution.
       */
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(
        2 * Math.random() - 1
      );

      const radius =
        Math.cbrt(Math.random()) * 8;

      const sinPhi = Math.sin(phi);

      pos[i * 3] =
        radius *
        sinPhi *
        Math.cos(theta);

      pos[i * 3 + 1] =
        radius *
        sinPhi *
        Math.sin(theta);

      pos[i * 3 + 2] =
        radius *
        Math.cos(phi);

      /*
       * Particle color distribution.
       */
      const random = Math.random();

      const color =
        random > 0.66
          ? blue
          : random > 0.33
            ? purple
            : white;

      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }

    return [pos, cols];
  }, []);

  /*
   * Geometry is created only once.
   */
  const geometry = useMemo(() => {
    const geo =
      new THREE.BufferGeometry();

    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(
        positions,
        3
      )
    );

    geo.setAttribute(
      "color",
      new THREE.BufferAttribute(
        colors,
        3
      )
    );

    return geo;
  }, [positions, colors]);

  /*
   * Material is created only once.
   */
  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.055,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  /*
   * Animation runs directly on the Three.js object.
   * No React state updates happen here.
   */
  useFrame((state) => {
    const points = pointsRef.current;

    if (!points) return;

    const time =
      state.clock.getElapsedTime();

    points.rotation.y =
      time * 0.025;

    points.rotation.x =
      Math.sin(time * 0.02) * 0.08;

    /*
     * Lightweight scroll parallax.
     */
    points.position.y =
      -scrollRef.current * 2;
  });

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      material={material}
      frustumCulled={true}
    />
  );
};