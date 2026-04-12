/* eslint-disable react-hooks/purity */
import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const vertexShader = `
  uniform float uTime;
  uniform float uSizeMultiplier;
  
  attribute float aRandom;
  attribute float aSize;
  
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    
    // Save the exact radius distance so we can snap it back later
    float originalRadius = length(position); 

    // Calculate turbulence
    float noiseFreq = 2.5;
    float noiseAmp = 2.4; // We can make this higher now because it won't break the shape!
    vec3 noisePos = vec3(pos.x * noiseFreq + uTime * 0.2, pos.y * noiseFreq + uTime * 0.3, pos.z * noiseFreq + uTime * 0.1);
    
    // Displace the particle wildly
    pos.x += sin(noisePos.y) * noiseAmp * aRandom;
    pos.y += cos(noisePos.z) * noiseAmp * aRandom;
    pos.z += sin(noisePos.x) * noiseAmp * aRandom;

    // THE FIX: normalize(pos) gets the direction, then we multiply by originalRadius 
    // to snap it exactly back onto the mathematical surface of the sphere.
    pos = normalize(pos) * originalRadius;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    gl_PointSize = aSize * (uSizeMultiplier / -mvPosition.z);
    vAlpha = aRandom;
  }
`;

const fragmentShader = `
  uniform float uEdgeWidth;
  uniform float uMaxOpacity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;

  varying float vAlpha;

  void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    if (distanceToCenter > 0.5) discard;
    
    float alpha = smoothstep(0.5, 0.5 - uEdgeWidth, distanceToCenter) * vAlpha * uMaxOpacity;
    vec3 color = mix(uColor1, uColor2, vAlpha);
    
    gl_FragColor = vec4(color, alpha);
  }
`;

interface AshOrbProps {
  count?: number;
  radius?: number;
  sizeMultiplier?: number;
  edgeWidth?: number;
  maxOpacity?: number;
  glowColor1?: string;
  glowColor2?: string;
}

const AshOrb: React.FC<AshOrbProps> = ({
  count = 25000,
  radius = 2,
  sizeMultiplier = 45.0,
  edgeWidth = 0.3,
  maxOpacity = 0.35,
  glowColor1 = "#ff3300",
  glowColor2 = "#ffaa00",
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const smoothedMouse = useRef({ x: 0, y: 0 });

  // 1. Generate Particle Geometry Data (PERFECT SHELL)
  const [positions, sizes, randoms] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const randoms = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      // Points strictly on the radius boundary
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      sizes[i] = Math.random() * 1.5 + 0.5;
      randoms[i] = Math.random();
    }

    return [positions, sizes, randoms];
  }, [count, radius]);

  // 2. Uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSizeMultiplier: { value: sizeMultiplier },
      uEdgeWidth: { value: edgeWidth },
      uMaxOpacity: { value: maxOpacity },
      uColor1: { value: new THREE.Color(glowColor1) },
      uColor2: { value: new THREE.Color(glowColor2) },
    }),
    [edgeWidth, glowColor1, glowColor2, maxOpacity, sizeMultiplier],
  );

  // Sync props to uniforms dynamically
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uSizeMultiplier.value = sizeMultiplier;
      materialRef.current.uniforms.uEdgeWidth.value = edgeWidth;
      materialRef.current.uniforms.uMaxOpacity.value = maxOpacity;
      materialRef.current.uniforms.uColor1.value.set(glowColor1);
      materialRef.current.uniforms.uColor2.value.set(glowColor2);
    }
  }, [sizeMultiplier, edgeWidth, maxOpacity, glowColor1, glowColor2]);

  // 3. Smooth Mouse Tracking
  useGSAP(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const targetX = (event.clientX / window.innerWidth) * 2 - 1;
      const targetY = (event.clientY / window.innerHeight) * 2 - 1;

      gsap.to(smoothedMouse.current, {
        x: targetX,
        y: targetY,
        duration: 2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 4. Frame Loop
  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }

    if (pointsRef.current) {
      // Swirl the whole sphere
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;

      // Parallax movement based on mouse (keeps the sphere intact)
      pointsRef.current.position.x = smoothedMouse.current.x * 0.15;
      pointsRef.current.position.y = -smoothedMouse.current.y * 0.15;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
      </bufferGeometry>

      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default AshOrb;
