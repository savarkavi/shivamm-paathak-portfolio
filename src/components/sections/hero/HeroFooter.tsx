import { anton, inconsolata } from "@/fonts";
import Image from "next/image";

const HeroFooter = () => {
  return (
    <div
      className={`${inconsolata.className} absolute bottom-0 left-0 z-30 flex w-full items-end justify-between p-6 text-white uppercase`}
    >
      <div className={`intro-text max-w-xl text-justify text-sm uppercase`}>
        <p>
          Shivamm Paathak is a photographer and filmmaker driven by a deep
          curiosity for people, culture, and the emotions that live between
          moments. His work sits at the intersection of fashion, art, and
          storytelling—where every frame is intentional, every light carefully
          shaped, and every subject approached with honesty.
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
