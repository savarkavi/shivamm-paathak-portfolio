"use client";

import FeaturedFooter from "@/components/sections/featured-work/FeaturedFooter";
import FeaturedGallery from "@/components/sections/featured-work/FeaturedGallery";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const Page = () => {
  const mouseFollowerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mouseFollower = mouseFollowerRef.current;
    if (!mouseFollower) return;

    const xTo = gsap.quickTo(mouseFollower, "x", {
      duration: 0.6,
      ease: "power3",
    });
    const yTo = gsap.quickTo(mouseFollower, "y", {
      duration: 0.6,
      ease: "power3",
    });

    window.addEventListener("mousemove", (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    });
  });

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-black text-white">
      <div
        id="mouse-follower"
        ref={mouseFollowerRef}
        className="pointer-events-none absolute top-0 left-0 z-99 rounded-sm bg-white px-2 py-1 text-sm font-bold text-black uppercase"
      >
        Hold and Drag
      </div>
      <FeaturedGallery />
      <FeaturedFooter />
    </div>
  );
};

export default Page;
