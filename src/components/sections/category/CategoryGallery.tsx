"use client";

import Image from "next/image";
import { mockPhotos } from "@/lib/mockData";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Draggable } from "gsap/all";

gsap.registerPlugin(useGSAP, Draggable);

const TEST_IMAGE_COUNT = 20;
const MAX_COLUMNS = 4;
const MIN_PHOTOS_PER_STRIP = 5;

type GalleryPhoto = (typeof mockPhotos)[number];

const getTestPhotos = (count: number) => {
  if (count <= 0) return [];

  return Array.from(
    { length: count },
    (_, index) => mockPhotos[index % mockPhotos.length],
  );
};

const normalizeStripPhotos = (photos: GalleryPhoto[]) => {
  if (photos.length === 0) return [];

  return Array.from(
    { length: Math.max(MIN_PHOTOS_PER_STRIP, photos.length) },
    (_, index) => photos[index % photos.length],
  );
};

const CategoryGallery = () => {
  const horizontalRepeats = 3;
  const photos = getTestPhotos(TEST_IMAGE_COUNT);
  const columns = Math.min(MAX_COLUMNS, Math.max(1, photos.length));
  const columnPhotos = Array.from({ length: columns }, (_, colIndex) =>
    normalizeStripPhotos(
      photos.filter((_, photoIndex) => photoIndex % columns === colIndex),
    ),
  );

  const gallery = useRef<HTMLDivElement>(null);
  const galleryTrack = useRef<HTMLDivElement>(null);
  const firstStripSet = useRef<HTMLDivElement>(null);
  const dragProxy = useRef<HTMLDivElement>(null);

  const renderColumnImages = (photos: GalleryPhoto[], setKey: string) => (
    <div className="flex flex-col gap-2">
      {photos.map((photo, photoIndex) => (
        <div
          key={`${setKey}-${photo._id}-${photoIndex}`}
          className="relative h-80 w-60 overflow-hidden bg-black lg:h-100 lg:w-80 xl:h-160 xl:w-140"
        >
          <Image
            src={photo.imageUrl}
            alt={photo.altText}
            fill
            className="object-cover opacity-80 grayscale-100 hover:grayscale-0"
            priority={setKey === "repeat-0-col-0-set-1" && photoIndex < 2}
          />
        </div>
      ))}
    </div>
  );

  useGSAP(
    () => {
      const track = galleryTrack.current;
      const firstSet = firstStripSet.current;
      const proxy = dragProxy.current;

      if (!track || !firstSet || !proxy) return;

      const strips = gsap.utils.toArray<HTMLDivElement>(".col-strip", track);
      const stripSetWidth = firstSet.offsetWidth;
      const centeredX = (window.innerWidth - stripSetWidth) / 2;
      const minX = centeredX - stripSetWidth;
      const maxX = centeredX;
      const wrapX = gsap.utils.wrap(minX, maxX);

      gsap.set(track, {
        x: wrapX(centeredX - stripSetWidth),
      });

      const stripTweens = strips.map((strip) => {
        const stripIndex = Number(strip.dataset.stripIndex);
        const isGoingUp = stripIndex % 2 === 0;

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

      let lastDragY = 0;

      const updateDraggedGallery = () => {
        const wrappedX = wrapX(gsap.getProperty(proxy, "x") as number);
        const currentY = gsap.getProperty(proxy, "y") as number;
        const dragYChange = currentY - lastDragY;

        gsap.set(proxy, {
          x: wrappedX,
        });

        gsap.set(track, {
          x: wrappedX,
        });

        if (dragYChange !== 0) {
          stripTweens.forEach((tween) => {
            tween.totalTime(tween.totalTime() + dragYChange * 0.05);
          });

          lastDragY = currentY;
        }
      };

      const draggable = Draggable.create(proxy, {
        type: "x,y",
        trigger: gallery.current,
        cursor: "grab",
        activeCursor: "grabbing",
        onPressInit: () => {
          lastDragY = 0;

          gsap.set(proxy, {
            x: gsap.getProperty(track, "x") as number,
            y: 0,
          });
        },
        onDrag: updateDraggedGallery,
        onRelease: updateDraggedGallery,
      })[0];

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
        draggable.kill();
        window.removeEventListener("wheel", handleWheel);
        clearTimeout(scrollTimeout);
      };
    },
    { scope: gallery },
  );

  return (
    <div
      ref={gallery}
      className="relative z-0 h-screen overflow-hidden bg-white"
    >
      <div ref={dragProxy} className="hidden" />
      <div
        ref={galleryTrack}
        className="absolute top-0 left-0 z-0 flex h-max w-max touch-pan-y p-2"
      >
        {Array.from({ length: horizontalRepeats }).map((_, repeatIndex) => (
          <div
            key={repeatIndex}
            ref={repeatIndex === 0 ? firstStripSet : undefined}
            className="flex gap-2 pr-2"
          >
            {columnPhotos.map((photos, colIndex) => (
              <div
                key={`${repeatIndex}-${colIndex}`}
                data-strip-index={colIndex}
                className="col-strip flex flex-col gap-2"
              >
                {renderColumnImages(
                  photos,
                  `repeat-${repeatIndex}-col-${colIndex}-set-1`,
                )}
                {renderColumnImages(
                  photos,
                  `repeat-${repeatIndex}-col-${colIndex}-set-2`,
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGallery;
