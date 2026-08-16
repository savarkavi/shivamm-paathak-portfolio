"use client";

import { useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import TransitionLink from "./TransitionLink";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { bebasNeue } from "@/fonts";
import { useHeroScene } from "@/components/sections/hero/HeroSceneContext";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

const NAV_ITEMS = [
  { label: "Works", href: "/archive" },
  { label: "Profile", href: "/about" },
  { label: "Store", href: "#" },
];

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isGlyphScene } = useHeroScene();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const overlayRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLAnchorElement[]>([]);
  const dividerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const setNavItemRef = useCallback(
    (index: number) => (el: HTMLAnchorElement | null) => {
      if (el) navItemsRef.current[index] = el;
    },
    [],
  );

  useGSAP(
    () => {
      if (!overlayRef.current) return;

      if (tlRef.current) {
        tlRef.current.kill();
      }

      if (isOpen) {
        const tl = gsap.timeline();
        tlRef.current = tl;

        tl.fromTo(
          overlayRef.current,
          {
            clipPath: "circle(0% at calc(100% - 40px) 28px)",
            opacity: 0,
          },
          {
            clipPath: "circle(150% at calc(100% - 40px) 28px)",
            opacity: 1,
            duration: 0.7,
            ease: "power3.inOut",
          },
        )
          .fromTo(
            dividerRef.current,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.3",
          )
          .fromTo(
            navItemsRef.current,
            {
              y: 40,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.08,
              ease: "power3.out",
            },
            "-=0.3",
          )
          .fromTo(
            closeRef.current,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.3,
              ease: "back.out(1.7)",
            },
            "-=0.2",
          );
      } else {
        const tl = gsap.timeline({
          onComplete: () => {
            if (overlayRef.current) {
              gsap.set(overlayRef.current, { opacity: 0 });
            }
          },
        });
        tlRef.current = tl;

        tl.to(navItemsRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.3,
          stagger: 0.04,
          ease: "power2.in",
        })
          .to(
            closeRef.current,
            {
              opacity: 0,
              scale: 0.8,
              duration: 0.2,
              ease: "power2.in",
            },
            "<",
          )
          .to(overlayRef.current, {
            clipPath: "circle(0% at calc(100% - 40px) 28px)",
            duration: 0.5,
            ease: "power3.inOut",
          });
      }
    },
    { dependencies: [isOpen], scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      {/* Fixed Header Bar */}
      <div className="fixed top-0 right-0 left-0 z-100 flex items-center justify-between px-4 py-3 lg:hidden">
        {/* Logo / Back Link */}
        <div
          className={`flex w-full items-center justify-between gap-4 ${isGlyphScene && isHome ? "text-[#2d4dff]" : "text-white"}`}
        >
          {isHome ? (
            <>
              {/* <button
                type="button"
                onClick={toggleScene}
                className="group flex items-center gap-2"
                aria-pressed={isGlyphScene}
                aria-label="Toggle hero glyph effect"
              >
                <span className="text-xs tracking-[0.18em] uppercase">Glyph</span>
                <span className="relative h-4 w-8 rounded-full border border-current transition-colors duration-300 group-hover:bg-white/15">
                  <span
                    className={`absolute top-1/2 left-0 h-2 w-2 -translate-y-1/2 rounded-full bg-current transition-transform duration-300 ${
                      isGlyphScene ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </span>
              </button> */}
              <Image
                src="/shivamm-paathak-logo.png"
                alt="Shivamm Paathak logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
            </>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-1 tracking-[0.18em] uppercase"
            >
              <span>←</span>
              <span>Back Home</span>
            </Link>
          )}

          {/* Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2"
            aria-label="Open menu"
          >
            <span className="text-base tracking-[0.2em] uppercase">Menu</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current transition-colors duration-300 group-hover:bg-white">
              <span className="block h-1 w-1 rounded-full bg-current transition-colors duration-300 group-hover:bg-black" />
            </span>
          </button>
        </div>
      </div>

      {/* Overlay Menu */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-200 flex flex-col opacity-0 lg:hidden"
        style={{
          clipPath: "circle(0% at calc(100% - 40px) 28px)",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
          backdropFilter: "blur(24px) saturate(1.4)",
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
        }}
      >
        {/* Subtle glass border effect */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        />

        {/* Close Button — top right */}
        <div className="flex items-center justify-end px-4 py-3">
          <button
            ref={closeRef}
            onClick={() => setIsOpen(false)}
            className="group flex items-center gap-2 text-white opacity-0"
            aria-label="Close menu"
          >
            <span className="text-xs font-bold tracking-[0.2em] uppercase">
              Close
            </span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/60 transition-colors duration-300 group-hover:bg-white">
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                className="text-white transition-colors duration-300 group-hover:text-black"
              >
                <line
                  x1="1"
                  y1="1"
                  x2="7"
                  y2="7"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <line
                  x1="7"
                  y1="1"
                  x2="1"
                  y2="7"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="mx-6 h-px origin-left bg-white/10"
          style={{ transform: "scaleX(0)" }}
        />

        {/* Nav Items */}
        <nav className="flex flex-1 flex-col items-center justify-center gap-8">
          {NAV_ITEMS.map((item, index) => (
            <TransitionLink
              key={item.label}
              href={item.href}
              ref={setNavItemRef(index)}
              onClick={() => setIsOpen(false)}
              className={`${bebasNeue.className} group relative text-4xl tracking-[0.15em] text-black uppercase opacity-0`}
            >
              <span className="relative inline-block">
                {item.label}
                {/* Underline on hover */}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-white/50 transition-all duration-300 group-hover:w-full" />
              </span>
            </TransitionLink>
          ))}
        </nav>

        {/* Bottom line / tagline */}
        <div className="px-6 pb-8 text-center">
          <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase">
            Fine art photographer & Creative director
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
