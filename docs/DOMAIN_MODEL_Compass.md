# Domain Model — Compass: A Political Literacy Blog for South Africa's Missing Middle

> **Purpose:** Define the domain structure for the Compass project, including content entities, value objects, and their relationships. This document serves as the authoritative reference for domain language and content architecture. Because Compass uses a file-based content architecture (Markdown + YAML frontmatter) rather than a relational database, these domain objects are implemented as Astro Content Collection schemas and TypeScript interfaces, not ORM models.

---

## 1. Domain Overview

**Business Domain:** Political Education / Civic Literacy Content Publishing

**Problem Space:**
South Africa's 1996 Constitution divides power across three spheres of government (national, provincial, municipal), but no existing publication provides a systematic, plain-language guide to how these spheres work, how money flows between them, and how citizens can evaluate performance using public data. The result is an "accountability confusion" problem — citizens cannot identify which sphere is responsible for which service, leading to misdirected frustration and disengagement.

**Solution Space:**
Compass delivers a structured, 15-article educational series that makes SA's governance system legible to ordinary citizens. The system is a content-delivery platform — articles are authored in Markdown, compiled to static HTML at build time via Astro, and served from Netlify's edge CDN. The domain model captures the content taxonomy (articles, parts, spheres), reading experience (series navigation, reading time), and distribution mechanics (SEO metadata, email subscription).

**Domain Complexity Level:** Simple (file-based content, no transactions, no real-time state)

---

## 2. Strategic Design

### 2.1 Bounded Contexts

| Bounded Context | Responsibility | Owner | Upstream Dependencies | Downstream Consumers |
|-----------------|----------------|-------|----------------------|----------------------|
| Content Management | Article authoring, schema validation, series structure, sphere taxonomy | Tshepo Machele | None | Reader Experience, SEO & Distribution |
| Reader Experience | Reading progress, table of contents, share buttons, callout rendering, article navigation | Tshepo Machele | Content Management | Analytics & Measurement |
| Email Subscription | Email capture, form handling, ESP integration, double opt-in | Tshepo Machele | None (standalone pipeline) | Analytics & Measurement |
| Analytics & Measurement | GA4 integration, consent management, custom events, scroll-depth tracking | Tshepo Machele | Reader Experience, Email Subscription | None |
| SEO & Distribution | OG meta generation, structured data, WhatsApp preview optimisation, sitemap | Tshepo Machele | Content Management | None (external consumers: search engines, social platforms) |

### 2.2 Context Map

```
┌─────────────────────┐      ┌─────────────────────┐
│ Content Management   │─────▶│  Reader Experience   │
│ (upstream — schema,  │      │  (progress, TOC,     │
│  articles, series)   │      │   share, nav)        │
└─────────────────────┘      └──────────┬────────────┘
         │                              │
         │                              ▼
         │                   ┌─────────────────────┐
         │                   │ Analytics &          │
         │                   │ Measurement          │
         │                   │ (GA4, consent,       │
         │                   │  custom events)      │
         │                   └─────────────────────┘
         │                              ▲
         ▼                              │
┌─────────────────────┐      ┌─────────────────────┐
│ SEO & Distribution   │      │ Email Subscription   │
│ (OG meta, sitemap,   │      │ (Netlify Forms →     │
│  structured data)    │      │  ESP webhook)        │
└─────────────────────┘      └─────────────────────┘
```

### 2.3 Context Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| Content Management → Reader Experience | Customer/Supplier | Content schema provides article data; Reader Experience components consume and render it |
| Content Management → SEO & Distribution | Customer/Supplier | Article metadata drives OG tags, structured data, and sitemap entries |
| Reader Experience → Analytics & Measurement | Published Language | Reader interactions (scroll depth, share clicks) publish GA4 custom events |
| Email Subscription → Analytics & Measurement | Published Language | Form submissions fire `email_subscribe` GA4 event |

---

## 3. Tactical Design by Bounded Context

### 3.1 Content Management

**Context Purpose:** Define, validate, and manage the structured content that forms the Compass article series. This is the core domain — all other contexts depend on it.

**Module/Package Location:** `src/content/config.ts` (schema), `src/content/articles/` (content files)

#### Aggregates

| Aggregate Root | Invariants Protected | Child Entities | Lifecycle |
|----------------|---------------------|----------------|-----------|
| Article | articleNumber format (X.Y); part range (1–5); sphere is valid enum; description length 150–160 chars; series.prev/next are valid slugs or null; readingTime is positive integer; publishDate ≤ updatedDate | SEOMetadata, SeriesNavigation | Draft → Coming Soon → Published |

#### Entities

| Entity | Identity | Key Attributes | Belongs To |
|--------|----------|----------------|------------|
| Article | slug (derived from filename) | title, subtitle, part, articleNumber, sphere, description, publishDate, updatedDate, readingTime, status | Aggregate Root |
| Part | number (1–5) | title, description | Derived from Article.part at build time; no separate file |

#### Value Objects

| Value Object | Attributes | Validation Rules | Used By |
|--------------|------------|------------------|---------|
| Sphere | name: enum | Must be one of: `national`, `provincial`, `municipal`, `all` | Article |
| ArticleNumber | value: string | Format: `X.Y` where X is part number (1–5) and Y is article sequence within part | Article |
| SEOMetadata | ogImage: string?, canonicalUrl: string?, keywords: string[] | keywords must be non-empty array; ogImage must be valid path; canonicalUrl must be valid URL | Article |
| SeriesNavigation | prev: string \| null, next: string \| null | Must be valid article slugs or null; first article has prev=null; last has next=null | Article |
| ArticleStatus | value: enum | Must be one of: `published`, `draft`, `coming-soon` | Article |
| Description | value: string | 150–160 characters (SEO meta description) | Article |

#### Domain Events

> Note: In a static site architecture, "domain events" are build-time transformations rather than runtime events.

| Event | Triggered When | Effect | Consumers |
|-------|----------------|--------|-----------|
| ArticlePublished | Article status changes to `published` in frontmatter and site rebuilds | Article becomes navigable; series links update; sitemap regenerates; OG image must exist | Reader Experience, SEO & Distribution |
| SeriesOrderChanged | prev/next values updated in any article | All series navigation links revalidated at build time | Reader Experience |

#### Content Collection Schema

```typescript
// src/content/config.ts — Zod schema for article frontmatter
import { z, defineCollection } from 'astro:content';

const articles = defineCollection({
  schema: z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
    part: z.number().int().min(1).max(5),
    articleNumber: z.string().regex(/^\d\.\d+$/),
    sphere: z.enum(['national', 'provincial', 'municipal', 'all']),
    description: z.string().min(150).max(160),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    readingTime: z.number().int().positive(),
    status: z.enum(['published', 'draft', 'coming-soon']),
    series: z.object({
      prev: z.string().nullable(),
      next: z.string().nullable(),
    }),
    seo: z.object({
      ogImage: z.string().optional(),
      canonicalUrl: z.string().url().optional(),
      keywords: z.array(z.string()).nonempty(),
    }),
  }),
});

export const collections = { articles };
```

---

### 3.2 Reader Experience

**Context Purpose:** Render article content with reading-optimised UX — progress tracking, navigation, sharing, and callout formatting.

**Module/Package Location:** `src/components/`, `src/layouts/ArticleLayout.astro`

#### Components (UI Aggregates)

| Component | Responsibility | Inputs | Behaviour |
|-----------|----------------|--------|-----------|
| ReadingProgress | Show scroll progress bar fixed to top of viewport | None (reads scroll position) | Vanilla JS (~20 lines), fills left-to-right as reader scrolls; `client:load` directive |
| TableOfContents | Display H2 headings with active-section highlighting | Article headings (extracted at build time) | Sticky sidebar on desktop; inline collapsible on mobile |
| ArticleNav | Prev/next article links in footer | series.prev, series.next from frontmatter | Large, clear links with article titles; thumb-friendly on mobile |
| ShareButtons | WhatsApp share + Copy Link | Article URL, title | WhatsApp: `https://wa.me/?text=` with UTM params; Copy Link: Clipboard API + "Copied!" feedback |
| Callout | Expert anecdotes, key takeaways, practical frameworks | Content, type (anecdote/takeaway/framework) | Left border + background tint; visually distinct but non-disruptive |
| EmailCapture | Email subscription form | Form location (inline/footer/standalone) | Netlify Forms with honeypot; client-side confirmation message without page reload |
| CookieConsent | GA4 consent banner | None | Bottom of viewport; Accept/Decline; persists choice in localStorage; ≤ 3KB JS |

---

### 3.3 Email Subscription

**Context Purpose:** Capture reader email addresses and relay to ESP for newsletter notifications.

**Module/Package Location:** `src/components/EmailCapture.astro`, Netlify Forms config, ESP webhook

#### Flow

```
Reader enters email → HTML5 validation → Netlify Forms submission (with honeypot spam filter)
→ Client-side JS replaces form with confirmation message
→ GA4 custom event: email_subscribe (with form location parameter)
→ Netlify Forms webhook → ESP (Buttondown/Mailchimp)
→ ESP sends double opt-in confirmation email within 60 seconds
```

#### External Entity

| Entity | Managed By | Data Stored in Compass? |
|--------|-----------|------------------------|
| EmailSubscriber (email, confirmedAt, source) | ESP (Buttondown or Mailchimp) | No — email is captured by Netlify Forms and relayed; no PII stored in repository |

---

### 3.4 Analytics & Measurement

**Context Purpose:** Track reader engagement to measure against MRD success metrics, with privacy-respecting consent flow.

**Module/Package Location:** `src/components/CookieConsent.astro`, `src/layouts/BaseLayout.astro` (GA4 script)

#### GA4 Custom Events

| Event Name | Triggered When | Parameters |
|------------|----------------|------------|
| `page_view` | Article page loads (after consent) | article_number, part, sphere, reading_time |
| `scroll_depth` | Reader reaches 25%, 50%, 75%, 100% of article | depth_percentage, article_slug |
| `email_subscribe` | Successful form submission | form_location (inline/footer/standalone) |
| `share_whatsapp` | WhatsApp share button clicked | article_slug |
| `share_copy_link` | Copy Link button clicked | article_slug |

---

### 3.5 SEO & Distribution

**Context Purpose:** Maximise discoverability and WhatsApp share preview quality.

**Module/Package Location:** `src/layouts/BaseLayout.astro` (meta tags), `scripts/generate-og-images.py`, `public/og/`

#### OG Meta Specification

| Tag | Source | Constraint |
|-----|--------|------------|
| `og:title` | Article title | < 60 chars if possible |
| `og:description` | Article description (from frontmatter) | 150–160 chars |
| `og:image` | Per-article generated image | 1200×630px, article title + Compass branding |
| `og:url` | Canonical URL | `https://compass.co.za/articles/[slug]` |

---

## 4. Ubiquitous Language Glossary

> **Usage:** These terms must be used consistently in code, documentation, and conversations. Claude should use these exact terms when working in this codebase.

| Term | Definition | Context | Anti-Terms (Don't Use) |
|------|------------|---------|------------------------|
| Article | A single long-form piece (5,000+ words) in the structured 15-article Compass series | Content Management | Post, Blog post, Entry, Page |
| Part | One of five thematic groupings in the series (Foundation, National, Provincial, Municipal, Toolkit) | Content Management | Section, Chapter, Module, Category |
| Sphere | One of SA's three constitutional governance spheres — national, provincial, municipal — or "all" for cross-cutting content | Content Management | Tier, Level, Layer, Branch |
| Series | The complete 15-article collection forming one cohesive governance guide | Content Management | Blog, Course, Feed, Archive |
| Reader | The person consuming Compass content on the website | Reader Experience | User, Visitor, Customer, Subscriber |
| Job Executor | The primary target reader per MRD §3.1 — Black South African, 25–45, Gauteng metro, R8K–R29K/month household income | Market/Product | Target audience, Persona, Demographic |
| Callout | A styled content block within an article for expert anecdotes, key takeaways, or practical frameworks | Reader Experience | Sidebar, Info box, Alert, Card |
| Data Sources | The /data-sources page with curated links to AGSA, Treasury, DPME, StatsSA, IEC | Content Management | Resources, Links page, References |
| Series Navigation | The doubly-linked prev/next reading order connecting all 15 articles | Content Management | Pagination, Related articles |
| Reading Progress | The thin coloured bar at the top of the viewport showing scroll position | Reader Experience | Progress bar, Scroll indicator |
| Consent Banner | The cookie consent UI for GA4 analytics | Analytics | Cookie popup, Privacy notice |

---

## 5. Aggregate Design Rules

**Aggregate Sizing Philosophy:** Small aggregates — Compass has a simple domain with one primary aggregate (Article).

**Rules for this project:**

1. **Single aggregate:** Article is the only aggregate root. All other entities are either value objects within Article or derived entities (Part is derived from Article.part at build time).
2. **File-based identity:** Each Article is identified by its filename slug (e.g., `1-1-architecture-of-the-state`). No UUID or database-generated IDs.
3. **Build-time consistency:** All invariants are validated at build time by Astro Content Collections + Zod schema. There are no runtime transactions.
4. **Reference by slug:** Series navigation references other articles by slug string, not by direct object reference.
5. **Schema-as-invariant-enforcer:** The Zod schema in `src/content/config.ts` IS the invariant enforcement mechanism. If the schema passes, the content is valid.

---

## 6. Content Schema Standards

**Frontmatter Format:** YAML in Markdown files, validated by Zod schema at build time.

**Article Filename Convention:** `{part}-{sequence}-{slug}.md` (e.g., `1-1-architecture-of-the-state.md`)

**Example Frontmatter:**

```yaml
---
title: "The Architecture of the State"
subtitle: "How South Africa's Constitution Divides Power Across Three Spheres"
part: 1
articleNumber: "1.1"
sphere: "all"
description: "A practical guide to how South Africa's 1996 Constitution divides power across national, provincial, and municipal spheres of government."
publishDate: 2026-09-01
readingTime: 25
status: "published"
series:
  prev: null
  next: "following-the-money"
seo:
  ogImage: "/og/architecture-of-the-state.png"
  keywords: ["three spheres", "cooperative governance", "Constitution", "Schedule 4", "Schedule 5"]
---
```

---

## 7. Anti-Corruption Layer (ACL) Definitions

| External System | ACL Location | Translation Logic |
|-----------------|--------------|-------------------|
| Buttondown/Mailchimp ESP | Netlify Forms webhook configuration | Netlify Forms captures email → webhook relays to ESP API → ESP manages subscriber lifecycle |
| Google Analytics 4 | `src/components/CookieConsent.astro` + BaseLayout | Consent state determines GA4 initialisation mode; `analytics_storage` defaults to "denied" until explicit consent |

---

## 8. Cross-Cutting Concerns

### 8.1 Identity Generation
- **Strategy:** Filename-derived slugs (no UUID, no database sequences)
- **Where generated:** Author creates filename; slug is extracted at build time by Astro

### 8.2 Timestamps
- **Timezone:** Dates stored without timezone in YAML frontmatter (ISO date format: `YYYY-MM-DD`)
- **Precision:** Day-level precision (no time component needed for articles)

### 8.3 Content Lifecycle
- **Approach:** Three-state enum: `draft` (not rendered), `coming-soon` (visible on series page but not linked), `published` (fully navigable)
- **Deletion:** Articles are never deleted — content grows monotonically

---

## 9. Claude-Specific Instructions

**When working in this codebase, Claude should:**

- [ ] Use ubiquitous language from Section 4 exactly as defined
- [ ] Respect bounded context boundaries — content schema logic stays in `config.ts`, component logic stays in `src/components/`
- [ ] Ensure all Article invariants are enforced by the Zod schema (Section 5)
- [ ] Validate that series navigation forms a complete doubly-linked list with no broken links
- [ ] Reference this document before modifying `src/content/config.ts`
- [ ] Ask before adding new entity types or modifying the content schema

**When creating new content (articles), Claude should:**

1. Confirm the article's Part and Sphere assignment
2. Create frontmatter that passes the Zod schema validation
3. Update series.prev/next on the new article AND the adjacent articles
4. Verify readingTime is reasonable for the content length (~250 words/minute)
5. Update the Content Architecture table in `CLAUDE.md`

---

## 10. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-16 | Tshepo Machele | Initial domain model for Compass MVP |

---

*Last updated: 2026-02-16*
