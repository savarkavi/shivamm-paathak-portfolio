import { MdLocationPin } from "react-icons/md";
import { CiGlobe } from "react-icons/ci";
import { VscLinkExternal } from "react-icons/vsc";

const HomeHeader = () => {
  return (
    <div className="fixed top-0 left-0 z-10 flex w-full flex-wrap items-center justify-between gap-20 bg-linear-to-b from-black/60 to-transparent px-4 py-4 text-sm leading-4 font-bold text-white uppercase backdrop-blur-md lg:px-12">
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
      <div>
        <p>[Works]</p>
        <p className="text-white/50 underline">Featured</p>
        <p className="text-white/50 underline">Archive</p>
      </div>
      <div>
        <p>[Profile]</p>
        <p className="text-white/50 underline">About</p>
        <p className="text-white/50 underline">BTS</p>
      </div>
      <div>
        <p>[Socials]</p>
        <p className="text-white/50 underline">
          Instagram <VscLinkExternal className="inline size-3" />
        </p>
        <p className="text-white/50 underline">
          Youtube <VscLinkExternal className="inline size-3" />
        </p>
      </div>
    </div>
  );
};

export default HomeHeader;
