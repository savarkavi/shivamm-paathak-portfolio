import { notFound } from "next/navigation";
import BtsStories, {
  type BtsStory,
} from "@/components/sections/bts/BtsStories";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { Metadata } from "next";

type ProjectBtsPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ProjectBtsPageProps): Promise<Metadata> {
  const { id } = await params;
  const { data: project } = await sanityFetch({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug: id },
  });

  if (!project) {
    return {
      title: "BTS Not Found | Shivamm Paathak",
    };
  }

  const clientName = project.client || "Project";
  return {
    title: `Behind the Scenes - ${clientName} | Shivamm Paathak`,
    description: `Behind the scenes look at the ${clientName} shoot by Shivamm Paathak.`,
  };
}

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
      if (item.mediaType === "image" && item.image?.url) {
        return [
          {
            mediaType: "image" as const,
            src: item.image.url,
            title: item.alt || `Behind the scenes ${index + 1}`,
          },
        ];
      }

      if (item.mediaType === "video" && item.video) {
        return [
          {
            mediaType: "video" as const,
            src: item.video,
            title: item.alt || `Behind the scenes ${index + 1}`,
          },
        ];
      }

      return [];
    },
  );

  if (!stories.length) {
    notFound();
  }

  return <BtsStories closeHref={`/project/${id}`} stories={stories} />;
};

export default Page;
