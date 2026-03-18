import { anton } from "@/fonts";

const FeaturedFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 flex w-full items-center justify-between px-6 py-4 uppercase">
      <h1 className={`${anton.className} text-4xl tracking-wide md:text-6xl`}>
        Featured Work
      </h1>
      <p className="max-w-100 text-base select-none">
        A curated selection of moments, stories, and frames that define the
        Shivamm’s vision.
      </p>
    </div>
  );
};

export default FeaturedFooter;
