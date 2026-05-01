"use client";

import { useEffect, useState, useRef } from "react";
import { justMeAGain } from "@/fonts";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface LoadingScreenProps {
  isLoaded: boolean;
}

const LoadingScreen = ({ isLoaded }: LoadingScreenProps) => {
  const [show, setShow] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const progressObj = useRef({ value: 0 });

  const { contextSafe } = useGSAP(
    () => {
      gsap.to(progressObj.current, {
        value: 99,
        duration: 3,
        ease: "power1.out",
        onUpdate: () => {
          if (textRef.current) {
            textRef.current.innerText = Math.round(progressObj.current.value)
              .toString()
              .padStart(2, "0");
          }
        },
      });
    },
    { scope: containerRef },
  );

  useEffect(() => {
    if (isLoaded) {
      const runComplete = contextSafe(() => {
        gsap.killTweensOf(progressObj.current);

        const tl = gsap.timeline({
          onComplete: () => setShow(false),
        });

        tl.to(progressObj.current, {
          value: 100,
          duration: 0.5,
          ease: "power2.out",
          onUpdate: () => {
            if (textRef.current) {
              textRef.current.innerText = Math.round(progressObj.current.value)
                .toString()
                .padStart(2, "0");
            }
          },
        })
          .to(
            textRef.current,
            {
              opacity: 0,
              duration: 0.6,
              ease: "power2.inOut",
            },
            "+=0.2",
          )
          .to(
            containerRef.current,
            {
              opacity: 0,
              duration: 0.8,
              ease: "power2.inOut",
            },
            "-=0.4",
          );
      });

      runComplete();
    }
  }, [isLoaded, contextSafe]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-100 flex items-center justify-center bg-black font-light`}
    >
      <p
        ref={textRef}
        className={`${justMeAGain.className} scale-y-150 text-[15rem] leading-none font-light tracking-wider text-white`}
      >
        00
      </p>
    </div>
  );
};

export default LoadingScreen;
