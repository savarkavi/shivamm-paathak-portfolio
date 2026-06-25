import { Geist, Geist_Mono } from "next/font/google";
import { roboto } from "@/fonts";
import { ReactLenis } from "lenis/react";
import PageTransition from "../../components/layout/PageTransition";
import SiteChrome from "../../components/layout/SiteChrome";
import { HeroSceneProvider } from "@/components/sections/hero/HeroSceneContext";
import { SanityLive } from "@/sanity/lib/live";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${roboto.className} antialiased`}
    >
      <HeroSceneProvider>
        <ReactLenis root />
        <PageTransition />
        <SiteChrome />
        {children}
        <SanityLive />
      </HeroSceneProvider>
    </div>
  );
}
