import { archiveData } from "@/lib/mockData";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer, ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import WorkInfo from "./WorkInfo";

gsap.registerPlugin(useGSAP, ScrollTrigger, Observer);

const ArchiveContent = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const list1Ref = useRef<HTMLDivElement>(null);
  const list2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const wrapper = wrapperRef.current;
    const list1 = list1Ref.current;
    const list2 = list2Ref.current;

    if (!wrapper || !list1 || !list2) return;

    const loopHeight = list2.offsetTop - list1.offsetTop;
    const wrapFn = gsap.utils.wrap(-loopHeight, 0);

    let targetY = 0;
    let currentY = 0;

    const easeFactor = 0.08;

    Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      preventDefault: true,
      onChange: (self) => {
        targetY -= self.deltaY * 0.5;
      },
    });

    const smoothScroll = () => {
      currentY += (targetY - currentY) * easeFactor;

      gsap.set(wrapper, { y: wrapFn(currentY) });
    };

    gsap.ticker.add(smoothScroll);

    return () => {
      gsap.ticker.remove(smoothScroll);
    };
  });

  return (
    <div ref={wrapperRef} className="z-10 mt-16 flex flex-col">
      <div ref={list1Ref} className="archive-list relative flex flex-col">
        {archiveData.map((data, i) => {
          const isLeft = i % 2 === 0;
          return <WorkInfo key={data._id} data={data} isLeft={isLeft} />;
        })}
      </div>
      <div ref={list2Ref} className="archive-list relative flex flex-col">
        {archiveData.map((data, i) => {
          const isLeft = i % 2 === 0;
          return <WorkInfo key={data._id} data={data} isLeft={isLeft} />;
        })}
      </div>
    </div>
  );
};

export default ArchiveContent;
