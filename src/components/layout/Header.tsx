"use client";

import { usePathname } from "next/navigation";
import { MdLocationPin } from "react-icons/md";
import TransitionLink from "./TransitionLink";
import { useHeroScene } from "@/components/sections/hero/HeroSceneContext";
import Link from "next/link";

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
      <div className="-ml-2 flex items-center">
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
              <span>←</span>
              <span>Back Home</span>
            </Link>
          )}
        </div>
      </div>
      <TransitionLink href="/archive">
        <p className="text-base">[Works]</p>
      </TransitionLink>
      <TransitionLink href="/about">
        <p className="text-base">[Profile]</p>
      </TransitionLink>

      <TransitionLink href="#">
        <p className="text-base">[Store]</p>
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
