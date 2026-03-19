"use client";

import ArchiveContent from "./ArchiveContent";
import ArchiveFooter from "./ArchiveFooter";

const Archive = () => {
  return (
    <div className="relative flex h-screen w-full justify-center overflow-hidden py-8 text-4xl text-white">
      <ArchiveContent />
      <div className="fixed top-0 left-1/2 z-50 h-screen w-0 border border-dashed border-gray-400" />
      <ArchiveFooter />
    </div>
  );
};

export default Archive;
