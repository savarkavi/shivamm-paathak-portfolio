"use client";

import { useState, useEffect } from "react";
import { MdLocationPin } from "react-icons/md";
import { CiGlobe } from "react-icons/ci";
import { VscLinkExternal } from "react-icons/vsc";
import Link from "next/link";

// bg-linear-to-b to-transparent before:absolute before:inset-0 before:-z-10 before:mask-[linear-gradient(to_bottom,black_90%,transparent)] before:backdrop-blur-lg

const Header = () => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-60 flex w-full flex-wrap items-center justify-between gap-3 px-4 py-2 text-sm leading-4 font-bold text-white uppercase lg:px-12">
      <div>
        <p>
          Based in{" "}
          <span className="inline-flex items-center gap-1 text-white/50">
            India <MdLocationPin className="inline" />
          </span>
        </p>
        <p className="flex flex-col">
          <span>
            Available{" "}
            <span className="inline-flex items-center gap-1 text-white/50">
              worldwide <CiGlobe className="inline" />
            </span>
          </span>
          {time && (
            <span className="mt-1 font-mono tracking-widest text-white/50">
              {time} IST
            </span>
          )}
        </p>
      </div>
      <div className="flex flex-col">
        <p className="text-base">[Works]</p>
        <Link href="#" className="text-white/50 underline hover:text-white/80">
          Spotlight
        </Link>
        <Link href="#" className="text-white/50 underline hover:text-white/80">
          Archive
        </Link>
      </div>
      <div className="flex flex-col">
        <p className="text-base">[Profile]</p>
        <Link href="#" className="text-white/50 underline hover:text-white/80">
          About
        </Link>
        <Link href="#" className="text-white/50 underline hover:text-white/80">
          BTS
        </Link>
      </div>
      <div className="flex flex-col">
        <p className="text-base">[Socials]</p>
        <Link href="#" className="text-white/50 underline hover:text-white/80">
          Instagram <VscLinkExternal className="inline size-3" />
        </Link>
        <Link href="#" className="text-white/50 underline hover:text-white/80">
          Youtube <VscLinkExternal className="inline size-3" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
