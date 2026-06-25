import FeaturedFooter from "@/components/sections/featured-work/FeaturedFooter";
import FeaturedGallerySlider from "@/components/sections/featured-work/FeaturedGallerySlider";
import FeaturedThumbnails from "@/components/sections/featured-work/FeaturedThumbnails";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spotlight | Shivamm Paathak",
  description: "A curated selection of moments, stories, and frames that define Shivamm's vision.",
};

const Page = () => {
  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-black text-white">
      {/* <FeaturedGallery /> */}
      <FeaturedThumbnails />
      <FeaturedGallerySlider />
      <FeaturedFooter />
    </div>
  );
};

export default Page;
