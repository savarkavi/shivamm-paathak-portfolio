import { anton } from "@/fonts";

const HomeFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 z-10 flex w-full flex-col items-center justify-between gap-2 px-4 py-2 text-base leading-4 text-white uppercase before:absolute before:inset-0 before:-z-10 before:mask-[linear-gradient(to_top,black_90%,transparent)] before:backdrop-blur-lg md:text-lg lg:flex-row lg:px-12">
      <h1
        className={`${anton.className} text-glow text-center text-4xl tracking-wider text-gray-100 md:text-[80px] xl:self-end`}
      >
        Shivamm Paathak
      </h1>
      <div className="max-w-lg text-center text-sm md:text-base lg:text-left">
        <p className="select-none">
          Shivamm Paathak is a Fashion & Fine-Art Photographer, exploring the
          intersection of mythology and modern India.
        </p>
      </div>
    </div>
  );
};

export default HomeFooter;
