import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shivamm Paathak",
  description: "Shivamm Paathak Photographer and Filmmaker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
