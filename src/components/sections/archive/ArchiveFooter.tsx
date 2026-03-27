import { anton } from "@/fonts";

const ArchiveFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between px-6 py-4 uppercase mix-blend-difference">
      <h1
        className={`${anton.className} text-glow text-4xl tracking-wide md:text-9xl`}
      >
        The Archive
      </h1>
      <p className="text-glow max-w-110 text-right text-base select-none">
        A collection of past works and visual explorations. These works document
        Shivamm’s journey.
      </p>
    </div>
  );
};

export default ArchiveFooter;
