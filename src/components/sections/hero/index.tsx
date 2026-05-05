"use client";

import { useState } from "react";
import { anton } from "@/fonts";
import UnicornScene from "unicornstudio-react/next";
import HeroFooter from "./HeroFooter";
import HeroTextMobile from "./HeroTextMobile";
import LoadingScreen from "./LoadingScreen";

const Hero = () => {
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <LoadingScreen isLoaded={isSceneLoaded} />
      <UnicornScene
        projectId="uuFN3TIxyJS1Ve3Pz1Rq"
        scale={1}
        dpi={1}
        className="absolute left-0 w-full [@media(min-height:1051px)]:top-20"
        onLoad={() => setIsSceneLoaded(true)}
        sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.11/dist/unicornStudio.umd.js"
      />
      <HeroTextMobile />
      <div
        className={`${anton.className} absolute top-1/2 left-6 z-30 hidden -translate-y-1/2 flex-col text-white md:flex`}
      >
        <div className="flex w-full items-center gap-3">
          <p className="scale-y-120 text-3xl">2015</p>
          <div className="h-1 w-full bg-white" />
        </div>
        <p
          className={`${anton.className} scale-y-120 text-[5rem] leading-26 tracking-wide text-white uppercase xl:text-[7rem] xl:leading-40 2xl:text-[9rem] 2xl:leading-50 [@media(min-width:1920px)]:text-[11rem]`}
        >
          Shivamm
        </p>
        <div className="flex w-full items-center gap-3">
          <div className="h-1 w-full bg-white" />
          <p className="shrink-0 scale-y-110 bg-white px-2 text-lg text-black uppercase">
            Fine art photographer
          </p>
          <div className="h-1 w-full bg-white" />
        </div>
      </div>
      <div
        className={`${anton.className} absolute top-1/2 right-6 z-30 hidden -translate-y-1/2 flex-col text-white uppercase md:flex`}
      >
        <div className="flex w-full items-center gap-3">
          <div className="h-1 w-full bg-white" />
          <p className="scale-y-120 text-3xl">Now</p>
        </div>
        <p
          className={`${anton.className} scale-y-120 text-[5rem] leading-26 tracking-wide text-white uppercase xl:text-[7rem] xl:leading-40 2xl:text-[9rem] 2xl:leading-50 [@media(min-width:1920px)]:text-[11rem]`}
        >
          Paathak
        </p>
        <div className="flex w-full items-center gap-3">
          <div className="h-1 w-full bg-white" />
          <p className="shrink-0 scale-y-110 bg-white px-2 text-lg text-black uppercase">
            Creative director
          </p>
          <div className="h-1 w-full bg-white" />
        </div>
      </div>
      <HeroFooter />
    </div>
  );
};

export default Hero;
