import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "landingIntro",
      title: "Landing Intro",
      type: "text",
      rows: 4,
      description: "Short intro paragraph shown on the landing page.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aboutBio",
      title: "About Bio",
      type: "text",
      rows: 6,
      description: "Main about paragraph for the about page.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "collaborationNote",
      title: "Collaboration Note",
      type: "text",
      rows: 5,
      description: "Paragraph covering who he has worked with and related context.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aboutImage",
      title: "About Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aboutImageAlt",
      title: "About Image Alt Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "twitterUrl",
      title: "Twitter URL",
      type: "url",
    }),
    defineField({
      name: "email",
      title: "Gmail",
      type: "email",
    }),
  ],
  preview: {
    select: {
      media: "aboutImage",
    },
    prepare({ media }) {
      return {
        title: "About Page",
        media,
      };
    },
  },
});
