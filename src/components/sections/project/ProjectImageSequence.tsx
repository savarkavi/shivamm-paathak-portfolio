"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { getPaletteSync } from "colorthief";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/all";
import ProjectImageControls from "./ProjectImageControls";
import ProjectGradientStrip from "./ProjectGradientStrip";
import ProjectPhotoNumber from "./ProjectPhotoNumber";

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

const fallbackGradient = "linear-gradient(to right, #18181b, #27272a, #3f3f46)";

const ProjectImageSequence = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gradientsRef = useRef<string[]>([]);
  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const showImageRef = useRef<((direction: 1 | -1) => void) | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stripGradient, setStripGradient] = useState(fallbackGradient);

  const extractImageGradient = (index: number, image: HTMLImageElement) => {
    try {
      const palette = getPaletteSync(image, {
        colorCount: 5,
        quality: 8,
        colorSpace: "oklch",
      });

      if (!palette?.length) return;

      const colors = palette.map((color) => color.css("rgb"));
      const gradient = `linear-gradient(to right, ${colors.join(", ")})`;

      gradientsRef.current[index] = gradient;

      if (activeIndexRef.current === index) {
        setStripGradient(gradient);
      }
    } catch {
      gradientsRef.current[index] = fallbackGradient;
    }
  };

  useGSAP(
    () => {
      const container = containerRef.current;
      const images = imageRefs.current.filter(Boolean) as HTMLDivElement[];

      if (!container || images.length === 0) return;

      gsap.set(images, {
        autoAlpha: 0,
        yPercent: 100,
        z: 0,
        rotateX: 0,
        zIndex: 0,
      });

      gsap.set(images[0], {
        autoAlpha: 1,
        yPercent: 0,
        zIndex: 2,
      });

      const showImage = (direction: 1 | -1) => {
        if (isAnimatingRef.current) return;

        const currentIndex = activeIndexRef.current;
        const nextIndex =
          (currentIndex + direction + images.length) % images.length;
        const currentImage = images[currentIndex];
        const nextImage = images[nextIndex];

        isAnimatingRef.current = true;
        setStripGradient(gradientsRef.current[nextIndex] ?? fallbackGradient);

        gsap.set(nextImage, {
          autoAlpha: 1,
          yPercent: direction === 1 ? 100 : -100,
          z: 0,
          zIndex: 3,
        });

        gsap
          .timeline({
            defaults: {
              duration: 0.95,
              ease: "power3.inOut",
            },
            onComplete: () => {
              gsap.set(currentImage, {
                autoAlpha: 0,
                yPercent: 100,
                z: 0,
                rotateX: 0,
                zIndex: 0,
              });
              gsap.set(nextImage, {
                autoAlpha: 1,
                yPercent: 0,
                z: 0,
                zIndex: 2,
              });

              activeIndexRef.current = nextIndex;
              setActiveIndex(nextIndex);
              isAnimatingRef.current = false;
            },
          })
          .to(
            currentImage,
            {
              autoAlpha: 0.2,
              z: -420,
              rotateX: direction === 1 ? 30 : -30,
            },
            0,
          )
          .to(
            nextImage,
            {
              yPercent: 0,
            },
            0,
          );
      };

      showImageRef.current = showImage;

      const observer = Observer.create({
        target: container,
        type: "wheel,touch,pointer",
        preventDefault: true,
        tolerance: 12,
        onDown: () => showImage(1),
        onUp: () => showImage(-1),
      });

      return () => {
        showImageRef.current = null;
        observer.kill();
      };
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="relative h-dvh w-screen touch-none overflow-hidden bg-white perspective-distant"
    >
      <ProjectPhotoNumber
        current={activeIndex + 1}
        total={projectImages.length}
      />
      <ProjectGradientStrip gradient={stripGradient} />
      <ProjectImageControls
        onPrevious={() => showImageRef.current?.(-1)}
        onNext={() => showImageRef.current?.(1)}
      />
      <div className="absolute inset-0 flex items-center justify-center transform-3d">
        {projectImages.map((image, index) => (
          <div
            key={image.src}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            className="absolute inset-0 flex items-center justify-center bg-black will-change-[transform,opacity]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="h-auto w-screen max-w-none object-contain lg:h-dvh lg:w-auto"
              priority={index === 0}
              sizes="100vh"
              draggable={false}
              onLoad={(event) => {
                extractImageGradient(index, event.currentTarget);
              }}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProjectImageSequence;
