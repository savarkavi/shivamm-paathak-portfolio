import type { AboutPageContent } from "@/sanity/lib/queries";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface HeroFooterProps {
  isGlyphScene: boolean;
  aboutInfo?: AboutPageContent | null;
}

const fallbackLandingIntro =
  "Shivamm Paathak is a photographer driven by a deep curiosity for people, culture, and the emotions that live between moments. His work sits at the intersection of fashion and Indian Mythology.";

const HeroFooter = ({ isGlyphScene, aboutInfo }: HeroFooterProps) => {
  return (
    <div
      className={`absolute bottom-0 left-0 z-30 flex w-full flex-col items-center justify-between gap-6 p-6 ${
        isGlyphScene ? "text-[#2d4dff]" : "text-white"
      } lg:flex-row lg:items-end`}
    >
      <div
        className={`intro-text w-full text-center text-[0.6rem] leading-tight tracking-wide uppercase lg:max-w-2xs lg:text-justify xl:max-w-sm xl:text-xs`}
      >
        <p>{aboutInfo?.landingIntro || fallbackLandingIntro}</p>
      </div>
      <div className="flex flex-col items-center gap-2 text-sm">
        <div className="flex items-center gap-4">
          {aboutInfo?.instagramUrl && (
            <a href={aboutInfo.instagramUrl} target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
          )}
          {aboutInfo?.twitterUrl && (
            <a href={aboutInfo.twitterUrl} target="_blank" rel="noreferrer">
              <FaXTwitter />
            </a>
          )}
        </div>
        <p className="uppercase">Copyright © 2026</p>
      </div>
    </div>
  );
};

export default HeroFooter;
