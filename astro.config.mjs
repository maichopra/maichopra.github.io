// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://maichopra.github.io/",
  integrations: [
    starlight({
      title: "J.A.C.K Blog",
      components: {
        // Override the default `PageTitle` component.
        PageTitle: "./src/components/PageHead.astro",
      },
      social: {
        github: "https://github.com/maichopra",
      },
      sidebar: [
        {
          label: "Articles",
          autogenerate: { directory: "articles" },
        },
        {
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
        {
          label: "Tags",
          link: "/tags/",
        },
      ],
    }),
  ],
});
