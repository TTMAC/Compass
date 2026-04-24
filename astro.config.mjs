import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import remarkDirective from "remark-directive";
import remarkCallouts from "./src/plugins/remark-callouts.mjs";
import rehypeArticleImages from "./src/plugins/rehype-article-images.mjs";
import { visualizer } from "rollup-plugin-visualizer";

const analyze = process.env.ANALYZE === "true";

export default defineConfig({
  site: process.env.SITE_URL || "https://govcompass.co.za",
  integrations: [tailwind(), sitemap()],
  output: "static",
  prefetch: true,
  vite: {
    plugins: [
      analyze &&
        visualizer({
          filename: "dist/bundle-stats.html",
          gzipSize: true,
          brotliSize: true,
          open: false,
        }),
    ].filter(Boolean),
  },
  markdown: {
    remarkPlugins: [remarkDirective, remarkCallouts],
    rehypePlugins: [rehypeArticleImages],
  },
});
