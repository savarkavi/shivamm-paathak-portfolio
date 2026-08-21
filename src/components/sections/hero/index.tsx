"use client";

import type { AboutPageContent } from "@/sanity/lib/queries";
import { useState } from "react";
import UnicornScene from "unicornstudio-react/next";
import HeroFooter from "./HeroFooter";
import { useHeroScene } from "./HeroSceneContext";
import LoadingScreen from "./LoadingScreen";
import { UNICORN_STUDIO_SDK_URL } from "@/lib/unicorn";

type HeroProps = {
  aboutInfo?: AboutPageContent | null;
};

const Hero = ({ aboutInfo }: HeroProps) => {
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const { isGlyphScene, scenePath } = useHeroScene();
  const isLandingReady = isIntroComplete && isSceneLoaded;

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-black">
      <LoadingScreen
        isLoaded={isLandingReady}
        onIntroComplete={() => setIsIntroComplete(true)}
      />
      <UnicornScene
        key={scenePath}
        jsonFilePath={scenePath}
        scale={1}
        dpi={0.8}
        sdkUrl={UNICORN_STUDIO_SDK_URL}
        onLoad={() => setIsSceneLoaded(true)}
      />
      <HeroFooter isGlyphScene={isGlyphScene} aboutInfo={aboutInfo} />
    </div>
  );
};

export default Hero;
