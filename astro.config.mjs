import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import remarkDirective from "remark-directive";
import remarkCallouts from "./src/plugins/remark-callouts.mjs";

export default defineConfig({
  site: "https://compass.co.za",
  integrations: [tailwind(), sitemap()],
  output: "static",
  markdown: {
    remarkPlugins: [remarkDirective, remarkCallouts],
  },
});
