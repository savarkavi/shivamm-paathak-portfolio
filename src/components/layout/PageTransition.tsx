"use client";

import { useRef } from "react";
import { inconsolata } from "@/fonts";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";

gsap.registerPlugin(useGSAP);

const PageTransition = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const whiteRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const white = whiteRef.current;
      const black = blackRef.current;
      const wrapper = wrapperRef.current;

      if (!white || !black || !wrapper) return;

      // Skip transition on home page
      if (pathname === "/") {
        gsap.set(white, { clipPath: "inset(0% 0% 100% 0%)" });
        gsap.set(black, { clipPath: "inset(0% 0% 100% 0%)" });
        gsap.set(wrapper, { pointerEvents: "none" });
        return;
      }

      // Both layers start fully visible (covering the screen)
      gsap.set(wrapper, { pointerEvents: "all" });
      gsap.set(white, { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(black, { clipPath: "inset(0% 0% 0% 0%)" });

      // Exit timeline — after 2s delay:
      // 1. Black slides out upward
      // 2. White slides out upward (staggered)
      const tl = gsap.timeline({
        delay: 2,
        onComplete: () => {
          gsap.set(wrapper, { pointerEvents: "none" });
        },
      });

      tl.to(black, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1,
        ease: "power4.inOut",
      }).to(
        white,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1,
          ease: "power4.inOut",
        },
        "-=0.8",
      );
    },
    { dependencies: [pathname] },
  );

  const isHome = pathname === "/";
  const initialClip = isHome ? "inset(0% 0% 100% 0%)" : "inset(0% 0% 0% 0%)";

  return (
    <div
      id="page-transition"
      ref={wrapperRef}
      className="pointer-events-none fixed inset-0 z-9999"
    >
      {/* White layer — behind black */}
      <div
        id="transition-white"
        ref={whiteRef}
        className="absolute inset-0 bg-white"
        style={{ clipPath: initialClip }}
      />

      {/* Black layer — on top with logo */}
      <div
        id="transition-black"
        ref={blackRef}
        className="absolute inset-0 flex items-center justify-center bg-black"
        style={{ clipPath: initialClip }}
      >
        {/* Logo + Text at center */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative mb-2 h-20 w-20">
            <Image
              src="/shivamm-logo.svg"
              alt="Shivamm Paathak Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <p
            className={`${inconsolata.className} text-center text-sm font-light tracking-[0.35em] text-white/80 uppercase`}
          >
            Shivamm Paathak Studios
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageTransition;
