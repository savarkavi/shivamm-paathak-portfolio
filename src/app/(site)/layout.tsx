import { Geist, Geist_Mono } from "next/font/google";
import { inconsolata } from "@/fonts";
import { ReactLenis } from "lenis/react";
import PageTransition from "../../components/layout/PageTransition";
import SiteChrome from "../../components/layout/SiteChrome";

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
      className={`${geistSans.variable} ${geistMono.variable} ${inconsolata.className} antialiased`}
    >
      <ReactLenis root />
      <PageTransition />
      <SiteChrome />
      {children}
    </div>
  );
}
