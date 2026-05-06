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
    <div className="top-0 left-0 z-60 hidden w-full flex-wrap items-center justify-between gap-3 px-4 py-2 text-sm leading-4 font-bold text-white uppercase lg:fixed lg:flex lg:px-12">
      <div>
        <p>
          Based in{" "}
          <span className="inline-flex items-center gap-1">
            India <MdLocationPin className="inline" />
          </span>
        </p>
        {/* <p className="flex flex-col">
          {time && (
            <span className="mt-1 font-mono tracking-widest text-white/50">
              {time} IST
            </span>
          )}
        </p> */}
      </div>
      <Link href="/archive">
        <p className="text-base">[Works]</p>
      </Link>
      <Link href="#">
        <p className="text-base">[Profile]</p>
      </Link>
      <Link href="#">
        <p className="text-base">[Store]</p>
      </Link>
    </div>
  );
};

export default Header;
