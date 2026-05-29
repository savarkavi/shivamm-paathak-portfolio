"use client";

import type { AboutPageContent } from "@/sanity/lib/queries";
import { useState } from "react";
import UnicornScene from "unicornstudio-react/next";
import HeroFooter from "./HeroFooter";
import { useHeroScene } from "./HeroSceneContext";
import LoadingScreen from "./LoadingScreen";

type HeroProps = {
  aboutInfo?: AboutPageContent | null;
};

const Hero = ({ aboutInfo }: HeroProps) => {
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);
  const [canLoadHeroScene, setCanLoadHeroScene] = useState(false);
  const { isGlyphScene, scenePath } = useHeroScene();

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-black">
      <LoadingScreen
        isLoaded={isSceneLoaded}
        onIntroComplete={() => setCanLoadHeroScene(true)}
      />
      {canLoadHeroScene && (
        <UnicornScene
          key={scenePath}
          jsonFilePath={scenePath}
          scale={1}
          dpi={0.8}
          onLoad={() => setIsSceneLoaded(true)}
        />
      )}
      <HeroFooter isGlyphScene={isGlyphScene} aboutInfo={aboutInfo} />
    </div>
  );
};

export default Hero;
