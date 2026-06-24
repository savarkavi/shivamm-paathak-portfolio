import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import ProjectImageSequence from "@/components/sections/project/ProjectImageSequence";
import type { ProjectMedia } from "@/components/sections/project/ProjectImageSequence";

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: ProjectPageProps) => {
  const { id } = await params;

  const { data: project } = await sanityFetch({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug: id },
  });

  if (!project) {
    notFound();
  }

  const media = (project.gallery || []).flatMap<ProjectMedia>((item) => {
    if (item.mediaType === "image" && item.image?.url) {
      return [{
        type: "image" as const,
        src: item.image.url,
        alt: item.alt || "Project image",
        width: item.image.width || 1356,
        height: item.image.height || 1800,
      }];
    }

    if (item.mediaType === "video" && item.video) {
      return [{
        type: "video" as const,
        src: item.video,
        alt: item.alt || "Project video",
      }];
    }

    return [];
  });

  const projectInfo = {
    category: project.category || "Uncategorized",
    dateCreated: `${project.shootMonth ? project.shootMonth.charAt(0).toUpperCase() + project.shootMonth.slice(1) : ""} ${project.shootYear}`.trim(),
    shotFor: project.client || "Client",
    seeOn: project.instagramUrl || null,
    credits: project.credits?.join(" / ") || null,
  };

  const btsHref = project.behindTheScenes?.length ? `/project/${id}/bts` : null;

  return (
    <ProjectImageSequence
      media={media}
      projectInfo={projectInfo}
      btsHref={btsHref}
    />
  );
};

export default Page;
