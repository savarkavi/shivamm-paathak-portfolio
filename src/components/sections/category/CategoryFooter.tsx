import { anton } from "@/fonts";

type CategoryFooterProps = {
  categoryName: string;
};

const CategoryFooter = ({ categoryName }: CategoryFooterProps) => {
  return (
    <div className="fixed bottom-0 left-0 z-10 flex w-full flex-col items-center justify-between gap-2 px-4 py-2 text-base leading-4 text-white uppercase before:absolute before:inset-0 before:-z-10 before:mask-[linear-gradient(to_top,black_90%,transparent)] before:backdrop-blur-lg md:text-lg lg:flex-row lg:px-12">
      <h1
        className={`${anton.className} text-glow text-center text-3xl tracking-wider text-gray-100 md:text-8xl xl:self-end`}
      >
        {categoryName}
      </h1>
      <div className="max-w-lg text-center text-sm md:text-lg lg:text-left">
        <p className="uppercase select-none">
          Drag / scroll to interact with the gallery. Click on the image to open
          the project.
        </p>
      </div>
    </div>
  );
};

export default CategoryFooter;
