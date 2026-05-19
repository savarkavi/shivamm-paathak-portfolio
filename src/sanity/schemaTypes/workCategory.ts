import { defineField, defineType } from "sanity";

export const workCategoryType = defineType({
  name: "workCategory",
  title: "Work Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "isVisible",
      title: "Visible",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "previewImages",
      title: "Preview Images",
      description: "Add 4 images used on the archive category preview.",
      type: "array",
      of: [
        defineField({
          name: "previewImage",
          title: "Preview Image",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "alt",
              media: "image",
            },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.required()
          .min(4)
          .max(4)
          .error("Each work category needs exactly 4 preview images."),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "previewImages.0.image",
    },
  },
});
