"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { getPaletteSync } from "colorthief";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/all";
import { bebasNeue } from "@/fonts";
import { FaEye, FaInfoCircle, FaTimes } from "react-icons/fa";

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

const ProjectImageSequence = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [firstImageColors, setFirstImageColors] = useState(fallbackColors);
  const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(false);

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

      const observer = Observer.create({
        target: containerRef.current,
        type: "wheel,touch,pointer",
        preventDefault: true,
        tolerance: 12,
        onChange: (self) => {
          const dominantDelta =
            Math.abs(self.deltaY) >= Math.abs(self.deltaX)
              ? self.deltaY
              : self.deltaX;

          if (dominantDelta > 0) {
            goToNextImage();
          } else if (dominantDelta < 0) {
            goToPreviousImage();
          }
        },
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
      className="relative flex h-screen w-screen touch-none justify-center gap-8 overflow-hidden bg-zinc-950"
    >
      <div className="absolute top-20 left-1/2 z-10 flex w-fit -translate-x-1/2 flex-col items-center gap-16 font-bold text-white lg:top-auto lg:bottom-10 lg:left-[20%] lg:items-end">
        <div className="flex flex-col items-center gap-2 lg:items-end">
          <div
            className={`${bebasNeue.className} flex flex-row items-end text-5xl lg:flex-col xl:text-9xl`}
          >
            <p>FL. {formatImageNumber(activeIndex)}</p>
            <p>/ {String(projectImages.length).padStart(2, "0")}</p>
          </div>
          <button
            type="button"
            aria-label="Open project info"
            className="flex size-8 appearance-none items-center justify-center border-0 bg-transparent p-0 text-white transition-opacity hover:opacity-70 lg:hidden"
            onClick={() => setIsProjectInfoOpen(true)}
          >
            <FaInfoCircle />
          </button>
        </div>
        <div className="hidden max-w-50 flex-col gap-4 text-right text-sm text-white uppercase lg:flex">
          <div>
            <p>Project category:</p>
            <p>Editorial</p>
          </div>
          <div>
            <p>Shot for:</p>
            <p>Lakme Fashion</p>
          </div>
          <div>
            <p>Credits:</p>
            <p>Shivamm Paathak / Amita Aggarwal / Anu Ahuja</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-20 left-1/2 z-10 flex w-fit -translate-x-1/2 flex-col gap-20 text-sm font-bold text-white uppercase lg:right-[20%] lg:bottom-10 lg:left-auto lg:translate-x-0">
        <div
          aria-hidden="true"
          className="h-5 w-60 border border-white/50 lg:hidden"
          style={{
            backgroundImage: `linear-gradient(to right, ${firstImageColors})`,
          }}
        />
        <div
          aria-hidden="true"
          className="hidden h-60 w-5 border border-white/50 lg:block"
          style={{
            backgroundImage: `linear-gradient(to bottom, ${firstImageColors})`,
          }}
        />
        <div className="hidden flex-col gap-4 lg:flex">
          <div>
            <p>Date created:</p>
            <p>2026</p>
          </div>
          <div>
            <p>See on:</p>
            <p>Instagram</p>
          </div>
          <p className="flex items-center gap-2">
            Hide <FaEye />
          </p>
        </div>
      </div>
      <div className="w-fit border border-white">
        {projectImages.map((image, index) => (
          <div
            key={image.src}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            className="border-fit absolute inset-0 flex h-screen items-center justify-center overflow-hidden border bg-zinc-950 will-change-[clip-path]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="h-screen w-auto object-contain object-center"
              priority={index === 0}
              sizes="100vh"
              onLoad={(event) => {
                if (index === 0) {
                  extractFirstImageGradient(event.currentTarget);
                }
              }}
            />
          </div>
        ))}
      </div>
      {isProjectInfoOpen && (
        <div className="absolute inset-0 z-20 flex items-end bg-black/25 px-5 py-8 backdrop-blur-md lg:hidden">
          <div className="w-full border border-white/25 bg-white/10 p-5 text-sm font-bold text-white uppercase shadow-2xl backdrop-blur-xl">
            <div className="mb-8 flex items-center justify-between tracking-wider">
              <p className={`${bebasNeue.className} text-4xl`}>Project info</p>
              <button
                type="button"
                aria-label="Close project info"
                className="flex size-8 appearance-none items-center justify-center border-0 bg-transparent p-0 text-white transition-opacity hover:opacity-70"
                onClick={() => setIsProjectInfoOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="grid gap-5">
              <div>
                <p>Project category:</p>
                <p>Editorial</p>
              </div>
              <div>
                <p>Date created:</p>
                <p>2026</p>
              </div>
              <div>
                <p>Shot for:</p>
                <p>Lakme Fashion</p>
              </div>
              <div>
                <p>See on:</p>
                <p>Instagram</p>
              </div>
              <div>
                <p>Credits:</p>
                <p>Shivamm Paathak / Amita Aggarwal / Anu Ahuja</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProjectImageSequence;
