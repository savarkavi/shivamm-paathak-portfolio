"use client";

import gsap from "gsap/all";
import ArchiveFooter from "./ArchiveFooter";
import ArchiveContent from "./ArchiveContent";
import CategoryIndicator from "./CategoryIndicator";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import type { WorkCategory } from "@/sanity/lib/queries";

gsap.registerPlugin(useGSAP);

type ArchiveProps = {
  categories: WorkCategory[];
};

const Archive = ({ categories }: ArchiveProps) => {
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0]?.slug ?? "",
  );

  useGSAP(() => {
    gsap.to(".middle-line", { height: "100%", duration: 0.7 });
  });

  return (
    <div className="relative flex min-h-screen w-full justify-center overflow-hidden bg-black py-8 text-4xl text-white">
      <CategoryIndicator
        categories={categories}
        activeCategory={activeCategory}
        className="absolute top-0 left-1/2 z-50 -translate-x-1/2 mix-blend-difference md:hidden"
      />

      <ArchiveContent
        categories={categories}
        setActiveCategory={setActiveCategory}
      />
      <ArchiveFooter categories={categories} activeCategory={activeCategory} />
    </div>
  );
};

export default Archive;
