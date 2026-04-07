import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import remarkDirective from "remark-directive";
import remarkCallouts from "./src/plugins/remark-callouts.mjs";
import rehypeArticleImages from "./src/plugins/rehype-article-images.mjs";

export default defineConfig({
  site: process.env.SITE_URL || "https://govcompass.co.za",
  integrations: [tailwind(), sitemap()],
  output: "static",
  prefetch: true,
  redirects: {
    "/series": {
      status: 301,
      destination: "/pillars/government-structure",
    },
  },
  markdown: {
    remarkPlugins: [remarkDirective, remarkCallouts],
    rehypePlugins: [rehypeArticleImages],
  },
});
