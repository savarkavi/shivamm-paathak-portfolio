"use client";

import { useState } from "react";
import { anton } from "@/fonts";
import UnicornScene from "unicornstudio-react";
import HeroFooter from "./HeroFooter";
import LoadingScreen from "./LoadingScreen";

const Hero = () => {
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <LoadingScreen isLoaded={isSceneLoaded} />
      <UnicornScene
        projectId="uuFN3TIxyJS1Ve3Pz1Rq"
        scale={1}
        dpi={1.5}
        production={true}
        sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.9/dist/unicornStudio.umd.js"
        onLoad={() => setIsSceneLoaded(true)}
      />
      <div
        className={`${anton.className} absolute top-1/2 left-6 z-30 flex -translate-y-1/2 flex-col text-white`}
      >
        <div className="flex w-full items-center gap-3">
          <p className="scale-y-120 text-5xl">2015</p>
          <div className="h-1 w-full bg-white" />
        </div>
        <p
          className={`${anton.className} scale-y-120 text-[11rem] leading-60 tracking-wide text-white uppercase`}
        >
          Shivamm
        </p>
        <div className="flex w-full items-center gap-3">
          <div className="h-1 w-full bg-white" />
          <p className="shrink-0 scale-y-110 bg-white px-2 text-xl text-black uppercase">
            Fine art photographer
          </p>
          <div className="h-1 w-full bg-white" />
        </div>
      </div>
      <div
        className={`${anton.className} absolute top-1/2 right-6 z-30 flex -translate-y-1/2 flex-col text-white uppercase`}
      >
        <div className="flex w-full items-center gap-3">
          <div className="h-1 w-full bg-white" />
          <p className="scale-y-120 text-5xl">Now</p>
        </div>
        <p
          className={`${anton.className} scale-y-120 text-[11rem] leading-60 tracking-wide text-white uppercase`}
        >
          Paathak
        </p>
        <div className="flex w-full items-center gap-3">
          <div className="h-1 w-full bg-white" />
          <p className="shrink-0 scale-y-110 bg-white px-2 text-xl text-black uppercase">
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
