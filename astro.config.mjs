import clerk from "@clerk/astro";
import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import remarkDirective from "remark-directive";
import remarkCallouts from "./src/plugins/remark-callouts.mjs";
import rehypeArticleImages from "./src/plugins/rehype-article-images.mjs";
import { visualizer } from "rollup-plugin-visualizer";

const analyze = process.env.ANALYZE === "true";

export default defineConfig({
  site: process.env.SITE_URL || "https://govcompass.co.za",
  integrations: [clerk(), tailwind(), sitemap()],
  // Static-first: every page prerenders to the CDN by default. Only routes
  // that opt out via `export const prerender = false` (e.g. the Clerk auth
  // pages) run on-demand through the Netlify adapter.
  output: "static",
  adapter: netlify(),
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
