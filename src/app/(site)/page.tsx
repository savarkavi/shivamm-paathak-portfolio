import Hero from "@/components/sections/hero";
import { client } from "@/sanity/lib/client";
import {
  ABOUT_PAGE_QUERY,
  type AboutPageContent,
} from "@/sanity/lib/queries";

export default async function Home() {
  const aboutInfo = await client.fetch<AboutPageContent | null>(
    ABOUT_PAGE_QUERY,
  );

  return (
    <div className="bg-black">
      <Hero aboutInfo={aboutInfo} />
    </div>
  );
}
