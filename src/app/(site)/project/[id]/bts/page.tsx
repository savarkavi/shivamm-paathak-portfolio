import { notFound } from "next/navigation";
import BtsStories, {
  type BtsStory,
} from "@/components/sections/bts/BtsStories";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/lib/queries";

type ProjectBtsPageProps = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: ProjectBtsPageProps) => {
  const { id } = await params;
  const { data: project } = await sanityFetch({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug: id },
  });

  if (!project) {
    notFound();
  }

  const stories = (project.behindTheScenes || []).flatMap<BtsStory>(
    (item, index) => {
      const src =
        item.mediaType === "image" ? item.image?.url : item.video || undefined;

      return src
        ? [
            {
              mediaType: item.mediaType,
              src,
              title: item.alt || `Behind the scenes ${index + 1}`,
            },
          ]
        : [];
    },
  );

  if (!stories.length) {
    notFound();
  }

  return <BtsStories closeHref={`/project/${id}`} stories={stories} />;
};

export default Page;
