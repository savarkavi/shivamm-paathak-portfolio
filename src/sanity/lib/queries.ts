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

export const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    "category": category->title,
    shootMonth,
    shootYear,
    "client": client->name,
    instagramUrl,
    credits,
    shootTitle,
    gallery[] {
      mediaType,
      "image": image.asset-> {
        url,
        "width": metadata.dimensions.width,
        "height": metadata.dimensions.height,
        "blurDataURL": metadata.lqip
      },
      "video": video.asset->url,
      alt
    },
    behindTheScenes[] {
      mediaType,
      "image": image.asset-> {
        url,
        "width": metadata.dimensions.width,
        "height": metadata.dimensions.height,
        "blurDataURL": metadata.lqip
      },
      "video": video.asset->url,
      alt
    }
  }
`);

export type CategoryProject = {
  _id: string;
  projectId: string;
  imageUrl: string;
  altText: string;
};

export const PROJECTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "project" && category->slug.current == $category] | order(_createdAt desc) {
    _id,
    "projectId": slug.current,
    "imageUrl": coverImage.asset->url,
    "altText": coverAlt
  }
`);

export type AboutPageContent = {
  landingIntro: string;
  aboutBio: string;
  collaborationNote: string;
  aboutImage: {
    url: string;
    width?: number;
    height?: number;
    blurDataURL?: string;
  } | null;
  aboutImageAlt: string;
  instagramUrl?: string;
  twitterUrl?: string;
  email?: string;
};

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage"][0] {
    landingIntro,
    aboutBio,
    collaborationNote,
    "aboutImage": aboutImage.asset-> {
      url,
      "width": metadata.dimensions.width,
      "height": metadata.dimensions.height,
      "blurDataURL": metadata.lqip
    },
    aboutImageAlt,
    instagramUrl,
    twitterUrl,
    email
  }
`);
