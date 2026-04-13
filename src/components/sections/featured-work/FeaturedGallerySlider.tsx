"use client";

import { useRef } from "react";
import { mockPhotos } from "@/lib/mockData";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/all";

gsap.registerPlugin(useGSAP, Observer);

const originalData = mockPhotos.slice(0, 10);
const slidesData = [...originalData, ...originalData, ...originalData];

const FeaturedGallerySlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const totalSlides = slidesData.length;
      const endScale = 3.5;

      let slideWidth =
        window.innerWidth < 768
          ? window.innerWidth * 0.75
          : window.innerWidth * 0.4;
      let screenCenter = window.innerWidth / 2;

      let targetX = 0;
      let currentX = 0;

      const updateLoop = () => {
        currentX += (targetX - currentX) * 0.08;

        const totalWidth = slideWidth * totalSlides;
        if (currentX > 0) {
          currentX -= totalWidth / 3;
          targetX -= totalWidth / 3;
        } else if (currentX < -(totalWidth * (2 / 3))) {
          currentX += totalWidth / 3;
          targetX += totalWidth / 3;
        }

        slidesRef.current.forEach((slide, i) => {
          if (!slide) return;

          const xPos = i * slideWidth + currentX;
          gsap.set(slide, { x: xPos });

          const slideCenter = xPos + slideWidth / 2;
          const distanceFromCenter = Math.abs(screenCenter - slideCenter);

          const outerRange = slideWidth * 2;
          const clampedDistance = gsap.utils.clamp(
            0,
            1,
            distanceFromCenter / outerRange,
          );
          const ease = 1 - Math.cos((clampedDistance * Math.PI) / 2);
          const scale = 1 + (endScale - 1) * ease;

          const img = slide.querySelector(".gallery-img");
          if (img) {
            gsap.set(img, { scale: scale });
          }
        });
      };

      gsap.ticker.add(updateLoop);

      let scrollTimeout: NodeJS.Timeout;

      const observer = Observer.create({
        target: containerRef.current,
        type: "wheel,touch,pointer",
        preventDefault: true,
        onChange: (self) => {
          const factor = -2.5;
          targetX += (self.deltaX + self.deltaY) * factor;

          clearTimeout(scrollTimeout);

          gsap.to([slidesRef.current, ".gallery-gradient"], {
            opacity: 1,
            duration: 0.3,
            overwrite: "auto",
          });

          scrollTimeout = setTimeout(() => {
            gsap.to([slidesRef.current, ".gallery-gradient"], {
              opacity: 0,
              duration: 0.3,
              overwrite: "auto",
            });
          }, 1000);
        },
      });

      const handleResize = () => {
        slideWidth =
          window.innerWidth < 768
            ? window.innerWidth * 0.75
            : window.innerWidth * 0.5;
        screenCenter = window.innerWidth / 2;
      };
      window.addEventListener("resize", handleResize);

      return () => {
        clearTimeout(scrollTimeout);
        observer.kill();
        window.removeEventListener("resize", handleResize);
        gsap.ticker.remove(updateLoop);
      };
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-screen touch-none overflow-hidden font-mono select-none"
    >
      <div className="pointer-events-none fixed inset-0 z-999 h-screen w-screen">
        {slidesData.map((data, i) => (
          <div
            key={`${data._id}-${i}`}
            ref={(el) => {
              slidesRef.current[i] = el;
            }}
            className="absolute top-1/2 h-screen w-[40%] shrink-0 -translate-y-1/2 overflow-hidden opacity-0"
          >
            <Image
              src={data.imageUrl}
              alt={data.altText || "Gallery Image"}
              fill
              className="gallery-img object-cover will-change-transform"
              draggable={false}
              sizes="(max-width: 768px) 75vw, 50vw"
              priority={i < 5}
            />
          </div>
        ))}

        {/* Gradient Overlays */}
        <div className="gallery-gradient pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-linear-to-r from-black to-transparent opacity-0 md:w-80" />
        <div className="gallery-gradient pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-linear-to-l from-black to-transparent opacity-0 md:w-80" />
      </div>
    </div>
  );
};

export default FeaturedGallerySlider;
