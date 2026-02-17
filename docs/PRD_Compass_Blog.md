# PRODUCT REQUIREMENTS DOCUMENT

## Compass — A Political Literacy Blog for South Africa's Missing Middle

---

| Field | Detail |
|-------|--------|
| **Document Owner** | Tshepo Machele — Product, Engineering, Design, Business/GTM Lead |
| **Version** | 0.1 |
| **Created Date** | 2026-02-15 |
| **Derived From** | MRD v0.1 — Compass Market Requirements Document |
| **Status** | Draft |
| **Target Launch** | Q3 2026 |
| **Platform** | Web (Astro static site deployed on Netlify) |

---

## Table of Contents

1. Introduction & Product Vision
2. Goals & Success Criteria
3. User Stories & Scenarios
4. Information Architecture
5. Technical Architecture
6. Page-by-Page Specifications
7. Design System & Visual Language
8. Content Management & Authoring Workflow
9. Analytics & Measurement
10. SEO Strategy
11. Performance Requirements
12. Accessibility Requirements
13. Email Subscription System
14. Social Sharing & Distribution
15. Launch Plan & Phased Rollout
16. Risks & Mitigations
17. Out of Scope
18. Appendices

---

## 1. Introduction & Product Vision

### 1.1 Purpose of This Document

This PRD translates the market requirements defined in the Compass MRD (v0.1) into a buildable product specification. It defines what gets built, how it works, and the acceptance criteria for each component. It is the single source of truth for development — all implementation decisions should trace back to a requirement in this document, which in turn traces back to a validated market need in the MRD.

### 1.2 Product Vision

Compass is a free, long-form political education blog that makes South Africa's governance system legible to ordinary citizens. The product delivers a 15-article series across five parts — foundational framework, national government, provincial government, municipal government, and a citizen's toolkit — through a fast, mobile-first, reading-optimised website.

### 1.3 Design Philosophy

The product embodies three principles derived from the MRD's differentiation strategy:

**Reading-first.** Every design decision optimises for sustained, comfortable reading of 5,000+ word articles on mobile devices over prepaid data connections. This means large typography, generous whitespace, minimal JavaScript, and aggressive performance budgets. The target reader is on a mid-range Android smartphone on a 4G connection with limited data. Every kilobyte must justify its existence.

**Trust through transparency.** The target audience trusts almost no institution (21% trust Parliament, 23% trust national government). The design must communicate credibility through restraint — no flashy animations, no clickbait patterns, no dark UX. Clean, serious, professional. Sources are always visible. The author is identifiable. The absence of ads and paywalls is itself a trust signal and should be visually obvious.

**Action-oriented.** Every article concludes with practical tools. The site structure must make it easy for readers to find the specific guidance they need — which sphere is responsible, where to find data, how to file a complaint — without reading the entire series sequentially.

### 1.4 Traceability to MRD

| MRD Reference | PRD Requirement |
|---------------|-----------------|
| MRD §1.3 — Value Proposition (O'Reilly-style articles) | §6 — Article page spec with reading-optimised layout |
| MRD §1.4 — Success Criteria (10K readers, 8-min ToP) | §2 — Goals & success criteria; §9 — Analytics |
| MRD §3.1 — Job Executor (smartphone, prepaid data, English) | §11 — Performance requirements; §7 — Mobile-first design |
| MRD §4.2 — Outcome #1 (identify responsible sphere) | §6.3 — Article "practical framework" sections |
| MRD §5.1 — Anxiety: "Is this pushing an agenda?" | §7 — Non-partisan visual language |
| MRD §5.1 — Habit: effort cost of 5,000-word articles | §6.3 — Reading progress indicator; estimated read time |
| MRD §8.1 — MVP Scope (4 articles, email, WhatsApp share) | §15 — Launch plan; §13 — Email system; §14 — Sharing |
| MRD §8.3 — Target Customer for MVP (Gauteng professionals) | §10 — SEO strategy targeting Gauteng search queries |

---

## 2. Goals & Success Criteria

### 2.1 Product Goals

**Primary goal:** Deliver the first four foundational articles (Part 1 of the series) on a live, performant, mobile-optimised website by end of Q3 2026, with email subscription and WhatsApp sharing capabilities.

**Secondary goal:** Establish the content and design patterns that scale to the full 15-article series without requiring platform rearchitecture.

**Tertiary goal:** Validate MRD hypotheses H2 (long-form readership), H3 (WhatsApp distribution), and H6 (trust-building) through measurable engagement data.

### 2.2 Success Criteria (Acceptance Criteria for Launch)

The MVP is launch-ready when all of the following are true:

**Content completeness.** All four Part 1 articles are published, each meeting the following criteria: minimum 5,000 words; written in O'Reilly conversational register; includes 2–3 named expert anecdotes; concludes with a practical framework or toolkit section; all data claims are sourced with links to primary sources (AGSA, National Treasury, DPME, StatsSA); reviewed for factual accuracy by at least one subject-matter reader.

**Platform functionality.** The website loads in under 3 seconds on a 4G connection (target: under 1.5s); all pages render correctly on Chrome for Android (85%+ of target segment), Safari iOS, and desktop Chrome/Firefox; email subscription capture is functional and delivers a confirmation email; WhatsApp share buttons are present on all article pages and generate UTM-tagged links; analytics tracking is live (page views, time on page, scroll depth, referral source).

**Quality bar.** Lighthouse performance score of 90 or above; Lighthouse accessibility score of 90 or above; no broken links; no layout shifts on mobile; all images have alt text; site passes WCAG 2.1 AA for colour contrast.

### 2.3 Post-Launch Success Metrics

Derived from MRD §9.2:

| Metric | Validation Target (Months 3–6) | Growth Target (Months 7–12) |
|--------|---------------------------------|-----------------------------|
| Unique monthly readers | 1,000 | 10,000 |
| Average time on page (long-form articles) | 8 minutes | 8 minutes |
| WhatsApp referral share of traffic | 30% | 30% |
| Email subscribers | 500 | 2,000 |
| Returning visitor rate | — | 40% |
| North Star: readers with 2+ articles and 8+ min total | 100/month | 1,000/month |

---

## 3. User Stories & Scenarios

### 3.1 Primary User Stories

**US-1: First-time reader via WhatsApp.** As a Gauteng professional who received a Compass link in a WhatsApp group, I want to read the shared article on my phone quickly and comfortably, so that I can understand which sphere of government is responsible for the service failure being discussed in my group. Acceptance criteria: Page loads in under 3s on 4G; article renders in readable layout on 360px-wide screen; reading progress is visible; share button lets me forward the article to another WhatsApp group with one tap.

**US-2: Search-driven reader.** As a citizen searching "who is responsible for water in South Africa," I want to find a Compass article that answers my question clearly, so that I can direct my complaint to the correct government entity. Acceptance criteria: Article 1.1 ranks for target search queries within 6 months; the article's introduction and structure make the answer findable within 60 seconds of landing; the "practical framework" section provides a clear decision model.

**US-3: Returning reader.** As a reader who finished Article 1.1 and wants to continue learning, I want to easily find the next article in the series and understand how it builds on what I've read, so that I can deepen my understanding systematically. Acceptance criteria: Next/previous article navigation is prominent on every article page; series overview page shows reading progress; article introductions reference prerequisite concepts with links back.

**US-4: Email subscriber.** As an engaged reader, I want to subscribe to be notified when new articles are published, so that I don't have to remember to check the site. Acceptance criteria: Email capture form is visible without scrolling on the article page (either in header area or after first section); subscription requires only email address; confirmation email is sent within 60 seconds; new article notification emails include a direct link to the article.

**US-5: Data-seeking reader.** As a citizen who has read an article and wants to look up my own municipality or province, I want to quickly find the links to primary data sources (AGSA, National Treasury, DPME), so that I can evaluate my local government's performance. Acceptance criteria: Every article's "practical tools" section includes direct, working hyperlinks to the relevant government data portals; links open in new tabs; a persistent "Data Sources" page aggregates all links across the series.

### 3.2 Key User Scenarios

**Scenario A: The WhatsApp Forward Chain.** Thabo, a 32-year-old IT technician in Johannesburg, receives a Compass link in his building's WhatsApp group during a 3-day water outage. He opens the link on his Samsung A15 over 4G. The article loads quickly — he sees the title "The Architecture of the State" and a clear subtitle telling him this will explain which sphere of government handles what. He scrolls to the section on municipal functions, finds that water is a municipal responsibility, and reads about the distinction between bulk water supply (water boards, national oversight) and reticulation (municipal). He screenshots the key paragraph and shares it back to the group. He then taps the WhatsApp share button to forward the full article link to his family group in Pretoria. Before leaving, he subscribes via email because he sees that Article 1.2 on "Following the Money" is coming next.

**Scenario B: Pre-Election Research.** Naledi, a 38-year-old nurse in Ekurhuleni, is deciding whether to vote in the 2026 local government elections. She searches Google for "how to check if my municipality is performing." She lands on Article 1.3 (Who Watches the Watchers), which explains the Auditor-General's municipal audit system. The article shows her how to find her municipality's audit outcome and what a "disclaimer" means. She clicks through to the AGSA website using the link provided in the article, looks up Ekurhuleni, and discovers the metro's audit trajectory. She returns to Compass and reads Article 1.2 to understand how Ekurhuleni's finances work. Over the next week, she reads all four foundational articles.

---

## 4. Information Architecture

### 4.1 Site Map

```
compass.co.za (or compasssa.org — domain TBD)
│
├── / (Home)
│   └── Series overview, latest article, email capture CTA
│
├── /about
│   └── Who is behind Compass, editorial principles, non-partisan commitment
│
├── /series
│   └── Full series table of contents with status (published / coming soon)
│
├── /articles/[slug]
│   └── Individual article pages (the core content)
│   │
│   ├── /articles/architecture-of-the-state (1.1)
│   ├── /articles/following-the-money (1.2)
│   ├── /articles/who-watches-the-watchers (1.3)
│   ├── /articles/measuring-what-matters (1.4)
│   ├── /articles/inside-the-machine (2.1) [post-MVP]
│   ├── ... (remaining articles)
│   └── /articles/citizens-toolkit (5.1) [post-MVP]
│
├── /data-sources
│   └── Curated, categorised links to all primary data sources
│
├── /subscribe
│   └── Standalone email subscription page (for direct linking)
│
└── /privacy
    └── Privacy policy (email data handling, analytics disclosure)
```

### 4.2 Navigation Structure

**Primary navigation (persistent header):** Home | Series | Data Sources | About

**Article-level navigation (within article pages):** Series breadcrumb (Part X → Article X.X) | Previous Article ← → Next Article | Reading progress bar (fixed top)

**Footer navigation:** Subscribe | About | Privacy | "Built by Tshepo Machele"

### 4.3 Content Taxonomy

Articles are organised along two dimensions:

**Part (sequential):** Part 1: Foundational Framework | Part 2: National Government | Part 3: Provincial Government | Part 4: Municipal Government | Part 5: Cross-Cutting Themes

**Sphere (categorical):** National | Provincial | Municipal | All Spheres

Both dimensions are displayed on the series overview page and in article metadata, allowing readers to navigate by sequence (start to finish) or by topic (show me everything about municipal government).

---

## 5. Technical Architecture

### 5.1 Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Static site generator** | Astro | Fast build times; excellent static output; content collections for structured article management; partial hydration means minimal client-side JS; Tshepo has existing familiarity |
| **Hosting & CDN** | Netlify | Free tier covers expected traffic; automatic deploys from Git; built-in form handling (email capture); edge CDN for South African readers; Tshepo has existing familiarity |
| **Content format** | Markdown (.md) with YAML frontmatter | Simple authoring workflow; version-controlled content; Astro content collections provide type-safe schema validation |
| **Styling** | Tailwind CSS (via Astro integration) | Utility-first approach speeds development; purged CSS results in tiny bundles; easy to maintain consistent design system |
| **Analytics** | Google Analytics 4 (GA4) with consent banner | Industry-standard analytics with comprehensive event model and attribution; cookie consent banner required (implemented as lightweight inline notice ≤ 3KB JS); tracks page views, time on page, referral sources, UTM parameters; consent mode v2 defaults `analytics_storage` to "denied" until reader grants consent; anonymised IP; 2-month data retention |
| **Email** | Netlify Forms → Zapier/webhook → Email provider (Buttondown or Mailchimp free tier) | Netlify Forms handles capture with zero client-side JS; webhook triggers email provider for confirmation and future notifications; Buttondown is lightweight and free for under 100 subscribers, Mailchimp free up to 500 |
| **Search** | Pagefind (Astro-compatible) | Static search index generated at build time; no server required; works offline; fast and lightweight |
| **Version control** | Git (GitHub) | Standard; Netlify auto-deploys on push to main |

### 5.2 Repository Structure

```
compass-blog/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── netlify.toml
│
├── src/
│   ├── content/
│   │   ├── config.ts              # Content collection schema
│   │   └── articles/
│   │       ├── 1-1-architecture-of-the-state.md
│   │       ├── 1-2-following-the-money.md
│   │       ├── 1-3-who-watches-the-watchers.md
│   │       ├── 1-4-measuring-what-matters.md
│   │       └── ... (future articles)
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro       # HTML shell, meta, analytics
│   │   ├── ArticleLayout.astro    # Long-form reading layout
│   │   └── PageLayout.astro       # Standard page layout
│   │
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ReadingProgress.astro  # Scroll progress bar
│   │   ├── ArticleNav.astro       # Prev/next article links
│   │   ├── SeriesCard.astro       # Article card for series page
│   │   ├── ShareButtons.astro     # WhatsApp + copy link
│   │   ├── EmailCapture.astro     # Subscription form
│   │   ├── TableOfContents.astro  # In-article TOC from headings
│   │   ├── SourceLink.astro       # Styled external source reference
│   │   └── Callout.astro          # Expert anecdotes, key takeaways
│   │
│   ├── pages/
│   │   ├── index.astro            # Home
│   │   ├── about.astro
│   │   ├── series.astro
│   │   ├── data-sources.astro
│   │   ├── subscribe.astro
│   │   ├── privacy.astro
│   │   └── articles/
│   │       └── [...slug].astro    # Dynamic article routing
│   │
│   └── styles/
│       └── global.css             # Base typography, custom utilities
│
├── public/
│   ├── favicon.svg
│   ├── og-image-default.png       # Default Open Graph image
│   └── og/                        # Per-article OG images
│
└── scripts/
    └── generate-og-images.py      # Python script for OG images
```

### 5.3 Content Collection Schema

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    part: z.number().min(1).max(5),
    articleNumber: z.string(),        // "1.1", "2.3", etc.
    sphere: z.enum(['national', 'provincial', 'municipal', 'all']),
    description: z.string(),          // SEO meta description (150-160 chars)
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    readingTime: z.number(),          // Minutes
    status: z.enum(['published', 'draft', 'coming-soon']),
    series: z.object({
      prev: z.string().nullable(),    // Slug of previous article
      next: z.string().nullable(),    // Slug of next article
    }),
    seo: z.object({
      ogImage: z.string().optional(),
      canonicalUrl: z.string().optional(),
      keywords: z.array(z.string()),
    }),
  }),
});

export const collections = { articles };
```

### 5.4 Build & Deploy Pipeline

```
Author writes/edits .md → Git push to main → Netlify build hook triggers →
Astro builds static site → Pagefind indexes content → Netlify deploys to CDN →
Site live at compass.co.za (or configured domain)
```

Build time for 15 articles with Astro: estimated under 30 seconds. Netlify deploys typically propagate in under 60 seconds after build.

### 5.5 Netlify Configuration

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/articles/1-1-*"
  to = "/articles/architecture-of-the-state"
  status = 301

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## 6. Page-by-Page Specifications

### 6.1 Home Page (`/`)

**Purpose:** Orient the reader, communicate what Compass is, surface the latest or most important content, and capture email subscriptions.

**Layout (top to bottom):**

1. **Hero section.** Compass wordmark/logo. Tagline: "Making South Africa's governance system legible to ordinary citizens." One sentence: "A free, 15-article series that explains how your government works, where your money goes, and how to hold the right people accountable." Primary CTA: "Start Reading →" (links to Article 1.1). Secondary CTA: "View the Series" (links to /series).

2. **The Problem (2–3 sentences).** A concise framing of the accountability confusion problem. E.g., "When your water stops running, do you call your municipality, your province, or a national minister? South Africa's Constitution divides power across three spheres — and almost nobody teaches you how to navigate the system. Compass does."

3. **Series overview cards.** The five parts displayed as cards (Part 1: Foundation, Part 2: National, etc.) with article count and publication status. Published articles are linked. Coming-soon articles show titles only.

4. **Email capture.** "Get notified when new articles drop." Email input + submit button. Single field. Netlify Forms submission.

5. **About teaser.** 2 sentences on who's behind Compass and the editorial commitment. Link to /about.

**Mobile behaviour:** Single-column stack. Hero text is concise. Series cards stack vertically. CTA buttons are full-width and thumb-friendly (min 48px tap target).

### 6.2 Series Overview Page (`/series`)

**Purpose:** Show the full 15-article architecture, indicate reading order, and let readers navigate by part or by sphere.

**Layout:**

1. **Page title:** "The Series" with subtitle: "15 articles. Five parts. One complete guide to how South Africa is governed."

2. **Filter/view toggle:** "View by: Reading Order | Sphere" — allows filtering by sphere tag (National, Provincial, Municipal, All). Default view is reading order.

3. **Article list grouped by Part.** Each Part is a section with heading (e.g., "Part 1: Foundational Framework"). Under each Part, articles are listed with: article number, title, subtitle, sphere tag, reading time, status badge (Published / Coming Soon). Published articles link to the article page. Coming Soon articles are greyed out but visible (to communicate the scope and build anticipation).

### 6.3 Article Page (`/articles/[slug]`)

This is the core product surface. It must be exceptional.

**Layout specification:**

**A. Above-the-fold (header region):**
- Reading progress bar: thin coloured bar fixed to top of viewport, fills left-to-right as reader scrolls. Implemented with minimal vanilla JS (~20 lines, loaded via Astro `client:load` directive on a single island component).
- Breadcrumb: Part X → Article X.X
- Article title (H1): large, bold, serif or strong sans-serif.
- Subtitle: one sentence summarising the article's core argument.
- Metadata line: "By Tshepo Machele · [Date] · [X] minute read · [Sphere tag]"
- Share buttons: WhatsApp icon + Copy Link icon (inline).

**B. Article body:**
- Content column: maximum 680px width, centred, with generous left/right margins on desktop. On mobile, content fills screen width with 16–20px horizontal padding.
- Typography: body text 18–20px on desktop, 17–18px on mobile. Line height 1.6–1.7. Serif or humanist sans-serif font optimised for long-form reading (candidates: Charter, Literata, Source Serif Pro, or Inter for sans-serif). Paragraph spacing of 1.5em.
- Headings: H2 for major sections, H3 for subsections. Headings generate anchor IDs for deep linking and table of contents.
- Callout blocks: styled containers for expert anecdotes (attributed quotes from named M&E experts), key takeaways, and "practical framework" summaries. Visually distinct from body text (left border, background tint) but not disruptive to reading flow.
- Source references: inline hyperlinks to primary sources. At article end, a "Sources and Further Reading" section with full links to AGSA, National Treasury, DPME, StatsSA, court judgments, and academic references cited in the article.
- No images required in body text for MVP. If images are added later, they must have alt text and lazy loading.

**C. Table of contents (sidebar or inline):**
- On desktop: optional sticky sidebar TOC showing H2 headings with active-section highlighting. Implemented via Astro component reading the markdown headings at build time. If sidebar clutters the reading experience, fallback to a collapsible inline TOC below the metadata line.
- On mobile: collapsible inline TOC below metadata. Tap to expand, shows H2 links, tap a heading to scroll.

**D. Article footer (below body):**
- "Practical Framework" or "Toolkit" section: the article's concluding actionable section, visually distinguished (e.g., subtle background colour or boxed container) so that returning readers can find it quickly.
- Previous / Next article navigation: large, clear links with article titles. "← Previous: [Title]" and "Next: [Title] →".
- Email capture CTA: "Enjoying the series? Get notified when the next article drops." Email input + button.
- WhatsApp share CTA: "Found this useful? Share it with your WhatsApp group." Button generates share with pre-filled message (see §14).

**E. Reading experience enhancements:**
- Estimated reading time displayed in header metadata. Calculated at build time based on word count divided by 200 wpm.
- Reading progress bar (described above).
- Minimal distractions: no sidebar ads, no pop-ups, no interstitials, no auto-playing media. The reading experience is sacred.

### 6.4 About Page (`/about`)

**Purpose:** Build trust by making the author and editorial principles transparent. Directly addresses the MRD-identified anxiety: "Who is behind this?" and "Is this pushing a political agenda?"

**Content requirements:**

1. **Who is behind Compass.** Tshepo Machele's name, brief bio, and motivation. Framed personally: why this project exists, what problem it solves, and why the author cares. Photo optional but recommended for trust.

2. **Editorial principles.** Explicit commitments stated plainly: non-partisan (no party endorsement or alignment, ever); data-anchored (every factual claim sourced to primary government data); transparent (all sources linked so readers can verify); practical (every article ends with tools you can use); independent (no funding from political parties, government, or corporate interests with governance stakes).

3. **How Compass is built.** Brief note on the content methodology: research-based, expert-sourced, fact-checked against primary documents (Constitution, AGSA reports, National Treasury data, DPME publications).

4. **Contact.** Email address for feedback, corrections, and expert contributions.

### 6.5 Data Sources Page (`/data-sources`)

**Purpose:** Aggregate all primary data source links referenced across the series into a single, navigable reference page. Directly serves MRD Outcome #2 (find and interpret AG audit outcomes) and US-5.

**Content structure (organised by institution):**

- **Auditor-General of South Africa (AGSA):** Link to PFMA audit reports; link to MFMA (municipal) audit reports; explanation of how to navigate the site (1–2 sentences).
- **National Treasury:** Link to budget documents; link to Estimates of National Expenditure; link to Division of Revenue; explanation of what each contains.
- **DPME:** Link to MTSF progress reports; link to national evaluation reports; link to Frontline Service Delivery Monitoring reports.
- **Statistics South Africa:** Link to community survey data; link to service delivery statistics.
- **IEC:** Link to election results and voter registration data.
- **Municipal data:** Links to Blue Drop, Green Drop, No Drop reports; link to Municipal Demarcation Board for identifying your municipality.
- **Provincial data:** Links to provincial treasury websites and budget documents.
- **Oversight bodies:** Links to Public Protector, SAHRC, Financial and Fiscal Commission websites.

Each entry includes: institution name, what they publish, direct URL, and a one-sentence guide on what to look for.

### 6.6 Subscribe Page (`/subscribe`)

**Purpose:** Standalone landing page for email capture, useful for direct linking from WhatsApp messages or social posts.

**Content:** Headline ("Stay informed — we'll email you when new articles drop"), brief value proposition (1–2 sentences), email input, submit button, privacy assurance ("We'll only email you about new Compass articles. No spam, no sharing your data. Unsubscribe anytime."). Link to /privacy.

### 6.7 Privacy Page (`/privacy`)

**Content:** Plain-language privacy policy covering: what analytics data is collected (page views, referral source, country — via Google Analytics 4, with cookie consent required before tracking begins, anonymised IP, 2-month data retention); what email data is collected (email address only, stored with email provider); how data is used (article notifications only); no data sold or shared; contact for data deletion requests.

---

## 7. Design System & Visual Language

### 7.1 Brand Identity

**Name:** Compass

**Positioning:** Authoritative but approachable. Serious but not academic. Think: the reliability of a well-edited textbook with the warmth of a knowledgeable friend explaining something over coffee.

**Visual tone:** Clean, restrained, professional. The design should communicate "this is credible and trustworthy" through simplicity and quality, not through decoration. The absence of visual noise is a feature — it signals that the content is what matters.

### 7.2 Colour Palette

```
Primary:
  --compass-green:       #1B6B4A   (deep green — SA flag association, trust, stability)
  --compass-green-light: #E8F5EE   (tint for backgrounds/callouts)

Neutral:
  --text-primary:        #1A1A1A   (near-black for body text)
  --text-secondary:      #4A4A4A   (grey for metadata, captions)
  --bg-primary:          #FFFFFF   (white page background)
  --bg-secondary:        #F8F8F8   (light grey for section breaks, callouts)
  --border:              #E0E0E0   (subtle borders)

Accent:
  --compass-gold:        #C8A951   (sparingly — for progress bar, active states)

Sphere tags:
  --sphere-national:     #2563EB   (blue)
  --sphere-provincial:   #7C3AED   (purple)
  --sphere-municipal:    #DC2626   (red)
  --sphere-all:          #1B6B4A   (green — matches primary)
```

### 7.3 Typography

```
Heading font:    "Inter" or "DM Sans" (variable weight, system-like quality, free)
Body font:       "Source Serif 4" or "Literata" (optimised for screen reading, free)
Monospace:       "JetBrains Mono" (if needed for any data/code references)

Scale:
  H1 (article title):  36px / 2.25rem   (mobile: 28px / 1.75rem)
  H2 (section):         28px / 1.75rem   (mobile: 22px / 1.375rem)
  H3 (subsection):      22px / 1.375rem  (mobile: 18px / 1.125rem)
  Body:                 19px / 1.1875rem (mobile: 17px / 1.0625rem)
  Small (metadata):     14px / 0.875rem
  
Line height: 1.65 (body), 1.3 (headings)
Max content width: 680px
```

Font loading strategy: Use `font-display: swap` and preload the body font's regular weight. Subset fonts to Latin character set only. Total font payload target: under 100KB.

### 7.4 Component Patterns

**Callout: Expert Anecdote.** Left-bordered box (4px compass-green border) with light background. Contains attributed quote and speaker identification. Not styled as a blockquote (which implies direct quotation) — styled as a narrative container.

**Callout: Key Takeaway.** Box with compass-gold left border and --bg-secondary background. Used for the "bottom-line-up-front" summary and section summaries.

**Callout: Practical Framework / Toolkit.** Box with dashed compass-green border. Used for the actionable sections that conclude each article. Slightly more visual weight than other callouts to signal "this is the part you'll come back to."

**Sphere Tag.** Small coloured pill with sphere name. Colour-coded per §7.2. Used in article metadata and series overview cards.

**Share Button.** WhatsApp green (#25D366) icon button. "Copy Link" secondary button. Minimal, not distracting. Positioned in article header metadata line and repeated in article footer.

**Email Capture Form.** Single-line input with inline submit button. No multi-step forms, no name field, no CAPTCHA (spam handled by Netlify's built-in bot detection). Placeholder text: "your@email.com". Button text: "Subscribe".

---

## 8. Content Management & Authoring Workflow

### 8.1 Authoring Process

Content is authored in Markdown files within the `src/content/articles/` directory. Each article is a single `.md` file with YAML frontmatter (per the schema in §5.3) and Markdown body content.

**Workflow:**

1. **Research & Draft.** Article is researched and drafted (using Claude as writing partner, per MRD §1.5). Draft is written directly in Markdown or in a text editor and converted.
2. **Frontmatter completion.** All metadata fields are populated: title, subtitle, part, sphere, description, reading time, SEO keywords, prev/next article slugs.
3. **Expert review.** Draft is sent to at least one subject-matter reader (governance scholar, M&E practitioner, or public administration expert) for factual accuracy review. Corrections incorporated.
4. **Source verification.** All hyperlinks to primary sources are tested. All data claims are traceable to cited source.
5. **Git commit & push.** Article file is committed to the repository and pushed to main.
6. **Auto-deploy.** Netlify builds and deploys automatically. Article is live within ~2 minutes of push.
7. **Email notification.** Manual trigger (or Zapier automation) sends email to subscriber list with article title, subtitle, and link.

### 8.2 Markdown Conventions

- Use `## Heading` for H2 (major sections) and `### Heading` for H3 (subsections). H1 is rendered from frontmatter title — do not use `# Heading` in body.
- Expert anecdotes use a custom Astro component via MDX or a Markdown-compatible callout syntax (e.g., `:::expert` container directive if using remark-directive plugin, or authored as styled blockquotes with a specific prefix).
- Internal cross-references between articles use relative links: `[Article 1.2](/articles/following-the-money)`.
- External source links use full URLs and open in new tabs (enforced via Astro rehype plugin: `rehypeExternalLinks` with `target: '_blank'`).

### 8.3 Content Quality Checklist (Per Article)

- [ ] Minimum 5,000 words
- [ ] O'Reilly conversational register maintained throughout (uses "you," leads with specifics, no jargon without explanation)
- [ ] Opens with bottom-line-up-front (BLUF) conclusion
- [ ] Contains 2–3 named expert anecdotes
- [ ] Concludes with practical framework / toolkit section
- [ ] All data claims sourced with hyperlinks to primary source
- [ ] All hyperlinks tested and functional
- [ ] Meta description written (150–160 characters)
- [ ] SEO keywords identified and naturally present in title, H2s, and opening paragraphs
- [ ] Reading time calculated and set in frontmatter
- [ ] Prev/next article slugs correct
- [ ] Reviewed by at least one subject-matter reader

---

## 9. Analytics & Measurement

### 9.1 Analytics Platform

**Google Analytics 4 (GA4)** with consent banner. Selected because: industry-standard analytics with comprehensive event model and robust attribution; free tier covers expected traffic; supports UTM parameter tracking (essential for WhatsApp attribution); provides referral source breakdown and real-time reporting. A lightweight cookie consent banner (≤ 3KB JS) is required — implemented as a non-intrusive inline notice at the bottom of the viewport. GA4 consent mode v2 defaults `analytics_storage` to "denied" until the reader explicitly grants consent, ensuring no tracking occurs without permission. IP anonymisation is enabled and data retention is set to 2 months to maintain reader trust.

### 9.2 Tracked Events & Metrics

| Metric | Implementation | Maps to MRD Hypothesis |
|--------|---------------|----------------------|
| **Page views** | Automatic (GA4 default, after consent) | H2 (readership) |
| **Unique visitors** | Automatic (GA4 default, after consent) | MRD §1.4 (10K readers) |
| **Time on page** | Automatic (GA4 engagement time) | MRD §1.4 (8-min target); H2 |
| **Referral source** | Automatic + UTM parameters | H3 (WhatsApp distribution) |
| **Scroll depth** | Custom event: fire at 25%, 50%, 75%, 100% scroll | H2 (article completion) |
| **WhatsApp share clicks** | Custom event on WhatsApp button click | H3 |
| **Copy link clicks** | Custom event on copy-link button click | H3 |
| **Email form submissions** | Tracked via Netlify Forms + custom GA4 event | MRD §1.4 (2K subscribers) |
| **Article-to-article navigation** | Custom event on prev/next click | Validates sequential reading |
| **External link clicks (data sources)** | Custom event on outbound clicks to AGSA, NT, DPME | Validates US-5 and MRD Outcome #2 |

### 9.3 UTM Parameter Strategy

All shareable links generated by the WhatsApp button will include UTM parameters:

```
?utm_source=whatsapp&utm_medium=share&utm_campaign=article-[slug]
```

The email notification links will use:

```
?utm_source=email&utm_medium=notification&utm_campaign=article-[slug]
```

Social sharing links (LinkedIn, X) will use appropriate source tags. This enables GA4 to report on channel-level acquisition, directly validating H3.

---

## 10. SEO Strategy

### 10.1 Target Keywords

Based on the MRD's identified search-driven user scenario and the target audience's likely search behaviour, the following keyword clusters are prioritised:

**Cluster 1: Accountability & Responsibility (maps to Article 1.1)**
- "who is responsible for water in South Africa"
- "who is responsible for electricity in South Africa"
- "who is responsible for roads in South Africa"
- "three spheres of government South Africa"
- "municipal vs provincial vs national government South Africa"
- "South Africa government structure explained"

**Cluster 2: Fiscal System (maps to Article 1.2)**
- "where do my taxes go South Africa"
- "how is government funded in South Africa"
- "division of revenue South Africa"
- "municipal budget South Africa explained"

**Cluster 3: Oversight & Accountability (maps to Article 1.3)**
- "Auditor-General South Africa explained"
- "what is a clean audit South Africa"
- "Public Protector South Africa how to complain"
- "how to hold government accountable South Africa"

**Cluster 4: Government Performance (maps to Article 1.4)**
- "how to check government performance South Africa"
- "DPME reports South Africa"
- "is my municipality performing South Africa"

### 10.2 On-Page SEO Requirements

Each article page must include:

- `<title>` tag: Article title + " | Compass" (under 60 characters)
- `<meta name="description">`: Unique, compelling summary (150–160 characters) from frontmatter
- `<meta name="keywords">`: From frontmatter SEO keywords array
- Open Graph tags: `og:title`, `og:description`, `og:image` (per-article OG image), `og:url`, `og:type=article`
- Twitter Card tags: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`
- Canonical URL: self-referencing `<link rel="canonical">`
- Structured data: `Article` schema (JSON-LD) with author, date published, date modified, headline, description
- Semantic HTML: proper heading hierarchy (H1 → H2 → H3), `<article>` wrapper, `<time>` for dates
- Internal linking: each article links to other Compass articles where contextually relevant

### 10.3 Technical SEO

- Static HTML output (Astro) means fully crawlable without JS execution
- `sitemap.xml` generated automatically by `@astrojs/sitemap`
- `robots.txt` allowing all crawlers
- Fast load times (Lighthouse 90+ is a positive ranking signal)
- Mobile-friendly (responsive design supports Google mobile-first indexing)
- Netlify auto-provides HTTPS

### 10.4 OG Image Generation

Each article requires a custom Open Graph image (1200x630px) for WhatsApp and social media link previews. This is critical for WhatsApp distribution — the link preview image is the first thing a reader sees when an article is shared in a group.

**Implementation:** A Python script (`scripts/generate-og-images.py`) using Pillow generates OG images at build time. Each image contains: the Compass logo, the article title, the Part number and sphere tag, and a clean background using brand colours. The script reads article frontmatter, renders text onto a template, and outputs to `public/og/[slug].png`.

---

## 11. Performance Requirements

### 11.1 Performance Budget

The target reader is on a mid-range Android smartphone (Samsung Galaxy A15 or similar) on a 4G connection with prepaid data. Performance is both a UX requirement and a respect-for-the-reader requirement — every unnecessary byte costs them money.

| Metric | Target | Hard Limit |
|--------|--------|------------|
| **First Contentful Paint (FCP)** | under 1.0s | under 1.5s |
| **Largest Contentful Paint (LCP)** | under 1.5s | under 2.5s |
| **Cumulative Layout Shift (CLS)** | under 0.05 | under 0.1 |
| **Total page weight (article page)** | under 200KB | under 400KB |
| **JavaScript payload** | under 20KB | under 50KB |
| **CSS payload** | under 15KB | under 30KB |
| **Font payload** | under 80KB | under 120KB |
| **Lighthouse Performance score** | 95 or above | 90 or above |

### 11.2 Performance Strategy

- **Zero client-side JS by default.** Astro renders everything as static HTML. Only the reading progress bar and scroll-depth analytics require JS — these are loaded as isolated Astro islands (`client:load` or `client:visible`).
- **Font subsetting.** Fonts are subsetted to Latin characters only. Variable fonts are used where possible to serve one file instead of multiple weights.
- **No images in article body (MVP).** If images are added later, they must use `<img loading="lazy">`, modern formats (WebP/AVIF with fallback), and explicit `width`/`height` attributes (to prevent CLS).
- **CSS purging.** Tailwind's purge removes unused utility classes. Final CSS payload should be well under 15KB.
- **Preloading.** Preload the body font and critical CSS. Preconnect to `www.googletagmanager.com`.

### 11.3 Data Cost Estimate

For a reader on Vodacom or MTN prepaid data (approximately R2/MB in 2026):

- Article page load (~200KB) is approximately R0.40 per article
- Full series (15 articles) is approximately R6.00 total
- This is within the acceptable range for the target segment

---

## 12. Accessibility Requirements

### 12.1 Standards

WCAG 2.1 Level AA compliance. The target audience includes readers with varying abilities and using diverse devices, including older smartphones with smaller screens.

### 12.2 Specific Requirements

- **Colour contrast:** All text meets 4.5:1 contrast ratio against its background (AAA for body text, AA minimum for large text). Verified with the colour palette in §7.2.
- **Keyboard navigation:** All interactive elements (links, buttons, form inputs) are keyboard-accessible with visible focus indicators.
- **Screen reader compatibility:** Semantic HTML (headings, landmarks, lists) ensures screen reader navigation. All images have descriptive alt text. Form inputs have associated labels.
- **Responsive text:** No text is smaller than 16px on mobile. Line length does not exceed ~75 characters for comfortable reading.
- **Link clarity:** Link text is descriptive (no "click here"). External links are marked with visual indicator or aria-label.
- **Motion sensitivity:** The reading progress bar uses `prefers-reduced-motion` media query to disable animation if the reader's system preference is set.
- **Language:** `<html lang="en-ZA">` attribute set.

---

## 13. Email Subscription System

### 13.1 Architecture

```
Reader enters email → Netlify Forms captures submission → 
Webhook fires to email service provider (Buttondown or Mailchimp) →
ESP sends confirmation email → Reader confirms → 
Reader is on the list → Manual or automated send for new articles
```

### 13.2 Form Specification

- **Fields:** Email address (required, type=email). No name, no other fields.
- **Validation:** HTML5 email validation + Netlify's built-in spam detection (honeypot field).
- **Success state:** Form replaced with "You're subscribed. We'll email you when new articles drop." message (client-side replacement, no page reload — minimal JS).
- **Error state:** "Something went wrong. Please try again." message.
- **Placement:** Three locations per article page: (1) inline after the first major section, (2) article footer, and (3) sticky bottom bar on mobile (deferred — only if unobtrusive implementation is achievable).

### 13.3 Email Content

**Confirmation email:** Subject: "Confirm your Compass subscription". Body: brief welcome message + confirmation link + one sentence on what to expect ("We'll only email you when a new Compass article is published — roughly once every 2–3 weeks.").

**New article notification:** Subject: "[Article title] — New on Compass". Body: article title, subtitle, one-sentence hook, and a direct link to the article. No images, no complex HTML — plain text or minimal HTML to ensure deliverability and fast loading on mobile email clients.

### 13.4 Email Provider Selection

| Option | Free Tier | Pros | Cons |
|--------|-----------|------|------|
| **Buttondown** | Up to 100 subscribers | Simple, indie, markdown-native, lightweight | Paid plan needed above 100 subs |
| **Mailchimp** | Up to 500 subscribers | Well-known, robust | Heavier, more complex than needed |
| **Loops** | Up to 1,000 contacts | Modern, API-first | Newer, less proven |

**Recommendation:** Start with Buttondown for simplicity and alignment with the project's indie ethos. Migrate to Mailchimp or Loops when subscriber count exceeds free tier limits.

---

## 14. Social Sharing & Distribution

### 14.1 WhatsApp Share (Primary Channel)

WhatsApp is the primary distribution channel per MRD §5.2 and H3. The share implementation must be frictionless — one tap to share.

**Implementation:**

WhatsApp share button uses the `https://api.whatsapp.com/send?text=` URL scheme:

**Pre-filled message format:**
```
📍 [Article Title]

[One-sentence hook from article subtitle]

Read it here: [Article URL with UTM parameters]

— From Compass: Making SA's governance system legible
```

Example:
```
📍 The Architecture of the State — How SA's Constitution Divides Power

If you've ever wondered whether to blame your municipality, your province,
or national government — this explains it.

Read it here: https://compass.co.za/articles/architecture-of-the-state
?utm_source=whatsapp&utm_medium=share&utm_campaign=article-1-1

— From Compass: Making SA's governance system legible
```

### 14.2 Copy Link (Secondary)

A "Copy Link" button copies the article URL (with UTM: `utm_source=clipboard&utm_medium=share`) to clipboard. Shows brief "Copied!" confirmation. Useful for sharing via other platforms (LinkedIn, X, SMS, email).

### 14.3 Open Graph Preview Optimisation

The WhatsApp link preview is the single most important distribution asset. When a Compass link is shared in a WhatsApp group, the preview must be compelling enough to generate taps:

- **OG title:** Article title (concise, under 60 chars if possible)
- **OG description:** Article subtitle or first-sentence hook (under 160 chars)
- **OG image:** Per-article generated image (1200x630px) with article title, Compass branding, and clean design

WhatsApp caches OG data aggressively. To force cache refresh after updates, append a version query parameter to the OG image URL (handled in build).

---

## 15. Launch Plan & Phased Rollout

### 15.1 Phase 0: Build (Weeks 1–8)

| Week | Deliverable |
|------|-------------|
| 1–2 | Astro project scaffold; Tailwind configuration; base layout components (Header, Footer, BaseLayout); Netlify deployment pipeline; domain procurement and DNS |
| 3–4 | ArticleLayout component; ReadingProgress component; ShareButtons; EmailCapture; TableOfContents; Callout components; all page templates (Home, Series, About, Data Sources, Subscribe, Privacy) |
| 5–6 | Design polish: typography tuning, colour implementation, responsive testing on Android devices (Chrome DevTools + real device if available), Lighthouse audit, accessibility testing |
| 7 | Analytics integration (GA4 with consent banner); email pipeline setup (Netlify Forms → Buttondown); OG image generation script; sitemap and robots.txt |
| 8 | Final QA: all links tested, forms tested, analytics verified, performance budget verified, mobile UX review |

### 15.2 Phase 1: MVP Launch — Part 1 (Weeks 9–16)

| Week | Deliverable |
|------|-------------|
| 9–10 | Article 1.1 drafted, reviewed, and published |
| 11–12 | Article 1.2 drafted, reviewed, and published |
| 13–14 | Article 1.3 drafted, reviewed, and published |
| 15–16 | Article 1.4 drafted, reviewed, and published; announce the series via personal networks, LinkedIn, targeted WhatsApp groups |

**Launch distribution plan:** Tshepo shares Article 1.1 to 5–10 Gauteng-based WhatsApp groups (professional, community, alumni). LinkedIn post announcing Compass. Targeted outreach to 10–15 politically engaged contacts for initial sharing. Goal: 100 readers in week one, validating the WhatsApp distribution hypothesis.

### 15.3 Phase 2: National Government — Part 2 (Weeks 17–24)

Articles 2.1, 2.2, 2.3 published at ~2-week cadence. Email notifications to growing subscriber list.

### 15.4 Phase 3: Provincial + Municipal — Parts 3 & 4 (Weeks 25–40)

Seven articles published. Municipal articles (Part 4) prioritised first given proximity to 2026 local government elections. Publishing order adjusted to: 4.1 → 4.2 → 3.1 → 4.3 → 3.2 → 4.4 → 3.3.

### 15.5 Phase 4: Citizen's Toolkit — Part 5 (Weeks 41–44)

Capstone article 5.1 published. Full series now complete.

### 15.6 Phase 5: PMF Assessment (Week 48+)

Formal assessment against MRD §9 success metrics. Go/no-go decision on expansion (v2 features from MRD §10.2).

---

## 16. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **H2 invalidated: target segment won't read 5,000+ word articles** | Medium | High (undermines core format) | Monitor time-on-page and scroll depth from Article 1.1 launch. If avg time-on-page is under 4 minutes and 75% scroll depth is under 30%, consider supplementary short-form formats (WhatsApp-native summaries, article "TL;DR" sections). Do not reduce article depth — add a shorter access layer on top. |
| **H3 invalidated: WhatsApp is not a viable distribution channel** | Medium | High (undermines GTM) | Monitor referral sources from launch. If WhatsApp share is under 10% of traffic after 3 months, invest in SEO (long-term organic) and explore targeted LinkedIn distribution for the professional sub-segment. |
| **Content accuracy challenge: governance information changes** | Medium | Medium | Publish dates visible on all articles. "Updated on [date]" shown when articles are revised. Establish a quarterly content review cadence for published articles. Corrections policy on /about page. |
| **Solo-operator bottleneck: Tshepo is a single point of failure** | High | High | Manage scope ruthlessly — the 15-article series is the product, nothing more. Resist feature creep. Use Claude Code for development acceleration. Build in buffer time for each article (~3 weeks per article rather than 2). |
| **Domain/hosting failure** | Low | Medium | Netlify provides high uptime on paid plans. Free tier is sufficient for MVP traffic. Git repository on GitHub serves as backup of all content. |
| **Government data sources change URLs or become unavailable** | Medium | Low | Data Sources page is a single file — easy to update. Quarterly link-check script (Python) can automate broken link detection. Archive critical source documents locally where permitted. |
| **Trust deficit: readers suspect partisan agenda** | Medium | High | /about page explicitly states editorial principles. Non-partisan tone is enforced in every article. No party is praised or criticised — only institutional performance data is presented. Cite sources from across the political spectrum. |

---

## 17. Out of Scope

Directly inherited from MRD §10 and applied to product decisions:

| Excluded | Product Implication |
|----------|---------------------|
| Monetisation | No ad slots, no paywall logic, no payment infrastructure |
| Vernacular languages | Single-language (English) site; no i18n framework needed in v1 |
| Video/podcast | No media player components, no video hosting, no RSS podcast feed |
| Interactive data tools | No database, no API integrations, no dynamic dashboards. Static content only. |
| User accounts / community features | No authentication, no comments system, no user profiles |
| Current affairs coverage | No news feed, no blog chronological index beyond the series structure |
| Mobile app | Responsive web only; no PWA service worker (unnecessary complexity for MVP) |
| CMS admin interface | Content is managed via Git + Markdown. No web-based CMS (Decap CMS, Sanity, etc.) unless authoring friction proves too high post-launch. |

---

## 18. Appendices

### Appendix A: Article Frontmatter Example

```yaml
---
title: "The Architecture of the State"
subtitle: "How South Africa's Constitution Divides Power Across Three Spheres"
part: 1
articleNumber: "1.1"
sphere: "all"
description: "South Africa's Constitution created three spheres of government. Here's how power is divided, where money flows, and how to identify who is responsible for the services that affect your life."
publishDate: 2026-08-01
readingTime: 25
status: "published"
series:
  prev: null
  next: "following-the-money"
seo:
  ogImage: "/og/architecture-of-the-state.png"
  keywords:
    - "three spheres of government South Africa"
    - "who is responsible for water South Africa"
    - "South Africa government structure"
    - "cooperative governance South Africa"
    - "Schedule 4 Schedule 5 Constitution"
---
```

### Appendix B: GA4 Custom Events Reference

```javascript
// Reading progress milestones (scroll depth)
gtag('event', 'scroll_depth', { depth_percentage: '25', article_slug: slug });
gtag('event', 'scroll_depth', { depth_percentage: '50', article_slug: slug });
gtag('event', 'scroll_depth', { depth_percentage: '75', article_slug: slug });
gtag('event', 'scroll_depth', { depth_percentage: '100', article_slug: slug });

// Share actions
gtag('event', 'share_whatsapp', { article_slug: slug });
gtag('event', 'share_copy_link', { article_slug: slug });

// Email subscription
gtag('event', 'email_subscribe', { form_location: 'inline' | 'footer' | 'header' });

// Outbound data source clicks
gtag('event', 'outbound_click', {
  destination: 'agsa' | 'treasury' | 'dpme' | 'statssa',
  article_slug: slug
});

// Article navigation
gtag('event', 'article_nav', {
  direction: 'next' | 'prev',
  from_slug: slug,
  to_slug: targetSlug
});
```

### Appendix C: Python OG Image Generator Specification

```
Script: scripts/generate-og-images.py
Dependencies: Pillow, PyYAML
Input: Reads all .md files in src/content/articles/, parses YAML frontmatter
Output: Generates 1200x630px PNG per article in public/og/[slug].png

Image layout:
  - Background: --compass-green (#1B6B4A)
  - Compass logo/wordmark: top-left, white
  - Article title: centre, white, bold, max 3 lines, word-wrapped
  - Part label: bottom-left (e.g., "Part 1 · Article 1.1")
  - Sphere tag: bottom-right, coloured pill
  - Subtle border/pattern for visual interest

Run: python scripts/generate-og-images.py
Trigger: Manually before deploy, or integrated into build command
```

### Appendix D: Content Publication Schedule

| Article | Title | Target Publish Date | Phase |
|---------|-------|---------------------|-------|
| 1.1 | The Architecture of the State | Week 10 (~Aug 2026) | MVP |
| 1.2 | Following the Money | Week 12 | MVP |
| 1.3 | Who Watches the Watchers | Week 14 | MVP |
| 1.4 | Measuring What Matters | Week 16 | MVP |
| 2.1 | Inside the Machine | Week 18 | Phase 2 |
| 2.2 | The Report Card | Week 20 | Phase 2 |
| 2.3 | When National Policy Hits Reality | Week 22 | Phase 2 |
| 4.1 | Where the Rubber Meets the Road | Week 26 | Phase 3 |
| 4.2 | The Municipal Crisis | Week 28 | Phase 3 |
| 3.1 | The Awkward Middle Child | Week 30 | Phase 3 |
| 4.3 | Section 139 and Beyond | Week 32 | Phase 3 |
| 3.2 | Health and Education at the Provincial Coal Face | Week 34 | Phase 3 |
| 4.4 | Metropolitan vs Rural | Week 36 | Phase 3 |
| 3.3 | When Provinces Fail | Week 38 | Phase 3 |
| 5.1 | The Citizen's Toolkit | Week 42 | Phase 4 |

Note: Municipal articles (Part 4) are scheduled before some Provincial articles (Part 3) to align with 2026 local government election relevance, per MRD §9.3.

### Appendix E: Stakeholder Sign-Off

| Role | Name | Sign-Off | Date |
|------|------|----------|------|
| Product Lead | Tshepo Machele | ☐ Approved | |
| Engineering Lead | Tshepo Machele | ☐ Approved | |
| Design Lead | Tshepo Machele | ☐ Approved | |

### Appendix F: Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | 2026-02-15 | Tshepo Machele | Initial draft, derived from MRD v0.1 |
