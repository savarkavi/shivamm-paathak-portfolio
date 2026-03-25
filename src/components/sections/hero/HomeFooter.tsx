import { anton } from "@/fonts";

const HomeFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 z-10 flex w-full flex-col items-center justify-between gap-4 px-4 py-2 text-base leading-4 text-white uppercase before:absolute before:inset-0 before:-z-10 before:mask-[linear-gradient(to_top,black_80%,transparent)] before:backdrop-blur-lg md:text-lg lg:flex-row lg:px-12">
      <h1
        className={`${anton.className} text-glow self-end text-5xl tracking-wide text-gray-100 blur-[1px] md:text-[80px]`}
        style={{}}
      >
        Shivamm Paathak
      </h1>
      <div className="blur-[1px]">
        <p className="select-none">
          Shivamm Paathak is a Fashion & Fine-Art Photographer,
        </p>
        <p className="select-none">
          Exploring the intersection of mythology and modern India.
        </p>
      </div>
    </div>
  );
};

export default HomeFooter;
