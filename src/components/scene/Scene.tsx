"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useMediaQuery } from "usehooks-ts";

import { Canvas } from "@react-three/fiber";
import AshOrb from "./AshOrb";

import LoadingOverlay from "./LoadingOverlay";
import { anton } from "@/fonts";

export default function Scene() {
  const [isMounted, setIsMounted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleLoadingComplete = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => setIsMounted(false),
    });
  };

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      style={{ width: "100vw", height: "100vh", backgroundColor: "#050505" }}
      className="fixed top-0 left-0 z-999"
    >
      <h1
        className={`${anton.className} absolute top-10 left-1/2 -translate-x-1/2 text-2xl text-white uppercase`}
      >
        Shivamm Paathak
      </h1>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <AshOrb
          count={25000}
          radius={isMobile ? 0.8 : 1.4}
          sizeMultiplier={20}
          edgeWidth={0.1}
          maxOpacity={0.5}
          glowColor1="#ffffff"
          glowColor2="#bfbfbf"
        />
      </Canvas>
      <LoadingOverlay onComplete={handleLoadingComplete} />
    </div>
  );
}
