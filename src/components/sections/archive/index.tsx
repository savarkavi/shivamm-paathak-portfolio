"use client";

import gsap from "gsap/all";
import ArchiveFooter from "./ArchiveFooter";
import ArchiveContent from "./ArchiveContent";
import CategoryIndicator from "./CategoryIndicator";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import UnicornScene from "unicornstudio-react";

gsap.registerPlugin(useGSAP);

const Archive = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Editorial");

  useGSAP(() => {
    gsap.to(".middle-line", { height: "100%", duration: 0.7 });
  });

  return (
    <div className="relative flex min-h-screen w-full justify-center overflow-hidden bg-black py-8 text-4xl text-white">
      <div className="absolute top-0 left-0 h-full w-full">
        <UnicornScene
          projectId="xAx8ZLdZuX2621skX5ZF"
          production={true}
          scale={1}
          dpi={1.5}
          sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.11/dist/unicornStudio.umd.js"
        />
      </div>

      <CategoryIndicator
        activeCategory={activeCategory}
        className="absolute top-0 left-1/2 z-50 -translate-x-1/2 mix-blend-difference md:hidden"
      />

      <ArchiveContent setActiveCategory={setActiveCategory} />
      <ArchiveFooter activeCategory={activeCategory} />
    </div>
  );
};

export default Archive;
