"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const SCENES = {
  glyph: "/hero_effect_scene.json",
  noGlyph: "/hero_effect_scene_no_glyph.json",
} as const;

type HeroSceneMode = keyof typeof SCENES;

interface HeroSceneContextValue {
  isGlyphScene: boolean;
  scenePath: (typeof SCENES)[HeroSceneMode];
  toggleScene: () => void;
}

const HeroSceneContext = createContext<HeroSceneContextValue | null>(null);

export const HeroSceneProvider = ({ children }: { children: ReactNode }) => {
  const [sceneMode, setSceneMode] = useState<HeroSceneMode>("noGlyph");

  const toggleScene = useCallback(() => {
    setSceneMode((current) => (current === "glyph" ? "noGlyph" : "glyph"));
  }, []);

  const value = useMemo(
    () => ({
      isGlyphScene: sceneMode === "glyph",
      scenePath: SCENES[sceneMode],
      toggleScene,
    }),
    [sceneMode, toggleScene],
  );

  return (
    <HeroSceneContext.Provider value={value}>
      {children}
    </HeroSceneContext.Provider>
  );
};

export const useHeroScene = () => {
  const context = useContext(HeroSceneContext);

  if (!context) {
    throw new Error("useHeroScene must be used within HeroSceneProvider");
  }

  return context;
};
