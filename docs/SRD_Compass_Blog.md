---
title: "System Requirements Document — Compass"
subtitle: "A Political Literacy Blog for South Africa's Missing Middle"
version: "0.1"
status: "Draft"
date: "2026-02-15"
author: "Tshepo Machele"
---

# SYSTEM REQUIREMENTS DOCUMENT

## 0 → 1 New Product Development

## Compass — A Political Literacy Blog for South Africa's Missing Middle

| Field | Detail |
|---|---|
| **Document Owner** | Tshepo Machele — Product, Engineering, Design, Business/GTM Lead |
| **Version** | 0.1 |
| **Created Date** | 2026-02-15 |
| **Derived From** | PRD v0.1, MRD v0.1, UXD v0.1 |
| **Status** | Draft |
| **Target Launch** | Q3 2026 |
| **Platform** | Web (Astro static site deployed on Netlify) |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Traceability Matrix](#2-traceability-matrix)
3. [System Architecture Overview](#3-system-architecture-overview)
4. [User Story Maps](#4-user-story-maps)
5. [UML Diagrams](#5-uml-diagrams)
6. [System Flow Diagrams](#6-system-flow-diagrams)
7. [Functional System Requirements](#7-functional-system-requirements)
8. [Data Architecture](#8-data-architecture)
9. [Integration Specifications](#9-integration-specifications)
10. [API Specifications](#10-api-specifications)
11. [Security and Compliance Requirements](#11-security-and-compliance-requirements)
12. [Non-Functional Requirements](#12-non-functional-requirements)
13. [Technical Feasibility Validation](#13-technical-feasibility-validation)
14. [Implementation Roadmap](#14-implementation-roadmap)
15. [Risks, Assumptions and Dependencies](#15-risks-assumptions-and-dependencies)
- [Appendix A: Stakeholder Sign-Off](#appendix-a-stakeholder-sign-off)
- [Appendix B: Document History](#appendix-b-document-history)
- [Appendix C: SRD Completion Checklist](#appendix-c-srd-completion-checklist)

---

# 1. Executive Summary

## 1.1 System Vision Statement

Compass is a free, long-form political education blog that makes South Africa’s governance system legible to ordinary citizens. The system delivers a 15-article series across five parts — foundational framework, national government, provincial government, municipal government, and a citizen’s toolkit — through a fast, mobile-first, reading-optimised static website.

This System Requirements Document translates the product specifications defined in the Compass PRD (v0.1) and the user experience design defined in the Compass UXD (v0.1) into precise technical specifications that can be implemented by the development team. Every system requirement traces back to a validated product requirement, which in turn traces back to a validated market need in the MRD.

## 1.2 Technical Approach Summary

Compass adopts a static-site-generation (SSG) architecture using Astro, deployed on Netlify’s edge CDN. This approach is driven by three non-negotiable constraints derived from the MRD and PRD:

- Performance: The target reader is on a mid-range Android smartphone (Samsung Galaxy A15) over 4G prepaid data. Every unnecessary byte costs them money. Total page weight shall not exceed 400KB, with a target of 200KB.
- Trust: The target audience trusts almost no institution. No third-party ad scripts, no dark patterns. Google Analytics 4 (GA4) is the sole analytics integration, configured with anonymised IP, restricted data retention (2 months), and a concise cookie consent banner to maintain reader trust.
- Simplicity: A single developer (Tshepo Machele) builds and maintains the system. The architecture must minimize operational complexity — no databases, no servers, no authentication systems at MVP.

The system is a content-delivery platform, not an application platform. All content is authored in Markdown, compiled to static HTML at build time, and served from a CDN. Client-side JavaScript is limited to: the reading progress bar, scroll-depth analytics, email form submission feedback, and the cookie consent banner for Google Analytics 4.

## 1.3 MVP Technical Scope

The MVP delivers the following technical capabilities, aligned with PRD §15 Phase 0–1:

- Static site scaffold with Astro, Tailwind CSS, and Netlify deployment pipeline
- Article rendering engine: Markdown-to-HTML with YAML frontmatter-driven metadata
- Content collection schema with type-safe validation (Astro Content Collections)
- Six page templates: Home, Series Overview, Article, About, Data Sources, Subscribe, Privacy
- Nine Astro components: Header, Footer, ReadingProgress, ArticleNav, SeriesCard, ShareButtons, EmailCapture, TableOfContents, Callout, plus a CookieConsent banner component for GA4
- Email subscription pipeline: Netlify Forms → webhook → Buttondown/Mailchimp ESP
- WhatsApp sharing with UTM-tagged URLs and optimised OG meta tags
- Google Analytics 4 (GA4) integration with custom events and cookie consent banner
- Static search index via Pagefind
- OG image generation via Python script (Pillow)
- Automated build and deploy via Git push to Netlify

## 1.4 Technical Success Criteria

The system meets its technical success criteria when:

|                                         |            |                |               |
|-----------------------------------------|------------|----------------|---------------|
| **Criterion**                           | **Target** | **Hard Limit** | **PRD Trace** |
| First Contentful Paint (FCP)            | < 1.0s    | < 1.5s        | PRD §11.1     |
| Largest Contentful Paint (LCP)          | < 1.5s    | < 2.5s        | PRD §11.1     |
| Cumulative Layout Shift (CLS)           | < 0.05    | < 0.1         | PRD §11.1     |
| Total page weight (article)             | < 250KB   | < 450KB       | PRD §11.1     |
| JavaScript payload (application)        | < 20KB    | < 50KB        | PRD §11.1     |
| JavaScript payload (GA4 gtag.js, async) | ~28KB      | < 35KB        | PRD §9.1      |
| CSS payload                             | < 15KB    | < 30KB        | PRD §11.1     |
| Font payload                            | < 80KB    | < 120KB       | PRD §11.1     |
| Lighthouse Performance                  | ≥ 95       | ≥ 90           | PRD §2.2      |
| Lighthouse Accessibility                | ≥ 90       | ≥ 90           | PRD §12.1     |
| Build time (15 articles)                | < 30s     | < 60s         | PRD §5.4      |
| Deploy propagation                      | < 60s     | < 120s        | PRD §5.4      |

# 2. Traceability Matrix

## 2.1 MRD → PRD → SRD Requirement Flow

The following matrix traces market requirements through product requirements to system requirements, ensuring every technical decision serves a validated user need.

|                                               |                                         |                                                              |
|-----------------------------------------------|-----------------------------------------|--------------------------------------------------------------|
| **MRD Reference**                             | **PRD Reference**                       | **SRD Requirement**                                          |
| MRD §1.1 — Problem hypothesis                 | PRD §1.2 — Product vision               | SRD §7 — Article rendering engine; content collection schema |
| MRD §3.1 — Job executor (smartphone, prepaid) | PRD §11 — Performance requirements      | SRD §12 — Performance NFRs; page weight budgets              |
| MRD §4.2 — Outcome #1 (identify sphere)      | PRD §6.3 — Practical framework sections | SRD §7 — Callout component rendering                         |
| MRD §5.1 — Anxiety: agenda perception         | PRD §7 — Non-partisan visual language   | SRD §12 — No third-party ad/tracking scripts                 |
| MRD §5.1 — Habit: effort cost                 | PRD §6.3 — Reading progress indicator   | SRD §7 — ReadingProgress component spec                      |
| MRD §5.2 — WhatsApp trigger                   | PRD §14 — Social sharing                | SRD §7 — ShareButtons; OG meta; UTM params                   |
| MRD §8.1 — MVP scope                          | PRD §15 — Launch plan                   | SRD §14 — Implementation phases                              |
| MRD §8.3 — Target customer (Gauteng)          | PRD §10 — SEO strategy                  | SRD §7 — SEO meta tag generation; structured data            |
| MRD §9.1 — North Star metric                  | PRD §9 — Analytics                      | SRD §9 — GA4 integration; custom events                      |

## 2.2 User Journey → System Component Mapping

This mapping connects each primary user journey (from UXD §4.2.2) to the system components that enable it.

|                          |                                 |                                                                                |
|--------------------------|---------------------------------|--------------------------------------------------------------------------------|
| **User Journey**         | **UXD Flow**                    | **System Components**                                                          |
| WhatsApp-referred reader | Flow 1: WhatsApp link → article | OG meta renderer, CDN edge cache, ArticleLayout, ReadingProgress, ShareButtons |
| Search-driven reader     | Flow 2: Google → article        | SEO meta generator, structured data (JSON-LD), ArticleLayout, TableOfContents  |
| Returning reader         | Flow 3: Direct/email → series   | SeriesCard, ArticleNav, Pagefind search index, EmailCapture                    |
| Email subscriber         | Flow 4: CTA → subscribe         | EmailCapture component, Netlify Forms, ESP webhook, confirmation email         |

## 2.3 Hypothesis Validation Technical Requirements

The following MRD hypotheses require specific technical instrumentation to validate:

|                           |                             |                                                                                 |
|---------------------------|-----------------------------|---------------------------------------------------------------------------------|
| **MRD Hypothesis**        | **Validation Metric**       | **Technical Requirement**                                                       |
| H2: Long-form readership  | Avg time on page ≥ 8 min    | GA4 engagement time tracking; scroll-depth custom events at 25%, 50%, 75%, 100% |
| H3: WhatsApp distribution | 30% traffic from WhatsApp   | UTM parameter parsing; GA4 referral source tracking; OG meta tags per article   |
| H6: Trust-building        | Return visit rate ≥ 40%     | GA4 returning visitor metric; minimal cookie consent banner                     |
| H7: Email as retention    | 500 subscribers in 6 months | Netlify Forms submission tracking; ESP subscriber count API                     |

# 3. System Architecture Overview

## 3.1 High-Level Architecture Diagram

The Compass system follows a static site generation (SSG) architecture with the following data flow:

*Author writes Markdown (.md) with YAML frontmatter → Git push to GitHub (main branch) → Netlify build hook triggers → Astro builds static HTML/CSS/JS → Pagefind indexes content → Netlify deploys to edge CDN → Site live at compass.co.za*

Parallel pipelines:

- Email capture: Reader submits email → Netlify Forms → Webhook → Buttondown/Mailchimp ESP → Confirmation email to reader
- Analytics: Reader accepts cookie consent → GA4 gtag.js (~28KB) fires pageview → Google Analytics dashboard
- OG image generation: Python script (Pillow) reads frontmatter → Generates 1200×630px branded images → Output to public/og/[slug].png

## 3.2 Architecture Components

|                       |                            |                                                                                                                                             |               |
|-----------------------|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| **Component**         | **Technology**             | **Responsibility**                                                                                                                          | **PRD Trace** |
| Static Site Generator | Astro                      | Compiles Markdown content to static HTML; manages content collections; handles partial hydration for interactive islands                    | PRD §5.1      |
| Styling Engine        | Tailwind CSS               | Utility-first CSS framework; purges unused classes at build time; enforces design system consistency                                        | PRD §5.1      |
| Hosting & CDN         | Netlify                    | Git-triggered auto-deploy; edge CDN for global (SA-optimised) delivery; built-in form handling; HTTPS                                       | PRD §5.1      |
| Content Store         | Markdown files in Git      | Version-controlled content with YAML frontmatter; Astro Content Collections for schema validation                                           | PRD §5.1, §8  |
| Search Engine         | Pagefind                   | Static search index generated at build time; client-side search with no server; works offline                                               | PRD §5.1      |
| Analytics             | Google Analytics 4 (GA4)   | Event-based analytics; gtag.js (~28KB); page views, engagement time, referral sources, UTM tracking, custom events; requires cookie consent | PRD §9.1      |
| Email Service         | Netlify Forms + Buttondown | Form capture with zero client-side JS; webhook to ESP; double opt-in; subscriber management                                                 | PRD §13       |
| OG Image Generator    | Python + Pillow            | Build-time script generating per-article Open Graph images (1200×630px) with branding                                                       | PRD §14.3     |
| Version Control       | Git (GitHub)               | Standard VCS; Netlify auto-deploys on push to main                                                                                          | PRD §5.1      |

## 3.3 Key Architecture Decisions

|                 |                             |                                                                                                                                                                                                                                         |                                                                                                                      |
|-----------------|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| **Decision**    | **Choice**                  | **Rationale**                                                                                                                                                                                                                           | **Alternatives Considered**                                                                                          |
| Site generation | Static (SSG) via Astro      | Zero server cost; sub-second TTFB from CDN; minimal attack surface; content is read-only                                                                                                                                                | Next.js SSR (unnecessary complexity), WordPress (security surface, hosting cost, performance overhead)               |
| Client-side JS  | Near-zero by default        | Respects prepaid data costs; faster FCP/LCP; reduces parse/compile time on low-end devices. Only reading progress bar + analytics require JS, loaded as Astro islands                                                                   | SPA framework (React/Vue) would add 50–100KB+ of framework JS                                                        |
| CSS framework   | Tailwind CSS                | Purged CSS under 15KB; utility-first accelerates solo development; enforces consistent spacing/typography                                                                                                                               | Custom CSS (slower), Bootstrap (larger bundle, opinionated design)                                                   |
| Analytics       | Google Analytics 4 (GA4)    | Industry-standard analytics platform; comprehensive event model; robust attribution; real-time reporting; free tier covers expected traffic. Cookie consent banner required but implemented as lightweight, non-intrusive inline notice | Plausible (lighter script, no cookies, but limited reporting and smaller ecosystem), Matomo (self-hosted complexity) |
| Email capture   | Netlify Forms + ESP webhook | Zero client-side JS for form; no custom backend; free tier covers expected volume                                                                                                                                                       | Custom API + database (overengineered for MVP), embedded ESP form (adds third-party JS)                              |
| Search          | Pagefind                    | Static index at build; no server; works offline; fast and lightweight; Astro-compatible                                                                                                                                                 | Algolia (external dependency, cost), Lunr.js (heavier client-side index)                                             |

## 3.4 Technology Stack

|                 |                          |               |                        |
|-----------------|--------------------------|---------------|------------------------|
| **Layer**       | **Technology**           | **Version**   | **License**            |
| Runtime         | Node.js                  | 20 LTS        | MIT                    |
| SSG Framework   | Astro                    | Latest stable | MIT                    |
| CSS Framework   | Tailwind CSS             | 3.x           | MIT                    |
| Search          | Pagefind                 | Latest stable | MIT                    |
| Analytics       | Google Analytics 4 (GA4) | Latest        | Commercial (free tier) |
| Email ESP       | Buttondown or Mailchimp  | Free tier     | Commercial             |
| Hosting         | Netlify                  | Free tier     | Commercial             |
| VCS             | Git / GitHub             | Latest        | MIT / Commercial       |
| OG Image Script | Python 3 + Pillow        | 3.11+         | HPND (Pillow)          |

# 4. User Story Maps

## 4.1 Primary Persona User Story Map

Persona: Thabo — The Frustrated Ratepayer (PRD §3.1, UXD §2.1.1)

A 32-year-old Johannesburg professional experiencing persistent water outages. He does not know whether his ward councillor, provincial MEC, or a national minister is responsible. He has a Samsung Galaxy A15 on 4G prepaid data and consumes content primarily via WhatsApp.

### 4.1.1 Epic: Discover and Read a Compass Article

|          |                                                 |                                                                                        |                                                                                         |
|----------|-------------------------------------------------|----------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| **Step** | **User Action**                                 | **System Behaviour**                                                                   | **Acceptance Criteria**                                                                 |
| 1        | Receives WhatsApp link with Compass article URL | OG meta tags render branded preview in WhatsApp (title, description, 1200×630px image) | WhatsApp displays article title, description, and branded image within 2s of link paste |
| 2        | Taps link on mobile                             | CDN serves static HTML; page renders within performance budget                         | FCP < 1.5s; LCP < 2.5s; total page weight < 400KB                                    |
| 3        | Begins reading the article                      | Reading progress bar appears at viewport top; reading time displayed in metadata       | Progress bar updates on scroll; reading time accurate to ±1 minute                      |
| 4        | Navigates within article using TOC              | Collapsible TOC on mobile expands inline below metadata; anchors scroll to section     | Tapping TOC item scrolls to correct H2; active section highlighted                      |
| 5        | Reaches end of article                          | Practical Framework callout is visually distinct; Prev/Next article links displayed    | Callout has dashed green border; navigation links are thumb-friendly (≥48px)            |

### 4.1.2 Epic: Share Article via WhatsApp

|          |                                   |                                                                                                  |                                                                                               |
|----------|-----------------------------------|--------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| **Step** | **User Action**                   | **System Behaviour**                                                                             | **Acceptance Criteria**                                                                       |
| 1        | Taps WhatsApp share button        | System constructs URL: https://api.whatsapp.com/send?text=[pre-filled message with UTM params] | WhatsApp app opens with pre-filled message containing article title, hook, and UTM-tagged URL |
| 2        | Selects recipient/group and sends | N/A (WhatsApp-native)                                                                            | Shared link renders OG preview in recipient’s chat                                            |

### 4.1.3 Epic: Subscribe to Email Notifications

|          |                                                               |                                                                                                                               |                                                                                   |
|----------|---------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Step** | **User Action**                                               | **System Behaviour**                                                                                                          | **Acceptance Criteria**                                                           |
| 1        | Encounters email capture form (inline, footer, or /subscribe) | Form renders: single email input + submit button + privacy assurance text                                                     | Input field and button are thumb-friendly (≥48px tap target); no CAPTCHA          |
| 2        | Enters email and taps Subscribe                               | Client-side: HTML5 email validation; Netlify honeypot spam check; form submission via Netlify Forms                           | Invalid email shows inline error; valid email triggers submission                 |
| 3        | Sees confirmation                                             | Form replaced with message: “You’re subscribed. We’ll email you when new articles drop.” (client-side replacement, no reload) | Confirmation appears within 2s; no page reload                                    |
| 4        | Receives confirmation email                                   | ESP sends double opt-in email within 60s                                                                                      | Email arrives within 60s; contains confirmation link and expectation-setting copy |

## 4.2 Secondary Persona User Story Maps

Persona: Lerato — The Pre-Election Researcher (UXD §2.1.2)

### 4.2.1 Epic: Browse Full Article Series by Sphere

|          |                             |                                                                                |                                                                                      |
|----------|-----------------------------|--------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| **Step** | **User Action**             | **System Behaviour**                                                           | **Acceptance Criteria**                                                              |
| 1        | Navigates to /series        | Series page renders: all 15 articles grouped by Part with publication status   | Published articles are linked; coming-soon articles show title + “Coming soon” label |
| 2        | Toggles view to “By Sphere” | Client-side filter shows articles grouped by National/Provincial/Municipal/All | Filter is instant (no server call); article count per sphere is visible              |
| 3        | Selects a municipal article | ArticleLayout renders with sphere tag, breadcrumb, and full content            | Sphere tag colour matches PRD §7.2 colour system                                     |

Persona: Sipho — The WhatsApp Debater (UXD §2.1.2)

### 4.2.2 Epic: Quick-scan Article from WhatsApp Link

|          |                                         |                                                                                              |                                                      |
|----------|-----------------------------------------|----------------------------------------------------------------------------------------------|------------------------------------------------------|
| **Step** | **User Action**                         | **System Behaviour**                                                                         | **Acceptance Criteria**                              |
| 1        | Taps WhatsApp link                      | Page loads within 3s on 4G; hero content (title, subtitle, reading time) visible immediately | FCP < 1.5s; above-the-fold content requires zero JS |
| 2        | Scans headings to find relevant section | TOC provides scannable overview; H2 headings are descriptive                                 | TOC renders within first scroll on mobile            |
| 3        | Shares to own WhatsApp group            | One-tap WhatsApp share with pre-filled message                                               | Share button visible in article header and footer    |

# 5. UML Diagrams

## 5.1 Domain Model Class Diagram

The following class specifications represent the core domain entities in the Compass content management system. Because Compass uses a file-based content architecture (Markdown + YAML frontmatter) rather than a relational database, these classes are implemented as Astro Content Collection schemas and TypeScript interfaces, not ORM models.

### 5.1.1 Class Specifications

|                  |                                                                                                                                                                                                         |                                                                                       |                                                                                                 |
|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| **Class**        | **Attributes**                                                                                                                                                                                          | **Relationships**                                                                     | **Implementation**                                                                              |
| Article          | title: string, subtitle: string, part: number (1–5), articleNumber: string, sphere: enum, description: string (150–160 chars), publishDate: Date, updatedDate: Date?, readingTime: number, status: enum | Has one Part; has one Sphere; has prev/next Article (nullable); has many SEO Keywords | Astro Content Collection schema (z.object) in src/content/config.ts; stored as YAML frontmatter |
| Part             | number: number (1–5), title: string, description: string                                                                                                                                                | Has many Articles                                                                     | Derived from Article.part at build time; no separate file                                       |
| Sphere           | name: enum (national, provincial, municipal, all), colour: string                                                                                                                                       | Tags many Articles                                                                    | Enum in content schema; colour mapping in Tailwind config                                       |
| SEOMetadata      | ogImage: string?, canonicalUrl: string?, keywords: string[]                                                                                                                                           | Belongs to one Article                                                                | Nested z.object within Article schema                                                           |
| SeriesNavigation | prev: string \| null, next: string \| null                                                                                                                                                              | Belongs to one Article                                                                | Nested z.object within Article schema; slug references                                          |
| EmailSubscriber  | email: string, confirmedAt: Date?, source: string                                                                                                                                                       | N/A (external)                                                                        | Managed by ESP (Buttondown/Mailchimp); captured via Netlify Forms                               |

## 5.2 Sequence Diagrams

### 5.2.1 Article Page Load Sequence

The following sequence describes the complete flow when a reader loads a Compass article page:

1.  Reader’s browser sends HTTP GET request for /articles/[slug]
2.  Netlify CDN checks edge cache for the requested URL
3.  If cache hit: CDN returns cached static HTML with appropriate headers (Cache-Control, ETag)
4.  If cache miss: CDN fetches from Netlify origin (pre-built static files from last deploy)
5.  Browser receives HTML document; begins parsing
6.  Browser encounters <link rel="preload"> for critical CSS and body font; initiates fetch
7.  Browser renders First Contentful Paint (text visible)
8.  Browser encounters GA4 gtag.js <script> (~28KB, async); if reader has accepted cookie consent, fires pageview event to Google Analytics
9.  Browser encounters Astro island directive (client:load) on ReadingProgress component; hydrates with minimal JS
10. Reader scrolls; ReadingProgress updates; GA4 custom events fire at 25%, 50%, 75%, 100% scroll depth

### 5.2.2 Email Subscription Sequence

The following sequence describes the end-to-end email subscription flow:

11. Reader enters email address in EmailCapture form and taps “Subscribe”
12. Browser performs HTML5 email validation; if invalid, shows inline error and stops
13. Browser submits form data to Netlify Forms endpoint (POST with honeypot field for spam detection)
14. Netlify Forms processes submission; checks honeypot; stores submission in Netlify dashboard
15. Netlify triggers outgoing webhook to ESP (Buttondown/Mailchimp) with subscriber email
16. ESP creates subscriber record in “pending” state; sends double opt-in confirmation email
17. Meanwhile, client-side JS replaces form with confirmation message (no page reload)
18. Reader opens confirmation email and clicks confirm link
19. ESP moves subscriber to “confirmed” state; subscriber is now on the mailing list

## 5.3 State Diagrams

### 5.3.1 Article State Machine

|             |                                                                                   |                                                          |                                                                                                 |
|-------------|-----------------------------------------------------------------------------------|----------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| **State**   | **Description**                                                                   | **Transitions**                                          | **System Behaviour**                                                                            |
| coming-soon | Article title visible in series page; content not yet authored                    | coming-soon → draft (author begins writing)              | Series page shows title + “Coming soon” label; no link; article not in search index             |
| draft       | Content authored but not published; visible in Git but not deployed to production | draft → published (Git push to main triggers deploy)     | Article excluded from build output (status !== “published” filter in Astro queries)             |
| published   | Article live on production site; indexed by Pagefind; linked from series page     | published → published (content updates trigger redeploy) | Full article page rendered; included in Pagefind index; sitemap.xml updated; OG image generated |

### 5.3.2 Email Subscriber State Machine

|                      |                                                          |                                                                  |
|----------------------|----------------------------------------------------------|------------------------------------------------------------------|
| **State**            | **Description**                                          | **Transitions**                                                  |
| unsubmitted          | Reader has not interacted with email form                | unsubmitted → submitted (reader enters email and taps Subscribe) |
| submitted            | Email submitted to Netlify Forms; pending ESP processing | submitted → pending_confirmation (ESP sends confirmation email)  |
| pending_confirmation | Confirmation email sent; awaiting reader’s click         | pending_confirmation → confirmed (reader clicks confirm link)    |
| confirmed            | Reader is on the active subscriber list                  | confirmed → unsubscribed (reader clicks unsubscribe link)        |
| unsubscribed         | Reader has opted out; no further emails sent             | Terminal state                                                   |

# 6. System Flow Diagrams

## 6.1 Build and Deploy Flow

Since Compass has no authentication system (the site is entirely public), this section documents the build and deploy flow, which is the primary system process.

20. Author commits Markdown content changes to Git repository (main branch)
21. Git push triggers Netlify build hook
22. Netlify provisions build environment with Node.js 20 LTS
23. npm run build executes Astro build process:

- Astro reads src/content/articles/\*.md through Content Collections
- Schema validation checks all frontmatter fields against z.object schema
- Astro compiles Markdown to HTML using configured rehype/remark plugins
- Tailwind CSS purges unused utility classes; outputs minimal CSS bundle
- Astro generates static HTML for all pages (Home, Series, Articles, About, etc.)
- sitemap.xml generated via @astrojs/sitemap integration

24. Pagefind post-build: indexes all published article content; generates static search index files
25. Python OG image script runs: reads each article’s frontmatter; generates 1200×630px branded images
26. Netlify deploys build output (dist/ directory) to edge CDN
27. CDN cache invalidated for changed assets; propagation completes within ~60 seconds
28. Site live at compass.co.za with updated content

## 6.2 Core Content Delivery Flow

Flow: Reader requests and consumes a Compass article (PRD §6.3)

29. Reader’s browser sends GET /articles/[slug] to Netlify CDN
30. CDN returns static HTML with security headers (X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin)
31. Browser parses HTML; preloads critical CSS and body font (font-display: swap)
32. FCP fires (target: < 1.0s) — article title, metadata, and initial body text visible
33. LCP fires (target: < 1.5s) — full above-the-fold content rendered
34. Astro island hydration: ReadingProgress component receives client:load directive; minimal JS bundle loaded
35. GA4 gtag.js loads async (~28KB); if cookie consent accepted, fires pageview with referral source and UTM parameters
36. Reader scrolls through article; ReadingProgress bar updates; scroll-depth custom events fire at 25/50/75/100% thresholds
37. Reader reaches article footer: sees Practical Framework callout, Prev/Next navigation, email capture form, and share buttons

## 6.3 Error Handling Flow

|                                |                                                               |                                                                                                                                  |                   |
|--------------------------------|---------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|-------------------|
| **Error Condition**            | **System Response**                                           | **User-Facing Message**                                                                                                          | **PRD/UXD Trace** |
| 404: Page not found            | Netlify serves custom 404.html page                           | “This page doesn’t exist. Start with The Architecture of the State — it explains how South Africa’s Constitution divides power.” | UXD §4.2.4        |
| Email form: invalid email      | HTML5 validation prevents submission                          | Browser-native validation message                                                                                                | PRD §13.2         |
| Email form: submission failure | Client-side error handler catches failed POST                 | “Something went wrong on our end. Please try again — and if it keeps happening, let us know at hello@compass.co.za.”             | UXD §2.3.2        |
| Search: no results             | Pagefind returns empty result set                             | “No articles match your search. Try a different term, or browse the full series.”                                                | UXD §4.2.4        |
| CDN: edge cache miss           | Netlify fetches from origin; serves response; populates cache | No user impact (transparent)                                                                                                     | PRD §5.4          |
| Build failure                  | Netlify build fails; previous deploy remains live             | No user impact (previous version stays live); author receives Netlify build failure notification                                 | PRD §5.4          |

# 7. Functional System Requirements

## 7.1 System Requirement Specification Format

Each system requirement follows a consistent format: unique identifier, title, priority (Must Have / Should Have / Could Have), PRD traceability, description, functional requirements, and acceptance criteria. Priority levels align with UXD §3.1.1: Must Have = blocks core job-to-be-done if missing; Should Have = significantly improves core experience; Could Have = enhances experience for specific segments.

## 7.2 Core System Requirements (Must Have for MVP)

### SRD-FUNC-001: Article Rendering Engine

|             |                                                                                                                   |
|-------------|-------------------------------------------------------------------------------------------------------------------|
| **Field**   | **Value**                                                                                                         |
| Priority    | Must Have                                                                                                         |
| PRD Trace   | PRD §6.3, UXD FR-001                                                                                              |
| Description | The system shall compile Markdown content with YAML frontmatter into reading-optimised static HTML article pages. |

**Functional Requirements:**

- SRD-FUNC-001.1: The system shall render article body content from Markdown to semantic HTML using Astro’s built-in Markdown pipeline with configured rehype/remark plugins.
- SRD-FUNC-001.2: The system shall render articles in a single-column layout at 680px max content width with 19px serif body font (17px on mobile at breakpoint ≤ 640px).
- SRD-FUNC-001.3: The system shall extract and validate all frontmatter fields against the Astro Content Collection schema (z.object) at build time. Build shall fail if any required field is missing or invalid.
- SRD-FUNC-001.4: The system shall calculate reading time at build time using the formula: word count ÷ 200 words per minute, rounded to the nearest whole number.
- SRD-FUNC-001.5: The system shall render external source links with target="_blank" and rel="noopener noreferrer" via the rehypeExternalLinks plugin.
- SRD-FUNC-001.6: The system shall render internal cross-references between articles as relative links (e.g., /articles/following-the-money).
- SRD-FUNC-001.7: The system shall render three distinct callout component types: Expert Anecdote (styled narrative container), Key Takeaway (compass-gold left border), and Practical Framework (dashed compass-green border).

**Acceptance Criteria:**

- Given a valid Markdown file with complete frontmatter, when the build process runs, then a static HTML page is generated at /articles/[slug] with correct semantic structure.
- Given an article with 5,000 words, when the reading time is calculated, then the displayed reading time is 25 minutes (±1 minute).
- Given an article with a missing required frontmatter field, when the build process runs, then the build fails with a descriptive error identifying the missing field.
- Given a reader on a 360px-wide screen, when they load an article, then body text is legible without horizontal scrolling and line length does not exceed ~75 characters.

### SRD-FUNC-002: Reading Progress Indicator

|             |                                                                                                               |
|-------------|---------------------------------------------------------------------------------------------------------------|
| **Field**   | **Value**                                                                                                     |
| Priority    | Must Have                                                                                                     |
| PRD Trace   | PRD §6.3, UXD FR-001.2                                                                                        |
| Description | The system shall display a visual reading progress bar that updates as the reader scrolls through an article. |

**Functional Requirements:**

- SRD-FUNC-002.1: The system shall render a progress bar fixed to the top of the viewport, spanning the full viewport width.
- SRD-FUNC-002.2: The progress bar shall represent the reader’s scroll position as a percentage of total article content height (0% at top, 100% at article footer).
- SRD-FUNC-002.3: The component shall be implemented as an Astro island with client:load hydration directive, using minimal vanilla JavaScript (no framework dependency).
- SRD-FUNC-002.4: The component shall respect the prefers-reduced-motion media query by disabling smooth transitions when the reader’s system preference is set.
- SRD-FUNC-002.5: The JavaScript bundle for this component shall not exceed 2KB minified and gzipped.

**Acceptance Criteria:**

- Given a reader at 60% scroll depth, when they glance at the progress bar, then the bar visually indicates approximately 60% completion.
- Given a reader with prefers-reduced-motion: reduce set, when they scroll, then the progress bar updates without animation transitions.

### SRD-FUNC-003: Table of Contents

|             |                                                                                                                               |
|-------------|-------------------------------------------------------------------------------------------------------------------------------|
| **Field**   | **Value**                                                                                                                     |
| Priority    | Must Have                                                                                                                     |
| PRD Trace   | PRD §6.3, UXD FR-001.4                                                                                                        |
| Description | The system shall generate a table of contents from article heading structure, with responsive behaviour across device widths. |

**Functional Requirements:**

- SRD-FUNC-003.1: The system shall auto-generate the TOC from all H2 and H3 headings in the article body at build time.
- SRD-FUNC-003.2: On desktop viewports (≥ 1024px), the TOC shall render as a sticky sidebar with active-section highlighting using Intersection Observer.
- SRD-FUNC-003.3: On mobile viewports (< 1024px), the TOC shall render as a collapsible inline element below article metadata, defaulting to collapsed state.
- SRD-FUNC-003.4: Each TOC item shall link to the corresponding heading via anchor (id attribute generated from heading text).

**Acceptance Criteria:**

- Given a returning reader on desktop, when they visit an article they have partially read, then the TOC allows direct navigation to any section.
- Given a reader on mobile, when they expand the TOC, then all H2 headings are visible and tappable with minimum 48px tap targets.

### SRD-FUNC-004: WhatsApp Sharing System

|             |                                                                                                        |
|-------------|--------------------------------------------------------------------------------------------------------|
| **Field**   | **Value**                                                                                              |
| Priority    | Must Have                                                                                              |
| PRD Trace   | PRD §14.1, UXD FR-002                                                                                  |
| Description | The system shall enable one-tap WhatsApp sharing with pre-filled messages and optimised link previews. |

**Functional Requirements:**

- SRD-FUNC-004.1: The system shall render a WhatsApp share button on all article pages using the URL scheme: https://api.whatsapp.com/send?text=[encoded message].
- SRD-FUNC-004.2: The pre-filled share message shall include: article title, one-sentence hook (from frontmatter subtitle), UTM-tagged article URL (utm_source=whatsapp&utm_medium=share&utm_campaign=article-[slug]), and brand attribution line.
- SRD-FUNC-004.3: The system shall generate per-article OG meta tags: og:title (< 60 chars), og:description (< 160 chars), og:image (1200×630px), og:url, og:type=article.
- SRD-FUNC-004.4: The system shall generate per-article OG images at build time via Python script (Pillow), containing: Compass logo, article title, Part number, sphere tag, and brand colours.
- SRD-FUNC-004.5: The system shall append a version query parameter to OG image URLs to force WhatsApp cache refresh after content updates.

**Acceptance Criteria:**

- Given a reader on mobile, when they tap the WhatsApp share button, then WhatsApp opens with a correctly formatted pre-filled message.
- Given a user receiving a Compass link in a WhatsApp group, when WhatsApp renders the link preview, then they see a branded OG image with the article title and compelling description.

### SRD-FUNC-005: Email Subscription Pipeline

|             |                                                                                                                          |
|-------------|--------------------------------------------------------------------------------------------------------------------------|
| **Field**   | **Value**                                                                                                                |
| Priority    | Must Have                                                                                                                |
| PRD Trace   | PRD §13, UXD FR-003                                                                                                      |
| Description | The system shall capture email subscriptions via a serverless form pipeline with zero client-side dependency on the ESP. |

**Functional Requirements:**

- SRD-FUNC-005.1: The system shall render an email capture form with a single input field (type="email", required), a submit button (text: “Subscribe”), and adjacent privacy assurance text.
- SRD-FUNC-005.2: The form shall be placed at three locations per article page: (1) inline after the first major H2 section, (2) article footer, and (3) standalone /subscribe page.
- SRD-FUNC-005.3: Form validation shall use HTML5 email validation plus Netlify’s built-in honeypot field for spam detection. No CAPTCHA.
- SRD-FUNC-005.4: On successful submission, client-side JavaScript shall replace the form DOM element with the confirmation message without triggering a page reload.
- SRD-FUNC-005.5: The system shall fire a GA4 custom event (email_subscribe) with the form location as a parameter.
- SRD-FUNC-005.6: Netlify Forms shall trigger an outgoing webhook to the ESP (Buttondown or Mailchimp) containing the subscriber’s email address.
- SRD-FUNC-005.7: The ESP shall send a double opt-in confirmation email within 60 seconds of form submission.

**Acceptance Criteria:**

- Given a reader who enters a valid email, when they submit, then they see the confirmation message within 2 seconds and receive a confirmation email within 60 seconds.
- Given a reader on mobile, when they encounter the email form, then the input field and button are thumb-friendly (minimum 48px tap target).

### SRD-FUNC-006: Copy Link Sharing

|             |                                                                                                           |
|-------------|-----------------------------------------------------------------------------------------------------------|
| **Field**   | **Value**                                                                                                 |
| Priority    | Should Have                                                                                               |
| PRD Trace   | PRD §14.2, UXD FR-004                                                                                     |
| Description | The system shall provide a copy-to-clipboard function for sharing article URLs via non-WhatsApp channels. |

**Functional Requirements:**

- SRD-FUNC-006.1: The system shall render a “Copy Link” button adjacent to the WhatsApp share button.
- SRD-FUNC-006.2: On click, the button shall copy the article URL with UTM parameters (utm_source=clipboard&utm_medium=share&utm_campaign=article-[slug]) to the system clipboard using the Clipboard API.
- SRD-FUNC-006.3: A “Copied!” confirmation message shall appear for 2 seconds, replacing the button text.

**Acceptance Criteria:**

- Given a reader who taps “Copy Link”, when the clipboard write succeeds, then the button text changes to “Copied!” for 2 seconds.

### SRD-FUNC-006a: Cookie Consent Banner

|             |                                                                                                                                |
|-------------|--------------------------------------------------------------------------------------------------------------------------------|
| **Field**   | **Value**                                                                                                                      |
| Priority    | Must Have                                                                                                                      |
| PRD Trace   | SRD §9.2.3, POPIA/GDPR                                                                                                         |
| Description | The system shall display a lightweight cookie consent banner to obtain reader consent before activating GA4 analytics cookies. |

**Functional Requirements:**

- SRD-FUNC-006a.1: The system shall render an inline consent banner at the bottom of the viewport on first visit, containing: a brief explanation (“We use cookies to understand how readers use Compass. No personal data is sold or shared.”), an “Accept” button, and a “Decline” link.
- SRD-FUNC-006a.2: GA4 shall be initialised with consent mode v2, defaulting analytics_storage to “denied” until the reader explicitly accepts.
- SRD-FUNC-006a.3: On “Accept”, the system shall update consent state to “granted”, store the preference in localStorage (key: compass_consent), and dismiss the banner.
- SRD-FUNC-006a.4: On “Decline”, the system shall dismiss the banner and store the declined preference. GA4 shall continue sending cookieless pings for aggregate measurement only.
- SRD-FUNC-006a.5: On subsequent visits, the system shall read the stored consent preference and apply it without re-displaying the banner.
- SRD-FUNC-006a.6: The consent banner shall not obstruct article content on mobile; it shall be dismissible and occupy no more than 80px height.
- SRD-FUNC-006a.7: The consent banner JavaScript shall not exceed 3KB minified and gzipped.

**Acceptance Criteria:**

- Given a first-time reader, when the page loads, then a consent banner appears at the bottom of the viewport without obstructing reading content.
- Given a reader who taps “Accept”, when GA4 initialises, then analytics_storage is set to “granted” and standard GA4 cookies are set.
- Given a reader who taps “Decline”, when GA4 initialises, then no analytics cookies are set and only cookieless pings are sent.
- Given a returning reader who previously accepted, when the page loads, then no consent banner is displayed and GA4 loads with full tracking.

## 7.3 Secondary System Requirements (Should Have)

### SRD-FUNC-007: Static Site Search

|             |                                                                                                                      |
|-------------|----------------------------------------------------------------------------------------------------------------------|
| **Field**   | **Value**                                                                                                            |
| Priority    | Should Have                                                                                                          |
| PRD Trace   | PRD §5.1, UXD FR-005                                                                                                 |
| Description | The system shall provide client-side search across all published articles using a build-time-generated static index. |

**Functional Requirements:**

- SRD-FUNC-007.1: Pagefind shall generate a static search index during the post-build phase, indexing all published article content.
- SRD-FUNC-007.2: Search shall be accessible from the header navigation on all pages.
- SRD-FUNC-007.3: Search results shall display: article title, matching excerpt with highlighted terms, and sphere tag.
- SRD-FUNC-007.4: The search index size shall not exceed 100KB for the initial 4-article MVP.

**Acceptance Criteria:**

- Given a reader searching for “municipal finances”, when results are displayed, then articles containing those terms appear with relevant excerpts.

### SRD-FUNC-008: Series Overview with Sphere Filtering

|             |                                                                                                                               |
|-------------|-------------------------------------------------------------------------------------------------------------------------------|
| **Field**   | **Value**                                                                                                                     |
| Priority    | Must Have                                                                                                                     |
| PRD Trace   | PRD §6.2, UXD FR-006                                                                                                          |
| Description | The system shall render a series overview page displaying all 15 articles with publication status and sphere-based filtering. |

**Functional Requirements:**

- SRD-FUNC-008.1: The /series page shall display all 15 articles grouped by Part (1–5) with Part title headings.
- SRD-FUNC-008.2: A client-side view toggle shall allow switching between “Reading Order” (default) and “By Sphere” views.
- SRD-FUNC-008.3: In “By Sphere” view, articles shall be filtered by sphere enum values: National, Provincial, Municipal, All.
- SRD-FUNC-008.4: Published articles shall render as linked SeriesCard components; coming-soon articles shall show title with “Coming soon” label and no link.

**Acceptance Criteria:**

- Given a reader viewing the series page in “By Sphere” mode, when they select “Municipal”, then only articles with sphere: municipal or sphere: all are displayed.

### SRD-FUNC-009: SEO and Structured Data

|             |                                                                                                   |
|-------------|---------------------------------------------------------------------------------------------------|
| **Field**   | **Value**                                                                                         |
| Priority    | Must Have                                                                                         |
| PRD Trace   | PRD §10                                                                                           |
| Description | The system shall generate comprehensive SEO metadata and structured data for all published pages. |

**Functional Requirements:**

- SRD-FUNC-009.1: Each article page shall include: <title> (Article Title \| Compass, < 60 chars), <meta name="description"> (from frontmatter, 150–160 chars), <meta name="keywords"> (from frontmatter array).
- SRD-FUNC-009.2: Each article page shall include Open Graph tags: og:title, og:description, og:image, og:url, og:type=article.
- SRD-FUNC-009.3: Each article page shall include Twitter Card tags: twitter:card=summary_large_image, twitter:title, twitter:description, twitter:image.
- SRD-FUNC-009.4: Each article page shall include a self-referencing canonical URL: <link rel="canonical">.
- SRD-FUNC-009.5: Each article page shall include Article structured data in JSON-LD format with: author, datePublished, dateModified, headline, description.
- SRD-FUNC-009.6: The system shall generate sitemap.xml via the @astrojs/sitemap integration.
- SRD-FUNC-009.7: The system shall serve a robots.txt allowing all crawlers.
- SRD-FUNC-009.8: All pages shall use semantic HTML: proper heading hierarchy (H1 from frontmatter title, H2/H3 from Markdown), <article> wrapper, <time> for dates.

**Acceptance Criteria:**

- Given a published article, when a search engine crawls the page, then it finds valid JSON-LD structured data, complete OG tags, and a canonical URL.

## 7.4 Deferred System Requirements

|                                                    |                  |                                                                                                      |                  |
|----------------------------------------------------|------------------|------------------------------------------------------------------------------------------------------|------------------|
| **Requirement**                                    | **Priority**     | **Rationale for Deferral**                                                                           | **Target Phase** |
| Multilingual support (isiZulu, Afrikaans, Sesotho) | Could Have       | English is primary media language for target segment; translation adds content management complexity | Post-PMF (v2)    |
| Interactive municipal scorecard                    | Could Have       | Requires structured AGSA data; adds dynamic JS; exceeds MVP complexity                               | Post-PMF (v2)    |
| Reader comments / discussion                       | Won’t Have (Now) | Moderation overhead for solo operator; trust risk from unmoderated user content                      | Backlog          |
| Native mobile app                                  | Won’t Have (Now) | Web-first validates demand; mobile app is premature optimisation                                     | Backlog          |
| Monetisation (ads, paywall)                        | Won’t Have (Now) | Premature; trust-building with low-trust audience requires credible free offering                    | Post-PMF         |

# 8. Data Architecture

## 8.1 Entity-Relationship Diagram

Compass uses a file-based content architecture rather than a relational database. The “database” is the Git repository itself, and the “schema” is enforced by Astro Content Collections using Zod validation. The following describes the logical data model:

- Article (1) ↔ Part (M:1): Each article belongs to exactly one Part (1–5). Parts are derived from the article’s part field at build time.
- Article (1) ↔ Sphere (M:1): Each article is tagged with exactly one sphere enum value (national, provincial, municipal, all).
- Article (1) ↔ Article (1:1, optional): Each article has an optional prev and next reference forming a doubly-linked reading order list.
- Article (1) ↔ SEOMetadata (1:1): Each article has exactly one nested SEO metadata object.
- EmailSubscriber is external to the system (managed by ESP). No data is stored in the Compass repository.

## 8.2 Data Entity Specifications

### 8.2.1 Article Content Schema

Implementation: src/content/config.ts using Astro Content Collections and Zod.

|                  |                |              |                                            |                                                   |
|------------------|----------------|--------------|--------------------------------------------|---------------------------------------------------|
| **Field**        | **Type**       | **Required** | **Validation Rules**                       | **Example**                                       |
| title            | string         | Yes          | Non-empty                                  | The Architecture of the State                     |
| subtitle         | string         | Yes          | Non-empty                                  | Understanding South Africa’s Three Spheres        |
| part             | number         | Yes          | min(1), max(5)                             | 1                                                 |
| articleNumber    | string         | Yes          | Format: X.Y                                | 1.1                                               |
| sphere           | enum           | Yes          | national \| provincial \| municipal \| all | all                                               |
| description      | string         | Yes          | 150–160 characters (SEO meta)              | A guide to how SA’s Constitution divides power... |
| publishDate      | date           | Yes          | Valid ISO date                             | 2026-09-01                                        |
| updatedDate      | date           | No           | Valid ISO date, must be ≥ publishDate      | 2026-09-15                                        |
| readingTime      | number         | Yes          | Positive integer (minutes)                 | 25                                                |
| status           | enum           | Yes          | published \| draft \| coming-soon          | published                                         |
| series.prev      | string \| null | Yes          | Valid slug or null                         | null                                              |
| series.next      | string \| null | Yes          | Valid slug or null                         | following-the-money                               |
| seo.ogImage      | string         | No           | Valid path                                 | /og/architecture-of-the-state.png                 |
| seo.canonicalUrl | string         | No           | Valid URL                                  | https://compass.co.za/articles/...                |
| seo.keywords     | string[]     | Yes          | Non-empty array                            | ["three spheres", "government structure"]       |

## 8.3 Data Flow Diagram

Content data flows through the system in a single direction at build time:

38. Author creates/edits .md file in src/content/articles/ with YAML frontmatter and Markdown body
39. Git commit and push to main branch triggers Netlify build
40. Astro Content Collections reads all .md files; Zod validates each file’s frontmatter against schema
41. If validation fails: build aborts with descriptive error. If validation passes: Astro compiles content to static HTML
42. Build outputs: static HTML files (dist/), Pagefind search index, sitemap.xml, OG images
43. Netlify deploys dist/ directory to edge CDN

At runtime, no data is written to or read from any database. All “data” is pre-compiled into static HTML files.

The only runtime data flow is email subscription:

44. Reader submits email via Netlify Forms (POST request to Netlify’s form handling endpoint)
45. Netlify stores submission in its dashboard and triggers webhook to ESP
46. ESP manages subscriber data externally (Compass system has no access to or responsibility for subscriber PII beyond the initial capture)

## 8.4 Data Privacy and Compliance

|                          |                                                                                                                                                                                       |                    |
|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|
| **Concern**              | **Approach**                                                                                                                                                                          | **PRD/MRD Trace**  |
| Personal data collection | Only email address collected; no name, no demographics, no browsing history stored by Compass                                                                                         | PRD §13.2          |
| Analytics data           | Google Analytics 4 uses first-party cookies; cookie consent banner required; IP anonymisation enabled; data retention set to 2 months; no PII collected beyond anonymised identifiers | PRD §9.1           |
| Data storage location    | Email addresses stored by ESP (Buttondown: EU-hosted / Mailchimp: US-hosted); Compass system stores zero PII                                                                          | PRD §13.1          |
| Data retention           | Subscriber data retained by ESP until unsubscribe; Netlify Forms submissions retained per Netlify’s policy                                                                            | —                  |
| Privacy policy           | Plain-language privacy policy at /privacy explaining: what data is collected, why, where it’s stored, and how to unsubscribe                                                          | PRD §6.6 (implied) |
| POPIA compliance         | Minimal data collection; legitimate interest basis; easy unsubscribe; privacy policy published                                                                                        | —                  |

# 9. Integration Specifications

## 9.1 Integration Overview

Compass integrates with four external services. All integrations are designed to be loosely coupled: the static site functions fully without any integration (degraded gracefully), and no integration requires a custom backend or server.

|                            |                             |                        |                                            |                                                              |
|----------------------------|-----------------------------|------------------------|--------------------------------------------|--------------------------------------------------------------|
| **Integration**            | **Direction**               | **Protocol**           | **Authentication**                         | **Failure Impact**                                           |
| Netlify CDN / Hosting      | Outbound (deploy)           | Git push → Netlify API | Git SSH key + Netlify account              | Site not updated (previous version remains live)             |
| Netlify Forms              | Inbound (reader → Netlify)  | HTTP POST              | None (public form)                         | Email subscription fails; error message shown to reader      |
| ESP (Buttondown/Mailchimp) | Outbound (Netlify → ESP)    | Webhook (HTTP POST)    | API key in webhook URL                     | Subscriber not added to ESP; Netlify still stores submission |
| Google Analytics 4         | Outbound (browser → Google) | HTTP POST (JS script)  | GA4 Measurement ID (configured in gtag.js) | Analytics not recorded; no user impact                       |

## 9.2 Integration Specification Detail

### 9.2.1 Netlify Forms Integration

|                 |                                                                                                   |
|-----------------|---------------------------------------------------------------------------------------------------|
| **Field**       | **Specification**                                                                                 |
| Endpoint        | Netlify-managed (auto-detected from HTML form with netlify attribute)                             |
| Method          | POST                                                                                              |
| Content-Type    | application/x-www-form-urlencoded                                                                 |
| Fields          | email (required, type=email), form-name (hidden, value=“subscribe”), bot-field (honeypot, hidden) |
| Rate Limit      | Netlify free tier: 100 submissions/month                                                          |
| Spam Protection | Honeypot field (bot-field); Netlify’s built-in spam filtering                                     |
| Response        | Success: 200 OK; Failure: 4xx/5xx                                                                 |

### 9.2.2 ESP Webhook Integration

|                |                                                                                                                                                        |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Field**      | **Specification**                                                                                                                                      |
| Trigger        | Netlify Forms outgoing notification (configured in Netlify dashboard)                                                                                  |
| Endpoint       | ESP API endpoint (Buttondown: https://api.buttondown.email/v1/subscribers; Mailchimp: https://us[X].api.mailchimp.com/3.0/lists/[list_id]/members) |
| Method         | POST                                                                                                                                                   |
| Authentication | API key in Authorization header or query parameter                                                                                                     |
| Payload        | JSON: { email: string, status: “pending” } (triggers double opt-in)                                                                                    |
| Retry Policy   | Netlify retries failed webhooks up to 3 times                                                                                                          |

### 9.2.3 Google Analytics 4 Integration

|                    |                                                                                                                                                                                  |
|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Field**          | **Specification**                                                                                                                                                                |
| Script URL         | https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX                                                                                                                         |
| Script Size        | ~28KB (gtag.js)                                                                                                                                                                  |
| Loading            | async                                                                                                                                                                            |
| Configuration      | Measurement ID: G-XXXXXXXXXX (configured in gtag('config', ...))                                                                                                                 |
| IP Anonymisation   | Enabled by default in GA4                                                                                                                                                        |
| Data Retention     | Set to 2 months (minimum) in GA4 admin                                                                                                                                           |
| Standard Events    | page_view (automatic), session_start, first_visit, scroll                                                                                                                        |
| Custom Events      | scroll_depth_25, scroll_depth_50, scroll_depth_75, scroll_depth_100, whatsapp_share, copy_link, email_subscribe, outbound_link, article_nav_next, article_nav_prev               |
| UTM Tracking       | Automatic from URL parameters: utm_source, utm_medium, utm_campaign                                                                                                              |
| Cookie Usage       | First-party cookies (_ga, _ga\_\*); requires cookie consent banner                                                                                                             |
| Consent Management | Lightweight inline consent banner; GA4 consent mode v2: analytics_storage defaults to ‘denied’ until reader accepts; cookieless pings sent in denied state for basic measurement |

## 9.3 Integration Error Handling Matrix

|                    |                                |                                      |                                                                       |                                                                |
|--------------------|--------------------------------|--------------------------------------|-----------------------------------------------------------------------|----------------------------------------------------------------|
| **Integration**    | **Error Type**                 | **Detection**                        | **Recovery**                                                          | **User Impact**                                                |
| Netlify Forms      | Submission failure (5xx)       | HTTP response status                 | Client-side error message; reader can retry                           | Subscription delayed; error message shown                      |
| Netlify Forms      | Rate limit exceeded            | HTTP 429                             | Display message suggesting reader try again later                     | Subscription delayed                                           |
| ESP Webhook        | Webhook delivery failure       | Netlify webhook logs                 | Netlify retries 3x; manual check Netlify dashboard                    | No user impact (Netlify stores submission regardless)          |
| Google Analytics 4 | Script blocked (ad blocker)    | N/A (silent failure)                 | None required; analytics are best-effort                              | No user impact; analytics data slightly under-reported         |
| Google Analytics 4 | Google Analytics service down  | N/A (async fire-and-forget)          | None required                                                         | No user impact; analytics data gap                             |
| Google Analytics 4 | Reader declines cookie consent | Consent mode v2 detects denied state | GA4 sends cookieless pings for basic measurement (no user-level data) | Reduced analytics granularity; aggregate trends still captured |

# 10. API Specifications

## 10.1 API Design Principles

Compass is a static site with no custom APIs. All “API” interactions are with third-party services (Netlify Forms, ESP, Google Analytics). This section documents the external API contracts the system depends on and the internal data schemas that govern content structure.

Design principles for all integrations:

- No custom backend: All dynamic behaviour is handled by third-party services or client-side JavaScript
- Graceful degradation: The site shall function fully (content readable, navigation working) even if all integrations fail
- Minimal client-side API calls: Only email submission and analytics events require runtime HTTP requests

## 10.2 Content Collection API (Build-Time)

Astro Content Collections provide a type-safe, build-time API for querying article content. This is not a runtime API — all queries are resolved during the build process and compiled into static HTML.

|                                   |                                                |                                                                        |
|-----------------------------------|------------------------------------------------|------------------------------------------------------------------------|
| **Query**                         | **Usage**                                      | **Returns**                                                            |
| getCollection('articles')         | Retrieve all articles for series page, sitemap | Array of article entries with validated frontmatter + compiled content |
| getCollection('articles', filter) | Filter by status, sphere, part                 | Filtered array (e.g., status === 'published')                          |
| getEntry('articles', slug)        | Retrieve single article for dynamic routing    | Single article entry or undefined                                      |

## 10.3 Netlify Configuration API

The following netlify.toml configuration governs the build, deployment, redirects, and security headers:

|                                         |                                           |                                     |
|-----------------------------------------|-------------------------------------------|-------------------------------------|
| **Configuration**                       | **Value**                                 | **Purpose**                         |
| build.command                           | npm run build                             | Triggers Astro build                |
| build.publish                           | dist                                      | Output directory for Netlify deploy |
| build.environment.NODE_VERSION          | 20                                        | Pins Node.js LTS version            |
| Security header: X-Frame-Options        | DENY                                      | Prevents clickjacking               |
| Security header: X-Content-Type-Options | nosniff                                   | Prevents MIME type sniffing         |
| Security header: Referrer-Policy        | strict-origin-when-cross-origin           | Controls referrer information       |
| Cache-Control (\*.css, \*.js)           | public, max-age=31536000, immutable       | Long-term caching for hashed assets |
| Redirect: /articles/1-1-\*              | /articles/architecture-of-the-state (301) | Handles legacy URL patterns         |

# 11. Security and Compliance Requirements

## 11.1 Authentication and Authorisation

Compass has no authentication or authorisation system. The entire site is publicly accessible. Content authoring is controlled via Git repository access (GitHub account permissions). There are no user accounts, no login, no session management, and no role-based access control on the public-facing site.

|                                 |                                                         |                                                |
|---------------------------------|---------------------------------------------------------|------------------------------------------------|
| **Actor**                       | **Access Level**                                        | **Mechanism**                                  |
| Public reader                   | Read all published content                              | No authentication; static HTML served from CDN |
| Content author (Tshepo Machele) | Read/write content in Git repo; manage Netlify settings | GitHub SSH key; Netlify account credentials    |
| Netlify build system            | Read repo; write to CDN                                 | Git deploy key; Netlify API token              |

## 11.2 Security Controls

|                           |                                                                                                                |                                                                           |
|---------------------------|----------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| **Control**               | **Implementation**                                                                                             | **Threat Mitigated**                                                      |
| HTTPS enforcement         | Netlify auto-provisions TLS certificate; HTTP → HTTPS redirect                                                 | Man-in-the-middle attacks; data interception                              |
| Security headers          | X-Frame-Options: DENY; X-Content-Type-Options: nosniff; Referrer-Policy: strict-origin-when-cross-origin       | Clickjacking; MIME sniffing; referrer leakage                             |
| No dynamic endpoints      | Static site with no server-side code execution                                                                 | SQL injection, XSS via server, RCE — entire classes of attacks eliminated |
| Form spam protection      | Netlify honeypot field; Netlify’s built-in spam filtering                                                      | Bot-driven form spam                                                      |
| External link safety      | All external links rendered with target="_blank" rel="noopener noreferrer"                                    | Tabnapping; reverse tabnapping                                            |
| Dependency management     | npm audit in CI; minimal dependency tree                                                                       | Supply chain attacks via compromised packages                             |
| Content integrity         | All content version-controlled in Git; no user-generated content                                               | Content tampering; unauthorised modifications                             |
| Cookie consent management | GA4 consent mode v2; analytics_storage defaults to denied; reader explicitly opts in via inline consent banner | Ensures compliance with POPIA/GDPR; minimises cookies to analytics-only   |

## 11.3 Compliance Requirements

|                                                              |                                                                                   |                                                                                                                                                                                                       |
|--------------------------------------------------------------|-----------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Regulation / Standard**                                    | **Applicability**                                                                 | **Compliance Approach**                                                                                                                                                                               |
| POPIA (Protection of Personal Information Act, South Africa) | Applicable: email addresses are personal information; GA4 cookies require consent | Minimal collection (email only); legitimate interest basis; clear privacy policy; easy unsubscribe; cookie consent banner for GA4; no data sharing with third parties beyond ESP and Google Analytics |
| GDPR                                                         | Potentially applicable if EU residents subscribe                                  | GA4 consent mode v2 implemented; analytics_storage defaults to ‘denied’; cookie consent banner displayed; IP anonymisation enabled; data retention set to minimum (2 months)                          |
| WCAG 2.1 Level AA                                            | Self-imposed quality standard (PRD §12.1)                                         | Colour contrast ≥ 4.5:1; keyboard navigation; screen reader compatibility; responsive text ≥ 16px; lang="en-ZA" attribute; descriptive link text                                                      |

# 12. Non-Functional Requirements

## 12.1 Performance Requirements

Performance is both a UX requirement and a respect-for-the-reader requirement. The target reader is on a Samsung Galaxy A15 on 4G prepaid data where every unnecessary byte costs them money (approximately R2/MB on Vodacom/MTN in 2026). PRD trace: §11.

|              |                                         |            |                |                                         |
|--------------|-----------------------------------------|------------|----------------|-----------------------------------------|
| **Req ID**   | **Requirement**                         | **Target** | **Hard Limit** | **Measurement Method**                  |
| SRD-NFR-001  | First Contentful Paint (FCP)            | < 1.0s    | < 1.5s        | Lighthouse audit on 4G throttle profile |
| SRD-NFR-002  | Largest Contentful Paint (LCP)          | < 1.5s    | < 2.5s        | Lighthouse audit on 4G throttle profile |
| SRD-NFR-003  | Cumulative Layout Shift (CLS)           | < 0.05    | < 0.1         | Lighthouse audit                        |
| SRD-NFR-004  | Total page weight (article, incl. GA4)  | < 250KB   | < 450KB       | Network tab / build output analysis     |
| SRD-NFR-005  | JavaScript payload (application)        | < 20KB    | < 50KB        | Build output analysis                   |
| SRD-NFR-005a | JavaScript payload (GA4 gtag.js, async) | ~28KB      | < 35KB        | Network tab analysis                    |
| SRD-NFR-006  | CSS payload (after Tailwind purge)      | < 15KB    | < 30KB        | Build output analysis                   |
| SRD-NFR-007  | Font payload (subsetted)                | < 80KB    | < 120KB       | Build output analysis                   |
| SRD-NFR-008  | Lighthouse Performance score            | ≥ 95       | ≥ 90           | Lighthouse CI                           |
| SRD-NFR-009  | Lighthouse Accessibility score          | ≥ 90       | ≥ 90           | Lighthouse CI                           |
| SRD-NFR-010  | Reader data cost per article            | ~R0.50     | < R0.90       | Page weight × R2/MB                     |

**Performance implementation strategy:**

- Zero client-side JS by default: Astro renders everything as static HTML. Only ReadingProgress and scroll analytics require JS, loaded as isolated Astro islands.
- Font subsetting: Fonts subsetted to Latin characters only. Variable fonts used where possible. font-display: swap on all @font-face declarations.
- No images in article body (MVP): If added later, images must use lazy loading, modern formats (WebP/AVIF with fallback), and explicit width/height attributes to prevent CLS.
- CSS purging: Tailwind’s purge removes unused utility classes, targeting final CSS well under 15KB.
- Preloading: Preload body font and critical CSS. Preconnect to Google Analytics domain (www.googletagmanager.com).

## 12.2 Reliability and Availability

|             |                   |                                                         |                                                                                    |
|-------------|-------------------|---------------------------------------------------------|------------------------------------------------------------------------------------|
| **Req ID**  | **Requirement**   | **Target**                                              | **Rationale**                                                                      |
| SRD-NFR-011 | Uptime            | 99.9% (Netlify SLA)                                     | Static site on CDN inherently highly available; no server to fail                  |
| SRD-NFR-012 | Disaster recovery | Redeploy from Git in < 5 minutes                       | Entire site is reproducible from Git repository; no data to back up                |
| SRD-NFR-013 | Build resilience  | Failed builds do not affect live site                   | Netlify only deploys successful builds; failed builds leave previous deploy intact |
| SRD-NFR-014 | CDN edge caching  | All static assets cached at edge with immutable headers | Maximises cache hit rate; minimises origin requests                                |

## 12.3 Scalability Requirements

|             |                         |                                               |                                                                                                                      |
|-------------|-------------------------|-----------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| **Req ID**  | **Requirement**         | **Target**                                    | **Approach**                                                                                                         |
| SRD-NFR-015 | Concurrent readers      | 10,000+ simultaneous                          | Static CDN architecture; no server bottleneck; Netlify free tier supports 100GB/month bandwidth                      |
| SRD-NFR-016 | Content growth          | 15 articles at full series; extensible to 50+ | File-based content (no DB migration); Pagefind indexing scales linearly; build time scales linearly                  |
| SRD-NFR-017 | Email subscriber growth | 2,000 subscribers within 12 months            | ESP handles list management; Netlify Forms rate limit (100/month) may require upgrade if growth exceeds expectations |

## 12.4 Operational Requirements

|             |                    |                                                                                                                  |
|-------------|--------------------|------------------------------------------------------------------------------------------------------------------|
| **Req ID**  | **Requirement**    | **Specification**                                                                                                |
| SRD-NFR-018 | Deployment process | Git push to main → automatic Netlify build and deploy; no manual steps                                           |
| SRD-NFR-019 | Monitoring         | Netlify deploy notifications (email); Google Analytics 4 dashboard; Netlify Forms dashboard for submissions      |
| SRD-NFR-020 | Logging            | Netlify build logs (retained per Netlify policy); Netlify Functions logs (if any); no custom application logging |
| SRD-NFR-021 | Backup strategy    | Git repository is the single source of truth; GitHub provides redundancy. No database to back up.                |
| SRD-NFR-022 | Environment parity | Single environment (production). No staging. Preview deploys available via Netlify branch deploys for testing.   |

# 13. Technical Feasibility Validation

## 13.1 Technical Hypothesis Validation

|                                                          |                                                                                                                        |                                                                                                                                     |                                                                                                             |
|----------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| **Hypothesis**                                           | **Validation Approach**                                                                                                | **Expected Outcome**                                                                                                                | **Risk if Invalid**                                                                                         |
| Astro can deliver article pages under 200KB total weight | Build a prototype article page with full content (~5,000 words), Tailwind CSS, and all components; measure page weight | Total weight < 200KB (HTML ~50KB, CSS <15KB, fonts ~80KB, JS <20KB, GA4 ~28KB loaded async — excluded from critical path budget) | Low: Astro is designed for content-heavy static sites; weight budget is achievable without analytics script |
| Pagefind search index remains lightweight at 15 articles | Index 15 sample articles; measure index size                                                                           | Index < 200KB total (UI + index chunks)                                                                                            | Low: Pagefind is designed for static sites; index size scales efficiently                                   |
| Netlify Forms → ESP webhook pipeline works end-to-end    | Configure test form on Netlify; set up Buttondown webhook; submit test email; verify confirmation email delivery       | Email submission → ESP subscriber creation → confirmation email within 60s                                                          | Medium: Webhook reliability depends on Netlify’s outgoing notification system                               |
| GA4 custom events capture scroll depth accurately        | Implement Intersection Observer-based scroll tracking; verify events in GA4 real-time reports                          | Custom events fire at 25/50/75/100% scroll thresholds with < 2% error                                                              | Low: Standard pattern with well-documented GA4 Measurement Protocol and gtag API                            |
| OG images render correctly in WhatsApp link previews     | Generate test OG image; share test URL in WhatsApp; verify preview rendering                                           | WhatsApp displays OG image, title, and description within 2s of link paste                                                          | Low: Standard OG meta tags; WhatsApp supports og:image natively                                             |

## 13.2 Proof of Concept Results

To be completed during Phase 0 (Weeks 1–2) of the implementation roadmap. Results will be documented here before proceeding to full implementation.

|                                         |            |            |                                                |
|-----------------------------------------|------------|------------|------------------------------------------------|
| **PoC**                                 | **Status** | **Result** | **Action**                                     |
| Astro + Tailwind prototype article page | Pending    | —          | Week 1: Build prototype; measure performance   |
| Netlify Forms → ESP webhook             | Pending    | —          | Week 2: Configure and test end-to-end          |
| GA4 custom events + consent banner      | Pending    | —          | Week 3: Implement and verify in dashboard      |
| OG image generation + WhatsApp preview  | Pending    | —          | Week 3: Generate and test in WhatsApp          |
| Pagefind search with 4 articles         | Pending    | —          | Week 5: Index MVP articles; measure index size |

## 13.3 Remaining Technical Risks

|                                                                                             |                 |            |                                                                                                                                                                              |
|---------------------------------------------------------------------------------------------|-----------------|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Risk**                                                                                    | **Probability** | **Impact** | **Mitigation**                                                                                                                                                               |
| Netlify Forms free tier limit (100 submissions/month) exceeded if subscription rate is high | Medium          | Medium     | Monitor submission count; upgrade to Netlify Pro (\$19/month for 1,000 submissions) if threshold approached; or switch to direct ESP form embed                              |
| WhatsApp OG cache prevents updated previews from displaying                                 | Medium          | Low        | Append version query parameter to OG image URL; use cache-busting strategies                                                                                                 |
| Font subsetting does not include all characters needed for SA place names with diacritics   | Low             | Low        | Include extended Latin subset; test with common SA place names and Nguni/Afrikaans diacritics                                                                                |
| GA4 blocked by ad blockers, underreporting analytics                                        | High            | Low        | Accept as inherent limitation; GA4 consent mode v2 provides cookieless pings for basic measurement even when blocked; consider server-side GTM proxy for improved collection |

# 14. Implementation Roadmap

## 14.1 Implementation Phases

The implementation roadmap aligns with PRD §15 and is designed for a single developer (Tshepo Machele) using Claude Code as development partner.

|                                 |              |                      |                                                                                                                                   |               |
|---------------------------------|--------------|----------------------|-----------------------------------------------------------------------------------------------------------------------------------|---------------|
| **Phase**                       | **Duration** | **Focus**            | **Key Deliverables**                                                                                                              | **PRD Trace** |
| Phase 0: Build                  | Weeks 1–8    | Platform engineering | Astro scaffold, Tailwind config, all components, page templates, Netlify pipeline, analytics, email pipeline, OG image script, QA | PRD §15.1     |
| Phase 1: MVP Launch             | Weeks 9–16   | Content delivery     | Articles 1.1–1.4 published sequentially; initial distribution via WhatsApp + LinkedIn                                             | PRD §15.2     |
| Phase 2: National Govt          | Weeks 17–24  | Content expansion    | Articles 2.1–2.3 published                                                                                                        | PRD §15.3     |
| Phase 3: Provincial + Municipal | Weeks 25–40  | Content expansion    | Articles 3.1–3.3, 4.1–4.4 published (municipal articles prioritised for 2026 elections)                                           | PRD §15.4     |
| Phase 4: Citizen’s Toolkit      | Weeks 41–44  | Series completion    | Article 5.1 published; full 15-article series complete                                                                            | PRD §15.5     |
| Phase 5: PMF Assessment         | Week 48+     | Evaluation           | Formal assessment against MRD §9 success metrics; go/no-go on v2 features                                                         | PRD §15.6     |

## 14.2 Technical Milestones

Phase 0 detailed breakdown (the primary technical implementation phase):

|          |                  |                                                                                                                                                  |                                                                                                     |
|----------|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| **Week** | **Milestone**    | **Technical Deliverables**                                                                                                                       | **Verification**                                                                                    |
| 1–2      | Project scaffold | Astro project init; Tailwind config; BaseLayout, Header, Footer components; Netlify deployment pipeline; domain DNS                              | Site deploys to Netlify on git push; Tailwind classes render correctly                              |
| 3–4      | Core components  | ArticleLayout, ReadingProgress, ShareButtons, EmailCapture, TableOfContents, Callout, SeriesCard, ArticleNav; all page templates                 | All components render with all states; responsive at 360px, 768px, 1024px                           |
| 5–6      | Design polish    | Typography tuning; colour implementation; responsive testing on Android (Chrome DevTools + real device); Lighthouse audit; accessibility testing | Lighthouse: Performance ≥ 95, Accessibility ≥ 90; no layout shifts; all colours pass 4.5:1 contrast |
| 7        | Integrations     | Google Analytics 4 with consent banner; Netlify Forms → Buttondown webhook; OG image Python script; sitemap.xml; robots.txt                      | Analytics events visible in GA4 real-time; email pipeline end-to-end; OG images generate correctly  |
| 8        | QA               | All links tested; forms tested; analytics verified; performance budget verified; mobile UX review; content schema validation confirmed           | Zero broken links; zero console errors; all acceptance criteria from §7 verified                    |

## 14.3 Resource Requirements

|                             |                                                                           |                                  |           |
|-----------------------------|---------------------------------------------------------------------------|----------------------------------|-----------|
| **Resource**                | **Specification**                                                         | **Cost**                         | **Phase** |
| Developer                   | Tshepo Machele (full-stack, solo)                                         | Sweat equity                     | All       |
| AI Development Partner      | Claude Code                                                               | Anthropic subscription           | All       |
| Domain                      | compass.co.za                                                             | ~R100–200/year                   | Phase 0   |
| Hosting                     | Netlify free tier (100GB bandwidth, 300 build minutes)                    | Free                             | All       |
| Analytics                   | Google Analytics 4 free tier                                              | Free                             | Phase 0+  |
| Email ESP                   | Buttondown free tier (< 100 subscribers) or Mailchimp free tier (< 500) | Free (upgrade if growth exceeds) | Phase 0+  |
| Total estimated annual cost | —                                                                         | R200–R1,500/year                 | —         |

# 15. Risks, Assumptions and Dependencies

## 15.1 Technical Risks

|             |                                                                    |                 |            |                                                                                                                                         |                |
|-------------|--------------------------------------------------------------------|-----------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------|----------------|
| **Risk ID** | **Risk**                                                           | **Probability** | **Impact** | **Mitigation**                                                                                                                          | **Owner**      |
| TR-001      | Netlify Forms free tier (100/month) exceeded                       | Medium          | Medium     | Monitor submission rate; upgrade to Pro or switch to direct ESP form at 80% threshold                                                   | Tshepo Machele |
| TR-002      | GA4 analytics underreporting due to ad blockers or consent refusal | High            | Low        | GA4 consent mode v2 provides basic measurement even without consent; consider server-side Google Tag Manager for improved collection    | Tshepo Machele |
| TR-003      | WhatsApp OG image cache prevents preview updates                   | Medium          | Low        | Version query parameter on OG image URLs; document cache refresh timing                                                                 | Tshepo Machele |
| TR-004      | Build time increases significantly with full 15-article series     | Low             | Low        | Monitor build time; Astro’s incremental builds + Pagefind are efficient for this scale                                                  | Tshepo Machele |
| TR-005      | Buttondown/Mailchimp free tier limits reached                      | Medium          | Medium     | Monitor subscriber count; budget for paid tier upgrade (~\$29/month for Mailchimp Essentials)                                           | Tshepo Machele |
| TR-006      | Single point of failure: Tshepo Machele is sole operator           | High            | High       | Document all processes; infrastructure-as-code (netlify.toml); all content in Git; emergency: friend/colleague can push content updates | Tshepo Machele |

## 15.2 Technical Assumptions

|        |                                                                                                 |                                         |                                                                      |
|--------|-------------------------------------------------------------------------------------------------|-----------------------------------------|----------------------------------------------------------------------|
| **ID** | **Assumption**                                                                                  | **Validated?**                          | **Impact if Invalid**                                                |
| TA-001 | Netlify’s CDN provides adequate performance for SA readers (edge nodes in or near South Africa) | No — validate in Phase 0                | Latency may exceed targets; consider Cloudflare Pages as alternative |
| TA-002 | Astro Content Collections can handle 15+ articles without performance degradation               | Partially (Astro is designed for this)  | Negligible risk; Astro handles hundreds of pages efficiently         |
| TA-003 | Pagefind static search is adequate for 15 articles (no need for Algolia)                        | No — validate in Phase 0                | If search quality is poor, evaluate Algolia free tier                |
| TA-004 | Netlify Forms → ESP webhook is reliable enough for production use                               | No — validate in Phase 0                | If unreliable, switch to direct ESP JavaScript embed (adds ~10KB JS) |
| TA-005 | The target audience’s devices (Samsung A15-tier) can render Astro output without issues         | Partially (Astro outputs standard HTML) | Test on real device or BrowserStack during Phase 0                   |

## 15.3 Technical Dependencies

|        |                            |          |                    |                                 |                                                                                  |
|--------|----------------------------|----------|--------------------|---------------------------------|----------------------------------------------------------------------------------|
| **ID** | **Dependency**             | **Type** | **Owner/Provider** | **Risk if Unavailable**         | **Contingency**                                                                  |
| TD-001 | Netlify hosting service    | External | Netlify Inc.       | Site goes offline               | Migrate to Cloudflare Pages or Vercel (Astro supports both; config change only)  |
| TD-002 | GitHub repository access   | External | GitHub / Microsoft | Cannot deploy updates           | Mirror repo to GitLab; Netlify supports GitLab deployment                        |
| TD-003 | Google Analytics 4 service | External | Google LLC         | No analytics data               | Switch to Plausible or Umami (privacy-focused alternatives); or self-host Matomo |
| TD-004 | Buttondown / Mailchimp ESP | External | ESP provider       | Cannot send email notifications | Switch ESP (simple webhook reconfiguration); subscriber data exportable          |
| TD-005 | Node.js 20 LTS             | Runtime  | OpenJS Foundation  | Build environment unavailable   | Netlify supports multiple Node versions; update netlify.toml                     |
| TD-006 | compass.co.za domain       | External | Domain registrar   | Site unreachable by name        | Register backup domain (e.g., compasssa.org); update DNS                         |

# Appendix A: Stakeholder Sign-Off

|                   |                |              |          |
|-------------------|----------------|--------------|----------|
| **Role**          | **Name**       | **Sign-Off** | **Date** |
| Technical Lead    | Tshepo Machele | ☐ Approved   |          |
| Product Lead      | Tshepo Machele | ☐ Approved   |          |
| Design Lead       | Tshepo Machele | ☐ Approved   |          |
| Business/GTM Lead | Tshepo Machele | ☐ Approved   |          |

# Appendix B: Document History

|             |            |                |                                                            |
|-------------|------------|----------------|------------------------------------------------------------|
| **Version** | **Date**   | **Author**     | **Changes**                                                |
| 0.1         | 2026-02-15 | Tshepo Machele | Initial SRD — complete system requirements for Compass MVP |

# Appendix C: SRD Completion Checklist

**Before submitting for review, verify all items are complete:**

**Traceability:**

- All system requirements trace to PRD requirements
- PRD requirements trace to MRD outcomes
- Technical hypothesis validation requirements documented
- User journey to system component mapping documented

**Architecture and Design:**

- High-level architecture diagram included
- Key architecture decisions documented with rationale
- Technology stack justified
- Repository structure documented

**Technical Specifications:**

- User story maps with technical detail
- UML diagrams (Class, Sequence, State) included
- System flow diagrams for key processes
- Data architecture and entity specifications
- Integration specifications with error handling
- Content Collection schema fully specified

**Quality and Security:**

- Non-functional requirements with measurable targets and hard limits
- Security controls documented
- Compliance requirements (POPIA, WCAG 2.1 AA) addressed
- Performance budget aligned with PRD §11

**Validation and Delivery:**

- Technical feasibility validation approach documented
- Implementation roadmap aligns with PRD §15 milestones
- Technical risks identified with mitigations
- Dependencies documented with owners and contingencies
- All technical stakeholders have reviewed


---

*— END OF DOCUMENT —*
