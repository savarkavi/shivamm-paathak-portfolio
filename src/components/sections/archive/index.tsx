"use client";

import gsap from "gsap/all";
import ArchiveFooter from "./ArchiveFooter";
import ArchiveContent from "./ArchiveContent";
import { useGSAP } from "@gsap/react";
import { useState } from "react";

gsap.registerPlugin(useGSAP);

const Archive = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Editorial");

  useGSAP(() => {
    gsap.to(".middle-line", { height: "100%", duration: 0.7 });
  });

  return (
    <div className="relative flex min-h-screen w-full justify-center overflow-hidden bg-black py-8 text-4xl text-white">
      <ArchiveContent setActiveCategory={setActiveCategory} />
      <ArchiveFooter activeCategory={activeCategory} />
    </div>
  );
};

export default Archive;
