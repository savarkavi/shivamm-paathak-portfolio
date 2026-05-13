import AboutSection from "@/components/sections/about";

const Page = () => {
  return (
    <div>
      <div
        className="fixed top-0 left-0 z-99 h-screen w-screen"
        style={{
          backgroundImage: "url('/grainy-effect.webp')",
          mixBlendMode: "hard-light",
          opacity: 0.09,
          pointerEvents: "none",
        }}
      ></div>
      <AboutSection />
    </div>
  );
};

export default Page;
