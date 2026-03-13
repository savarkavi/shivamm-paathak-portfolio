import { jockeyOne } from "@/fonts";

const HomeFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 z-10 flex w-full flex-col items-center justify-between gap-4 px-4 py-2 text-base leading-4 text-white uppercase mix-blend-difference backdrop-blur-md md:text-lg lg:flex-row lg:px-12">
      <h1
        className={`${jockeyOne.className} text-5xl tracking-wide md:text-6xl`}
      >
        Shivamm Paathak
      </h1>
      <div>
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
