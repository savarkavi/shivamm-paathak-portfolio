import { anton, inconsolata } from "@/fonts";
import Image from "next/image";

const HeroFooter = () => {
  return (
    <div
      className={`${inconsolata.className} absolute bottom-0 left-0 z-30 flex w-full flex-col items-center justify-between gap-6 p-6 text-white uppercase lg:flex-row lg:items-end`}
    >
      <div
        className={`intro-text w-full text-center text-[0.6rem] uppercase lg:max-w-2xs lg:text-justify xl:max-w-sm xl:text-xs 2xl:max-w-lg 2xl:text-sm`}
      >
        <p>
          Shivamm Paathak is a photographer and filmmaker driven by a deep
          curiosity for people, culture, and the emotions that live between
          moments. His work sits at the intersection of fashion, art, and Indian
          Mythology.
        </p>
      </div>
      <div className="flex items-center gap-6">
        <Image
          src="/shivamm-logo-cropped.png"
          alt="text-logo"
          width={120}
          height={80}
          className="object-contain"
        />
        <div
          className={`flex flex-col border border-white text-[12px] font-bold uppercase`}
        >
          <div className="px-2 text-center text-white">Parental</div>
          <div
            className={`${anton.className} scale-y-110 bg-white text-center leading-6 tracking-widest text-black`}
          >
            Advisory
          </div>
          <div className="px-2 text-center text-white">Copyright© 2026</div>
        </div>
      </div>
    </div>
  );
};

export default HeroFooter;
