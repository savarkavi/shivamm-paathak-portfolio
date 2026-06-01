import { UNICORN_STUDIO_SDK_URL } from "@/lib/unicorn";
import type { AboutPageContent } from "@/sanity/lib/queries";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import UnicornScene from "unicornstudio-react/next";

type AboutProps = {
  aboutInfo?: AboutPageContent | null;
};

const fallbackAboutInfo: AboutPageContent = {
  landingIntro:
    "Shivamm Paathak is a photographer driven by a deep curiosity for people, culture, and the emotions that live between moments. His work sits at the intersection of fashion and Indian Mythology.",
  aboutBio:
    "Shivamm Paathak is a Delhi-based fashion and fine-art photographer known for blending mythology, emotion, and contemporary visual storytelling into a distinct cinematic style.",
  collaborationNote:
    "Over the years, Shivamm Paathak has collaborated with some of India's most respected designers, luxury labels, and publications. His portfolio includes work with brands and designers such as House of Kotwara by Meera and Muzaffar Ali, JJ Valaya, Amit Aggarwal, Abraham & Thakore, Rohit Gandhi + Rahul Khanna, Kharakapas, Libas India, Hazoorilal Jewellers, and Amazon India. His editorial and commercial work has appeared in publications including Grazia India, Cosmopolitan India, Elle India, L'Officiel, and Hindustan Times Brunch. Shivamm has also photographed notable public figures and creatives including Bhuvan Bam, Kartik Aaryan, Shikhar Dhawan, Sunil Chhetri, Taapsee Pannu, and Rahul Mishra.",
  aboutImage: {
    url: "/about-photo.jpg",
  },
  aboutImageAlt: "Shivamm Paathak portrait",
  instagramUrl: "https://instagram.com",
  twitterUrl: "https://twitter.com",
  email: "shivammpaathakstudios@gmail.com",
};

const About = ({ aboutInfo }: AboutProps) => {
  const ABOUT_SCENE = "/about_background_scene.json";
  const content = aboutInfo ?? fallbackAboutInfo;
  const imageUrl = content.aboutImage?.url || fallbackAboutInfo.aboutImage?.url;
  const imageAlt = content.aboutImageAlt || fallbackAboutInfo.aboutImageAlt;

  return (
    <div className="relative min-h-screen">
      <div className="fixed top-0 left-0 h-screen w-full">
        <UnicornScene
          production={true}
          scale={1}
          jsonFilePath={ABOUT_SCENE}
          dpi={1.5}
          sdkUrl={UNICORN_STUDIO_SDK_URL}
        />
      </div>
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center overflow-y-auto px-4 pt-24 pb-8 text-center text-lg text-white lg:pt-20 xl:w-auto">
        <div className="flex flex-1 flex-col items-center justify-center gap-6">
          <p>{content.aboutBio}</p>
          <div className="relative h-70 w-50 shrink-0">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="200px"
                placeholder={content.aboutImage?.blurDataURL ? "blur" : "empty"}
                blurDataURL={content.aboutImage?.blurDataURL}
                className="object-cover"
              />
            )}
          </div>
          <p>{content.collaborationNote}</p>
        </div>
        <div className="mt-auto flex w-full flex-col items-center gap-4 pt-12 text-center text-lg text-white xl:right-8 xl:left-8 xl:flex-row xl:justify-between xl:text-left">
          <div className="flex flex-col items-center gap-4 xl:flex-row xl:gap-6">
            {content.email && (
              <a
                href={`mailto:${content.email}`}
                className="text-sm transition-colors hover:text-gray-300 xl:text-lg"
              >
                {content.email}
              </a>
            )}
            <div className="flex items-center gap-4">
              {content.instagramUrl && (
                <a
                  href={content.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-gray-300"
                >
                  <FaInstagram className="text-xl" />
                </a>
              )}
              {content.twitterUrl && (
                <a
                  href={content.twitterUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-gray-300"
                >
                  <FaXTwitter className="text-xl" />
                </a>
              )}
            </div>
          </div>
          <div className="text-sm xl:text-lg">
            <p>Copyright © 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
