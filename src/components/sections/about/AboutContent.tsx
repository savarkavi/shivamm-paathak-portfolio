import { anton } from "@/fonts";
import Image from "next/image";

const AboutContent = () => {
  return (
    <div className="relative text-white">
      <Image
        src="/about-placeholder.jpg"
        alt="shivamm photo"
        width={1920}
        height={1080}
        className="h-auto w-screen brightness-60"
      />
      <h1
        className={`${anton.className} text-glow absolute top-26 left-8 scale-y-110 text-9xl font-bold uppercase`}
      >
        Shivamm Paathak
      </h1>
      <p className="text-glow absolute top-[18%] right-8 max-w-xl text-xl uppercase">
        I am a photographer and filmmaker driven by a deep curiosity for people,
        culture, and the emotions that live between moments. My work sits at the
        intersection of fashion, art, and storytelling—where every frame is
        intentional, every light carefully shaped, and every subject approached
        with honesty.
      </p>
      <p className="text-glow absolute top-[40%] left-8 max-w-xl text-xl uppercase">
        I don’t chase moments—I wait for them to reveal themselves. Somewhere
        between light and shadow, stillness and movement, is where my work
        lives. I’m drawn to what feels unspoken—expressions that linger, spaces
        that breathe, stories that don’t ask to be explained. Fashion, people,
        and places become fragments of something larger, something harder to
        define but easy to feel.
      </p>
    </div>
  );
};

export default AboutContent;
