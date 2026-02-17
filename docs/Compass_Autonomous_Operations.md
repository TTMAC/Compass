# Autonomous Operations Instruction Set

## Compass — compass.co.za
*MECE Framework for Agents, Skills & MCPs*

---

| Document Owner | Version | Status | Platform |
|----------------|---------|--------|----------|
| Tshepo Machele | 1.0 | Draft | compass.co.za |

| Created | Last Updated | Source Documents |
|---------|--------------|------------------|
| 2026-02-17 | 2026-02-17 | MRD v0.1, PRD v0.1, UXD v0.1, SRD v0.1 |

> **Operating Principle:** Every instruction in this document is designed for AI agents to execute autonomously with a human-in-the-loop for approval gates. The human (Tshepo Machele, solo founder) reviews, approves, or rejects at defined checkpoints — agents handle everything else.

---

## Table of Contents

1. [How to Read This Document](#1-how-to-read-this-document)
2. [Part 1: Agents](#2-part-1-agents)
3. [Part 2: Skills](#3-part-2-skills)
4. [Part 3: MCPs (Model Context Protocols)](#4-part-3-mcps-model-context-protocols)
5. [Orchestration & Governance](#5-orchestration--governance)

---

## 1. How to Read This Document

This document is structured using the **MECE principle** (Mutually Exclusive, Collectively Exhaustive):

- **Mutually Exclusive:** Each agent has a single, non-overlapping domain of responsibility. No two agents own the same task. Each skill belongs to exactly one functional category. Each MCP serves a distinct integration boundary.
- **Collectively Exhaustive:** Together, the agents, skills, and MCPs cover every operational function required to run Compass — from article research through drafting, editorial quality, publication, distribution, analytics, and site reliability.

**Human-in-the-Loop Model:** Agents operate on a "propose → approve → execute" cycle. The human approves at defined gates marked with 🚦 throughout this document. Between gates, agents act autonomously.

**Product Context:** Compass is a free, long-form political education blog that makes South Africa's governance system legible to ordinary citizens. It delivers a 15-article series across five parts — foundational framework, national government, provincial government, municipal government, and a citizen's toolkit — through a fast, mobile-first, reading-optimised static website. The target reader is a 25–45-year-old South African professional on a mid-range Android smartphone over 4G prepaid data.

---

## 2. Part 1: Agents

Agents are autonomous entities that own a bounded domain of work. Each agent maps to one or more bounded contexts from the product architecture and has clearly defined inputs, outputs, and approval gates.

### 2.1 Agent Registry

| ID | Agent Name | Bounded Context | Primary Responsibility | Upstream | Downstream |
|----|-----------|-----------------|----------------------|----------|------------|
| A1 | Content Strategist | Strategy / Research | Series planning, source research, expert sourcing, audience research | Human direction | A2, A5 |
| A2 | Content Author | Content Production | Article drafting, frontmatter generation, source verification | A1 | A3 |
| A3 | Editorial Quality Agent | Content Quality | Proofreading, schema validation, tone enforcement, fact-checking | A2 | A4 |
| A4 | Publishing & Deployment Agent | CMS / Infrastructure | Git commits, build triggers, deployment verification | A3 | A5, A6, A7 |
| A5 | Distribution & Growth Agent | Email / Social Sharing | Email notifications, WhatsApp optimisation, subscriber growth | A1, A4 | A6 |
| A6 | Analytics & Insights Agent | Analytics / Engagement | Metric tracking, reporting, content performance analysis | A4, A5 | A1 |
| A7 | Site Reliability Agent | Infrastructure | Performance monitoring, build health, uptime, SEO audits | A4 | A1, A4 |

---

### 2.2 Agent Specifications

#### A1 — Content Strategist Agent

**Domain:** Research planning and content strategy for the 15-article Compass series across five parts and four governance spheres.

**Inputs:**
- Analytics performance reports from A6
- The 15-article series plan (sa_political_system_article_series.md) and generation prompts
- MRD §1.3 value proposition and PRD §8.3 content quality checklist
- Reader feedback and engagement signals
- Government data source updates (AGSA reports, DPME publications, National Treasury documents, StatsSA releases)

**Outputs:**
- Article research briefs (target article from the 15-article series, primary sources to consult, expert contacts to pursue, key data points to verify)
- Updated publication schedule (rolling 4-article lookahead within the series sequence)
- Expert sourcing queue (M&E practitioners, governance scholars, public administration experts to contact for anecdotes)
- Source inventory per article (government reports, academic papers, court judgments, think tank publications)

**Autonomous Actions:**
- Research primary sources for the next article in the publication sequence (AGSA reports, National Treasury budget documents, DPME evaluations, StatsSA data)
- Identify and compile relevant academic literature from South African governance journals (Politikon, Journal of Southern African Studies, Transformation, Development Southern Africa)
- Locate and verify government data sources — confirm URLs are live, data is current, and reports are publicly accessible
- Draft research briefs with identified primary sources, data points, and suggested expert contacts
- Monitor for new government reports or publications that affect articles already published or in production (e.g., new AGSA municipal audit results, new Division of Revenue data)
- Analyse A6 performance data to refine publication pacing and identify which articles generate the most engagement for sequencing decisions
- Track competitor/adjacent content (Daily Maverick's governance coverage, ISS publications, PARI reports) for positioning gaps

**🚦 Human Approval Gates:**
- Approve/modify each article research brief before A2 begins drafting
- Approve publication schedule updates (re-ordering articles within a part is permitted; skipping articles is not)
- Approve expert contact list and outreach approach

**Constraints:**
- Every article must map to exactly one of five parts: Foundational Framework (Part 1), National Government (Part 2), Provincial Government (Part 3), Municipal Government (Part 4), or Citizen's Toolkit (Part 5)
- Every article must be tagged with exactly one sphere: national, provincial, municipal, or all
- Articles are published sequentially — Part 1 articles first, then Part 2, and so on (per PRD §15 launch plan)
- Each article targets a minimum of 5,000 words and approximately 25 minutes reading time
- Source material must be verified, traceable, and from high-credibility institutions (per reference generation prompt constraints)

---

#### A2 — Content Author Agent

**Domain:** Drafting articles that meet Compass editorial standards — O'Reilly conversational register, data-anchored, action-oriented.

**Inputs:**
- Approved research brief from A1
- Article generation prompt from sa_political_system_article_series.md
- Content quality checklist from PRD §8.3
- Markdown conventions from PRD §8.2
- Zod schema specifications for frontmatter (SRD §8.2.1)
- Voice and tone guidelines from UXD §2.3.2

**Outputs:**
- Complete Markdown files with valid YAML frontmatter
- Article body in O'Reilly conversational register with bottom-line-up-front structure
- Expert anecdotes integrated as callout blocks (2–3 per article, attributed to named practitioners)
- Practical Framework / Toolkit section concluding each article
- Sources and Further Reading section with hyperlinked primary sources

**Autonomous Actions:**
- Generate complete article drafts from approved research briefs and generation prompts
- Produce valid YAML frontmatter conforming to the Article content schema: title, subtitle, part (1–5), articleNumber (X.Y format), sphere (enum), description (150–160 chars), publishDate, readingTime, status, series.prev, series.next, seo.keywords
- Write in O'Reilly conversational register — use "you" throughout, lead with specifics, no bullet points in prose, bottom-line-up-front structure
- Integrate 2–3 expert anecdotes per article, attributed to named South African M&E experts, governance scholars, or public administration practitioners
- Conclude every article with a Practical Framework / Toolkit section using the `:::toolkit` callout syntax
- Write Sources and Further Reading sections with full hyperlinked references to primary sources (AGSA, National Treasury, DPME, StatsSA, court judgments, academic papers)
- Calculate and set estimated reading time (word count / 200 wpm)
- Generate SEO-optimised meta descriptions (150–160 chars) and titles (<60 chars)
- Research and verify all data claims against primary sources before inclusion
- Create internal cross-references to other Compass articles using relative links: `[Article 1.2](/articles/following-the-money)`

**🚦 Human Approval Gates:**
- Review and approve/edit each completed draft before handoff to A3
- Final sign-off on voice/tone, factual accuracy, and expert anecdote framing

**Constraints:**
- Minimum 5,000 words per article
- Use domain language per UXD §2.3.2: conversational, authoritative, direct — never academic or corporate
- No bullet points in article prose — write in flowing paragraphs (lists are permitted only in the Practical Toolkit section where they serve actionable clarity)
- No hype words: "revolutionary," "game-changing," "unprecedented" are banned
- Every article opens with a bottom-line-up-front (BLUF) conclusion
- Every article includes 2–3 named expert anecdotes from M&E practitioners (from DPME, SAMEA, PARI, HSRC, Twende Mbele, or universities like Wits, UCT, Stellenbosch)
- Every article concludes with a Practical Framework / Toolkit section
- All data claims must be sourced with hyperlinks to primary sources
- Non-partisan tone is mandatory — no party is praised or criticised; only institutional performance data is presented (UXD §2.3.1)
- No unexplained jargon — define terms inline on first use (e.g., "the equitable share — the unconditional grant each province receives from nationally collected revenue")
- H1 is rendered from frontmatter title — do not use `# Heading` in body. Use `## Heading` for H2 and `### Heading` for H3

---

#### A3 — Editorial Quality Agent

**Domain:** Quality assurance for all content before publication — schema compliance, editorial standards, factual accuracy, and tone enforcement.

**Inputs:**
- Draft Markdown files from A2
- Zod content schema (Article schema from SRD §8.2.1)
- Content quality checklist from PRD §8.3
- Voice and tone guidelines from UXD §2.3.2
- Brand attribute definitions from UXD §2.3.1 (Trustworthy, Accessible, Serious, Empowering, Non-partisan)

**Outputs:**
- Validated Markdown files (schema-compliant, editorially sound)
- Quality report (issues found, corrections made, pass/fail per criterion)
- Approval recommendation for human review

**Autonomous Actions:**
- Run Zod schema validation against frontmatter (all required fields: title, subtitle, part, articleNumber, sphere, description, publishDate, readingTime, status, series.prev, series.next, seo.keywords)
- Validate description length is 150–160 characters
- Validate title renders under 60 characters for SEO
- Verify readingTime matches word count / 200 wpm (±1 minute tolerance)
- Verify series.prev and series.next slugs are valid references to existing or planned articles
- Verify sphere enum value matches article content (e.g., an article about provincial health delivery should be tagged "provincial," not "all")
- Proofread for grammar, spelling, punctuation, and style consistency
- Enforce O'Reilly conversational register — flag any passages that drift into academic or corporate tone
- Verify bottom-line-up-front structure — the article must open with a conclusion, not a preamble
- Verify 2–3 expert anecdotes are present, each attributed to a named practitioner with institutional affiliation
- Verify no bullet points appear in article prose (permitted only in Practical Toolkit section)
- Verify Practical Framework / Toolkit section exists at article conclusion
- Verify Sources and Further Reading section exists with hyperlinked primary sources
- Test all hyperlinks — internal cross-references and external source links
- Flag any language that could be perceived as partisan (per UXD §2.3.1 Non-partisan attribute)
- Flag any hype words: "revolutionary," "game-changing," "unprecedented," "groundbreaking"
- Flag any unexplained jargon or acronyms used without inline definition
- Verify heading hierarchy: H2 for major sections, H3 for subsections, no H1 in body
- Generate a structured quality report with pass/fail per criterion

**🚦 Human Approval Gates:**
- Final editorial sign-off on quality report and corrected content
- Human resolves any subjective quality issues (tone, partisan perception, expert anecdote framing)

**Constraints:**
- Content must pass all Zod schema validations or it cannot proceed to A4
- Zero tolerance for partisan language — any flagged instance blocks publication until resolved
- Quality report must accompany every piece of content
- All hyperlinks must be verified functional — broken links block publication

---

#### A4 — Publishing & Deployment Agent

**Domain:** Moving approved content from draft to live production via the Git-based deployment pipeline.

**Inputs:**
- Approved, validated Markdown files from A3
- GitHub repository structure and conventions (PRD §5.2)
- Netlify build and deploy pipeline configuration (SRD §9)

**Outputs:**
- Git commits to the appropriate branch
- Successful Netlify build confirmation
- Deploy preview URL (for PRs) or production URL (for main)
- Post-deploy verification report (build time, Pagefind index status, OG image generation)

**Autonomous Actions:**
- Create feature branches for new content
- Commit Markdown files to the correct directory (`/src/content/articles/`)
- Open pull requests with descriptive titles and content summaries
- Verify `npm run build` succeeds locally before pushing
- Monitor Netlify build status and capture build logs
- Verify Pagefind index includes new content post-build
- Verify deploy preview renders correctly: article loads, frontmatter renders, sphere tag displays correct colour, reading progress bar functions, prev/next navigation links are correct, expert anecdote callouts render with green left border, Practical Toolkit section renders with dashed green border
- Verify OG image was generated for the article (1200×630px, article title, Compass branding)
- Merge to main after approval and verify production deploy
- Trigger rollback if production deploy fails health checks

**🚦 Human Approval Gates:**
- Approve pull request before merge to main
- Approve production deploy for content that touches templates, components, or configuration

**Constraints:**
- Never deploy without explicit human approval (per operating principle)
- Build must complete within 120 seconds
- Lighthouse Performance Score must exceed 90 for any template changes
- All Zod validations must pass (build fails on invalid frontmatter)
- Article file naming convention: `{part}-{article}-{kebab-case-slug}.md` (e.g., `1-1-architecture-of-the-state.md`)
- Only one content directory: `/src/content/articles/`

---

#### A5 — Distribution & Growth Agent

**Domain:** Email notifications, WhatsApp share optimisation, and subscriber acquisition.

**Inputs:**
- Published article URLs and metadata from A4
- Subscriber analytics from Buttondown (or Mailchimp)
- Publication schedule from A1
- Engagement data from A6

**Outputs:**
- New article notification email draft (per PRD §13.3 — subject line, title, subtitle, one-sentence hook, direct link)
- WhatsApp share message verification (pre-filled message format per PRD §14.1)
- Subscriber growth reports
- Confirmation email and welcome sequence drafts

**Autonomous Actions:**
- Draft new article notification emails following PRD §13.3 format: Subject: "[Article Title] — New on Compass"; Body: article title, subtitle, one-sentence hook, direct link with UTM parameters (`utm_source=email&utm_medium=notification&utm_campaign=article-[slug]`). Plain text or minimal HTML for mobile deliverability
- Verify WhatsApp share button constructs correct pre-filled message per PRD §14.1 format: 📍 [Article Title] + one-sentence hook + UTM-tagged URL (`utm_source=whatsapp&utm_medium=share&utm_campaign=article-[slug]`) + "— From Compass: Making SA's governance system legible"
- Verify OG preview renders correctly in WhatsApp (title, description, image) — cache-bust if stale
- Draft confirmation email: Subject: "Confirm your Compass subscription"; Body: welcome message + confirmation link + "We'll only email you when a new Compass article is published — roughly once every 2–3 weeks"
- Track and report subscriber growth metrics (new subscribers, churn, source attribution)
- Monitor email deliverability (open rates, click rates, bounce rates)
- Verify Copy Link button copies URL with correct UTM parameters (`utm_source=clipboard&utm_medium=share`)

**🚦 Human Approval Gates:**
- Approve new article notification email content before send
- Approve any changes to confirmation email or welcome sequence copy

**Constraints:**
- Email notifications are sent only when a new article is published — no weekly cadence, no marketing emails
- Email format must be plain text or minimal HTML for fast loading on mobile email clients (per PRD §13.3)
- No images or complex HTML in emails
- Subscriber data must be handled in compliance with POPIA (per SRD §8.4)
- WhatsApp is the primary distribution channel — always verify OG previews before publication
- All shared links must include UTM parameters for attribution tracking in GA4

---

#### A6 — Analytics & Insights Agent

**Domain:** Tracking, analysing, and reporting on platform performance and content engagement against MRD success criteria.

**Inputs:**
- GA4 analytics data (page views, referrers, engagement time, custom events, UTM breakdowns)
- Buttondown metrics (open rate, click rate, subscriber count)
- MRD §1.4 success criteria targets
- Content metadata (part, sphere, publication date, article number)

**Outputs:**
- Monthly performance dashboard (key metrics vs. MRD targets)
- Article performance rankings (by views, time on page, completion rate, WhatsApp shares)
- Distribution channel analysis (WhatsApp vs. email vs. organic search vs. direct)
- Monthly trend reports with recommendations for A1
- Anomaly alerts (traffic spikes, engagement drops, broken pages)

**Autonomous Actions:**
- Pull and aggregate analytics data from GA4 (via Google Analytics Data API or BigQuery export)
- Track progress against MRD §1.4 success criteria:
  - 10,000 unique monthly readers (within 12 months)
  - Average time-on-page ≥ 8 minutes for long-form articles
  - WhatsApp sharing activity (tracked via UTM: `utm_source=whatsapp`)
  - 2,000 email subscribers (within 12 months)
- Calculate article completion rates from scroll depth events (25%, 50%, 75%, 100%)
- Rank articles by engagement: views, time on page, completion rate (scroll_depth=100%), WhatsApp shares, email click-throughs
- Analyse distribution channel effectiveness: what percentage of traffic comes from WhatsApp, email notifications, organic search, and direct access
- Track sequential reading patterns — are readers following the Part 1 → Part 5 reading order or accessing articles out of sequence?
- Detect anomalies (unexpected traffic drops, broken referral sources, 404 spikes)
- Monitor outbound clicks to government data sources (AGSA, National Treasury, DPME, StatsSA) — these validate MRD Outcome #2 (readers using Compass to find performance data)
- Produce monthly insight summaries with actionable recommendations for A1

**🚦 Human Approval Gates:**
- Review and acknowledge monthly dashboard (no gate — informational)
- Approve strategic recommendations that change publication pacing or article sequencing

**Constraints:**
- Analytics must be privacy-focused — GA4 uses consent mode v2 with `analytics_storage` defaulting to "denied" until explicit reader consent; anonymised IP; 2-month data retention (per PRD §9.1)
- Reports must separate vanity metrics from actionable insights
- Article completion rate (scroll_depth=100%) and WhatsApp share attribution are the primary engagement indicators — always report them prominently
- Never track or store personally identifiable information beyond email addresses captured via Netlify Forms

---

#### A7 — Site Reliability Agent

**Domain:** Infrastructure health, performance monitoring, and technical SEO compliance — with particular attention to mobile performance on mid-range Android devices over 4G prepaid data.

**Inputs:**
- Netlify deploy logs and build metrics
- Lighthouse audit results
- Pagefind index status
- SEO crawl data (sitemap, robots.txt, meta tags, structured data)
- Performance budgets from SRD §12 and PRD §11

**Outputs:**
- Build health reports (time, success/failure, warnings)
- Lighthouse audit reports (Performance, Accessibility, SEO scores)
- Page weight reports (against 200KB target / 400KB maximum per PRD §1.3)
- SEO compliance reports (meta tags, Open Graph, JSON-LD structured data, sitemap coverage)
- Uptime and availability reports

**Autonomous Actions:**
- Run Lighthouse audits on all page templates after every deploy
- Verify Core Web Vitals: TTFB <200ms, LCP <2.5s, CLS <0.1, FID <100ms
- Monitor total page weight against budget: target 200KB, maximum 400KB compressed (per PRD §1.3 — "every kilobyte must justify its existence")
- Monitor Netlify build times and flag if approaching 120s threshold
- Validate sitemap.xml includes all published article URLs
- Verify robots.txt allows all crawlers
- Check Open Graph tags render correctly for WhatsApp preview — this is the single most important distribution asset (per PRD §14.3)
- Validate JSON-LD Article structured data on every article page (author, datePublished, dateModified, headline, description)
- Monitor 99.9% uptime SLA via Netlify CDN status
- Run accessibility audits (WCAG 2.1 AA, Lighthouse Accessibility >95) — verify 4.5:1 colour contrast, keyboard navigation, screen reader compatibility, no text smaller than 16px on mobile (per PRD §12.2)
- Verify `prefers-reduced-motion` is respected by the reading progress bar
- Verify Pagefind search returns results within 100ms for current content volume
- Verify `<html lang="en-ZA">` attribute is set on all pages
- Alert on any performance budget violations

**🚦 Human Approval Gates:**
- Approve remediation plan for any critical performance or SEO regression
- Approve infrastructure changes (Netlify config, DNS, CDN rules)

**Constraints:**
- All performance budgets from SRD and PRD are non-negotiable thresholds
- Never modify infrastructure configuration without human approval
- Lighthouse scores: Performance >90, Accessibility >95, SEO >95
- Page weight thresholds are driven by the target reader's data costs — approximately R2/MB on prepaid (per UXD §4.1)

---

## 3. Part 2: Skills

Skills are the specific capabilities agents need to execute their responsibilities. Each skill belongs to exactly one functional category. An agent may draw from multiple skill categories.

### 3.1 Skills Matrix (Agent × Skill Mapping)

| Skill Category | A1 Strategy | A2 Author | A3 Quality | A4 Publish | A5 Distribute | A6 Analytics | A7 Reliability |
|----------------|:-----------:|:---------:|:----------:|:----------:|:-------------:|:------------:|:--------------:|
| 1. Research & Source Verification | ● | ● | ● | | | | |
| 2. Political Education Writing | | ● | ● | | | | |
| 3. Schema & Validation | | ● | ● | ● | | | |
| 4. Git & Version Control | | | | ● | | | |
| 5. Build & Deploy | | | | ● | | | ● |
| 6. Email & Subscriber Management | | | | | ● | | |
| 7. WhatsApp & Social Distribution | ● | | | | ● | | |
| 8. Data Analysis & Reporting | ● | | | | | ● | |
| 9. SEO & Discoverability | | ● | ● | | | | ● |
| 10. Performance & Monitoring | | | | | | | ● |
| 11. Accessibility & Compliance | | | ● | | | | ● |
| 12. Government Data & Expert Sourcing | ● | ● | | | | ● | |

---

### 3.2 Skill Specifications

#### 1. Research & Source Verification Skills

These skills ensure every article is anchored in verified, traceable, high-credibility source material.

| Skill | Description | Proficiency Required | Used By |
|-------|-------------|---------------------|---------|
| Government Report Research | Locate, retrieve, and extract relevant data from AGSA audit reports, National Treasury budget documents, DPME evaluation reports, StatsSA publications, and FFC annual submissions | Advanced | A1, A2 |
| Academic Literature Research | Identify and evaluate relevant academic literature from South African governance journals (Politikon, Journal of Southern African Studies, Transformation, Development Southern Africa, Administratio Publica) | Intermediate | A1, A2 |
| Constitutional & Legislative Research | Navigate the Constitution of the Republic of South Africa (1996), relevant Acts (PFMA, MFMA, DORA, Municipal Systems Act, Municipal Structures Act, IGRFA), and White Papers to verify legal and structural claims | Advanced | A1, A2, A3 |
| Court Judgment Research | Locate and accurately cite Constitutional Court and High Court judgments relevant to governance accountability (e.g., EFF v Speaker, Mazibuko v City of Johannesburg) | Intermediate | A1, A2 |
| Think Tank Report Research | Source and evaluate reports from PARI, HSRC, ISS, SAIIA, CDE, Corruption Watch, Dullah Omar Institute, and other credible South African research institutions | Intermediate | A1, A2 |
| Source Verification & Link Testing | Verify all hyperlinks to primary sources are live, accessible, and point to the correct document. Archive critical sources locally where permitted | Advanced | A2, A3 |
| Expert Identification | Identify and evaluate potential expert contacts from DPME, SAMEA, Twende Mbele, CLEAR-AA, PARI, HSRC, and South African universities for anecdote sourcing | Intermediate | A1 |

---

#### 2. Political Education Writing Skills

These skills ensure content meets Compass's distinctive editorial standards — O'Reilly conversational register applied to South African governance education.

| Skill | Description | Proficiency Required | Used By |
|-------|-------------|---------------------|---------|
| O'Reilly Conversational Register | Write in conversational, authoritative, direct style — use "you" throughout, lead with concrete examples, treat the reader as intelligent but uninformed about governance structures. Per UXD §2.3.2 | Advanced | A2, A3 |
| Bottom-Line-Up-Front (BLUF) Structure | Open every article with the core conclusion — not background, not preamble. The reader knows the key insight within the first two paragraphs | Advanced | A2, A3 |
| Prose-Only Formatting | Write article body in flowing paragraphs with no bullet points, no numbered lists. Complex information is expressed through structured prose, not lists. Lists permitted only in Practical Toolkit concluding section | Advanced | A2, A3 |
| Expert Anecdote Integration | Source and integrate 2–3 short anecdotes per article from named South African M&E practitioners, governance scholars, or public administration experts. Style as narrative containers, not blockquotes | Advanced | A2 |
| Practical Toolkit Authoring | Conclude every article with an actionable section giving citizens concrete steps, data sources, and tools they can use immediately. Use `:::toolkit` callout syntax | Advanced | A2 |
| Jargon Translation | Identify governance-specific jargon (equitable share, concurrent powers, Section 139, MFMA, DORA, etc.) and define it inline on first use in plain language | Intermediate | A2, A3 |
| Non-Partisan Tone Enforcement | Maintain rigorous political neutrality — no party is praised or criticised, no editorial position on partisan questions, data speaks and the reader decides. Per UXD §2.3.1 | Advanced | A2, A3 |
| Sphere-Specific Framing | Accurately frame governance concepts within the correct sphere (national, provincial, municipal) and explain inter-sphere dynamics without oversimplifying | Advanced | A2, A3 |

---

#### 3. Schema & Validation Skills

These skills ensure all content conforms to the Compass type-safe content pipeline.

| Skill | Description | Proficiency Required | Used By |
|-------|-------------|---------------------|---------|
| Zod Schema Validation | Run Zod schema checks against frontmatter and understand error messages to diagnose and fix validation failures | Advanced | A3, A4 |
| Article Schema Compliance | Validate all Article fields per SRD §8.2.1: title (string, non-empty), subtitle (string, non-empty), part (number, 1–5), articleNumber (string, X.Y format), sphere (enum: national, provincial, municipal, all), description (string, 150–160 chars), publishDate (ISO date), updatedDate (optional, ≥ publishDate), readingTime (positive integer, minutes), status (enum: published, draft, coming-soon), series.prev (slug or null), series.next (slug or null), seo.ogImage (optional path), seo.canonicalUrl (optional URL), seo.keywords (non-empty string array) | Advanced | A2, A3 |
| Frontmatter Debugging | Diagnose and resolve build failures caused by invalid frontmatter — type mismatches, missing required fields, invalid enum values, description length violations | Intermediate | A3, A4 |
| Content State Management | Manage content status transitions: draft → coming-soon → published. Only human can approve transition to published | Intermediate | A3, A4 |
| Series Navigation Validation | Verify series.prev and series.next values form a valid doubly-linked list across all 15 articles, with Article 1.1 having prev=null and Article 5.1 having next=null | Advanced | A3 |

---

#### 4. Git & Version Control Skills

These skills govern how content moves through the Git-based publishing pipeline.

| Skill | Description | Proficiency Required | Used By |
|-------|-------------|---------------------|---------|
| Branch Management | Create feature branches for new content, named conventionally (e.g., `content/1-1-architecture-of-the-state`), and manage PR lifecycle | Advanced | A4 |
| Git Commit Hygiene | Write descriptive commit messages following conventional commit format; commit Markdown files to correct directory path (`/src/content/articles/`) | Intermediate | A4 |
| Pull Request Management | Open PRs with article summaries (title, part, sphere, word count, reading time), request human review, manage approval workflow, and merge after approval | Intermediate | A4 |
| Merge Conflict Resolution | Detect and resolve content merge conflicts (concurrent edits to same files or shared configuration) | Basic | A4 |
| Git-Based Content Auditing | Use Git history to track article publication dates, update frequency, and editorial changes | Basic | A4 |

---

#### 5. Build & Deploy Skills

These skills manage the Astro SSG build pipeline and Netlify deployment.

| Skill | Description | Proficiency Required | Used By |
|-------|-------------|---------------------|---------|
| Astro Build Execution | Run `npm run build` locally, interpret build output, and diagnose build failures (Zod validation errors, missing assets, template issues) | Advanced | A4, A7 |
| Netlify Deploy Management | Monitor Netlify auto-deploy on Git push, verify atomic deployments, and trigger rollbacks when needed | Advanced | A4, A7 |
| Deploy Preview Verification | Inspect deploy preview URLs for: article renders, frontmatter displays correctly, sphere tag shows correct colour (national=blue, provincial=purple, municipal=red, all=green), reading progress bar functions, prev/next navigation correct, expert anecdote callouts render, Practical Toolkit section renders, OG image present | Intermediate | A4 |
| Pagefind Index Verification | Confirm Pagefind post-build indexing completes successfully and new article appears in search results | Intermediate | A4, A7 |
| Build Performance Monitoring | Track build duration against 120s budget, identify slow steps, and flag regressions | Basic | A7 |
| OG Image Generation Verification | Verify the Python OG image generation script (`scripts/generate-og-images.py`) produces correct 1200×630px images with article title and Compass branding for each new article | Intermediate | A4 |

---

#### 6. Email & Subscriber Management Skills

These skills manage the email notification system for new article alerts.

| Skill | Description | Proficiency Required | Used By |
|-------|-------------|---------------------|---------|
| ESP API Integration | Use the Buttondown (or Mailchimp) REST API to manage subscribers, send notification emails, and retrieve engagement metrics | Advanced | A5 |
| Notification Email Drafting | Write new article notification emails per PRD §13.3: subject line format "[Article Title] — New on Compass"; body contains article title, subtitle, one-sentence hook, and direct UTM-tagged link; plain text or minimal HTML only | Advanced | A5 |
| Confirmation Email Management | Maintain the subscription confirmation email: Subject: "Confirm your Compass subscription"; clear expectation-setting ("roughly once every 2–3 weeks") | Intermediate | A5 |
| Email Deliverability Management | Monitor open rates, click rates, bounce rates; maintain list hygiene; ensure emails render on mobile email clients | Basic | A5 |
| Netlify Forms Integration | Verify the email capture form → Netlify Forms → webhook → ESP pipeline functions correctly for new subscriber onboarding | Intermediate | A5 |

---

#### 7. WhatsApp & Social Distribution Skills

These skills optimise content for WhatsApp sharing — the primary distribution channel — and secondary social platforms.

| Skill | Description | Proficiency Required | Used By |
|-------|-------------|---------------------|---------|
| WhatsApp Share Optimisation | Verify the WhatsApp share button constructs correct pre-filled messages per PRD §14.1 format, with UTM parameters and Compass branding | Advanced | A5 |
| OG Preview Verification | Verify Open Graph tags render compelling previews in WhatsApp, LinkedIn, and Twitter — title, description, and 1200×630px image. Force cache refresh when needed | Advanced | A5 |
| UTM Parameter Management | Apply consistent UTM tracking parameters to all shared links: whatsapp/share, email/notification, clipboard/share — for attribution in GA4 | Intermediate | A5 |
| Copy Link Verification | Verify the Copy Link button copies article URL with correct UTM parameters and shows "Copied!" confirmation for 2 seconds | Basic | A5 |
| Social Monitoring | Track organic mentions of Compass content on social media, WhatsApp (via UTM data), and in relevant online communities | Intermediate | A1, A5 |

---

#### 8. Data Analysis & Reporting Skills

These skills power the analytics feedback loop that informs publication strategy.

| Skill | Description | Proficiency Required | Used By |
|-------|-------------|---------------------|---------|
| GA4 Analytics Querying | Pull data from GA4 (via Google Analytics Data API or BigQuery export): page views, unique users, engagement time, referral sources, UTM breakdowns, custom events (scroll_depth, email_subscribe, share_whatsapp, outbound_click) | Advanced | A6 |
| MRD Success Criteria Tracking | Track progress against the five success criteria from MRD §1.4: 10K unique monthly readers, 8+ min average time on page, WhatsApp sharing activity, 2K email subscribers, qualitative evidence of Compass-driven civic engagement | Advanced | A6 |
| Content Performance Ranking | Rank articles by engagement: page views, time on page, completion rate (scroll_depth=100%), WhatsApp shares (UTM attribution), email click-throughs | Intermediate | A6 |
| Channel Attribution Analysis | Break down traffic by acquisition channel: WhatsApp (utm_source=whatsapp), email (utm_source=email), organic search, direct, other referrers. Validate MRD H3 (30% traffic from WhatsApp) | Advanced | A6 |
| Sequential Reading Analysis | Analyse whether readers follow the intended Part 1 → Part 5 sequence or access articles out of order; track prev/next navigation click events | Intermediate | A6 |
| Government Data Source Click Tracking | Monitor outbound clicks to AGSA, National Treasury, DPME, StatsSA — validates MRD Outcome #2 (readers using Compass to locate performance data) | Intermediate | A6 |
| Anomaly Detection | Detect sudden drops or spikes in traffic, engagement, or subscriber metrics and generate alerts | Basic | A6 |
| Actionable Insight Synthesis | Translate raw data into strategic recommendations for A1 (e.g., "Part 3 articles have 40% lower completion rate — consider shorter sections and more expert anecdotes") | Advanced | A1, A6 |

---

#### 9. SEO & Discoverability Skills

These skills ensure content ranks for the keyword clusters defined in PRD §10.1.

| Skill | Description | Proficiency Required | Used By |
|-------|-------------|---------------------|---------|
| On-Page SEO Optimisation | Ensure proper heading hierarchy (H1 from frontmatter > H2 > H3), keyword placement in title, H2s, and opening paragraphs, internal cross-linking between Compass articles, and semantic HTML | Advanced | A2, A3 |
| Keyword Cluster Alignment | Verify each article naturally incorporates keywords from its mapped cluster (PRD §10.1): accountability/responsibility, fiscal system, oversight, government performance | Advanced | A2, A3 |
| Meta Tag Validation | Verify `<title>` (<60 chars + " | Compass"), meta description (150–160 chars), canonical URLs, and Open Graph / Twitter Card tags on every page | Advanced | A3, A7 |
| Structured Data (JSON-LD) | Validate JSON-LD Article schema markup: author, datePublished, dateModified, headline, description | Intermediate | A7 |
| Sitemap & Robots Management | Verify sitemap.xml includes all published article URLs; robots.txt allows all crawlers | Intermediate | A7 |
| Social Preview Testing | Verify Open Graph tags render correct previews on WhatsApp (critical), LinkedIn, and Twitter | Intermediate | A3, A7 |

---

#### 10. Performance & Monitoring Skills

These skills ensure the site meets its aggressive performance budgets — driven by the target reader's data costs.

| Skill | Description | Proficiency Required | Used By |
|-------|-------------|---------------------|---------|
| Lighthouse Auditing | Run Lighthouse CI on all page templates; enforce thresholds: Performance >90, Accessibility >95, SEO >95 | Advanced | A7 |
| Core Web Vitals Monitoring | Track TTFB (<200ms), LCP (<2.5s), CLS (<0.1), FID (<100ms) continuously | Advanced | A7 |
| Page Weight Analysis | Monitor total compressed page weight against target (200KB) and maximum (400KB). Font payload must stay under 80KB. Zero client-side JS by default (Astro static HTML) — only the reading progress bar, scroll-depth analytics, email form feedback, and cookie consent banner use JS | Intermediate | A7 |
| Uptime Monitoring | Track 99.9% uptime SLA via Netlify CDN status; alert on outages | Basic | A7 |
| Search Performance Testing | Verify Pagefind client-side search returns results within 100ms for current content volume (15 articles at full series completion) | Intermediate | A7 |
| Build Pipeline Health | Monitor CI/CD pipeline health: build success rate, average build time, deploy frequency | Intermediate | A7 |

---

#### 11. Accessibility & Compliance Skills

These skills ensure the platform is usable by all readers on diverse devices and meets POPIA requirements.

| Skill | Description | Proficiency Required | Used By |
|-------|-------------|---------------------|---------|
| WCAG 2.1 AA Compliance | Verify 4.5:1 colour contrast ratios (AAA for body text), keyboard navigation, ARIA labels, semantic HTML, visible focus indicators, skip-to-content links | Advanced | A3, A7 |
| Mobile Reading Verification | Verify no text is smaller than 16px on mobile (17–18px body text per PRD §6.3), line length does not exceed ~75 characters, responsive layout works on 360px wide screens | Advanced | A3, A7 |
| Motion Sensitivity | Verify the reading progress bar respects `prefers-reduced-motion` media query (per PRD §12.2) | Basic | A7 |
| Language Attribute | Verify `<html lang="en-ZA">` attribute is set on all pages | Basic | A7 |
| Link Accessibility | Verify link text is descriptive (no "click here"), external links are marked with visual indicator or aria-label | Intermediate | A3 |
| POPIA Compliance | Verify minimal data collection (email only), privacy policy at /privacy, legitimate interest basis, easy unsubscribe mechanism, no PII stored in Compass system | Intermediate | A7 |

---

#### 12. Government Data & Expert Sourcing Skills

These skills keep articles anchored in current, verified governance data and practitioner insight.

| Skill | Description | Proficiency Required | Used By |
|-------|-------------|---------------------|---------|
| AGSA Report Navigation | Navigate and extract relevant findings from Auditor-General's annual PFMA and MFMA audit reports — understand audit outcomes (clean, unqualified with findings, qualified, adverse, disclaimer) and their practical meaning | Advanced | A1, A2 |
| National Treasury Document Analysis | Navigate Estimates of National Expenditure (ENE), Division of Revenue documents, budget reviews, and the equitable share formula components | Advanced | A1, A2 |
| DPME Publication Tracking | Monitor and extract insights from DPME publications: MTSF progress reports, national evaluation reports, MPAT results, Frontline Service Delivery Monitoring reports | Advanced | A1, A2 |
| StatsSA Data Extraction | Extract and verify demographic, service delivery, and socioeconomic data from Statistics South Africa community surveys, census data, and service delivery statistics | Intermediate | A1, A2 |
| Water Quality Report Analysis | Navigate Blue Drop (water quality), Green Drop (wastewater management), and No Drop (water loss) reports for municipal infrastructure assessment articles | Intermediate | A1, A2 |
| Expert Anecdote Sourcing | Identify, contact, and secure anecdotes from M&E practitioners at DPME, SAMEA, Twende Mbele, CLEAR-AA, PARI, HSRC, and South African universities. Anecdotes must be attributed to named individuals with institutional affiliation | Advanced | A1 |
| Government Data URL Monitoring | Maintain a quarterly link-check of all government data source URLs cited across published articles. Flag broken links for A4 to update | Intermediate | A6 |

---

## 4. Part 3: MCPs (Model Context Protocols)

MCPs are the integration interfaces that connect agents to external tools, APIs, and data sources. Each MCP serves a distinct system boundary and provides a standardised way for agents to interact with the outside world.

### 4.1 MCP Registry

| ID | MCP Name | External System | Primary Agent(s) | Direction | Auth Method |
|----|---------|-----------------|-------------------|-----------|-------------|
| M1 | GitHub MCP | GitHub API | A4 | Read/Write | Personal Access Token |
| M2 | Netlify MCP | Netlify API | A4, A7 | Read/Write | OAuth / API Token |
| M3 | Email ESP MCP | Buttondown API (or Mailchimp) | A5, A6 | Read/Write | API Key |
| M4 | GA4 MCP | Google Analytics Data API | A6, A7 | Read-Only | Service Account / OAuth |
| M5 | File System MCP | Local / Git Repo | A2, A3, A4 | Read/Write | Filesystem Access |
| M6 | Web Research MCP | Search Engines / Web | A1, A2, A6 | Read-Only | Web Search Tool |
| M7 | Lighthouse MCP | Lighthouse CI | A7 | Read-Only | CLI / Local Execution |

---

### 4.2 MCP Specifications

#### M1 — GitHub MCP

**Purpose:** Manage the Git-based content pipeline — branches, commits, pull requests, and repository state.

**External System:** GitHub REST & GraphQL APIs

**Capabilities:**

| Operation | Endpoint / Action | Agent | Human Gate? |
|-----------|------------------|-------|-------------|
| Create branch | `POST /repos/{owner}/{repo}/git/refs` | A4 | No |
| Commit files | `PUT /repos/{owner}/{repo}/contents/{path}` | A4 | No |
| Open pull request | `POST /repos/{owner}/{repo}/pulls` | A4 | No |
| List PR status | `GET /repos/{owner}/{repo}/pulls/{number}` | A4 | No |
| Merge pull request | `PUT /repos/{owner}/{repo}/pulls/{number}/merge` | A4 | 🚦 Yes |
| Get build status | `GET /repos/{owner}/{repo}/commits/{sha}/status` | A4, A7 | No |
| List recent commits | `GET /repos/{owner}/{repo}/commits` | A4, A7 | No |
| Read file contents | `GET /repos/{owner}/{repo}/contents/{path}` | A2, A3 | No |

**Configuration:**
- Repository: `tshepo-machele/compass-blog` (or equivalent)
- Default branch: `main`
- Branch naming: `content/{part}-{article}-{slug}` (e.g., `content/1-1-architecture-of-the-state`), `fix/{description}`
- Commit message format: `content: add article {articleNumber} "{title}"` (e.g., `content: add article 1.1 "The Architecture of the State"`)

**Error Handling:**
- Rate limit (5,000 req/hr): Implement exponential backoff; queue non-urgent operations
- Merge conflicts: Alert A4 to resolve; escalate to human if resolution is ambiguous
- Auth failure: Alert human immediately; do not retry with invalid credentials

---

#### M2 — Netlify MCP

**Purpose:** Manage builds, deploys, and site configuration on Netlify's hosting platform.

**External System:** Netlify REST API

**Capabilities:**

| Operation | Endpoint / Action | Agent | Human Gate? |
|-----------|------------------|-------|-------------|
| Get site info | `GET /sites/{site_id}` | A7 | No |
| List deploys | `GET /sites/{site_id}/deploys` | A4, A7 | No |
| Get deploy details | `GET /deploys/{deploy_id}` | A4, A7 | No |
| Trigger build | `POST /builds` (via webhook or API) | A4 | No |
| Lock/unlock deploys | `POST /deploys/{id}/lock` | A4 | 🚦 Yes |
| Rollback deploy | `POST /sites/{site_id}/rollback` | A4, A7 | 🚦 Yes |
| Get build log | `GET /deploys/{deploy_id}/log` | A7 | No |
| Check DNS | `GET /dns_zones/{zone_id}/dns_records` | A7 | No |
| List form submissions | `GET /sites/{site_id}/submissions` | A5 | No |

**Configuration:**
- Site: compass.co.za
- Build command: `npm run build` (Astro SSG + Pagefind indexing + OG image generation)
- Publish directory: `dist/`
- Auto-deploy: Enabled on `main` branch push
- Deploy previews: Enabled on pull requests
- Forms: Email capture form with honeypot spam detection enabled

**Health Checks (A7 runs after every deploy):**
1. Build completed successfully (exit code 0)
2. Build time < 120 seconds
3. Deploy status = "ready"
4. Homepage returns 200
5. Sample article returns 200 (verify latest published article)
6. Pagefind assets exist in deploy
7. OG images exist for all published articles
8. Total page weight for article page < 400KB

**Error Handling:**
- Build failure: Capture build log, identify failing step (Zod validation? template error? OG image generation?), alert human with diagnosis
- Deploy timeout: Retry once; if persistent, alert human
- Rollback trigger: Automatic if post-deploy health checks fail (with human notification)

---

#### M3 — Email ESP MCP

**Purpose:** Manage email subscribers, send article notification emails, and retrieve engagement metrics.

**External System:** Buttondown REST API (initial); Mailchimp as upgrade path per PRD §13.4

**Capabilities:**

| Operation | Endpoint / Action | Agent | Human Gate? |
|-----------|------------------|-------|-------------|
| List subscribers | `GET /subscribers` | A5, A6 | No |
| Get subscriber count | `GET /subscribers` (count) | A6 | No |
| Create draft email | `POST /emails` (draft status) | A5 | No |
| Send email | `PUT /emails/{id}` (publish) | A5 | 🚦 Yes |
| Get email metrics | `GET /emails/{id}` (open/click rates) | A6 | No |
| List all emails | `GET /emails` | A5, A6 | No |
| Get subscriber by email | `GET /subscribers/{email}` | A5 | No |

**Configuration:**
- Newsletter name: Compass — New Article Notifications
- Send frequency: On publication only (roughly every 2–3 weeks per PRD §13.3)
- Free tier limit: <100 subscribers on Buttondown (upgrade to Mailchimp at threshold per PRD §13.4)

**Data Flow:**
- New subscriber → Netlify Forms captures email → Webhook fires to ESP → ESP sends confirmation email → Reader confirms → Reader added to list
- Article published → A5 drafts notification email → Human approves → Send via API

**Email Format (per PRD §13.3):**
- Subject: "[Article Title] — New on Compass"
- Body: Article title, subtitle, one-sentence hook, direct link with UTM parameters
- Format: Plain text or minimal HTML — no images, no complex HTML
- Footer: Unsubscribe link

**Error Handling:**
- Rate limiting: Respect Buttondown rate limits; queue operations
- Bounce management: Auto-unsubscribe after 3 hard bounces
- Send failure: Retry once; alert human if persistent

---

#### M4 — GA4 MCP

**Purpose:** Retrieve analytics data for performance tracking and content insights, respecting reader consent preferences.

**External System:** Google Analytics Data API (GA4)

**Capabilities:**

| Operation | Endpoint / Action | Agent | Human Gate? |
|-----------|------------------|-------|-------------|
| Run report | `POST /v1beta/properties/{propertyId}:runReport` | A6 | No |
| Run realtime report | `POST /v1beta/properties/{propertyId}:runRealtimeReport` | A6 | No |
| Get metadata | `GET /v1beta/properties/{propertyId}/metadata` | A6 | No |
| Batch run reports | `POST /v1beta/properties/{propertyId}:batchRunReports` | A6 | No |
| Run funnel report | `POST /v1alpha/properties/{propertyId}:runFunnelReport` | A6 | No |

**Custom Events Tracked (per PRD §9.2):**

| Event | Description | Fires At |
|-------|-------------|----------|
| `scroll_depth` | Article reading progress | 25%, 50%, 75%, 100% scroll (params: `depth_percentage`, `article_slug`) |
| `share_whatsapp` | WhatsApp share button clicked | Button click (params: `article_slug`) |
| `share_copy_link` | Copy Link button clicked | Button click (params: `article_slug`) |
| `email_subscribe` | Email subscription form submitted | Form submission (params: `form_location`) |
| `outbound_click` | Click to external data source (AGSA, NT, DPME, StatsSA) | Link click (params: `destination`, `article_slug`) |
| `article_nav` | Prev/next article navigation clicked | Navigation click (params: `direction`, `from_slug`, `to_slug`) |

**Metric Definitions (mapped to MRD §1.4 success criteria):**

| KPI | GA4 Query | Target |
|-----|----------|--------|
| Unique Monthly Readers | Active users, 30-day window | 10,000 by M12 |
| Avg Time on Page | Average engagement time per session for article pages | ≥ 8 minutes |
| Article Completion Rate | scroll_depth = 100% / total article pageviews | > 60% |
| WhatsApp Attribution | Visits where utm_source = whatsapp | 30% of traffic |
| Email Subscribers | ESP subscriber count (via M3) | 2,000 by M12 |
| Data Source Outbound Clicks | outbound_click events to AGSA/NT/DPME/StatsSA | Tracked (no target) |
| Sequential Reading | article_nav events (prev/next clicks) | Tracked (no target) |

**Error Handling:**
- API unavailable: Cache last known data; report stale data age
- Rate limiting: Respect GA4 Data API quotas (default: 10,000 requests/day per property); batch requests where possible

---

#### M5 — File System MCP

**Purpose:** Read, write, and validate Markdown content files and configuration in the local repository.

**External System:** Local filesystem / Git working directory

**Capabilities:**

| Operation | Path Pattern | Agent | Human Gate? |
|-----------|-------------|-------|-------------|
| Read article | `/src/content/articles/{slug}.md` | A2, A3, A4 | No |
| Write article | `/src/content/articles/{slug}.md` | A2, A4 | No |
| Read config | `/src/content/config.ts` (Zod schemas) | A3 | No |
| Read Astro config | `/astro.config.mjs` | A4, A7 | No |
| List content | `/src/content/articles/` | A1, A3, A6 | No |
| Read build output | `/dist/**` | A7 | No |
| Read Pagefind index | `/dist/pagefind/` | A7 | No |
| Read OG images | `/public/og/` | A4, A5 | No |

**File Naming Conventions:**
- Articles: `{part}-{article}-{kebab-case-slug}.md` (e.g., `1-1-architecture-of-the-state.md`, `3-2-health-and-education-at-the-provincial-coal-face.md`)
- OG images: `/public/og/{slug}.png` (e.g., `/public/og/architecture-of-the-state.png`)

**Validation Rules (enforced by A3 before A4 commits):**
- File must parse as valid Markdown with YAML frontmatter
- Frontmatter must pass Zod schema validation (per SRD §8.2.1)
- File must be saved with UTF-8 encoding
- Slug must be unique across all articles
- Article must be ≥ 5,000 words

---

#### M6 — Web Research MCP

**Purpose:** Search the web for government data sources, academic literature, expert contacts, and factual verification.

**External System:** Web search engines, web pages

**Capabilities:**

| Operation | Use Case | Agent | Human Gate? |
|-----------|---------|-------|-------------|
| Government data research | Find latest AGSA reports, National Treasury documents, DPME evaluations, StatsSA publications | A1, A2 | No |
| Academic literature search | Find relevant papers from South African governance journals and research institutions | A1, A2 | No |
| Court judgment lookup | Find and verify Constitutional Court and High Court judgment citations | A1, A2 | No |
| Fact verification | Verify data claims, statistics, institutional details, and legislative references in article drafts | A2, A3 | No |
| Expert identification | Research potential expert contacts at DPME, SAMEA, PARI, HSRC, universities | A1 | No |
| Competitor/adjacent monitoring | Track governance content from Daily Maverick, ISS, PARI, CDE for positioning gaps | A1, A6 | No |

**Usage Guidelines:**
- Keep search queries short and specific (1–6 words)
- Favour original sources: government websites (agsa.co.za, treasury.gov.za, dpme.gov.za, statssa.gov.za), court judgment databases, and academic journal repositories over aggregators
- Verify information across multiple sources before including in content
- Always cite sources with hyperlinks in article content
- Archive critical government documents locally where URL stability is uncertain (per PRD §16 risk mitigation)

---

#### M7 — Lighthouse MCP

**Purpose:** Run automated performance, accessibility, and SEO audits against the deployed site.

**External System:** Lighthouse CI (local CLI execution)

**Capabilities:**

| Operation | Command / Action | Agent | Human Gate? |
|-----------|-----------------|-------|-------------|
| Performance audit | `lhci autorun` | A7 | No |
| Accessibility audit | `lhci autorun --collect.settings.onlyCategories=accessibility` | A7 | No |
| SEO audit | `lhci autorun --collect.settings.onlyCategories=seo` | A7 | No |
| Full audit | `lhci autorun` (all categories) | A7 | No |
| Compare to baseline | `lhci assert --preset=lighthouse:recommended` | A7 | No |

**Thresholds (from SRD and PRD §11):**

| Category | Minimum Score | Action on Failure |
|----------|--------------|-------------------|
| Performance | >90 | Block deploy; alert human |
| Accessibility | >95 | Block deploy; alert human |
| SEO | >95 | Block deploy; alert human |
| Best Practices | >90 | Warning; investigate |

**Additional Performance Checks (Compass-specific):**

| Check | Threshold | Rationale |
|-------|-----------|-----------|
| Total page weight | < 400KB (target 200KB) | Reader data costs ≈ R2/MB on prepaid |
| Font payload | < 80KB | Per UXD §4.1 design principle |
| Client-side JS | Minimal (progress bar + analytics + form + consent only) | Astro static-first architecture |
| OG image present | Exists for every published article | WhatsApp preview is primary distribution asset |

**Execution Schedule:**
- After every production deploy (automated)
- Weekly full audit of article page template (scheduled)
- On-demand when A4 makes template or configuration changes

---

### 4.3 MCP Dependency Map

```
                    ┌─────────────────────────────┐
                    │   M6: Web Research MCP       │
                    │   (Read-Only)                │
                    └──────────┬──────────────────-┘
                               │ Government data,
                               │ academic sources
                               ▼
┌─────────────┐    ┌─────────────────────┐    ┌──────────────────┐
│ M4: GA4      │◄───│ A1: Content         │───►│ A2: Content      │
│ (Read-Only)  │    │     Strategist      │    │     Author       │
└──────┬───────┘    └─────────────────────┘    └────────┬─────────┘
       │                                                │
       │ Analytics                                      │ Markdown files
       ▼                                                ▼
┌─────────────┐    ┌─────────────────────┐    ┌──────────────────┐
│ A6: Analytics│    │ M5: File System MCP  │◄───│ A3: Editorial    │
│    Agent     │    │ (Read/Write)         │    │     Quality      │
└──────────────┘    └──────────┬───────────┘    └────────┬─────────┘
                               │                         │
                               │ Validated files          │ Approved content
                               ▼                         ▼
                    ┌─────────────────────────────────────────┐
                    │         A4: Publishing &                 │
                    │         Deployment Agent                 │
                    └──────────┬──────────┬───────────────────┘
                               │          │
                    ┌──────────▼──┐  ┌────▼──────────┐
                    │ M1: GitHub   │  │ M2: Netlify   │
                    │ (Read/Write) │  │ (Read/Write)  │
                    └──────────────┘  └───────────────┘
                                          │
                              Published site
                              (compass.co.za)
                                          │
                    ┌─────────────────────┼──────────────────┐
                    │                     │                  │
              ┌─────▼──────┐    ┌────────▼────────┐  ┌──────▼──────┐
              │ M3: Email   │   │ M7: Lighthouse  │  │ A5: Distrib.│
              │ ESP         │   │ (Read-Only)     │  │ (WhatsApp + │
              │ (Read/Write)│   └─────────────────┘  │  Email)     │
              └──────┬──────┘           │             └─────────────┘
                     │           ┌──────▼──────┐
              ┌──────▼──────┐    │ A7: Site    │
              │ A5: Distrib.│    │   Reliability│
              │     Agent   │    └─────────────┘
              └─────────────┘
```

---

## 5. Orchestration & Governance

### 5.1 End-to-End Content Lifecycle

This is the complete flow from research to published, distributed article — showing which agent owns each step and where human approval is required.

| Step | Agent | Action | Output | Human Gate? |
|------|-------|--------|--------|-------------|
| 1 | A6 | Generate performance report (if prior articles exist) | Performance dashboard | No |
| 2 | A1 | Research next article in series → compile sources → draft research brief | Research brief | 🚦 Yes |
| 3 | A2 | Write article from approved brief + generation prompt | Draft Markdown file (≥5,000 words) | 🚦 Yes |
| 4 | A3 | Validate schema, proofread, check tone/BLUF/anecdotes/toolkit/sources | Quality report + corrected file | 🚦 Yes |
| 5 | A4 | Create branch, commit, open PR | Pull request | No |
| 6 | A4 | Verify build succeeds on deploy preview | Deploy preview URL | No |
| 7 | Human | Review PR + deploy preview (article renders, sphere tag, OG image, nav links) | Merge approval | 🚦 Yes |
| 8 | A4 | Merge to main → Netlify auto-deploys | Production URL | No |
| 9 | A7 | Run post-deploy health checks + Lighthouse audit + page weight check | Health report | No (alert on failure) |
| 10 | A5 | Draft article notification email + verify WhatsApp share message | Email draft + share verification | 🚦 Yes |
| 11 | A5 | Send notification email | Sent email to subscriber list | No |
| 12 | A6 | Track engagement: views, time on page, scroll depth, WhatsApp shares, data source clicks | Updated metrics | No |

### 5.2 Approval Gate Summary

| Gate | Who Approves | What They're Approving | SLA |
|------|-------------|----------------------|-----|
| Research brief | Tshepo | Sources, expert contacts, data points, research scope | 24 hours |
| Article draft | Tshepo | Content quality, factual accuracy, voice/tone, expert anecdotes, non-partisan framing | 72 hours |
| Quality report | Tshepo | Final editorial sign-off — schema valid, tone correct, sources verified, links tested | 24 hours |
| Pull request merge | Tshepo | Content renders correctly + build verification + OG image correct | 24 hours |
| Notification email | Tshepo | Email copy, subject line, link correctness | 12 hours |
| Infrastructure changes | Tshepo | Any config, DNS, template, or component modification | Immediate |
| Remediation plans | Tshepo | Response to performance/SEO/accessibility regression | 24 hours |

### 5.3 Escalation Protocol

| Severity | Condition | Action | Agent Responsible |
|----------|-----------|--------|-------------------|
| Critical | Production site is down or returning errors | Trigger Netlify rollback → alert human immediately | A7 |
| Critical | Page weight exceeds 400KB maximum | Block future deploys → alert human with weight breakdown | A7 |
| High | Build failure on main branch | Capture logs → diagnose (Zod error? template? OG script?) → propose fix → alert human | A4, A7 |
| High | Lighthouse score drops below threshold | Block future deploys → alert human with report | A7 |
| High | WhatsApp OG preview renders incorrectly after deploy | Alert A5 → diagnose OG tags → propose fix → alert human | A5, A7 |
| Medium | Content fails Zod validation | Return to A3 with error details → A3 corrects → re-validate | A3, A4 |
| Medium | Government data source URL is broken in published article | A6 detects via quarterly link check → A4 prepares fix PR → alert human | A6, A4 |
| Low | Build time exceeds 90s (warning zone, threshold 120s) | Log warning → investigate on next cycle | A7 |
| Low | Email open rate drops below 30% | A6 alerts A1 → A1 reviews notification email format and subject line pattern | A6, A1 |

### 5.4 Publication Operating Rhythm

Unlike a weekly editorial calendar, Compass publishes articles sequentially as each is completed — roughly one article every 2–3 weeks. The operating rhythm for each article cycle follows this pattern:

| Phase | Duration | Activity | Agent(s) | Human Involvement |
|-------|----------|----------|----------|-------------------|
| Research | Days 1–3 | Source compilation, expert outreach, data verification | A1 | Approve research brief |
| Drafting | Days 4–8 | Article writing from approved brief + generation prompt | A2 | None during drafting |
| Review | Days 9–10 | Quality validation, fact-checking, tone enforcement | A3 | Review draft + quality report |
| Edit | Days 11–12 | Revisions based on human and A3 feedback | A2, A3 | Approve final version |
| Publish | Day 13 | Git commit, build, deploy, health checks | A4, A7 | Approve PR merge |
| Distribute | Day 14 | Email notification, WhatsApp share verification | A5 | Approve notification email |
| Monitor | Days 14–28 | Track engagement, compile performance data | A6 | Review monthly dashboard |

**Series-Level Milestones (per MRD §1.5):**

| Milestone | Target Date | Articles |
|-----------|-------------|----------|
| Platform MVP live | End Q2 2026 | Site infrastructure ready, no articles |
| Part 1: Foundational Framework (4 articles) | End Q3 2026 | Articles 1.1, 1.2, 1.3, 1.4 |
| Part 2: National Government (3 articles) | End Q4 2026 | Articles 2.1, 2.2, 2.3 |
| Part 3: Provincial Government (3 articles) | Mid Q1 2027 | Articles 3.1, 3.2, 3.3 |
| Part 4: Municipal Government (4 articles) | End Q1 2027 | Articles 4.1, 4.2, 4.3, 4.4 |
| Part 5: Citizen's Toolkit (1 article) | Early Q2 2027 | Article 5.1 |
| Full series complete | End Q2 2027 | All 15 articles published |

---

*Last updated: 2026-02-17*
