import { MdLocationPin } from "react-icons/md";
import { CiGlobe } from "react-icons/ci";
import { VscLinkExternal } from "react-icons/vsc";
import Link from "next/link";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 z-60 flex w-full flex-wrap items-center justify-between gap-3 bg-linear-to-b from-black/60 to-transparent px-4 py-2 text-sm leading-4 font-bold text-white uppercase before:absolute before:inset-0 before:-z-10 before:mask-[linear-gradient(to_bottom,black_90%,transparent)] before:backdrop-blur-lg lg:px-12">
      <div>
        <p>
          Based in{" "}
          <span className="inline-flex items-center gap-1 text-white/50">
            India <MdLocationPin className="inline" />
          </span>
        </p>
        <p>
          Available{" "}
          <span className="inline-flex items-center gap-1 text-white/50">
            worldwide <CiGlobe className="inline" />
          </span>
        </p>
      </div>
      <div className="flex flex-col">
        <p className="text-base">[Works]</p>
        <Link
          href="/spotlight"
          className="text-white/50 underline hover:text-white/80"
        >
          Spotlight
        </Link>
        <Link
          href="/archive"
          className="text-white/50 underline hover:text-white/80"
        >
          Archive
        </Link>
      </div>
      <div className="flex flex-col">
        <p className="text-base">[Profile]</p>
        <Link
          href="/about"
          className="text-white/50 underline hover:text-white/80"
        >
          About
        </Link>
        <Link
          href="/bts"
          className="text-white/50 underline hover:text-white/80"
        >
          BTS
        </Link>
      </div>
      <div className="flex flex-col">
        <p className="text-base">[Socials]</p>
        <Link href="/" className="text-white/50 underline hover:text-white/80">
          Instagram <VscLinkExternal className="inline size-3" />
        </Link>
        <Link href="/" className="text-white/50 underline hover:text-white/80">
          Youtube <VscLinkExternal className="inline size-3" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
