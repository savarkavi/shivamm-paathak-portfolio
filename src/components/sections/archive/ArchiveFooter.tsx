import { anton } from "@/fonts";
import CategoryIndicator from "./CategoryIndicator";
import type { WorkCategory } from "@/sanity/lib/queries";

interface ArchiveFooterProps {
  categories: WorkCategory[];
  activeCategory: string;
}

const ArchiveFooter = ({ categories, activeCategory }: ArchiveFooterProps) => {
  return (
    <div className="pointer-events-none fixed bottom-0 left-0 z-50 flex w-full flex-col items-center justify-between gap-2 px-4 py-4 uppercase mix-blend-difference md:flex-row md:items-center md:gap-0 md:px-6 lg:items-end lg:mix-blend-normal">
      <h1
        className={`${anton.className} text-glow scale=y-110 text-4xl md:text-7xl`}
      >
        Archive
      </h1>

      <CategoryIndicator
        categories={categories}
        activeCategory={activeCategory}
        className="top-1/2 hidden md:absolute md:left-1/2 md:flex md:w-auto md:-translate-1/2 md:gap-6 md:text-xl lg:gap-10"
      />

      <p className="text-glow max-w-100 text-center text-xs select-none lg:text-right lg:text-sm">
        Scroll to experience the collection of past works and visual
        explorations. These works document Shivamm’s journey.
      </p>
    </div>
  );
};

export default ArchiveFooter;
