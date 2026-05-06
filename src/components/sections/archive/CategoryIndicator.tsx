import { nihonium } from "@/fonts";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { categories } from "./ArchiveContent";
import Link from "next/link";

interface CategoryIndicatorProps {
  activeCategory: string;
  className?: string;
}

const CategoryIndicator = ({
  activeCategory,
  className = "",
}: CategoryIndicatorProps) => {
  useGSAP(() => {
    gsap.to(".category-item", {
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });

    gsap.to(`.category-item-${activeCategory}`, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      delay: 0.1,
      ease: "power2.out",
    });
  }, [activeCategory]);

  return (
    <div
      className={`relative flex h-fit w-full flex-wrap items-center justify-center gap-x-6 gap-y-4 tracking-wider text-white hover:bg-white hover:text-black ${className}`}
    >
      <div
        className={`${nihonium.className} pointer-events-auto relative flex h-8 min-w-42 items-center justify-center border border-dashed border-gray-500 text-2xl transition-all`}
      >
        {categories.map((cat) => (
          <Link
            href={`/archive/${cat.name.toLowerCase()}`}
            key={cat.name}
            className={`category-item category-item-${cat.name} absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-nowrap items-center justify-center text-center opacity-0`}
          >
            <span className="text-center uppercase">{cat.name}</span>
            <span className="absolute -top-2 -right-3 text-[9px] text-gray-300 opacity-80 md:-right-5 md:text-xs">
              {cat.count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryIndicator;
