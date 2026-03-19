import { justMeAGain } from "@/fonts";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";
import { GoArrowUpRight } from "react-icons/go";

interface WorkInfoProps {
  data: {
    _id: string;
    title: string;
    image: string;
    stackImages: string[];
    year: number;
  };
  isLeft: boolean;
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

const WorkInfo = ({ data, isLeft }: WorkInfoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={`${
        isLeft
          ? "-translate-x-[55%] flex-row-reverse text-right"
          : "translate-x-[55%] flex-row"
      } flex w-full items-center gap-2`}
    >
      <p className={`flex flex-col ${justMeAGain.className}`}>{data.year}</p>
      <div className="h-px w-50 border border-dashed" />
      <div className="relative">
        <div
          style={{ willChange: "transform" }}
          className="absolute -top-8 left-0 flex cursor-pointer items-center gap-1 text-base uppercase"
        >
          <span>See Project</span>
          <GoArrowUpRight />
        </div>
        <div className="relative h-115 w-fit rounded-md border border-white bg-white p-1 shadow-xl">
          <div className="archive-img relative h-100 w-85 rounded-md">
            <Image
              src={data.image}
              alt="archive-img"
              fill
              className="rounded-md object-cover"
            />
          </div>
          <p
            className={`${justMeAGain.className} absolute bottom-2 left-0 px-2 text-3xl text-red-500`}
          >
            {`"${data.title}"`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkInfo;
