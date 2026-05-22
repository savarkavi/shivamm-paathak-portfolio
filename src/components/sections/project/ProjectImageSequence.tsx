"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { getPaletteSync } from "colorthief";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/all";
import { bebasNeue } from "@/fonts";
import { FaInfoCircle, FaTimes } from "react-icons/fa";
import ProjectImageControls from "./ProjectImageControls";

gsap.registerPlugin(useGSAP, Observer);

const projectImages = [
  {
    src: "/test_project_1.jpg",
    alt: "Project image 1",
    width: 1356,
    height: 1800,
  },
  {
    src: "/test_project_2.jpg",
    alt: "Project image 2",
    width: 1356,
    height: 1800,
  },
  {
    src: "/test_project_3.jpg",
    alt: "Project image 3",
    width: 1356,
    height: 1800,
  },
  {
    src: "/test_project_4.jpg",
    alt: "Project image 4",
    width: 1356,
    height: 1800,
  },
];

const expandedClipPath = "inset(0% 0% 0% 0%)";
const collapsedClipPath = "inset(100% 0% 0% 0%)";
const formatImageNumber = (index: number) => String(index + 1).padStart(2, "0");
const fallbackColors = "#18181b, #27272a, #3f3f46";

type ProjectDetailProps = {
  label: string;
  value: string;
};

const ProjectDetail = ({ label, value }: ProjectDetailProps) => (
  <div>
    <p>{label}:</p>
    <p>{value}</p>
  </div>
);

type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type ProjectImageSequenceProps = {
  images?: ProjectImage[];
};

const ProjectImageSequence = ({
  images = projectImages,
}: ProjectImageSequenceProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const handleNextRef = useRef<() => void>(() => {});
  const handlePrevRef = useRef<() => void>(() => {});
  const [activeIndex, setActiveIndex] = useState(0);
  const [firstImageColors, setFirstImageColors] = useState(fallbackColors);
  const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(false);

  const firstImage = images[0];
  const containerAspectRatio =
    firstImage?.width && firstImage?.height
      ? `${firstImage.width} / ${firstImage.height}`
      : "1356 / 1800";

  const extractFirstImageGradient = (image: HTMLImageElement) => {
    try {
      const palette = getPaletteSync(image, {
        colorCount: 6,
        quality: 8,
        colorSpace: "oklch",
      });

      if (!palette?.length) return;

      setFirstImageColors(palette.map((color) => color.css("rgb")).join(", "));
    } catch {
      setFirstImageColors(fallbackColors);
    }
  };

  useGSAP(
    () => {
      const images = imageRefs.current.filter(Boolean) as HTMLDivElement[];

      if (!containerRef.current || images.length === 0) return;

      gsap.set(images, {
        clipPath: collapsedClipPath,
        zIndex: 0,
      });

      gsap.set(images[0], {
        clipPath: expandedClipPath,
        zIndex: 1,
      });

      const goToNextImage = () => {
        if (isAnimatingRef.current) return;

        const currentIndex = activeIndexRef.current;
        const nextIndex = (currentIndex + 1) % images.length;
        const nextImage = images[nextIndex];

        isAnimatingRef.current = true;

        gsap.set(nextImage, {
          clipPath: collapsedClipPath,
          zIndex: 2,
        });

        const timeline = gsap.timeline({
          onComplete: () => {
            gsap.set(images[currentIndex], {
              clipPath: expandedClipPath,
              zIndex: 0,
            });
            gsap.set(nextImage, { zIndex: 1 });

            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);
            isAnimatingRef.current = false;
          },
        });

        timeline.to(
          nextImage,
          {
            clipPath: expandedClipPath,
            duration: 1,
            ease: "power3.inOut",
          },
          0,
        );
      };

      const goToPreviousImage = () => {
        if (isAnimatingRef.current) return;

        const currentIndex = activeIndexRef.current;
        const previousIndex =
          (currentIndex - 1 + images.length) % images.length;
        const currentImage = images[currentIndex];
        const previousImage = images[previousIndex];

        isAnimatingRef.current = true;

        gsap.set(previousImage, {
          clipPath: expandedClipPath,
          zIndex: 1,
        });
        gsap.set(currentImage, { zIndex: 2 });

        const timeline = gsap.timeline({
          onComplete: () => {
            gsap.set(currentImage, { zIndex: 0 });

            activeIndexRef.current = previousIndex;
            setActiveIndex(previousIndex);
            isAnimatingRef.current = false;
          },
        });

        timeline.to(
          currentImage,
          {
            clipPath: collapsedClipPath,
            duration: 1,
            ease: "power3.inOut",
          },
          0,
        );
      };

      handleNextRef.current = goToNextImage;
      handlePrevRef.current = goToPreviousImage;

      const observer = Observer.create({
        target: containerRef.current,
        type: "wheel,touch,pointer",
        preventDefault: true,
        tolerance: 12,
        onUp: () =>
          window.innerWidth >= 1024 ? goToPreviousImage() : goToNextImage(),
        onDown: () =>
          window.innerWidth >= 1024 ? goToNextImage() : goToPreviousImage(),
      });

      return () => {
        observer.kill();
      };
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="relative h-dvh w-screen touch-none overflow-hidden bg-zinc-950"
    >
      <div
        className={`${bebasNeue.className} absolute bottom-4 left-4 z-10 hidden flex-col items-end text-8xl leading-none text-white select-none lg:flex xl:text-8xl`}
      >
        <p>FL. {formatImageNumber(activeIndex)}</p>
        <p>/ {String(images.length).padStart(2, "0")}</p>
      </div>
      <div
        className="absolute top-1/2 left-0 h-auto w-screen -translate-y-1/2 overflow-hidden bg-zinc-950 lg:inset-y-0 lg:top-0 lg:left-1/2 lg:h-dvh lg:w-auto lg:-translate-x-1/2 lg:translate-y-0"
        style={{ aspectRatio: containerAspectRatio }}
      >
        {images.map((image, index) => (
          <div
            key={image.src}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            className="absolute inset-0 flex items-center justify-center overflow-hidden bg-zinc-950 will-change-[clip-path]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="h-auto w-full object-cover object-center lg:h-dvh lg:w-auto"
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 100vh"
              onLoad={(event) => {
                if (index === 0) {
                  extractFirstImageGradient(event.currentTarget);
                }
              }}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="absolute right-4 bottom-4 z-10 hidden cursor-pointer items-center gap-3 border border-white/30 bg-black/25 px-8 py-2 text-sm font-semibold tracking-widest text-white uppercase backdrop-blur-md transition-all hover:border-white hover:bg-white hover:text-black active:scale-95 lg:flex"
        onClick={() => setIsProjectInfoOpen(true)}
      >
        <span>Info</span>
        <FaInfoCircle size={16} />
      </button>

      <div className="absolute right-5 bottom-4 left-5 z-10 flex items-center justify-between text-white lg:hidden">
        <div
          className={`${bebasNeue.className} flex items-center text-3xl font-bold`}
        >
          <p>FL. {formatImageNumber(activeIndex)}</p>
          <p>/ {String(images.length).padStart(2, "0")}</p>
        </div>

        <button
          type="button"
          aria-label="Open project info"
          className="flex size-8 appearance-none items-center justify-center border-0 bg-transparent p-0 text-white transition-opacity hover:opacity-70"
          onClick={() => setIsProjectInfoOpen(true)}
        >
          <FaInfoCircle size={16} />
        </button>
      </div>

      <ProjectImageControls
        onNext={() => handleNextRef.current?.()}
        onPrevious={() => handlePrevRef.current?.()}
      />

      {isProjectInfoOpen && (
        <div className="absolute inset-0 z-20 flex items-end justify-center bg-black/40 px-5 py-8 backdrop-blur-md lg:items-center">
          <div className="w-full max-w-md border border-white/25 bg-white/10 p-6 text-sm text-white uppercase shadow-2xl backdrop-blur-xl lg:p-8">
            <div className="mb-6 flex flex-col gap-4">
              <div className="flex items-center justify-between tracking-wider">
                <p className={`${bebasNeue.className} text-4xl`}>
                  Project info
                </p>
                <button
                  type="button"
                  aria-label="Close project info"
                  className="flex size-8 cursor-pointer appearance-none items-center justify-center border-0 bg-transparent p-0 text-white transition-opacity hover:opacity-70"
                  onClick={() => setIsProjectInfoOpen(false)}
                >
                  <FaTimes size={18} />
                </button>
              </div>
              <div
                aria-hidden="true"
                className="h-3 w-full border border-white/50"
                style={{
                  backgroundImage: `linear-gradient(to right, ${firstImageColors})`,
                }}
              />
            </div>
            <div className="grid gap-5">
              <ProjectDetail label="Project category" value="Editorial" />
              <ProjectDetail label="Date created" value="2026" />
              <ProjectDetail label="Shot for" value="Lakme Fashion" />
              <ProjectDetail label="See on" value="Instagram" />
              <ProjectDetail
                label="Credits"
                value="Shivamm Paathak / Amita Aggarwal / Anu Ahuja"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProjectImageSequence;
