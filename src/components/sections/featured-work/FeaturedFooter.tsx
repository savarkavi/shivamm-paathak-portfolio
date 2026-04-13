import { anton } from "@/fonts";

const FeaturedFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between px-6 py-4 uppercase">
      <h1
        className={`${anton.className} text-glow text-4xl tracking-wide md:text-9xl`}
      >
        Spotlight
      </h1>
      <p className="text-glow max-w-110 text-right text-base select-none">
        A curated selection of moments, stories, and frames that define
        Shivamm’s vision.
      </p>
    </div>
  );
};

export default FeaturedFooter;
