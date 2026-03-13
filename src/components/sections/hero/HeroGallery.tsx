"use client";

import Image from "next/image";
import { mockHomePagePhotos } from "@/lib/mockData";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const HeroGallery = () => {
  const columns = 5;
  const photosPerColumn = 5;

  useGSAP(() => {
    const strips = gsap.utils.toArray<HTMLDivElement>(".col-strip");

    strips.forEach((strip, index) => {
      const isGoingUp = index % 2 === 0;
      gsap.fromTo(
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
  });

  return (
    <div className="absolute top-0 left-1/2 mx-auto flex h-max w-max -translate-x-1/2 gap-2 p-2">
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
                  className="relative h-160 w-140 overflow-hidden"
                >
                  <Image
                    src={photo.imageUrl}
                    alt={photo.altText}
                    fill
                    className="object-cover grayscale-100"
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
                  className="relative h-160 w-140 overflow-hidden"
                >
                  <Image
                    src={photo.imageUrl}
                    alt={photo.altText}
                    fill
                    className="object-cover grayscale-100"
                    priority={colIndex < 3 && photoIndex < 2}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroGallery;
