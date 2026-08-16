import { defineArrayMember, defineField, defineType } from "sanity";
import { apiVersion } from "../env";

const shootMonths = [
  { title: "January", value: "january" },
  { title: "February", value: "february" },
  { title: "March", value: "march" },
  { title: "April", value: "april" },
  { title: "May", value: "may" },
  { title: "June", value: "june" },
  { title: "July", value: "july" },
  { title: "August", value: "august" },
  { title: "September", value: "september" },
  { title: "October", value: "october" },
  { title: "November", value: "november" },
  { title: "December", value: "december" },
];

const monthTitleByValue = Object.fromEntries(
  shootMonths.map((month) => [month.value, month.title]),
);

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "client",
      title: "Client / Shot For",
      type: "reference",
      to: [{ type: "client" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shootTitle",
      title: "Shoot Title",
      type: "string",
      description:
        "Optional. Used to distinguish multiple shoots for the same client.",
    }),
    defineField({
      name: "shootMonth",
      title: "Shoot Month",
      type: "string",
      options: {
        list: shootMonths,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shootYear",
      title: "Shoot Year",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(1900),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Generated from client name + shoot title. If no shoot title is provided, generated from client name + shoot date.",
      options: {
        source: async (doc, context) => {
          const clientRef = doc.client as { _ref?: string } | undefined;
          const client = clientRef?._ref
            ? await context
                .getClient({ apiVersion })
                .fetch<{ name?: string } | null>(
                  '*[_id == $id][0]{name}',
                  { id: clientRef._ref },
                )
            : null;
          const clientName = client?.name ?? "project";
          const shootTitle = doc.shootTitle as string | undefined;
          const shootMonth = doc.shootMonth as string | undefined;
          const shootYear = doc.shootYear as number | undefined;
          const shootDate = [
            shootMonth ? monthTitleByValue[shootMonth] : undefined,
            shootYear,
          ]
            .filter(Boolean)
            .join(" ");

          return [clientName, shootTitle || shootDate].filter(Boolean).join(" ");
        },
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "workCategory" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "credits",
      title: "Credits",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description: "Used on the category page as the project preview image.",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverAlt",
      title: "Cover Alt Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Project Gallery",
      type: "array",
      of: [
        defineArrayMember({
          name: "galleryImage",
          title: "Image",
          type: "image",
          options: {
            hotspot: true,
          },
          validation: (Rule) => Rule.required(),
        }),
        defineArrayMember({
          name: "galleryVideo",
          title: "Video",
          type: "file",
          options: {
            accept: "video/*",
          },
          validation: (Rule) => Rule.required(),
        }),
      ],
      options: {
        layout: "grid",
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "behindTheScenes",
      title: "Behind the scenes",
      type: "array",
      of: [{ type: "projectImage" }],
    }),
  ],
  preview: {
    select: {
      clientName: "client.name",
      shootTitle: "shootTitle",
      shootMonth: "shootMonth",
      shootYear: "shootYear",
      media: "coverImage",
    },
    prepare({ clientName, shootTitle, shootMonth, shootYear, media }) {
      const shootDate = [
        shootMonth ? monthTitleByValue[shootMonth] : undefined,
        shootYear,
      ]
        .filter(Boolean)
        .join(", ");

      return {
        title: clientName || "Project",
        subtitle: shootTitle || shootDate,
        media,
      };
    },
  },
});
