"use client";

import { bebasNeue } from "@/fonts";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPause,
  FaPlay,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";

gsap.registerPlugin(useGSAP);

const videos = [
  { src: "/bts-1.mp4", title: "Behind the scenes 01" },
  { src: "/bts-2.mp4", title: "Behind the scenes 02" },
  { src: "/bts-3.mp4", title: "Behind the scenes 03" },
  { src: "/bts-4.mp4", title: "Behind the scenes 04" },
  { src: "/bts-5.mp4", title: "Behind the scenes 05" },
];

const BtsStories = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const activeVideo = useMemo(() => videos[activeIndex], [activeIndex]);

  const goToNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % videos.length);
  }, []);

  const goToPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + videos.length) % videos.length);
  }, []);

  const togglePaused = useCallback(() => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      void video.play();
      return;
    }

    video.pause();
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.45, ease: "power2.out" },
      );

      gsap.fromTo(
        storyRef.current,
        { y: 40, scale: 0.96, autoAlpha: 0 },
        { y: 0, scale: 1, autoAlpha: 1, duration: 0.65, ease: "power3.out" },
      );
    },
    { scope: containerRef },
  );

  useGSAP(
    () => {
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left" });

      gsap.fromTo(
        storyRef.current,
        { x: activeIndex === 0 ? 0 : 24, autoAlpha: 0.72 },
        { x: 0, autoAlpha: 1, duration: 0.35, ease: "power2.out" },
      );
    },
    { dependencies: [activeIndex], scope: containerRef },
  );

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.currentTime = 0;
    gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left" });

    const playPromise = video.play();
    if (playPromise) {
      void playPromise.catch(() => {
        setIsPaused(true);
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const updateProgress = () => {
      const progress = video.duration ? video.currentTime / video.duration : 0;
      gsap.to(progressRef.current, {
        scaleX: Math.min(progress, 1),
        duration: 0.16,
        ease: "none",
        overwrite: true,
      });
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadedmetadata", updateProgress);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("loadedmetadata", updateProgress);
    };
  }, [activeIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goToNext();
      if (event.key === "ArrowLeft") goToPrevious();
      if (event.key === " ") {
        event.preventDefault();
        togglePaused();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious, togglePaused]);

  return (
    <main
      ref={containerRef}
      className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-hidden bg-[#121212] px-4 pt-20 pb-5 text-white opacity-0 sm:px-8 sm:py-5"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),rgba(18,18,18,0)_38%)]" />

      <Link
        href="/about"
        aria-label="Close BTS stories"
        className="absolute top-5 right-5 z-30 flex size-11 items-center justify-center text-white transition-transform duration-300 hover:scale-110"
      >
        <IoClose className="text-4xl" />
      </Link>

      <div className="absolute top-6 left-5 z-20 sm:left-8">
        <p
          className={`${bebasNeue.className} text-glow scale-y-110 text-4xl tracking-normal uppercase sm:text-6xl`}
        >
          BTS
        </p>
      </div>

      <button
        type="button"
        aria-label="Previous BTS video"
        onClick={goToPrevious}
        className="absolute left-3 z-20 hidden size-11 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25 md:flex xl:left-[calc(50%-360px)]"
      >
        <FaChevronLeft />
      </button>

      <section
        ref={storyRef}
        className="relative z-10 flex h-[min(860px,calc(100vh-7rem))] w-full max-w-[430px] flex-col overflow-hidden rounded-[8px] border border-white/10 bg-black shadow-2xl shadow-black/40 sm:h-[min(860px,92vh)]"
      >
        <div className="absolute top-0 right-0 left-0 z-20 bg-gradient-to-b from-black/70 via-black/25 to-transparent px-4 pt-4 pb-16">
          <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/35">
            <div
              ref={progressRef}
              className="h-full w-full origin-left scale-x-0 bg-white"
            />
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold">shivammpaathak</p>
              <p className="text-xs text-white/70">
                {activeIndex + 1} / {videos.length}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                onClick={() => setIsMuted((current) => !current)}
                className="flex size-9 items-center justify-center rounded-full bg-black/20 transition-colors hover:bg-white/15"
              >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
              <button
                type="button"
                aria-label={isPaused ? "Play video" : "Pause video"}
                onClick={togglePaused}
                className="flex size-9 items-center justify-center rounded-full bg-black/20 transition-colors hover:bg-white/15"
              >
                {isPaused ? <FaPlay className="ml-0.5" /> : <FaPause />}
              </button>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black">
          <video
            key={activeVideo.src}
            ref={videoRef}
            src={activeVideo.src}
            aria-label={activeVideo.title}
            playsInline
            muted={isMuted}
            onEnded={goToNext}
            onPause={() => setIsPaused(true)}
            onPlay={() => setIsPaused(false)}
            className="max-h-full w-full object-contain"
          />

          <button
            type="button"
            aria-label="Previous BTS video"
            onClick={goToPrevious}
            className="absolute top-24 bottom-24 left-0 w-1/3 cursor-pointer md:hidden"
          />
          <button
            type="button"
            aria-label="Next BTS video"
            onClick={goToNext}
            className="absolute top-24 right-0 bottom-24 w-1/3 cursor-pointer md:hidden"
          />
        </div>

        <div className="absolute right-0 bottom-0 left-0 z-20 bg-gradient-to-t from-black/70 via-black/15 to-transparent px-4 pt-16 pb-4">
          <div className="flex items-center justify-between text-xs font-medium tracking-wide text-white/70 uppercase">
            <span>{activeVideo.title}</span>
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          </div>
        </div>
      </section>

      <button
        type="button"
        aria-label="Next BTS video"
        onClick={goToNext}
        className="absolute right-3 z-20 hidden size-11 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25 md:flex xl:right-[calc(50%-360px)]"
      >
        <FaChevronRight />
      </button>
    </main>
  );
};

export default BtsStories;
