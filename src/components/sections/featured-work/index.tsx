"use client";

import FeaturedContent from "./FeaturedContent";
import FeaturedFooter from "./FeaturedFooter";

const FeaturedWork = () => {
  return (
    <div className="relative flex h-screen w-full justify-center overflow-hidden py-8 text-4xl text-white">
      <FeaturedContent />
      <div className="fixed top-0 left-1/2 z-50 h-screen w-0 border border-dashed border-gray-400" />
      <FeaturedFooter />
    </div>
  );
};

export default FeaturedWork;
