import { defineCollection, z } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { tagTypes } from "./library/types";

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        // Allow an optional array of tags
        tags: z.array(z.enum(tagTypes)).optional(),
      }),
    }),
  }),
};
