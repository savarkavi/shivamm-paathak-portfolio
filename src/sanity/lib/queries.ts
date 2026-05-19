import { defineQuery } from "next-sanity";

export type WorkCategoryPreviewImage = {
  alt: string;
  url: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
};

export type WorkCategory = {
  _id: string;
  title: string;
  slug: string;
  order?: number;
  previewImages: WorkCategoryPreviewImage[];
};

export const WORK_CATEGORIES_QUERY = defineQuery(`
  *[_type == "workCategory" && isVisible == true]
    | order(order asc, title asc) {
      _id,
      title,
      "slug": slug.current,
      order,
      "previewImages": previewImages[0...4] {
        alt,
        "url": image.asset->url,
        "width": image.asset->metadata.dimensions.width,
        "height": image.asset->metadata.dimensions.height,
        "blurDataURL": image.asset->metadata.lqip
      }
    }
`);
