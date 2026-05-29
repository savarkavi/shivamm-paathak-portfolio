import { type SchemaTypeDefinition } from "sanity";
import { aboutPageType } from "./aboutPage";
import { clientType } from "./client";
import { projectType } from "./project";
import { projectImageType } from "./projectImage";
import { workCategoryType } from "./workCategory";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    workCategoryType,
    clientType,
    projectImageType,
    projectType,
    aboutPageType,
  ],
};
