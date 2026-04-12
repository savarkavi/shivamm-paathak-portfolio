import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function LoadingOverlay({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ onComplete });

      tl.to(
        ".line-element",
        {
          backgroundColor: "#ffffff",
          opacity: 1,
          stagger: {
            amount: 3,
          },
          ease: "none",
        },
        0,
      );

      const proxy = { value: 0 };
      tl.to(
        proxy,
        {
          value: 100,
          duration: 3,
          ease: "none",
          onUpdate: () => {
            if (progressRef.current) {
              progressRef.current.innerText = Math.round(
                proxy.value,
              ).toString();
            }
          },
        },
        0,
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute bottom-10 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-6"
    >
      <div className="flex items-center gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="line-element h-px w-4 rounded-full bg-white/20"
          />
        ))}
      </div>
      <div className="flex items-baseline font-mono text-3xl font-light tracking-widest text-white">
        <span ref={progressRef}>0</span>
        <span className="ml-1 text-2xl opacity-75">%</span>
      </div>
    </div>
  );
}
