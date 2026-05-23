import { defineField, defineType } from "sanity";

export const projectImageType = defineType({
  name: "projectImage",
  title: "Project Media",
  type: "object",
  fields: [
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      initialValue: "image",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.mediaType !== "image",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { mediaType?: string } | undefined;

          if (parent?.mediaType === "image" && !value) {
            return "Image is required.";
          }

          return true;
        }),
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "file",
      options: {
        accept: "video/*",
      },
      hidden: ({ parent }) => parent?.mediaType !== "video",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { mediaType?: string } | undefined;

          if (parent?.mediaType === "video" && !value) {
            return "Video is required.";
          }

          return true;
        }),
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      description: "Required for images. For videos, use this as accessible fallback text.",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { mediaType?: string } | undefined;

          if (parent?.mediaType === "image" && !value) {
            return "Alt text is required for images.";
          }

          return true;
        }),
    }),
  ],
  preview: {
    select: {
      mediaType: "mediaType",
      alt: "alt",
      image: "image",
    },
    prepare({ mediaType, alt, image }) {
      return {
        title: alt || (mediaType === "video" ? "Video" : "Image"),
        subtitle: mediaType === "video" ? "Video" : "Image",
        media: image,
      };
    },
  },
});
