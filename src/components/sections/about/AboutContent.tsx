"use client";

import { bebasNeue } from "@/fonts";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutContent = () => {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const btsRef = useRef<HTMLHeadingElement>(null);
  const originalCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const duplicateCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const hoverTl = useRef<gsap.core.Timeline | null>(null);
  const text1Ref = useRef<HTMLParagraphElement>(null);
  const text2Ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const blinkTl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
      const blinkTargets = [titleRef.current, btsRef.current];
      blinkTl
        .to(blinkTargets, { opacity: 0.2, duration: 0.05 })
        .to(blinkTargets, { opacity: 1, duration: 0.05 })
        .to(blinkTargets, { opacity: 0.5, duration: 0.05 })
        .to(blinkTargets, { opacity: 1, duration: 0.1 })
        .to(blinkTargets, { opacity: 0.1, duration: 0.05 })
        .to(blinkTargets, { opacity: 1, duration: 0.05 });

      gsap.set(duplicateCharsRef.current, { yPercent: 100, opacity: 0 });

      hoverTl.current = gsap.timeline({ paused: true });
      hoverTl.current
        .to(
          originalCharsRef.current,
          {
            yPercent: -100,
            opacity: 0,
            stagger: 0.05,
            duration: 0.4,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          duplicateCharsRef.current,
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.4,
            ease: "power3.inOut",
          },
          0,
        );

      const elements = [titleRef.current, text1Ref.current, text2Ref.current];

      elements.forEach((el, index) => {
        gsap.fromTo(
          el,
          { y: 0 },
          {
            y: -200 - index * 100,
            ease: "none",
            scrollTrigger: {
              trigger: container.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: container },
  );

  const handleMouseEnter = () => hoverTl.current?.play();
  const handleMouseLeave = () => hoverTl.current?.reverse();

  const btsText = ["B", "T", "S"];

  return (
    <div
      ref={container}
      className={"relative h-[200vh] w-full bg-black text-white 2xl:h-auto"}
    >
      <Image
        src="/shivamm-profile.jpeg"
        alt="shivamm photo"
        width={1920}
        height={1080}
        className="fixed inset-0 h-screen w-screen object-cover brightness-60 2xl:relative 2xl:h-auto 2xl:w-screen"
      />
      <h1
        style={{ willChange: "transform" }}
        ref={titleRef}
        className={`${bebasNeue.className} text-glow absolute top-24 left-1/2 w-[90%] -translate-x-1/2 scale-y-110 text-center text-6xl font-bold uppercase 2xl:top-26 2xl:left-8 2xl:w-auto 2xl:translate-x-0 2xl:text-left 2xl:text-[12rem]`}
      >
        <span className="hidden font-sans lg:inline">(</span>Shivamm Paathak
        <span className="hidden font-sans lg:inline">)</span>
      </h1>
      <p
        style={{ willChange: "transform" }}
        ref={text1Ref}
        className="absolute top-[55vh] right-1/2 w-[90%] max-w-3xl translate-x-1/2 text-center text-sm 2xl:top-[20%] 2xl:right-8 2xl:translate-x-0 2xl:text-justify 2xl:text-2xl"
      >
        Shivamm Paathak is a Delhi–based fashion and fine-art photographer known
        for blending mythology, emotion, and contemporary visual storytelling
        into a distinct cinematic style. Working at the intersection of fashion,
        documentary, and portrait photography, his work is defined by controlled
        lighting, evocative compositions, and a deeply artistic visual language.
        With a background in Fashion Communication and years of self-driven
        creative exploration, Shivamm has built a body of work that feels both
        timeless and modern, rooted in Indian aesthetics while speaking to a
        global audience.
      </p>
      <p
        style={{ willChange: "transform" }}
        ref={text2Ref}
        className="absolute top-[110vh] left-1/2 w-[90%] max-w-3xl -translate-x-1/2 text-center text-sm 2xl:top-[50%] 2xl:left-8 2xl:translate-x-0 2xl:text-justify 2xl:text-2xl"
      >
        Over the years, Shivamm Paathak has collaborated with some of India’s
        most respected designers, luxury labels, publications, and cultural
        personalities. His portfolio includes work with brands and designers
        such as House of Kotwara by Meera and Muzaffar Ali, JJ Valaya, Amit
        Aggarwal, Abraham & Thakore, Rohit Gandhi + Rahul Khanna, Kharakapas,
        Libas India, Hazoorilal Jewellers, and Amazon India. His editorial and
        commercial work has appeared in publications including Grazia India,
        Cosmopolitan India, Elle India, L’Officiel, and Hindustan Times Brunch.
        Shivamm has also photographed notable public figures and creatives
        including Bhuvan Bam, Kartik Aaryan, Shikhar Dhawan, Sunil Chhetri,
        Taapsee Pannu, and Rahul Mishra, bringing a refined editorial
        sensibility to every collaboration.
      </p>

      <Link
        href="/about/bts"
        className="group absolute bottom-[10%] left-1/2 flex w-fit -translate-x-1/2 flex-col items-center justify-center text-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h2
          style={{ willChange: "transform" }}
          ref={btsRef}
          className={`${bebasNeue.className} text-glow scale-y-110 text-6xl font-bold uppercase 2xl:text-[12rem]`}
        >
          <span className="font-sans">(</span>
          {btsText.map((char, i) => (
            <span key={i} className="relative inline-block">
              <span
                ref={(el) => {
                  originalCharsRef.current[i] = el;
                }}
                className="inline-block"
              >
                {char}
              </span>
              <span
                ref={(el) => {
                  duplicateCharsRef.current[i] = el;
                }}
                className="absolute top-0 left-0 inline-block opacity-0"
              >
                {char}
              </span>
            </span>
          ))}
          <span className="font-sans">)</span>
        </h2>
        <p className="mt-4 max-w-md text-sm font-light tracking-wider transition-opacity duration-300 group-hover:opacity-80 2xl:mt-8 2xl:text-xl">
          Check out behind the scenes & shoots from Shivamm Paathak.
        </p>
      </Link>

      {/* Footer */}
      <div className="absolute right-0 bottom-8 left-0 flex flex-col items-center gap-6 text-center text-lg font-bold text-white xl:right-8 xl:left-8 xl:flex-row xl:justify-between xl:text-left">
        <div className="flex flex-col items-center gap-4 xl:flex-row xl:gap-6">
          <a
            href="mailto:shivammpaathakstudios@gmail.com"
            className="text-sm transition-colors hover:text-gray-300 xl:text-lg"
          >
            shivammpaathakstudios@gmail.com
          </a>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-gray-300"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-gray-300"
            >
              <FaXTwitter className="text-2xl" />
            </a>
          </div>
        </div>
        <div className="text-sm xl:text-lg">
          <p>Copyright © 2026</p>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
