import { chonburi } from "@/fonts";

type CategoryFooterProps = {
  categoryName: string;
};

const CategoryFooter = ({ categoryName }: CategoryFooterProps) => {
  return (
    <div className="fixed bottom-0 left-0 z-10 flex w-full flex-col items-center justify-between gap-2 px-4 py-2 text-base leading-4 text-white uppercase before:absolute before:inset-0 before:-z-10 before:mask-[linear-gradient(to_top,black_90%,transparent)] before:backdrop-blur-lg md:text-lg lg:flex-row lg:px-12">
      <h1
        className={`${chonburi.className} text-glow scale-y-110 text-center text-3xl text-gray-100 md:text-6xl xl:self-end`}
      >
        {categoryName}
      </h1>
      <div className="max-w-lg text-center text-sm md:text-xl lg:text-left">
        <p className="font-light uppercase select-none md:hidden">
          Drag / scroll to interact with the gallery. Tap an image to open the
          project.
        </p>
        <p className="hidden font-light uppercase select-none md:block">
          Move your cursor / scroll to interact with the gallery. Click an image
          to open the project.
        </p>
      </div>
    </div>
  );
};

export default CategoryFooter;
