import Hero from "@/components/sections/hero";

export default function Home() {
  return (
    <div>
      <div
        className="fixed top-0 left-0 z-10 h-screen w-screen"
        style={{
          backgroundImage: "url('/grainy-effect.webp')",
          mixBlendMode: "hard-light",
          opacity: 0.09,
          pointerEvents: "none",
        }}
      />
      <Hero />
    </div>
  );
}
