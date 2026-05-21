import { UNICORN_STUDIO_SDK_URL } from "@/lib/unicorn";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import UnicornScene from "unicornstudio-react/next";

const About = () => {
  const ABOUT_SCENE = "/about_background_scene.json";

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
      <div className="relative z-10 flex min-h-screen w-full max-w-3xl flex-col items-center overflow-y-auto px-4 pt-[10vh] pb-2 text-center text-lg text-white xl:mx-auto xl:w-auto">
        <div className="flex flex-col items-center gap-12">
          <p className="text-xl">
            Shivamm Paathak is a Delhi–based fashion and fine-art photographer
            known for blending mythology, emotion, and contemporary visual
            storytelling into a distinct cinematic style.
          </p>
          <div className="relative h-80 w-60 shrink-0">
            <Image
              src="/about-photo.jpg"
              alt="profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-4">
            <p>
              Over the years, Shivamm Paathak has collaborated with some of
              India’s most respected designers, luxury labels, publications. His
              portfolio includes work with brands and designers such as House of
              Kotwara by Meera and Muzaffar Ali, JJ Valaya, Amit Aggarwal,
              Abraham & Thakore, Rohit Gandhi + Rahul Khanna, Kharakapas, Libas
              India, Hazoorilal Jewellers, and Amazon India. His editorial and
              commercial work has appeared in publications including Grazia
              India, Cosmopolitan India, Elle India, L’Officiel, and Hindustan
              Times Brunch. Shivamm has also photographed notable public figures
              and creatives including Bhuvan Bam, Kartik Aaryan, Shikhar Dhawan,
              Sunil Chhetri, Taapsee Pannu, and Rahul Mishra.
            </p>
            <Link
              href="/about/bts"
              className="text-white/60 capitalize underline"
            >
              {" "}
              Check out behind the scenes & shoots from Shivamm Paathak.
            </Link>
          </div>
        </div>
        <div className="mt-auto flex w-full flex-col items-center gap-4 pt-12 text-center text-lg text-white xl:right-8 xl:left-8 xl:flex-row xl:justify-between xl:text-left">
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
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-gray-300"
              >
                <FaXTwitter className="text-xl" />
              </a>
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
