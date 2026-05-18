"use client";

import { useState } from "react";
import UnicornScene from "unicornstudio-react/next";
import HeroFooter from "./HeroFooter";
import { useHeroScene } from "./HeroSceneContext";
import LoadingScreen from "./LoadingScreen";

const Hero = () => {
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
          dpi={1}
          onLoad={() => setIsSceneLoaded(true)}
        />
      )}
      <HeroFooter isGlyphScene={isGlyphScene} />
    </div>
  );
};

export default Hero;
