import Scene from "@/components/scene/Scene";
import HeroGallery from "./HeroGallery";
import HomeFooter from "./HomeFooter";

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Scene />
      <HeroGallery />
      <HomeFooter />
    </div>
  );
};

export default Hero;
