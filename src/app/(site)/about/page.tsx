import AboutSection from "@/components/sections/about";
import { client } from "@/sanity/lib/client";
import {
  ABOUT_PAGE_QUERY,
  type AboutPageContent,
} from "@/sanity/lib/queries";

const Page = async () => {
  const aboutInfo = await client.fetch<AboutPageContent | null>(
    ABOUT_PAGE_QUERY,
  );

  return (
    <div>
      <AboutSection aboutInfo={aboutInfo} />
    </div>
  );
};

export default Page;
