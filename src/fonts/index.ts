import { Anton, Chonburi, Roboto } from "next/font/google";
import localFont from "next/font/local";

export const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
});

export const bebasNeue = localFont({
  src: "./BebasNeue-Regular.otf",
  variable: "--font-bebas",
});

export const chonburi = Chonburi({
  subsets: ["latin"],
  weight: ["400"],
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
