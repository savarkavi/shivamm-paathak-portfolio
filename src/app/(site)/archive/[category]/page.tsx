import Category from "@/components/sections/category";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import type { Metadata } from "next";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

const formatCategoryName = (category: string) =>
  decodeURIComponent(category)
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const formattedCategory = formatCategoryName(category);
  return {
    title: `${formattedCategory} | Shivamm Paathak`,
    description: `Explore ${formattedCategory} photography projects by Shivamm Paathak.`,
  };
}

const Page = async ({ params }: CategoryPageProps) => {
  const { category } = await params;
  const { data: projects } = await sanityFetch({
    query: PROJECTS_BY_CATEGORY_QUERY,
    params: { category },
  });

  return (
    <div className="min-h-screen bg-black">
      <div
        className="fixed top-0 left-0 z-99 h-screen w-screen"
        style={{
          backgroundImage: "url('/grainy-effect.webp')",
          mixBlendMode: "hard-light",
          opacity: 0.07,
          pointerEvents: "none",
        }}
      ></div>
      <Category categoryName={formatCategoryName(category)} projects={projects || []} />
    </div>
  );
};

export default Page;
