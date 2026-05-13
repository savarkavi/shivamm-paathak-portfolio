"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import MobileHeader from "./MobileHeader";

const SiteChrome = () => {
  const pathname = usePathname();

  if (pathname === "/about/bts") {
    return null;
  }

  return (
    <>
      <Header />
      <MobileHeader />
    </>
  );
};

export default SiteChrome;
