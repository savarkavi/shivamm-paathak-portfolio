import Hero from "@/components/sections/hero";

export default function Home() {
  return (
    <div>
      <div
        className="fixed top-0 left-0 z-10 h-screen w-screen"
        style={{
          backgroundImage: "url('/grainy-effect.webp')",
          mixBlendMode: "hard-light",
          opacity: 0.08,
          pointerEvents: "none",
        }}
      />
      <Hero />
    </div>
  );
}
