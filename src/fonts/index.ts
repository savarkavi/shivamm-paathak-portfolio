import {
  Inconsolata,
  Jersey_25,
  Anton,
  Just_Me_Again_Down_Here,
  Pixelify_Sans,
  Zilla_Slab_Highlight,
  Noto_Serif,
} from "next/font/google";
import localFont from "next/font/local";

export const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});

export const jersey25 = Jersey_25({
  subsets: ["latin"],
  weight: ["400"],
});

export const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
});

export const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const justMeAGain = Just_Me_Again_Down_Here({
  subsets: ["latin"],
  weight: ["400"],
});

export const zilaSlabHighlight = Zilla_Slab_Highlight({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export const nihonium = localFont({
  src: "./Nihonium113.ttf",
  variable: "--font-nihonium",
});

export const yarndings = localFont({
  src: "./Yarndings20-Regular.ttf",
  variable: "--font-yarndings",
});

export const bebasNeue = localFont({
  src: "./BebasNeue-Regular.otf",
  variable: "--font-bebas",
});
