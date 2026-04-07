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
- **Status:** 🔲 Todo
- **Why:** HTTPS is enforced by Netlify at the platform level, but without an HSTS header browsers may still attempt an initial HTTP request.
- **Action:** Add `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` to the global headers.

### Item 3: Subresource Integrity (SRI) for external scripts
- **Status:** 🔲 Todo
- **Why:** External scripts (Netlify Identity widget, Decap CMS, GA4) load without `integrity` attributes — a supply-chain compromise could inject malicious code.
- **Action:** Add `integrity` and `crossorigin` attributes to `<script>` tags in BaseLayout.astro and admin/index.html. Note: GA4 is dynamically injected after consent so SRI is not feasible there; focus on static script tags.

### Item 4: Permissions-Policy header
- **Status:** 🔲 Todo
- **Why:** Without this header, the page implicitly allows browser features (camera, microphone, geolocation) it never uses.
- **Action:** Add `Permissions-Policy` header denying all unused features.

---

## High Priority — Performance

### Item 5: Use Astro `<Image />` component
- **Status:** 🔲 Todo
- **Why:** Plain `<img>` tags miss automatic responsive `srcset`/`sizes` generation and modern format conversion (WebP/AVIF). Critical for readers on 4G prepaid data.
- **Action:** Replace `<img>` tags with Astro's `<Image />` or `<Picture />` component where applicable.

### Item 6: Enable Astro prefetch
- **Status:** 🔲 Todo
- **Why:** Astro supports link prefetching for faster perceived navigation; currently not enabled.
- **Action:** Enable `prefetch` in astro.config.mjs and apply to key navigation links.

### Item 7: Add bundle analysis tooling
- **Status:** 🔲 Todo
- **Why:** No way to monitor whether the 450 KB page-weight budget is being respected.
- **Action:** Add `rollup-plugin-visualizer` or similar to the build, and consider a Lighthouse CI check in the deploy pipeline.

---

## Medium Priority — SEO

### Item 8: Expand structured data (JSON-LD)
- **Status:** 🔲 Todo
- **Why:** Only `Article` schema exists; missing `Organization`, `WebSite`, and `BreadcrumbList` schemas that improve search presence.
- **Action:** Add Organisation and WebSite schemas to BaseLayout; add BreadcrumbList to article pages.

### Item 9: Add meta theme-color
- **Status:** 🔲 Todo
- **Why:** Browser chrome (address bar on mobile) doesn't match site branding.
- **Action:** Add `<meta name="theme-color" content="#355E3B">` to BaseLayout head.

### Item 10: Add apple-touch-icon
- **Status:** 🔲 Todo
- **Why:** iOS bookmark icon falls back to a screenshot instead of a branded icon.
- **Action:** Generate a 180×180 PNG icon and add the `<link rel="apple-touch-icon">` tag.

---

## Medium Priority — Reliability

### Item 11: Add 500 error page
- **Status:** 🔲 Todo
- **Why:** Server errors show Netlify's generic page instead of a branded experience.
- **Action:** Create a custom 500.html in public/ or a corresponding Netlify function fallback.

### Item 12: Add try-catch to client-side JS
- **Status:** 🔲 Todo
- **Why:** Pagefind search initialisation and scroll-depth tracking could silently break with no user feedback.
- **Action:** Wrap critical client-side code blocks in try-catch with graceful degradation.

### Item 13: Add `aria-live` regions for dynamic content
- **Status:** 🔲 Todo
- **Why:** Dynamic updates (search results, form submission feedback) are not announced to screen readers.
- **Action:** Add `aria-live="polite"` to search results container and form status messages.

---

## Lower Priority — Nice-to-haves

### Item 14: PWA support (service worker + manifest)
- **Status:** 🔲 Todo
- **Why:** Offline reading capability is valuable for readers on unreliable 4G connections.
- **Action:** Add a basic service worker with cache-first strategy for articles and a web manifest.

### Item 15: Lighthouse CI in deploy pipeline
- **Status:** 🔲 Todo
- **Why:** Performance regressions are not caught before deploy.
- **Action:** Add Lighthouse CI GitHub Action or Netlify plugin with performance budgets.

### Item 16: Add security.txt
- **Status:** 🔲 Todo
- **Why:** No published vulnerability disclosure channel.
- **Action:** Create `public/.well-known/security.txt` with contact and policy info.

### Item 17: POPIA-specific cookie consent wording
- **Status:** 🔲 Todo
- **Why:** The privacy policy covers POPIA but the cookie banner itself doesn't reference the Act.
- **Action:** Update CookieConsent banner copy to mention POPIA compliance.

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
- **Why:** Multiple articles have a bug where the H2 heading after the BLUF intro paragraph is concatenated onto the same line as the preceding paragraph text (e.g. `## The System That Holds the System Together That knowledge is essential...`). This causes the heading to render as body text and the paragraph to lose its separation, breaking both the visual layout and the table of contents. Already found and fixed in `1-3-how-the-spheres-interact.md` and `2-1-following-the-money.md`.
- **Pattern to detect:** Any line matching `^## .{30,}` (an H2 followed by unusually long text) in the BLUF section is likely a merged heading+paragraph. Alternatively, grep for lines starting with `## ` that contain a sentence-ending full stop (`.`) — real headings rarely do.
- **Action plan:**
  1. Run: `grep -n '^## .*\. ' src/content/articles/*.md` to find candidate lines where an H2 contains sentence-ending punctuation, indicating merged heading+paragraph.
  2. For each match, manually verify and split: move the paragraph text before the `## ` marker, insert a blank line, then place the `## ` heading on its own line.
  3. Build locally and check that the table of contents and heading hierarchy render correctly for each fixed article.
