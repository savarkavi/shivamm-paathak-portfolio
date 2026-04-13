"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, Observer);

export const categories = [
  { name: "Editorial", count: 15 },
  { name: "Fashion", count: 25 },
  { name: "Commercial", count: 20 },
  { name: "Personal", count: 20 },
  { name: "Films", count: 10 },
];

const getCategory = (index: number) => {
  let sum = 0;
  for (const cat of categories) {
    if (index < sum + cat.count) return cat.name;
    sum += cat.count;
  }
  return "Unknown";
};

const imagesData = Array.from({ length: 90 }).map((_, i) => ({
  src: `https://picsum.photos/seed/${i + 201}/500/600.webp`,
  category: getCategory(i),
}));

const ArchiveContent = ({
  setActiveCategory,
}: {
  setActiveCategory: (cat: string) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastActiveCatRef = useRef<string | null>(null);

  useGSAP(() => {
    const layers = gsap.utils.toArray<HTMLElement>(".category-layer");
    if (!layers.length) return;

    const spacing = 2000;
    const maxBound = spacing;
    const minBound = -spacing * (categories.length - 1);
    const wrapFn = gsap.utils.wrap(minBound, maxBound);

    let targetScroll = 0;
    let currentScroll = 0;
    const easeFactor = 0.08;

    Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      preventDefault: true,
      onChange: (self) => {
        targetScroll += self.deltaY * 2;
      },
    });

    const smoothScroll = () => {
      currentScroll += (targetScroll - currentScroll) * easeFactor;

      let activeCat = categories[0].name;
      let minZDist = Infinity;

      layers.forEach((layer, i) => {
        const initialZ = -i * spacing;
        const rawZ = initialZ + currentScroll;
        const wrappedZ = wrapFn(rawZ);

        let opacity = 1;
        if (wrappedZ > 500) {
          opacity = gsap.utils.mapRange(500, 1000, 1, 0, wrappedZ);
        } else if (wrappedZ < -3000) {
          opacity = gsap.utils.mapRange(-3000, -4000, 1, 0, wrappedZ);
        }

        gsap.set(layer, { z: wrappedZ, opacity });

        const focusPoint = -250;
        if (Math.abs(wrappedZ - focusPoint) < minZDist) {
          minZDist = Math.abs(wrappedZ - focusPoint);
          activeCat = categories[i].name;
        }
      });

      if (lastActiveCatRef.current !== activeCat) {
        lastActiveCatRef.current = activeCat;
        setActiveCategory(activeCat);
      }
    };

    gsap.ticker.add(smoothScroll);

    return () => {
      gsap.ticker.remove(smoothScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex h-screen w-full items-center justify-center overflow-hidden perspective-[1000px]"
    >
      <div className="relative flex h-full w-full items-center justify-center transform-3d">
        {categories.map((cat, i) => {
          const catImages = imagesData
            .filter((img) => img.category === cat.name)
            .slice(0, 4);

          return (
            <div
              key={cat.name}
              className="category-layer absolute flex items-center justify-center"
              style={{
                transform: `translateZ(${-i * 1000}px)`,
              }}
            >
              {catImages[0] && (
                <div className="absolute top-[-350px] left-1/2 h-[250px] w-[200px] -translate-x-1/2 overflow-hidden">
                  <Image
                    src={catImages[0].src}
                    fill
                    alt={`${cat.name} Top`}
                    className="object-cover"
                  />
                </div>
              )}
              {catImages[1] && (
                <div className="absolute bottom-[-350px] left-1/2 h-[250px] w-[200px] -translate-x-1/2 overflow-hidden">
                  <Image
                    src={catImages[1].src}
                    fill
                    alt={`${cat.name} Bottom`}
                    className="object-cover"
                  />
                </div>
              )}
              {catImages[2] && (
                <div className="absolute top-1/2 left-[-400px] h-[250px] w-[200px] -translate-y-1/2 overflow-hidden">
                  <Image
                    src={catImages[2].src}
                    fill
                    alt={`${cat.name} Left`}
                    className="object-cover"
                  />
                </div>
              )}
              {catImages[3] && (
                <div className="absolute top-1/2 right-[-400px] h-[250px] w-[200px] -translate-y-1/2 overflow-hidden">
                  <Image
                    src={catImages[3].src}
                    fill
                    alt={`${cat.name} Right`}
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArchiveContent;
