"use client";

import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import { useTexture, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { extend } from "@react-three/fiber";
import IntroContent from "./IntroContent";

const DistortionMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uMouse: new THREE.Vector2(0.5, 0.5),
    uHoverValue: 0,
    uTime: 0,
    uImageResolution: new THREE.Vector2(1.0, 1.0),
    uResolution: new THREE.Vector2(1.0, 1.0),
  },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform sampler2D uTexture;
    uniform vec2 uMouse;
    uniform float uHoverValue;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uImageResolution;

    varying vec2 vUv;

    void main() {
      vec2 ratio = vec2(
        min((uResolution.x / uResolution.y) / (uImageResolution.x / uImageResolution.y), 1.0),
        min((uResolution.y / uResolution.x) / (uImageResolution.y / uImageResolution.x), 1.0)
      );

      vec2 uv = vec2(
        vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
      );

      float dist = distance(uv, uMouse);
      float intensity = smoothstep(0.4, 0.0, dist) * uHoverValue;
      
      vec2 distortedUv = uv;
      distortedUv.x += sin(uv.y * 20.0 + uTime * 2.0) * 0.01 * intensity;
      distortedUv.y += cos(uv.x * 20.0 + uTime * 2.0) * 0.01 * intensity;

      float r = texture2D(uTexture, distortedUv + vec2(0.01 * intensity, 0.0)).r;
      float g = texture2D(uTexture, distortedUv).g;
      float b = texture2D(uTexture, distortedUv - vec2(0.01 * intensity, 0.0)).b;

      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `,
);

extend({ DistortionMaterial });

type DistortionMaterialImpl = THREE.ShaderMaterial & {
  uTime: number;
  uHoverValue: number;
  uMouse: THREE.Vector2;
  uImageResolution: THREE.Vector2;
  uResolution: THREE.Vector2;
};

const DistortedImageMesh = () => {
  const materialRef = useRef<DistortionMaterialImpl>(null);
  const texture = useTexture("/intro-img.jpg");
  const { viewport, size } = useThree();
  const [hovered, setHover] = useState(false);
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uHoverValue = THREE.MathUtils.lerp(
        materialRef.current.uHoverValue,
        hovered ? 1 : 0,
        delta * 6,
      );
      materialRef.current.uMouse.lerp(targetMouse.current, delta * 12);

      if (texture.image) {
        const image = texture.image as HTMLImageElement;
        materialRef.current.uImageResolution.set(image.width, image.height);
      }
      materialRef.current.uResolution.set(size.width, size.height);
    }
  });

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    // Scale standard screen coordinates to UV format if needed, but R3F uv passes directly normalized
    if (e.uv) {
      targetMouse.current.set(e.uv.x, e.uv.y);
    }
  };

  return (
    <mesh
      onPointerMove={handlePointerMove}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[viewport.width, viewport.height]} />
      {/* @ts-expect-error React Three Fiber custom elements type issue */}
      <distortionMaterial ref={materialRef} uTexture={texture} />
    </mesh>
  );
};

const Intro = () => {
  const tl = useRef<gsap.core.Timeline>(null);

  const { contextSafe } = useGSAP(() => {
    tl.current = gsap
      .timeline()
      .to(".intro-title", { opacity: 1, duration: 0.1, repeat: 4 })
      .to(".intro-text, .intro-button", { opacity: 1, duration: 0.2 }, "<")
      .to(".image-canvas", { opacity: 0.8, ease: "none" });
  });
  const [isMounted, setIsMounted] = useState(true);

  const handleEnterClick = () => {
    const animate = contextSafe(() => {
      if (tl.current) {
        tl.current.reverse().eventCallback("onReverseComplete", () => {
          gsap.to("#intro-container", {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => setIsMounted(false),
          });
        });
      }
    });

    animate();
  };

  if (!isMounted) return null;

  return (
    <div
      id="intro-container"
      className="fixed top-0 left-0 z-99 flex h-screen w-full flex-col items-center justify-center gap-8 bg-black text-white"
    >
      <IntroContent onEnterClick={handleEnterClick} />
      <div className="image-canvas absolute top-0 left-0 -z-50 h-screen w-full opacity-0">
        <Canvas>
          <DistortedImageMesh />
        </Canvas>
      </div>
    </div>
  );
};

export default Intro;
