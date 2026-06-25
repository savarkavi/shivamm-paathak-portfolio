import Archive from "@/components/sections/archive";
import { sanityFetch } from "@/sanity/lib/live";
import {
  WORK_CATEGORIES_QUERY,
} from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive | Shivamm Paathak",
  description: "Explore the complete archive of past works and visual explorations by Shivamm Paathak.",
};

const Page = async () => {
  const { data: categories } = await sanityFetch({
    query: WORK_CATEGORIES_QUERY,
  });

  return (
    <div className="min-h-screen bg-black">
      <Archive categories={categories || []} />
    </div>
  );
};

export default Page;
