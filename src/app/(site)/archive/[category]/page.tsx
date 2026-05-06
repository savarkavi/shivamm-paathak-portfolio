import Category from "@/components/sections/category";

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

const Page = async ({ params }: CategoryPageProps) => {
  const { category } = await params;

  return (
    <div className="min-h-screen bg-black">
      <div
        className="fixed top-0 left-0 z-99 h-screen w-screen"
        style={{
          backgroundImage: "url('/grainy-effect.webp')",
          mixBlendMode: "hard-light",
          opacity: 0.09,
          pointerEvents: "none",
        }}
      ></div>
      <Category categoryName={formatCategoryName(category)} />
    </div>
  );
};

export default Page;
