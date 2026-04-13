import FeaturedFooter from "@/components/sections/featured-work/FeaturedFooter";
import FeaturedGallerySlider from "@/components/sections/featured-work/FeaturedGallerySlider";
import FeaturedThumbnails from "@/components/sections/featured-work/FeaturedThumbnails";

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
