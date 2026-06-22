import clerk from "@clerk/astro";

/**
 * Wraps the official `@clerk/astro` integration so its two global client-boot
 * scripts are NOT injected on every page.
 *
 * By default the integration calls `injectScript("before-hydration", …)` and
 * `injectScript("page", …)`, which run `runInjectionScript()` on every page in
 * the site — booting Clerk from its CDN even on fully-static public pages. That
 * would (a) add third-party JS to zero-JS pages, busting the page-weight budget,
 * and (b) make cross-origin requests to Clerk that our public-page CSP forbids.
 *
 * Instead we strip those two injections and boot Clerk manually — only on the
 * gated `/reform/*` routes and `/login` — via the <ClerkBoot /> component. Every
 * other Clerk feature (env schema, vite config, middleware) is left untouched.
 *
 * The stripped stages match the integration source: see
 * node_modules/@clerk/astro/dist/index.js (`buildBeforeHydrationSnippet` /
 * `buildPageLoadSnippet`).
 */
export default function clerkServerFirst(options) {
  const integration = clerk(options);
  const originalSetup = integration.hooks["astro:config:setup"];

  integration.hooks["astro:config:setup"] = (args) => {
    const injectScript = (stage, content) => {
      if (stage === "before-hydration" || stage === "page") {
        return; // booted manually via <ClerkBoot /> on gated pages only
      }
      return args.injectScript(stage, content);
    };
    return originalSetup({ ...args, injectScript });
  };

  return integration;
}
