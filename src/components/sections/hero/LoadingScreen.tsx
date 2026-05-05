"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { inconsolata } from "@/fonts";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

interface LoadingScreenProps {
  isLoaded: boolean;
}

const LoadingScreen = ({ isLoaded }: LoadingScreenProps) => {
  const [show, setShow] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isLoaded) return;

    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      delay: 1,
      ease: "power2.inOut",
      onComplete: () => setShow(false),
    });
  }, [isLoaded]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-100 flex flex-col items-center justify-center bg-black"
    >
      <div className="relative h-100 w-100 lg:h-180 lg:w-180 xl:h-200 xl:w-200">
        <Image
          src="/intro_glow2.gif"
          alt="black hole"
          fill
          className="object-cover"
          priority
        />
      </div>
      <p
        className={`${inconsolata.className} mt-4 text-sm tracking-[0.3em] text-white/60`}
      >
        LOADING...
      </p>
    </div>
  );
};

export default LoadingScreen;
