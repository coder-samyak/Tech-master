import React, { useRef, useMemo } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const LionShaderMaterial = shaderMaterial(
  { uTexture: null, uOpacity: 0.85 },
  // vertex shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // fragment shader
  `
  uniform sampler2D uTexture;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    
    // Discard transparent background pixels so no black bounding box is drawn
    if (texColor.a < 0.08) {
      discard;
    }

    // Discard faint semi-transparent dark compression boundary noise
    float brightness = max(texColor.r, max(texColor.g, texColor.b));
    if (texColor.a < 0.6 && brightness < 0.15) {
      discard;
    }

    // Preserve the exact golden 3D tone from reference image
    vec3 lionColor = clamp(texColor.rgb * 0.60, 0.0, 1.0);

    gl_FragColor = vec4(lionColor, texColor.a * uOpacity);
  }
  `
);

extend({ LionShaderMaterial });

interface GlassSphereProps {
  scrollProgress: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

export const GlassSphere: React.FC<GlassSphereProps> = ({ scrollProgress, mouse }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const texture = useMemo(() => {
    const tex = new THREE.TextureLoader().load("/Tech MAster Logo.png");
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, []);

  // Keep tracking refs for smooth lerping
  const currentScaleRef = useRef(1);
  const currentScrollProgressRef = useRef(0);

  // Memoize geometry
  const geometry = useMemo(() => new THREE.PlaneGeometry(3.5, 3.5), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    currentScrollProgressRef.current = THREE.MathUtils.lerp(
      currentScrollProgressRef.current,
      scrollProgress,
      0.15
    );
    const smoothScroll = currentScrollProgressRef.current;

    // Gentle wobble rotation instead of full orbit so the logo stays facing the camera
    meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.15;
    meshRef.current.rotation.x = Math.cos(time * 0.3) * 0.1;

    // Scroll-based parallax and scale adjustments
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const isTablet = typeof window !== "undefined" && window.innerWidth >= 768 && window.innerWidth < 1024;
    const responsiveFactor = isMobile ? 0.48 : (isTablet ? 0.8 : 1.0);

    // React to mouse movement (lerped for smoothness) - perfectly centered on mobile
    const targetX = isMobile ? 0 : (mouse.current.x * 0.35);
    // Position Lion logo perfectly centered vertically and horizontally within the hero banner on mobile
    const targetY = isMobile ? 0.05 : (-0.65 + mouse.current.y * 0.2);

    // If mesh is brand new, set position immediately to avoid slow initial drift
    if (meshRef.current.position.y === 0 && meshRef.current.position.x === 0) {
      meshRef.current.position.x = targetX;
      meshRef.current.position.y = targetY;
    } else {
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.15);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.15);
    }

    // Scale down to 0 at the bottom, scale up to full on scroll up
    const targetScale = Math.max(0, 1.0 - smoothScroll) * responsiveFactor;
    currentScaleRef.current = THREE.MathUtils.lerp(currentScaleRef.current, targetScale, 0.2);
    meshRef.current.scale.setScalar(currentScaleRef.current);

    // Opacity fades to 0 at the bottom in sync with scale
    const targetOpacity = Math.max(0, 0.95 * (1.0 - smoothScroll));
    // @ts-ignore
    if (meshRef.current.material && meshRef.current.material.uniforms) {
      // @ts-ignore
      meshRef.current.material.uniforms.uOpacity.value = THREE.MathUtils.lerp(
        // @ts-ignore
        meshRef.current.material.uniforms.uOpacity.value,
        targetOpacity,
        0.2
      );
    }

    // Very gentle floating bounce
    const bounce = Math.sin(time * 0.3) * 0.04;
    meshRef.current.position.y += bounce * 0.01;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -0.65, 0]} castShadow receiveShadow>
      {/* @ts-ignore */}
      <lionShaderMaterial 
        uTexture={texture} 
        uOpacity={0.95} 
        transparent={true} 
        side={THREE.DoubleSide} 
        depthWrite={false}
      />
    </mesh>
  );
};
