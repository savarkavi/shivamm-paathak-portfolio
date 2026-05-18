import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { categories } from "./ArchiveContent";
import TransitionLink from "@/components/layout/TransitionLink";

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
        className={`pointer-events-auto relative top-24 flex h-8 min-w-42 items-center justify-center overflow-hidden border border-dashed border-gray-500 text-xl transition-all lg:top-0`}
      >
        {categories.map((cat) => (
          <TransitionLink
            href={`/archive/${cat.name.toLowerCase()}`}
            key={cat.name}
            className={`category-item category-item-${cat.name} absolute top-0 left-0 flex h-full w-full flex-nowrap items-center justify-center text-center opacity-0 ${activeCategory === cat.name ? "pointer-events-auto" : "pointer-events-none"}`}
          >
            <span className="text-center uppercase">{cat.name}</span>
          </TransitionLink>
        ))}
      </div>
    </div>
  );
};

export default CategoryIndicator;
