import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { inconsolata } from "@/fonts";
import { ReactLenis } from "lenis/react";
import Header from "../../components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shivamm Paathak",
  description: "Shivamm Paathak Photographer and Filmmaker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inconsolata.className} antialiased`}
      >
        <div
          className="fixed top-0 left-0 z-10 h-screen w-screen"
          style={{
            backgroundImage: "url('/grainy-effect.webp')",
            mixBlendMode: "hard-light",
            opacity: 0.08,
            pointerEvents: "none",
          }}
        />
        <ReactLenis root />
        <Header />
        {children}
      </body>
    </html>
  );
}
