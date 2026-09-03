"use client";

import Image from "next/image";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { getPaletteSync } from "colorthief";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/all";
import { bebasNeue } from "@/fonts";
import {
  FaCamera,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaTimes,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import Link from "next/link";

gsap.registerPlugin(useGSAP, Observer);

const expandedClipPath = "inset(0% 0% 0% 0%)";
const collapsedClipPath = "inset(100% 0% 0% 0%)";
const formatImageNumber = (index: number) => String(index + 1).padStart(2, "0");
const fallbackColors = "#18181b, #27272a, #3f3f46";

type ProjectDetailProps = {
  label: string;
  value: string;
};

const ProjectDetail = ({ label, value }: ProjectDetailProps) => (
  <div>
    <p>{label}:</p>
    <p>{value}</p>
  </div>
);

export type ProjectMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type ProjectInfo = {
  category: string;
  dateCreated: string;
  shotFor: string;
  seeOn: string | null;
  credits: string | null;
};

type ProjectImageSequenceProps = {
  media: ProjectMedia[];
  projectInfo?: ProjectInfo;
  btsHref?: string | null;
};

const ProjectImageSequence = ({
  media,
  projectInfo,
  btsHref,
}: ProjectImageSequenceProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const handleNextRef = useRef<() => void>(() => {});
  const handlePrevRef = useRef<() => void>(() => {});
  const [activeIndex, setActiveIndex] = useState(0);
  const [firstImageColors, setFirstImageColors] = useState(fallbackColors);
  const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(false);
  const [mutedVideos, setMutedVideos] = useState<Record<string, boolean>>({});

  const firstMedia = media[0];
  const containerAspectRatio =
    firstMedia?.width && firstMedia?.height
      ? `${firstMedia.width} / ${firstMedia.height}`
      : "1356 / 1800";

  const extractFirstImageGradient = (image: HTMLImageElement) => {
    try {
      const palette = getPaletteSync(image, {
        colorCount: 6,
        quality: 8,
        colorSpace: "oklch",
      });

      if (!palette?.length) return;

      setFirstImageColors(palette.map((color) => color.css("rgb")).join(", "));
    } catch {
      setFirstImageColors(fallbackColors);
    }
  };

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex) {
        void video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex]);

  const toggleVideoMute = (src: string) => {
    setMutedVideos((currentMutedVideos) => ({
      ...currentMutedVideos,
      [src]: !(currentMutedVideos[src] ?? true),
    }));
  };

  const handleImageClick = (event: MouseEvent<HTMLDivElement>) => {
    const { top, height } = event.currentTarget.getBoundingClientRect();

    if (event.clientY < top + height / 2) {
      handlePrevRef.current?.();
    } else {
      handleNextRef.current?.();
    }
  };

  useGSAP(
    () => {
      const mediaElements = imageRefs.current.filter(
        Boolean,
      ) as HTMLDivElement[];

      if (!containerRef.current || mediaElements.length === 0) return;

      gsap.set(mediaElements, {
        clipPath: collapsedClipPath,
        zIndex: 0,
      });

      gsap.set(mediaElements[0], {
        clipPath: expandedClipPath,
        zIndex: 1,
      });

      if (mediaElements.length === 1) return;

      const goToNextImage = () => {
        if (isAnimatingRef.current) return;

        const currentIndex = activeIndexRef.current;
        const nextIndex = (currentIndex + 1) % mediaElements.length;
        const nextImage = mediaElements[nextIndex];

        isAnimatingRef.current = true;

        gsap.set(nextImage, {
          clipPath: collapsedClipPath,
          zIndex: 2,
        });

        const timeline = gsap.timeline({
          onComplete: () => {
            gsap.set(mediaElements[currentIndex], {
              clipPath: expandedClipPath,
              zIndex: 0,
            });
            gsap.set(nextImage, { zIndex: 1 });

            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);
            isAnimatingRef.current = false;
          },
        });

        timeline.to(
          nextImage,
          {
            clipPath: expandedClipPath,
            duration: 1,
            ease: "power3.inOut",
          },
          0,
        );
      };

      const goToPreviousImage = () => {
        if (isAnimatingRef.current) return;

        const currentIndex = activeIndexRef.current;
        const previousIndex =
          (currentIndex - 1 + mediaElements.length) % mediaElements.length;
        const currentImage = mediaElements[currentIndex];
        const previousImage = mediaElements[previousIndex];

        isAnimatingRef.current = true;

        gsap.set(previousImage, {
          clipPath: expandedClipPath,
          zIndex: 1,
        });
        gsap.set(currentImage, { zIndex: 2 });

        const timeline = gsap.timeline({
          onComplete: () => {
            gsap.set(currentImage, { zIndex: 0 });

            activeIndexRef.current = previousIndex;
            setActiveIndex(previousIndex);
            isAnimatingRef.current = false;
          },
        });

        timeline.to(
          currentImage,
          {
            clipPath: collapsedClipPath,
            duration: 1,
            ease: "power3.inOut",
          },
          0,
        );
      };

      handleNextRef.current = goToNextImage;
      handlePrevRef.current = goToPreviousImage;

      const observer = Observer.create({
        target: containerRef.current,
        type: "wheel,touch,pointer",
        preventDefault: true,
        tolerance: 12,
        onUp: () =>
          window.innerWidth >= 1024 ? goToPreviousImage() : goToNextImage(),
        onDown: () =>
          window.innerWidth >= 1024 ? goToNextImage() : goToPreviousImage(),
      });

      return () => {
        observer.kill();
      };
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="relative h-dvh w-screen touch-none overflow-hidden bg-zinc-950"
    >
      <div
        className={`${bebasNeue.className} absolute bottom-4 left-4 z-10 hidden flex-col items-end text-8xl leading-none text-white select-none lg:flex xl:text-8xl`}
      >
        <p>FL. {formatImageNumber(activeIndex)}</p>
        <p>/ {String(media.length).padStart(2, "0")}</p>
      </div>
      <div
        className="absolute top-1/2 left-0 h-auto w-screen -translate-y-1/2 overflow-hidden bg-zinc-950 lg:inset-y-0 lg:top-0 lg:left-1/2 lg:h-dvh lg:w-auto lg:-translate-x-1/2 lg:translate-y-0"
        style={{ aspectRatio: containerAspectRatio }}
        onClick={handleImageClick}
      >
        {media.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            className="absolute inset-0 flex items-center justify-center overflow-hidden bg-zinc-950 will-change-[clip-path]"
          >
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width || 1356}
                height={item.height || 1800}
                className="h-auto w-full object-cover object-center lg:h-dvh lg:w-auto"
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 100vh"
                onLoad={(event) => {
                  if (index === 0) {
                    extractFirstImageGradient(event.currentTarget);
                  }
                }}
              />
            ) : (
              <>
                <video
                  ref={(element) => {
                    videoRefs.current[index] = element;
                  }}
                  src={item.src}
                  aria-label={item.alt}
                  className="h-auto w-full object-cover object-center lg:h-dvh lg:w-auto"
                  loop
                  muted={mutedVideos[item.src] ?? true}
                  playsInline
                  autoPlay={index === 0}
                >
                  {item.alt}
                </video>
                <button
                  type="button"
                  aria-label={
                    (mutedVideos[item.src] ?? true)
                      ? "Unmute video"
                      : "Mute video"
                  }
                  className="absolute right-4 bottom-4 z-10 flex size-10 items-center justify-center border border-white/30 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/70"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleVideoMute(item.src);
                  }}
                  onPointerDown={(event) => event.stopPropagation()}
                >
                  {(mutedVideos[item.src] ?? true) ? (
                    <FaVolumeMute size={16} />
                  ) : (
                    <FaVolumeUp size={16} />
                  )}
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="absolute right-4 bottom-4 z-10 hidden flex-col items-center gap-3 lg:flex">
        {btsHref && (
          <Link
            href={btsHref}
            className="flex items-center gap-3 border border-white/30 bg-black/25 px-8 py-2 text-sm font-semibold tracking-widest text-white uppercase backdrop-blur-md transition-all hover:border-white hover:bg-white hover:text-black active:scale-95"
          >
            <span>BTS</span>
            <FaCamera size={16} />
          </Link>
        )}
        <button
          type="button"
          className="flex cursor-pointer items-center gap-3 border border-white/30 bg-black/25 px-8 py-2 text-sm font-semibold tracking-widest text-white uppercase backdrop-blur-md transition-all hover:border-white hover:bg-white hover:text-black active:scale-95"
          onClick={() => setIsProjectInfoOpen(true)}
        >
          <span>Info</span>
          <FaInfoCircle size={16} />
        </button>
      </div>

      {btsHref && (
        <Link
          href={btsHref}
          aria-label="Open project behind the scenes"
          className="absolute right-5 bottom-15 z-10 flex size-8 items-center justify-center text-white transition-opacity hover:opacity-70 lg:hidden"
        >
          <FaCamera size={16} />
        </Link>
      )}

      <div className="absolute right-5 bottom-4 left-5 z-10 flex items-center justify-between text-white lg:hidden">
        <div
          className={`${bebasNeue.className} flex items-center text-3xl font-bold`}
        >
          <p>FL. {formatImageNumber(activeIndex)}</p>
          <p>/ {String(media.length).padStart(2, "0")}</p>
        </div>

        <button
          type="button"
          aria-label="Open project info"
          className="flex size-8 appearance-none items-center justify-center border-0 bg-transparent p-0 text-white transition-opacity hover:opacity-70"
          onClick={() => setIsProjectInfoOpen(true)}
        >
          <FaInfoCircle size={16} />
        </button>
      </div>

      {isProjectInfoOpen && (
        <div className="absolute inset-0 z-20 flex items-end justify-center bg-black/40 px-5 py-8 backdrop-blur-md lg:items-center">
          <div className="w-full max-w-md border border-white/25 bg-white/10 p-6 text-sm text-white uppercase shadow-2xl backdrop-blur-xl lg:p-8">
            <div className="mb-6 flex flex-col gap-4">
              <div className="flex items-center justify-between tracking-wider">
                <p className={`${bebasNeue.className} text-4xl`}>
                  Project info
                </p>
                <button
                  type="button"
                  aria-label="Close project info"
                  className="flex size-8 cursor-pointer appearance-none items-center justify-center border-0 bg-transparent p-0 text-white transition-opacity hover:opacity-70"
                  onClick={() => setIsProjectInfoOpen(false)}
                >
                  <FaTimes size={18} />
                </button>
              </div>
              <div
                aria-hidden="true"
                className="h-3 w-full border border-white/50"
                style={{
                  backgroundImage: `linear-gradient(to right, ${firstImageColors})`,
                }}
              />
            </div>
            <div className="grid gap-5 text-base font-light">
              <ProjectDetail
                label="Project category"
                value={projectInfo?.category || "Editorial"}
              />
              <ProjectDetail
                label="Date created"
                value={projectInfo?.dateCreated || "2026"}
              />
              <ProjectDetail
                label="Shot for"
                value={projectInfo?.shotFor || "Lakme Fashion"}
              />
              {(projectInfo?.seeOn || !projectInfo) && (
                <div>
                  <p>See on:</p>
                  <Link
                    href={projectInfo?.seeOn || "#"}
                    className="underline"
                    target="_blank"
                  >
                    Instagram <FaExternalLinkAlt className="inline size-3" />
                  </Link>
                </div>
              )}
              {(projectInfo?.credits || !projectInfo) && (
                <ProjectDetail
                  label="Credits"
                  value={
                    projectInfo?.credits ||
                    "Shivamm Paathak / Amita Aggarwal / Anu Ahuja"
                  }
                />
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProjectImageSequence;
