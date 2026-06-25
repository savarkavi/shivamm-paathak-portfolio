import AboutSection from "@/components/sections/about";
import { sanityFetch } from "@/sanity/lib/live";
import {
  ABOUT_PAGE_QUERY,
} from "@/sanity/lib/queries";

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
