# Planned Non-Functional Improvements

Prioritised list of non-functional improvements for GovCompass, grouped by impact and effort.

---

## High Priority — Security

### Item 1: Content Security Policy (CSP) header
- **Status:** ✅ Done
- **Why:** No CSP header in netlify.toml leaves the site open to XSS injection via uncontrolled script/style sources.
- **Action:** Add a `Content-Security-Policy` header to the global `[[headers]]` block, whitelisting only known origins (self, GA4, Netlify Identity, Google Fonts, unpkg for Decap CMS).
- **Resolution:** CSP header present in global `/*` headers block and `/admin/*` block. Whitelists: `script-src` (self, unsafe-inline, identity.netlify.com, googletagmanager.com), `style-src` (self, unsafe-inline, fonts.googleapis.com), `font-src` (self, fonts.gstatic.com), `img-src` (self, data:), `connect-src` (self, googletagmanager.com, google-analytics.com, analytics.google.com, *.google-analytics.com, identity.netlify.com), `frame-src` (none). Added missing GA4 regional analytics endpoints to prevent silent beacon failures.

### Item 2: Strict-Transport-Security (HSTS)
- **Status:** ✅ Done
- **Why:** HTTPS is enforced by Netlify at the platform level, but without an HSTS header browsers may still attempt an initial HTTP request.
- **Action:** Add `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` to the global headers.
- **Resolution:** Already present in the global `/*` headers block in `netlify.toml` with the exact recommended value.

### Item 3: Subresource Integrity (SRI) for external scripts
- **Status:** ✅ Done
- **Why:** External scripts (Netlify Identity widget, Decap CMS, GA4) load without `integrity` attributes — a supply-chain compromise could inject malicious code.
- **Action:** Add `integrity` and `crossorigin` attributes to `<script>` tags in BaseLayout.astro and admin/index.html. Note: GA4 is dynamically injected after consent so SRI is not feasible there; focus on static script tags.
- **Resolution:** Netlify Identity widget already had SRI in both BaseLayout.astro and admin/index.html. Added SRI to Decap CMS script in admin/index.html and pinned version from `@^3.0.0` to `@3.11.0` (SRI requires a fixed version). GA4 remains without SRI as it's dynamically injected after consent.

### Item 4: Permissions-Policy header
- **Status:** ✅ Done
- **Why:** Without this header, the page implicitly allows browser features (camera, microphone, geolocation) it never uses.
- **Action:** Add `Permissions-Policy` header denying all unused features.
- **Resolution:** Already present in the global `/*` headers block in `netlify.toml`, denying camera, microphone, geolocation, payment, usb, magnetometer, gyroscope, and accelerometer.

---

## High Priority — Performance

### Item 5: Use Astro `<Image />` component
- **Status:** ✅ Done (N/A)
- **Why:** Plain `<img>` tags miss automatic responsive `srcset`/`sizes` generation and modern format conversion (WebP/AVIF). Critical for readers on 4G prepaid data.
- **Action:** Replace `<img>` tags with Astro's `<Image />` or `<Picture />` component where applicable.
- **Resolution:** No `<img>` tags exist in the codebase — the site currently has no images. When images are added in the future, Astro's `<Image />` component should be used from the start.

### Item 6: Enable Astro prefetch
- **Status:** ✅ Done
- **Why:** Astro supports link prefetching for faster perceived navigation; currently not enabled.
- **Action:** Enable `prefetch` in astro.config.mjs and apply to key navigation links.
- **Resolution:** Added `prefetch: true` to `astro.config.mjs`. Astro's default prefetch strategy (`hover`) prefetches links when users hover over them, improving perceived navigation speed without aggressive preloading that would waste data.

### Item 7: Add bundle analysis tooling
- **Status:** ✅ Done
- **Why:** No way to monitor whether the 450 KB page-weight budget is being respected.
- **Action:** Add `rollup-plugin-visualizer` or similar to the build, and consider a Lighthouse CI check in the deploy pipeline.
- **Resolution:** Added `rollup-plugin-visualizer` (activated with `ANALYZE=true` env var, outputs `dist/bundle-stats.html`) and a custom page-weight budget checker script (`scripts/check-page-weight.mjs`). New npm scripts: `build:analyze` (full build + visualizer + budget report), `budget` (report only), `budget:strict` (exits 1 if any page exceeds 450 KB gzipped). All 93 pages are well within budget — heaviest page is 52.7 KB gzipped, far under the 250 KB target.

---

## Medium Priority — SEO

### Item 8: Expand structured data (JSON-LD)
- **Status:** ✅ Done
- **Why:** Only `Article` schema exists; missing `Organization`, `WebSite`, and `BreadcrumbList` schemas that improve search presence.
- **Action:** Add Organisation and WebSite schemas to BaseLayout; add BreadcrumbList to article pages.
- **Resolution:** Added `Organization` and `WebSite` schemas to BaseLayout (rendered on all pages). Added `BreadcrumbList` schema to ArticleLayout with crumbs: Home → Pillar → Part → Article. Updated `jsonLd` prop type to accept single object or array to support multiple page-specific schemas. All four schema types render correctly on article pages; home/non-article pages get Organization + WebSite.

### Item 9: Add meta theme-color
- **Status:** ✅ Done
- **Why:** Browser chrome (address bar on mobile) doesn't match site branding.
- **Action:** Add `<meta name="theme-color" content="#355E3B">` to BaseLayout head.
- **Resolution:** Added `<meta name="theme-color" content="#355E3B">` (compass-green) to BaseLayout head, applied to all pages.

### Item 10: Add apple-touch-icon
- **Status:** ✅ Done
- **Why:** iOS bookmark icon falls back to a screenshot instead of a branded icon.
- **Action:** Generate a 180×180 PNG icon and add the `<link rel="apple-touch-icon">` tag.
- **Resolution:** Created 180×180 PNG at `public/apple-touch-icon.png` — compass-green background with white "G" arc integrated with a compass needle (white north, gold south, matching the existing favicon motif). Added `<link rel="apple-touch-icon">` to BaseLayout head. Generator script at `scripts/generate-apple-icon.mjs` for future regeneration.

---

## Medium Priority — Reliability

### Item 11: Add 500 error page
- **Status:** ✅ Done
- **Why:** Server errors show Netlify's generic page instead of a branded experience.
- **Action:** Create a custom 500.html in public/ or a corresponding Netlify function fallback.
- **Resolution:** Created `public/500.html` as standalone HTML with inlined styles matching the 404 page design (compass-green branding, Inter/Source Serif fonts, "Go home" + "Browse the series" buttons). Added 500 redirect rule to `netlify.toml`. No external dependencies — works even when the build pipeline or CDN fails.

### Item 12: Add try-catch to client-side JS
- **Status:** ✅ Done
- **Why:** Pagefind search initialisation and scroll-depth tracking could silently break with no user feedback.
- **Action:** Wrap critical client-side code blocks in try-catch with graceful degradation.
- **Resolution:** Added error handling across four components: (1) CookieConsent — wrapped all `localStorage` calls in try-catch for private browsing, wrapped GA4 `loadGA4()` in try-catch, fixed scroll-depth div-by-zero with early return when `scrollHeight === innerHeight`. (2) Header — wrapped Pagefind script loading and init in try-catch, added `script.onerror` handler. (3) ReadingProgress — fixed div-by-zero when article is shorter than viewport. (4) Government-functions — added null guards on `getElementById` and `querySelector` to prevent crash on missing tab elements.

### Item 13: Add `aria-live` regions for dynamic content
- **Status:** ✅ Done
- **Why:** Dynamic updates (search results, form submission feedback) are not announced to screen readers.
- **Action:** Add `aria-live="polite"` to search results container and form status messages.
- **Resolution:** Added `aria-live` attributes to 6 dynamic regions: (1) EmailCapture — `aria-live="polite"` on success message, `aria-live="assertive" role="alert"` on error message. (2) ShareButtons — `aria-live="assertive"` on copy button label ("Copied!"/"Failed" feedback). (3) Header — `aria-live="polite"` on both desktop and mobile Pagefind search result containers. (4) Reform page — `aria-live="polite"` on reform count indicator and active filter indicator. ReadingProgress already had proper `role="progressbar"` with `aria-valuenow`.

---

## Lower Priority — Nice-to-haves

### Item 14: PWA support (service worker + manifest)
- **Status:** ✅ Done
- **Why:** Offline reading capability is valuable for readers on unreliable 4G connections.
- **Action:** Add a basic service worker with cache-first strategy for articles and a web manifest.
- **Approach decision:** After discussion with the owner, chose a hand-rolled, zero-dependency service worker over `@vite-pwa/astro`. Reasoning: GovCompass is a static Astro site with ~94 HTML pages and flat, predictable asset URLs, so Workbox's main benefit (precaching hashed asset graphs in SPAs) brings no real value; a ~100-line `sw.js` covers the full use case with a smaller debugging surface, no new deps, and no extra runtime chunks to whitelist in the tight CSP. The one real win from Workbox — the "new SW waiting → reload" update flow — was replicated directly in BaseLayout via `updatefound` / `statechange` / `skipWaiting` / `controllerchange`. Flagged to the owner that if push notifications, background sync, or Web Share Target become roadmap items, option 2 should be reconsidered.
- **Resolution:**
  - **Manifest** — `public/manifest.webmanifest` with name, short_name, description, start_url `/`, scope `/`, `display: minimal-ui`, theme_color `#355E3B`, background_color `#ffffff`, lang `en-ZA`, and three icons: `favicon.svg` (any), `icon-192.png` (any maskable), `icon-512.png` (any maskable). Linked from `BaseLayout.astro` head.
  - **PWA icons** — generated `public/icon-192.png` and `public/icon-512.png` from the same compass-green "G + needle" motif as the favicon and apple-touch-icon, using a new `scripts/generate-pwa-icons.mjs` that reuses the existing `sharp` dependency. The script draws in a 180-unit viewBox and scales to both output sizes so the icon's safe-area padding holds under Android's maskable rendering.
  - **Service worker** — `public/sw.js`, ~100 lines, zero deps. Strategy: (1) precache an app shell on install (`/`, `/offline.html`, `/favicon.svg`, `/manifest.webmanifest`); (2) **network-first** for HTML navigations, falling back to the runtime cache, then to `/offline.html` when both fail — so readers online always see fresh content but previously-visited pages remain reachable offline; (3) **cache-first** for same-origin static assets (`/_astro/`, `/fonts/`, `/images/`, `/og/`, favicons, PWA icons, manifest); (4) passthrough (no interception) for cross-origin requests (GA4, etc.), the `/admin` area (Decap CMS), and `sw.js` itself. Runtime cache is populated as users browse, so each visited article becomes available offline automatically. Cache version constant (`CACHE_VERSION = "v1"`) is bumped on any SW change; the `activate` handler deletes all caches except the current static/runtime pair.
  - **Update flow** — Added a small `#sw-update-banner` fixed-position toast at the bottom of `BaseLayout.astro` ("A new version is available. Reload / dismiss"). Registration logic listens for `updatefound` → `statechange === "installed"` (with an existing controller, so it's an update not a first install) and shows the banner. Clicking Reload posts `SKIP_WAITING` to the waiting worker, which triggers `controllerchange` and a one-time `window.location.reload()`. Dismiss hides the banner without activating. Registration failures are swallowed silently so a broken SW never breaks the page.
  - **Offline fallback page** — `public/offline.html`, standalone branded HTML matching the 404/500 pattern: "You're offline" heading, copy explaining that previously-visited articles should still work, a "Try again" button that reloads, and a "Go home" link. No external dependencies.
  - **CSP** — Added explicit `worker-src 'self'` and `manifest-src 'self'` to the global `/*` CSP in `netlify.toml`. Both would have fallen back through `child-src` → `default-src 'self'` implicitly, but being explicit avoids any browser-specific quirks around worker sourcing.
  - **SW caching headers** — Added a dedicated `[[headers]]` block for `/sw.js` with `Cache-Control: public, max-age=0, must-revalidate` (so browsers always revalidate the worker on each page load and pick up new versions within one visit) and `Service-Worker-Allowed: /` (explicit root scope).
  - **BaseLayout registration** — Inline `is:inline` script inside `<body>`, gated on `"serviceWorker" in navigator`, deferred to the `load` event so it never competes with critical rendering. All registration, update-found handling, and the `controllerchange` reload are wrapped so failures are silent.
  - **Build verified** — 93 pages built cleanly, all PWA assets (`sw.js`, `manifest.webmanifest`, `offline.html`, `icon-192.png`, `icon-512.png`) present in `dist/`. Pagefind indexed 93 pages.

### Item 15: Lighthouse CI in deploy pipeline
- **Status:** ✅ Done
- **Why:** Performance regressions are not caught before deploy.
- **Action:** Add Lighthouse CI GitHub Action or Netlify plugin with performance budgets.
- **Approach decision:** Chose a GitHub Action over a Netlify plugin because the project already has a structured `ci.yml` (lint → test → build → e2e) and adding another job there keeps all checks in one place with consistent artifact handling and PR visibility. A Netlify plugin would run inside the build context, have less flexibility around report storage, and split status reporting across two surfaces.
- **Resolution:**
  - **Tool** — Added `treosh/lighthouse-ci-action@v12` (the de-facto wrapper around `@lhci/cli`). No new npm dep; the action bundles `lhci` and runs in an isolated job.
  - **Config** — New `lighthouserc.json` at the repo root:
    - `collect.staticDistDir: ./dist` so lhci serves the build artifact from a local HTTP server on ephemeral port.
    - `collect.url` audits four representative pages: `/` (home), `/big-picture/` (series landing), `/real-steps-to-reform/` (heaviest page per Item 7's budget report, 52.7 KB gzipped), and `/articles/1-1-architecture-of-the-state/` (canonical article template).
    - `collect.settings.preset: desktop` for deterministic runs on CI runners — the mobile preset's emulated throttling is noisier and would produce flaky thresholds.
    - `skipAudits: ["uses-http2", "is-crawlable"]` — both are meaningless against lhci's ephemeral local server (HTTP/2 is a Netlify-level concern in prod; robots.txt is served normally but the auditor can't see real DNS).
  - **Budgets / assertions** — Deliberately split between `error` and `warn` to avoid blocking PRs on first install:
    - **`error`**: `categories:accessibility >= 0.95` only. WCAG 2.1 AA is a non-negotiable site requirement per CLAUDE.md, so accessibility regressions must block the pipeline.
    - **`warn`** (visible but non-blocking): performance >= 0.9, best-practices >= 0.9, SEO >= 0.95; resource budgets of 150 KB script, 50 KB stylesheet, 450 KB total — the last matching the existing Item 7 page-weight budget exactly (460800 bytes = 450 KB). The owner can flip these to `error` once a clean baseline is established.
    - **Disabled**: `uses-long-cache-ttl` (lhci's local server serves no cache headers; real Netlify headers are correct, see the `/_astro/*` and `/fonts/*` headers blocks in netlify.toml), and `csp-xss` (our CSP needs `unsafe-inline` in script-src for JSON-LD and the cookie-consent logic — auditing would produce a permanent false positive).
  - **Report upload** — `upload.target: filesystem` writes HTML reports into `.lighthouseci/` inside the runner. The `treosh` action then uploads that directory as a GitHub Actions artifact (`uploadArtifacts: true`), so PR reviewers can download the full Lighthouse report from the workflow run. `temporaryPublicStorage: false` disables upload to Google's public LHCI server — reports stay inside the repo's CI.
  - **CI wiring** — Added a new `lighthouse` job in `.github/workflows/ci.yml` that depends on `build` (reuses the uploaded `dist` artifact via `actions/download-artifact`), runs only on push/PR to `main`/`staging`/`develop` (inherits the top-level trigger), and slots in parallel with `e2e` since both consume the same artifact.
  - **Housekeeping** — Added `.lighthouseci/` to `.gitignore` so local `npx @lhci/cli autorun` runs don't pollute the working tree.
  - **Not verified locally** — Lighthouse requires a headful Chrome binary and takes several minutes per run, so end-to-end validation happens on the first CI push. The JSON config parses cleanly, the action is pinned to a released version (`@v12`), and the job structure mirrors the existing `e2e` job exactly — risk of red CI on first push is low, but the owner should watch the initial run.

### Item 16: Add security.txt
- **Status:** ✅ Done
- **Why:** No published vulnerability disclosure channel.
- **Action:** Create `public/.well-known/security.txt` with contact and policy info.
- **Resolution:** Created `public/.well-known/security.txt` per RFC 9116. Uses the already-public `hello@govcompass.co.za` contact (same address documented on `privacy.astro` and `about.astro`) rather than inventing a new `security@` alias that may not be wired up. Set `Expires: 2027-04-14T00:00:00.000Z` (one year from today) — the RFC requires a future expiry; the owner should refresh this before it lapses. Added `Preferred-Languages: en` and `Canonical: https://govcompass.co.za/.well-known/security.txt`. Build verified clean; file ships to `dist/.well-known/security.txt` as a static asset.

### Item 17: POPIA-specific cookie consent wording
- **Status:** ✅ Done
- **Why:** The privacy policy covers POPIA but the cookie banner itself doesn't reference the Act.
- **Action:** Update CookieConsent banner copy to mention POPIA compliance.
- **Resolution:** Updated `src/components/CookieConsent.astro` banner copy from "We use cookies for analytics to improve your experience." to "We use cookies for anonymised analytics, processed in line with the Protection of Personal Information Act (POPIA)." — spelling the Act out in full on first mention (the privacy policy at `/privacy` already does the same, ensuring the "Learn more" link lands in context). "Anonymised" is accurate because GA4 is loaded with `anonymize_ip: true` in `loadGA4()`. While editing, also removed the inline `style="max-height: 80px"` cap on the banner container — the longer POPIA copy would have been clipped on narrow viewports, and the max-height had no layout purpose beyond capping the original one-line text. Verified no tests reference the old literal text (only `docs/SRD_GovCompass_Blog.md` does, which is a spec doc). Build + 64 unit tests pass clean.

---

## High Priority — Content

### Item 18: Replace generic "The Bottom Line, Up Front" headings with article-specific summaries
- **Status:** ✅ Done
- **Why:** Every article uses the identical `## The Bottom Line, Up Front` heading, which tells the reader nothing specific. Replacing it with a one-line summary of the article's key argument improves scannability, aids navigation (table-of-contents, search results), and reinforces the article's core message before the reader commits to the full text.
- **Scope:** 70 articles across `src/content/articles/` use this heading.
- **Action plan:**
  1. **Audit:** For each article, read the BLUF paragraph(s) that follow the heading and identify the single key insight or argument.
  2. **Draft replacement headings:** Write a concise, specific H2 that captures that insight. Examples:
     - `1-1-architecture-of-the-state.md`: `## Three Equal Spheres, Not Three Tiers` (key point: SA has co-equal spheres, not a hierarchy)
     - `1-2-who-does-what.md`: `## Know Which Sphere to Hold Accountable` (key point: misdirected accountability wastes civic energy)
     - `2-1-following-the-money.md`: `## The Budget Is the Government's True Policy Document` (key point: money reveals real priorities)
  3. **Batch by series:** Work through articles one Part/series at a time to maintain tonal consistency within each series.
  4. **Preserve anchor links:** If any internal cross-references link to `#the-bottom-line-up-front`, update those links to the new slug. Run a grep for the old anchor across all `.md` and `.astro` files before and after.
  5. **Update ArticleLayout if needed:** Check whether `ArticleLayout.astro` or any component renders or references the BLUF heading programmatically. If so, update accordingly.
  6. **QA:** Build locally and spot-check table-of-contents rendering, anchor links, and heading hierarchy for a sample of articles from each series.

### Item 19: QA — Fix merged H2 headings in BLUF sections across all articles
- **Status:** ✅ Done
- **Resolution:** All merged H2 headings across the article corpus were identified and split correctly.

### Item 20: QA — Full article structure, editorial guidelines, and resources audit
- **Status:** ✅ Done
- **Why:** Articles have not been systematically reviewed for consistent structure, adherence to editorial guidelines (non-partisan tone, domain language, heading hierarchy), and the presence of a Resources section. Inconsistencies could undermine reader trust and the site's educational mission.
- **Action plan:**
  1. **Structure check:** Verify every article has the expected sections: BLUF summary, body with proper heading hierarchy (H2 → H3, no skipped levels), and a `## Resources` section at the end with relevant links.
  2. **Editorial guidelines check:** Confirm non-partisan tone, correct domain language (Article not post, Part not section, Sphere not tier, Series not blog), and consistent formatting conventions.
  3. **Resources section audit:** Flag articles missing a Resources section entirely or containing broken/placeholder links. Ensure each Resources section provides at least one authoritative source (e.g. legislation, government website, academic reference).
  4. **Batch by Part:** Work through articles one Part at a time for tonal consistency.
  5. **Fix in place:** Correct any issues found directly in the article `.md` files.
  6. **Build and verify:** Run `npm run build` after fixes to confirm no breakage.
- **Resolution:** Audited all 76 articles across 5 series (main, ss-, eg-, ra-, hd-). Found and fixed: (1) 10 orphaned H2 headings — BLUF paragraphs were above their headings, leaving consecutive H2s with no content between them; moved paragraphs below their headings in 1-1, 2-2, 2-3, ss-1-1, ss-1-2, ss-2-1, ss-2-2, ss-2-3, ss-2-4, ss-2-5. (2) 5 missing `## Resources` sections — added authoritative source links to eg-5-1, eg-5-2, eg-5-3, ra-1-1, ra-2-4. (3) 5 skipped heading levels — changed `####` to `###` for "Suggested Sequencing" headings in ra-5-1. No domain language violations or frontmatter issues found. Build verified clean.
- **Why:** Multiple articles have a bug where the H2 heading after the BLUF intro paragraph is concatenated onto the same line as the preceding paragraph text (e.g. `## The System That Holds the System Together That knowledge is essential...`). This causes the heading to render as body text and the paragraph to lose its separation, breaking both the visual layout and the table of contents. Already found and fixed in `1-3-how-the-spheres-interact.md` and `2-1-following-the-money.md`.
- **Pattern to detect:** Any line matching `^## .{30,}` (an H2 followed by unusually long text) in the BLUF section is likely a merged heading+paragraph. Alternatively, grep for lines starting with `## ` that contain a sentence-ending full stop (`.`) — real headings rarely do.
- **Action plan:**
  1. Run: `grep -n '^## .*\. ' src/content/articles/*.md` to find candidate lines where an H2 contains sentence-ending punctuation, indicating merged heading+paragraph.
  2. For each match, manually verify and split: move the paragraph text before the `## ` marker, insert a blank line, then place the `## ` heading on its own line.
  3. Build locally and check that the table of contents and heading hierarchy render correctly for each fixed article.

### Item 21: Fix Resource formatting for all articles
- **Status:** ✅ Done
- **Why:** Resource sections across articles may have inconsistent formatting (e.g. varying list styles, missing link text, inconsistent heading levels, or broken markup) that undermines readability and the professional quality of the site.
- **Action:** Audit and standardise the `## Resources` section formatting across all articles in `src/content/articles/`, ensuring consistent list style, proper link markup, and uniform presentation.
- **Resolution:** Audited all 76 articles and standardised 28 that had inconsistent formatting. Fixed: (1) 6 articles (3-1 through 4-3) converted from paragraph format with bold sub-headings and plain URLs to bullet list with markdown links. (2) 15 eg-series articles converted from various paragraph/prose formats with bold source names to bullet list format. (3) 4 ra-4-x articles had plain URLs converted to markdown links. (4) 2 ra-5-x articles converted from prose paragraphs to bullet list. (5) 2 articles (eg-1-1, eg-4-2) had heading corrected from "Resources and Institutional Sources" to "Resources". (6) All intro lines standardised to "The analysis in this article draws on the following institutional research and publications:". All internal cross-reference links preserved. Build verified clean.

---

## Reform Roadmap Page Improvements

### Item 22: Fix "Institutional Reforms reforms" redundancy in stats bar
- **Status:** ✅ Done
- **Why:** The stats bar renders `{ws.shortTitle} reforms`, but the reform-agenda workstream's `shortTitle` is "Institutional Reforms", producing the redundant text "Institutional Reforms reforms".
- **Action:** Fix in `src/pages/real-steps-to-reform.astro` or `src/data/reforms.ts` so the label reads correctly.
- **Resolution:** Changed `shortTitle` from "Institutional Reforms" to "Institutional" in `src/data/reforms.ts`. This aligns with the other single-word shortTitles (Safety, Economy, People) and fixes the redundancy across all four usage sites (stats bar, filter buttons, timeline labels, legislative badges).

### Item 23: Add text search filter for reform cards
- **Status:** ✅ Done
- **Why:** With 84 reforms on a single page, readers have no way to quickly find reforms relevant to a specific topic (e.g. "water", "education", "policing") without scrolling through the entire page.
- **Action:** Add a search input above the reform cards that filters cards in real-time by matching title and description text. Must be lightweight client-side JS to stay within page-weight budget.
- **Resolution:** Added a search input with magnifying glass icon to the sticky filter bar in `src/pages/real-steps-to-reform.astro`. Searches against full card text content (title + description) with 150ms debounce. Also added a live reform count indicator ("15 of 84 reforms") that updates on any filter change (workstream, phase, or search). Empty phase sections and workstream sections auto-hide when all their cards are filtered out. Build verified clean.

### Item 24: Add on-page table of contents / jump links
- **Status:** ✅ Done
- **Why:** The page is very long. Readers need a way to jump directly to sections (Timeline, Milestones, RAARICLE Framework, each Workstream, Legislative Programme, Cross-Cutting Enablers) without scrolling.
- **Action:** Add a compact TOC near the top of the page with anchor links to each major section.
- **Resolution:** Added `id` and `scroll-mt-32` attributes to all 9 major sections (timeline, milestones, raaricle, 4 workstreams, legislative, enablers). Added a compact inline `<nav>` between the stats bar and workstream filter with "Jump to:" label and colour-coded links. Workstream links use their workstream colour; other links use compass-green. Build verified clean.

### Item 25: Show visible reform count after filtering
- **Status:** ✅ Done
- **Why:** When a workstream or phase filter is active, readers have no feedback on how many reforms match. Showing "Showing 15 of 84 reforms" near the filter bar gives immediate orientation.
- **Action:** Add a live count indicator near the workstream filter bar that updates when filters change.
- **Resolution:** Implemented as part of Item 23. A `<span id="reform-count">` in the filter bar shows "84 reforms" when unfiltered and "X of 84 reforms" when any filter (workstream, phase, or search) is active. Updated by the `applyFilters()` function on every filter change.

### Item 26: Sync filter state to URL
- **Status:** ✅ Done
- **Why:** Workstream and phase filters are purely in-memory JS — the state is lost on page reload. Readers cannot share or bookmark a filtered view.
- **Action:** Sync active workstream and phase to URL hash or query params (e.g. `?ws=safety-security&phase=phase-1`). Read from URL on page load.
- **Resolution:** Added URL query-param sync for all three filters in `src/pages/real-steps-to-reform.astro`: `ws`, `phase`, and `q` (search). `syncUrl()` runs at the end of `applyFilters()` via `history.replaceState` so no new history entries are created. On page load, an IIFE reads the params, validates `ws`/`phase` against the known sets of IDs (ignoring unknown values), restores the search input value, applies the correct active-button styles via a new shared `setWorkstreamButtonStyles()` helper, and calls `applyFilters()`. The phase param is only honoured when a specific workstream is active, matching the in-page behaviour. Refactored both click handlers to use the shared helper, removing ~30 lines of duplicated button-styling code. Filtered views are now shareable and bookmarkable.

### Item 27: Add phase shade differentiation in timeline
- **Status:** ✅ Done
- **Why:** Each workstream's timeline phases use the same solid colour, making it hard to visually distinguish Phase 1 from Phase 3 at a glance.
- **Action:** Use progressive opacity or shade (e.g. 70%, 85%, 100%) for Phase 1 → 2 → 3 within each workstream's timeline bar.
- **Resolution:** Applied progressive inline opacity (Phase 1 = 0.7, Phase 2 = 0.85, Phase 3 = 1.0) to `.reform-phase-btn` in `src/pages/real-steps-to-reform.astro`, so each workstream's bar now visibly darkens left-to-right across the 10 years. Replaced the previous `hover:opacity-90` class with `hover:brightness-110` because inline opacity would have overridden the Tailwind hover utility, and brightness gives a consistent hover affordance across all three shade levels. White text remains legible against the lightest (0.7) shade for all four workstream colours.

### Item 28: Add dependency indicators to reform cards
- **Status:** ✅ Done
- **Why:** Cross-workstream dependencies are only mentioned in a callout box. Individual reform cards don't show which other reforms they depend on or enable.
- **Action:** Add an optional `dependsOn` field to the Reform interface and render small dependency tags (e.g. "Depends on: 1.1, 1.5") on relevant cards.
- **Resolution:** Added `dependsOn?: string[]` to the `Reform` interface in `src/data/reforms.ts`. Populated four textually-obvious dependency chains where the description or legislative field literally references an earlier reform: 2.1 → 1.5 (community courts use Track A defined by the case-flow triage), 3.1 → 2.3 (nationwide three-tier policing rolls out phase-2 pilots), 3.3 → 2.2 (structured guidelines implement the Sentencing Commission), 3.4 → 1.4 (full ICJS expands the digital case management system). Cross-workstream dependencies were left to the owner to populate since they require content judgment beyond what's explicit in the existing text. In `real-steps-to-reform.astro`: built a `reformTitleById` map at the page level; added a "Depends on: X, Y" row in the expanded card details beside the existing Scope/Legislative metadata; each dep renders as a small pill `<a href="#reform-X">` with a `title` tooltip of `id — title` for screen readers and mouse users. Each `<details>` card now carries `id="reform-{id}"` with `scroll-mt-32` and a `target:border-compass-green` highlight so anchor navigation works and the jumped-to card is visually distinct. Added a dep-link click handler that (a) resets any active workstream/phase/search filters when they would otherwise hide the target and (b) sets `target.open = true` so the jumped-to card expands automatically. Build verified clean.

### Item 29: Make scorecard section actionable with targets
- **Status:** ✅ Done
- **Why:** The "Example Scorecard" section is a plain numbered list with no baseline or target data, making it hard for citizens to use for accountability.
- **Action:** Convert the scorecard to a table with columns: Outcome, Baseline, Year 5 Target, Year 10 Target.
- **Resolution:** Added a `ScorecardOutcome` interface (`{ outcome: string; baseline?: string; year5?: string; year10?: string }`) to `src/data/reforms.ts` and migrated `scorecardOutcomes` from `Record<WorkstreamId, string[]>` to `Record<WorkstreamId, ScorecardOutcome[]>`, wrapping all 50 existing outcome names into `{ outcome: "..." }` objects so the structural change is non-destructive and the outcome text is preserved verbatim. Baseline/year5/year10 were deliberately left empty — populating them requires authoritative SA data (Stats SA, SAPS crime stats, NIDS, World Bank, etc.) and is an editorial/content decision that belongs to the owner, not content I should invent. Replaced the 2-column `<ol>` grid in `src/pages/real-steps-to-reform.astro` with a proper `<table>`: thead with Outcome/Baseline/Year 5 Target/Year 10 Target columns, `scope="col"` for accessibility, a coloured bottom border on the header matching the workstream colour, and row-by-row rendering with `—` (em-dash) fallback for any empty cell. Wrapped the table in `overflow-x-auto -mx-4 px-4` so it scrolls horizontally on narrow mobile viewports without breaking the page layout. Added an explanatory line under the heading: "Baselines and targets will be populated as the scorecard is operationalised — empty cells are shown as '—'." Build verified clean.

### Item 30: Group legislative items by type
- **Status:** 🔲 Todo
- **Why:** The 14 legislative items are listed flat. Grouping by type (New statutes, Amendments, Constitutional) would make the legislative programme easier to scan.
- **Action:** Add sub-headings or visual grouping by `type` in the Legislative Programme section.

### Item 31: Add expand all / collapse all for reform cards
- **Status:** 🔲 Todo
- **Why:** With 84 collapsible `<details>` elements, readers exploring a workstream may want to expand or collapse all cards at once.
- **Action:** Add "Expand all / Collapse all" toggle buttons per workstream section.

### Item 32: Show scope badges on collapsed reform card summaries
- **Status:** 🔲 Todo
- **Why:** The scope (national/provincial/municipal) is only visible when a card is expanded. Showing scope pills on the collapsed summary lets readers scan for reforms at their sphere of interest.
- **Action:** Render scope badges in the `<summary>` element of each reform card.

### Item 33: Verify source footer link target
- **Status:** 🔲 Todo
- **Why:** The source footer links to `/big-picture` — need to verify this route exists and is the correct destination for the series landing page.
- **Action:** Check route exists; fix if broken.
