"use client";

import { mockPhotos } from "@/lib/mockData";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

const FeaturedThumbnails = () => {
  useGSAP(() => {
    const tl = gsap.timeline();
    const totalImages = 10;
    const radius = 250;

    tl.to(".thumbnail-image", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      stagger: 0.3,
    })
      .to(".thumbnail-image", {
        x: (i) => Math.cos((i / totalImages) * Math.PI * 2) * radius,
        y: (i) => Math.sin((i / totalImages) * Math.PI * 2) * radius,
        rotation: 360,
        duration: 1,
        ease: "back.out(1.2)",
        stagger: 0.1,
      })
      .to(".thumbnail-text-letter", { y: 0, stagger: 0.02, duration: 0.3 });
  });

  return (
    <>
      <div className="absolute top-1/2 left-1/2 h-20 w-15 -translate-1/2">
        {mockPhotos.slice(0, 10).map((data) => (
          <div
            style={{
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            }}
            key={data._id}
            className="thumbnail-image absolute top-0 left-0 h-20 w-15"
          >
            <Image
              src={data.imageUrl}
              alt={data.altText}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-1/2 overflow-hidden">
        <p className="thumbnail-text relative flex gap-1 uppercase">
          {"Scroll to experience".split("").map((l, i) => (
            <span key={i} className="thumbnail-text-letter block translate-y-6">
              {l}
            </span>
          ))}
        </p>
      </div>
    </>
  );
};

export default FeaturedThumbnails;
