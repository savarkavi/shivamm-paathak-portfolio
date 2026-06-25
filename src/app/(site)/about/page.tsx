import AboutSection from "@/components/sections/about";
import { sanityFetch } from "@/sanity/lib/live";
import {
  ABOUT_PAGE_QUERY,
} from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Shivamm Paathak",
  description: "Learn more about Shivamm Paathak, a Delhi-based fashion and fine-art photographer.",
};

const Page = async () => {
  const { data: aboutInfo } = await sanityFetch({
    query: ABOUT_PAGE_QUERY,
  });

  return (
    <div>
      <AboutSection aboutInfo={aboutInfo} />
    </div>
  );
};

export default Page;
