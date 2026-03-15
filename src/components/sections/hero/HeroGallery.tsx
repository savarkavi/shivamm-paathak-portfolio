"use client";

import Image from "next/image";
import { mockHomePagePhotos } from "@/lib/mockData";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HeroGallery = () => {
  const columns = 5;
  const photosPerColumn = 5;

  const heroGallery = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const strips = gsap.utils.toArray<HTMLDivElement>(".col-strip");

    const handleMouseMove = (e: MouseEvent) => {
      const galleryXPos = gsap.utils.mapRange(
        0,
        window.innerWidth,
        0,
        100,
        e.clientX,
      );
      gsap.to(heroGallery.current, {
        left: `${galleryXPos}%`,
        x: `-${galleryXPos}%`,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const stripTweens = strips.map((strip, index) => {
      const isGoingUp = index % 2 === 0;

      return gsap.fromTo(
        strip,
        { y: isGoingUp ? "0%" : "-50%" },
        {
          y: isGoingUp ? "-50%" : "0%",
          duration: 120,
          ease: "none",
          repeat: -1,
        },
      );
    });

    let scrollTimeout: number;

    const handleWheel = (e: WheelEvent) => {
      const scrollSpeed = 0.05;
      const timeChange = e.deltaY * scrollSpeed;

      stripTweens.forEach((tween) => {
        tween.pause();

        gsap.to(tween, {
          totalTime: `+=${timeChange}`,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto",
        });
      });

      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        stripTweens.forEach((tween) => tween.play());
      }, 150);
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(scrollTimeout);
    };
  });

  return (
    <div className="h-screen">
      <div
        ref={heroGallery}
        className="absolute top-0 left-0 mx-auto flex h-max w-max gap-2 overflow-hidden p-2"
      >
        {Array.from({ length: columns }).map((_, colIndex) => (
          <div key={colIndex} className="col-strip flex flex-col gap-2">
            {/* First set of images */}
            <div className={`flex flex-col gap-2`}>
              {Array.from({ length: photosPerColumn }).map((_, photoIndex) => {
                const index =
                  (colIndex * photosPerColumn + photoIndex) %
                  mockHomePagePhotos.length;
                const photo = mockHomePagePhotos[index];
                return (
                  <div
                    key={`set1-${colIndex}-${photoIndex}`}
                    className="relative h-160 w-140 overflow-hidden bg-black"
                  >
                    <Image
                      src={photo.imageUrl}
                      alt={photo.altText}
                      fill
                      className="object-cover opacity-80 grayscale-100 hover:grayscale-0"
                      priority={colIndex < 3 && photoIndex < 2}
                    />
                  </div>
                );
              })}
            </div>

            {/* Duplicated set of images for the seamless loop */}
            <div className={`flex flex-col gap-2`}>
              {Array.from({ length: photosPerColumn }).map((_, photoIndex) => {
                const index =
                  (colIndex * photosPerColumn + photoIndex) %
                  mockHomePagePhotos.length;
                const photo = mockHomePagePhotos[index];
                return (
                  <div
                    key={`set2-${colIndex}-${photoIndex}`}
                    className="relative h-160 w-140 overflow-hidden bg-black"
                  >
                    <Image
                      src={photo.imageUrl}
                      alt={photo.altText}
                      fill
                      className="object-cover opacity-80 grayscale-100 hover:grayscale-0"
                      priority={colIndex < 3 && photoIndex < 2}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroGallery;
