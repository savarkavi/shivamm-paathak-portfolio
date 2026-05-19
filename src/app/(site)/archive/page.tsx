import Archive from "@/components/sections/archive";
import { client } from "@/sanity/lib/client";
import {
  WORK_CATEGORIES_QUERY,
  type WorkCategory,
} from "@/sanity/lib/queries";

const Page = async () => {
  const categories = await client.fetch<WorkCategory[]>(WORK_CATEGORIES_QUERY);

  return (
    <div className="min-h-screen bg-black">
      <Archive categories={categories} />
    </div>
  );
};

export default Page;
