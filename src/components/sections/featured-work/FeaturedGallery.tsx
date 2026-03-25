"use client";

import { mockHomePagePhotos } from "@/lib/mockData";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable, InertiaPlugin } from "gsap/all";
import Image from "next/image";
import { useCallback, useRef } from "react";

gsap.registerPlugin(useGSAP, Draggable, InertiaPlugin);

const SPHERE_RADIUS = 3000;

const FeaturedGallery = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const isDraggingRef = useRef(false);

  const applySphericalTransform = useCallback(() => {
    if (!galleryRef.current) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const centerX = vw / 2;
    const centerY = vh / 2;

    cardsRef.current.forEach((card) => {
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const offsetX = cardCenterX - centerX;
      const offsetY = cardCenterY - centerY;

      const rotateY = Math.atan2(offsetX, SPHERE_RADIUS) * (180 / Math.PI);
      const rotateX = -Math.atan2(offsetY, SPHERE_RADIUS) * (180 / Math.PI);

      const dist = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
      const translateZ = -(dist * dist) / (2 * SPHERE_RADIUS);

      gsap.to(card, {
        rotateX,
        rotateY,
        z: translateZ,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }, []);

  const removeSphericalTransform = useCallback(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        z: 0,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      });
    });
  }, []);

  useGSAP(() => {
    if (!galleryRef.current) return;

    Draggable.create(galleryRef.current, {
      type: "x,y",
      trigger: galleryRef.current.parentElement,
      zIndexBoost: false,
      inertia: true,
      bounds: {
        minX: -galleryRef.current.offsetWidth / 4,
        maxX: galleryRef.current.offsetWidth / 4,
        minY: -galleryRef.current.offsetHeight / 2.5,
        maxY: galleryRef.current.offsetHeight / 2.5,
      },
      dragResistance: 0.5,
      onDragStart: () => {
        isDraggingRef.current = true;
        applySphericalTransform();
        gsap.to("#mouse-follower", { opacity: 0, duration: 0.3 });
      },
      onDrag: () => {
        if (isDraggingRef.current) {
          applySphericalTransform();
        }
      },
      onDragEnd: () => {
        isDraggingRef.current = false;
        removeSphericalTransform();
        gsap.to("#mouse-follower", { opacity: 1, duration: 0.3 });
      },
    });
  });

  return (
    <div
      ref={galleryRef}
      style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
      className="absolute top-1/2 left-1/2 grid h-max w-max -translate-1/2 grid-cols-5 gap-10"
    >
      {mockHomePagePhotos.map((data, i) => (
        <div
          key={data._id}
          ref={(el) => {
            if (el) cardsRef.current[i] = el;
          }}
          className="relative h-150 w-120 rounded-sm"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Image
            src={data.imageUrl}
            alt={data.altText}
            fill
            className="rounded-sm object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default FeaturedGallery;
