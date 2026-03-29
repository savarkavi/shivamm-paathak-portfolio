import { anton, jersey25 } from "@/fonts";

interface IntroContentProps {
  onEnterClick: () => void;
}

const IntroContent = ({ onEnterClick }: IntroContentProps) => {
  return (
    <div
      className={`pointer-events-none flex h-screen flex-col items-center justify-center gap-8`}
    >
      <h1
        className={`${anton.className} text-glow intro-title text-[9rem] leading-40 tracking-wider uppercase opacity-0 select-none`}
      >
        Shivamm Paathak
      </h1>
      <div
        className={`${jersey25.className} intro-text text-center text-xl uppercase opacity-0`}
      >
        <p>{`"All photographs are accurate. None of them are truth."`}</p>
        <p>(Richard Avedon)</p>
      </div>
      <button
        onClick={onEnterClick}
        className="intro-button pointer-events-auto cursor-pointer bg-white px-4 py-1 text-black uppercase opacity-0"
      >
        Enter
      </button>
    </div>
  );
};

export default IntroContent;
