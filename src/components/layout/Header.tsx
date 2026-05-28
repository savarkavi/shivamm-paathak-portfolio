"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MdLocationPin } from "react-icons/md";
import TransitionLink from "./TransitionLink";
import { useHeroScene } from "@/components/sections/hero/HeroSceneContext";

gsap.registerPlugin(useGSAP);

type AnimatedLabelProps = {
  label: string;
  className?: string;
};

const AnimatedHeaderLabel = ({ label, className }: AnimatedLabelProps) => {
  const rootRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const originals = root.querySelectorAll<HTMLElement>(
        "[data-char-original]",
      );
      const duplicates = root.querySelectorAll<HTMLElement>(
        "[data-char-duplicate]",
      );

      gsap.set(originals, { yPercent: 0 });
      gsap.set(duplicates, { yPercent: 100 });

      const animateIn = () => {
        gsap.killTweensOf([originals, duplicates]);

        gsap.to(originals, {
          yPercent: -100,
          duration: 0.45,
          stagger: 0.03,
          ease: "power2.out",
        });

        gsap.to(duplicates, {
          yPercent: 0,
          duration: 0.45,
          stagger: 0.03,
          ease: "power2.out",
        });
      };

      const animateOut = () => {
        gsap.killTweensOf([originals, duplicates]);

        gsap.to(originals, {
          yPercent: 0,
          duration: 0.45,
          stagger: 0.03,
          ease: "power2.out",
        });

        gsap.to(duplicates, {
          yPercent: 100,
          duration: 0.45,
          stagger: 0.03,
          ease: "power2.out",
        });
      };

      root.addEventListener("mouseenter", animateIn);
      root.addEventListener("mouseleave", animateOut);

      return () => {
        root.removeEventListener("mouseenter", animateIn);
        root.removeEventListener("mouseleave", animateOut);
      };
    },
    { scope: rootRef },
  );

  return (
    <span
      ref={rootRef}
      className={`inline-flex items-center ${className ?? ""}`}
      aria-label={label}
    >
      {Array.from(label).map((char, index) => {
        const value = char === " " ? "\u00A0" : char;

        return (
          <span
            key={`${char}-${index}`}
            className="relative inline-block overflow-hidden align-top"
            aria-hidden="true"
          >
            <span data-char-original className="block">
              {value}
            </span>
            <span data-char-duplicate className="absolute inset-0 block">
              {value}
            </span>
          </span>
        );
      })}
    </span>
  );
};

const Header = () => {
  const { isGlyphScene, toggleScene } = useHeroScene();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div
      className={`relative z-60 hidden w-full flex-wrap items-center justify-between gap-3 border-dashed border-gray-400 px-4 py-2 leading-4 ${
        isGlyphScene && isHome ? "text-[#2d4dff]" : "text-white"
      } uppercase lg:fixed lg:flex lg:px-6`}
    >
      <div className="-ml-2 flex items-center select-none">
        <div>
          {isHome ? (
            <p>
              Based in{" "}
              <span className="inline-flex items-center gap-1">
                India <MdLocationPin className="inline" />
              </span>
            </p>
          ) : (
            <Link href="/" className="flex items-center gap-1 text-base">
              <span aria-hidden="true">&larr;</span>
              <AnimatedHeaderLabel label="Back Home" />
            </Link>
          )}
        </div>
      </div>
      <TransitionLink href="/archive" className="text-base">
        <AnimatedHeaderLabel label="[Works]" />
      </TransitionLink>
      <TransitionLink href="/about" className="text-base">
        <AnimatedHeaderLabel label="[Profile]" />
      </TransitionLink>
      <TransitionLink href="#" className="text-base">
        <AnimatedHeaderLabel label="[Store]" />
      </TransitionLink>
      {isHome && (
        <button
          type="button"
          onClick={toggleScene}
          className="group flex cursor-pointer items-center gap-2 text-base"
          aria-pressed={isGlyphScene}
          aria-label="Toggle hero glyph effect"
        >
          <span>[Glyph]</span>
          <span className="relative h-4 w-8 rounded-full border border-current transition-colors duration-300 group-hover:bg-current/10">
            <span
              className={`absolute top-1/2 left-0 h-2 w-2 -translate-y-1/2 rounded-full bg-current transition-transform duration-300 ${
                isGlyphScene ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </span>
        </button>
      )}
    </div>
  );
};

export default Header;
