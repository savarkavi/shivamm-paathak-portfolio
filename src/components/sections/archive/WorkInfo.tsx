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
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const imageContainer = imageContainerRef.current;

    if (!imageContainer) return;

    gsap
      .timeline({ delay: 0.7 })
      .to(".work-year", { y: 0 })
      .set(".work-line", { opacity: 1 })
      .to(".work-line", { width: 200, ease: "power2.in" })
      .to(".work-image", { opacity: 1, y: 0 }, "+=0.2");

    const xSetter = gsap.quickSetter(imageContainer, "rotateX", "deg");
    const ySetter = gsap.quickSetter(imageContainer, "rotateY", "deg");

    const handleMouseHover = (e: MouseEvent) => {
      const xDistance = e.offsetX;
      const yDistance = e.offsetY;

      const yRotation = gsap.utils.mapRange(
        0,
        imageContainer.offsetWidth,
        -15,
        15,
        xDistance,
      );
      const xRotation = gsap.utils.mapRange(
        0,
        imageContainer.offsetHeight,
        15,
        -15,
        yDistance,
      );

      xSetter(xRotation);
      ySetter(yRotation);
    };

    const handleMouseLeave = () => {
      gsap.to(imageContainer, { rotateX: 0, rotateY: 0, ease: "none" });
    };

    imageContainer.addEventListener("mousemove", handleMouseHover);
    imageContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      imageContainer.removeEventListener("mousemove", handleMouseHover);
      imageContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  });

  return (
    <div
      ref={containerRef}
      className={`${
        isLeft
          ? "-translate-x-[55%] flex-row-reverse text-right"
          : "translate-x-[55%] flex-row"
      } flex w-full min-w-160 items-center gap-2`}
    >
      <div className="relative overflow-hidden">
        <p
          className={`work-year flex flex-col ${justMeAGain.className} translate-y-full`}
        >
          {data.year}
        </p>
      </div>
      <div className="work-line w-0 border border-dashed opacity-0" />
      <div
        style={{ perspective: "1000px" }}
        className={`work-image relative translate-y-20 opacity-0`}
      >
        <div
          style={{ willChange: "transform" }}
          className={`${isLeft ? "left-0" : "right-0"} absolute -top-8 flex cursor-pointer items-center gap-1 text-base uppercase`}
        >
          <span>See Project</span>
          <GoArrowUpRight />
        </div>
        <div
          ref={imageContainerRef}
          className={`relative h-115 w-fit rounded-md border border-white bg-white p-1 shadow-xl transition-all`}
        >
          <div className="archive-img relative h-100 w-85 rounded-md">
            <Image
              src={data.image}
              alt="archive-img"
              fill
              className="rounded-md object-cover"
            />
          </div>
          <p
            className={`${justMeAGain.className} pointer-events-none absolute bottom-2 left-0 px-2 text-3xl text-red-500`}
          >
            {`"${data.title}"`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkInfo;
