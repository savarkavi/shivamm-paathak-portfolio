import { type SchemaTypeDefinition } from "sanity";
import { workCategoryType } from "./workCategory";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [workCategoryType],
};
