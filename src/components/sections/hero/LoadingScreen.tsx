"use client";

import UnicornScene from "unicornstudio-react/next";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { UNICORN_STUDIO_SDK_URL } from "@/lib/unicorn";

gsap.registerPlugin(useGSAP);

interface LoadingScreenProps {
  isLoaded: boolean;
  onIntroComplete: () => void;
}

const LoadingScreen = ({ isLoaded, onIntroComplete }: LoadingScreenProps) => {
  const [show, setShow] = useState(true);
  const [showIntroScene, setShowIntroScene] = useState(true);
  const [showLoadingCopy, setShowLoadingCopy] = useState(true);
  const [isIntroSceneLoaded, setIsIntroSceneLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const loadingTextRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!isIntroSceneLoaded) return;

    gsap
      .timeline({
        onComplete: () => {
          setShowIntroScene(false);
          setShowLoadingCopy(false);
          onIntroComplete();
        },
      })
      .to(sceneRef.current, {
        opacity: 1,
        duration: 1.2,
        delay: 1,
        ease: "power2.out",
      })
      .to(sceneRef.current, {
        opacity: 1,
        duration: 3,
      })
      .to(
        titleRef.current,
        {
          y: 0,
          duration: 1.2,
          ease: "power3.inOut",
        },
        ">",
      )
      .to(
        loadingTextRef.current,
        {
          y: 0,
          duration: 1.2,
          ease: "power3.inOut",
        },
        "<",
      )
      .to(
        sceneRef.current,
        {
          opacity: 0,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "<",
      );
  }, [isIntroSceneLoaded]);

  useGSAP(() => {
    if (!isLoaded) return;

    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => setShow(false),
    });
  }, [isLoaded]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-100 flex h-dvh flex-col items-center justify-center bg-black"
    >
      {showIntroScene && (
        <div
          ref={sceneRef}
          className="absolute h-screen w-full bg-black opacity-0"
        >
          <UnicornScene
            projectId="tyj5qecyYkVUtNrUIidl"
            production={true}
            scale={1}
            dpi={1}
            onLoad={() => setIsIntroSceneLoaded(true)}
            sdkUrl={UNICORN_STUDIO_SDK_URL}
          />
        </div>
      )}

      {showLoadingCopy && (
        <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 flex -translate-1/2 flex-col items-center gap-4">
          <p
            ref={titleRef}
            className={`text-center text-xl font-bold tracking-[0.35em] uppercase md:text-3xl`}
            style={{
              transform: showIntroScene ? "translateY(-38vh)" : "translateY(0)",
            }}
          >
            Shivamm Paathak
          </p>
          <p
            ref={loadingTextRef}
            className={`text-sm font-bold tracking-[0.3em] uppercase`}
            style={{
              transform: showIntroScene ? "translateY(38vh)" : "translateY(0)",
            }}
          >
            Studio
          </p>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;
