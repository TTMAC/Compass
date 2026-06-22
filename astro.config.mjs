import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import remarkDirective from "remark-directive";
import remarkCallouts from "./src/plugins/remark-callouts.mjs";
import rehypeArticleImages from "./src/plugins/rehype-article-images.mjs";
import { visualizer } from "rollup-plugin-visualizer";
import clerkServerFirst from "./src/lib/clerk-server-first.mjs";

const analyze = process.env.ANALYZE === "true";

export default defineConfig({
  site: process.env.SITE_URL || "https://govcompass.co.za",
  // Default output is "static": every page is prerendered unless it opts into
  // on-demand rendering with `export const prerender = false`. Only the gated
  // /reform/* routes and /login do so — everything else stays fully static.
  // The Netlify adapter provides the SSR handler those on-demand routes need.
  adapter: netlify(),
  integrations: [
    tailwind(),
    react(),
    sitemap({
      // Keep gated/auth routes out of the public sitemap.
      filter: (page) => !page.includes("/reform") && !page.includes("/login"),
    }),
    // Clerk integration with its global client-boot scripts stripped, so public
    // pages ship zero Clerk JS. Clerk is booted manually via <ClerkBoot /> only
    // on /reform/* and /login. Keys are read from PUBLIC_CLERK_PUBLISHABLE_KEY /
    // CLERK_SECRET_KEY; absent keys leave the gate dormant.
    clerkServerFirst({
      signInUrl: "/login",
      signUpUrl: "/login",
    }),
  ],
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
