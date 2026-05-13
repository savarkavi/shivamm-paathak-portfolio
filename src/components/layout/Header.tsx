"use client";

import { useState, useEffect } from "react";
import { MdLocationPin } from "react-icons/md";
import TransitionLink from "./TransitionLink";
import Link from "next/link";
import Image from "next/image";

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
    <div className="relative z-60 hidden w-full flex-wrap items-center justify-between gap-3 border-b border-dashed border-gray-400 px-4 leading-4 font-bold text-white uppercase lg:fixed lg:flex lg:px-6">
      <div className="-ml-2 flex items-center">
        <div>
          <p>
            Based in{" "}
            <span className="inline-flex items-center gap-1">
              India <MdLocationPin className="inline" />
            </span>
          </p>
          <p className="flex flex-col">
            {time && (
              <span className="mt-1 font-mono tracking-widest">{time} IST</span>
            )}
          </p>
        </div>
      </div>
      <TransitionLink href="/archive">
        <p className="text-base">[Works]</p>
      </TransitionLink>
      <Link href="/">
        <div className="relative h-14 w-14">
          <Image
            src="/shivamm-logo.svg"
            alt="logo"
            fill
            className="object-cover"
          />
        </div>
      </Link>
      <TransitionLink href="/about">
        <p className="text-base">[Profile]</p>
      </TransitionLink>
      <TransitionLink href="#">
        <p className="text-base">[Store]</p>
      </TransitionLink>
    </div>
  );
};

export default Header;
