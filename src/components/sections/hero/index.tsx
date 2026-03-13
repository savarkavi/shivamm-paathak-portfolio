import HeroGallery from "./HeroGallery";
import HomeFooter from "./HomeFooter";
import HomeHeader from "./HomeHeader";

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <HomeHeader />
      <HeroGallery />
      <HomeFooter />
    </div>
  );
};

export default Hero;
