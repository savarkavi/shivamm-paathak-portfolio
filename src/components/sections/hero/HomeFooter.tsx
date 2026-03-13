import { jockeyOne } from "@/fonts";

const HomeFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 z-10 flex w-full items-center justify-between px-12 py-2 text-lg leading-4 text-white uppercase mix-blend-difference backdrop-blur-md">
      <h1 className={`${jockeyOne.className} text-6xl tracking-wide`}>
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
