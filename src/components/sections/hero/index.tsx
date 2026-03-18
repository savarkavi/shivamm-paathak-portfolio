import HeroGallery from "./HeroGallery";
import HomeFooter from "./HomeFooter";

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <HeroGallery />
      <HomeFooter />
    </div>
  );
};

export default Hero;
