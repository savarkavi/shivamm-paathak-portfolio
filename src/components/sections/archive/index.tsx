"use client";

import gsap from "gsap/all";
import ArchiveContent from "./ArchiveContent";
import ArchiveFooter from "./ArchiveFooter";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Archive = () => {
  useGSAP(() => {
    gsap.to(".middle-line", { height: "100%", duration: 0.7 });
  });

  return (
    <div className="relative flex h-screen w-full justify-center overflow-hidden py-8 text-4xl text-white">
      <ArchiveContent />
      <div className="middle-line fixed top-0 left-1/2 z-50 h-0 w-0 border border-dashed border-gray-400" />
      <ArchiveFooter />
    </div>
  );
};

export default Archive;
