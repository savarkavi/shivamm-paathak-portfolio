import { anton } from "@/fonts";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { categories } from "./ArchiveContent";

interface ArchiveFooterProps {
  activeCategory: string;
}

const ArchiveFooter = ({ activeCategory }: ArchiveFooterProps) => {
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
    <div className="pointer-events-none fixed bottom-0 left-0 z-50 flex w-full flex-col items-start justify-between gap-2 px-4 py-4 uppercase mix-blend-difference md:flex-row md:items-center md:gap-0 md:px-6 lg:mix-blend-normal">
      <h1
        className={`${anton.className} text-glow text-7xl tracking-wide md:text-7xl lg:text-9xl`}
      >
        Archive
      </h1>

      <div className="relative hidden w-full flex-wrap items-center justify-start gap-x-6 gap-y-4 font-semibold tracking-wider text-white sm:justify-center md:absolute md:left-1/2 md:w-auto md:-translate-x-1/2 md:justify-center md:gap-6 md:text-xl lg:flex lg:gap-10">
        <div className="relative flex h-8 w-32 items-center justify-center">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className={`category-item category-item-${cat.name} absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-nowrap items-center justify-center opacity-0`}
            >
              <span className="uppercase">{cat.name}</span>
              <span className="absolute -top-2 -right-3 text-[9px] text-gray-300 opacity-80 md:-right-4 md:text-xs">
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-glow max-w-110 text-sm font-bold select-none md:text-base lg:text-right">
        A collection of past works and visual explorations. These works document
        Shivamm’s journey.
      </p>
    </div>
  );
};

export default ArchiveFooter;
