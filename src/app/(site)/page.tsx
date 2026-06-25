import Hero from "@/components/sections/hero";
import { sanityFetch } from "@/sanity/lib/live";
import {
  ABOUT_PAGE_QUERY,
} from "@/sanity/lib/queries";

export default async function Home() {
  const { data: aboutInfo } = await sanityFetch({
    query: ABOUT_PAGE_QUERY,
  });

  return (
    <div className="bg-black">
      <Hero aboutInfo={aboutInfo} />
    </div>
  );
}
