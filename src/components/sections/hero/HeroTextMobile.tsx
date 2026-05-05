"use client";

import { anton } from "@/fonts";

const HeroTextMobile = () => {
  return (
    <div
      className={`${anton.className} absolute top-14 left-1/2 z-30 flex w-full -translate-x-1/2 flex-col items-center text-white uppercase md:hidden`}
    >
      <div className="flex items-center gap-3">
        <p className="scale-y-120 text-2xl">2015</p>
        <div className="h-1 w-8 bg-white" />
        <p className="scale-y-120 text-2xl">Now</p>
      </div>
      <p className="scale-y-120 text-5xl leading-14 tracking-wide">
        Shivamm Paathak
      </p>
      <p className="mt-2 line-clamp-1 bg-white px-2 text-center text-sm text-black uppercase">
        Fine art photographer & Creative director
      </p>
    </div>
  );
};

export default HeroTextMobile;
