import {
  Inconsolata,
  Jersey_25,
  Anton,
  Just_Me_Again_Down_Here,
  Pixelify_Sans,
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

export const justMeAGain = Just_Me_Again_Down_Here({
  subsets: ["latin"],
  weight: ["400"],
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
