# USER EXPERIENCE DESIGN DOCUMENT

## Compass — A Political Literacy Blog for South Africa's Missing Middle

### compass.co.za

---

| Field | Detail |
|-------|--------|
| **Document Owner** | Tshepo Machele — Product, Engineering, Design, Business/GTM Lead |
| **Document Version** | 0.1 |
| **Framework Type** | New Product (0 → 1) |
| **PRD Reference** | Compass PRD v0.1 |
| **MRD Reference** | Compass MRD v0.1 |
| **Last Updated** | 2026-02-15 |
| **Target Launch** | Q3 2026 |
| **Platform** | Web (Astro static site deployed on Netlify) |

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Strategy Plane](#2-strategy-plane)
3. [Scope Plane](#3-scope-plane)
4. [Structure Plane](#4-structure-plane)
5. [Skeleton Plane](#5-skeleton-plane)
6. [Surface Plane](#6-surface-plane)
7. [Implementation Roadmap](#7-implementation-roadmap)
8. [Appendices](#appendices)

---

## 1. Introduction

### 1.1 Purpose of This Document

This document defines the user experience for Compass, a free, long-form political education blog that makes South Africa's governance system legible to ordinary citizens. It serves as the single reference for all design decisions — from strategic positioning through to visual execution — ensuring every pixel traces back to a validated user need and business objective.

The document follows Jesse James Garrett's Elements of User Experience model, progressing from abstract strategy through concrete surface design across five interdependent planes.

### 1.2 Framework Structure

| Plane | Focus | Key Deliverables | MRD/PRD Alignment |
|-------|-------|------------------|-------------------|
| **Strategy** | Why we build | User needs, business objectives, brand definition | MRD §1–3, PRD §1–2 |
| **Scope** | What we build | Feature specifications, content requirements | MRD §8, PRD §3, §6 |
| **Structure** | How it works | Information architecture, interaction design | PRD §4, §6 |
| **Skeleton** | How it's arranged | Interface design, navigation design, component library | PRD §5–7 |
| **Surface** | How it looks and feels | Visual design, motion design, accessibility | PRD §7, §11–12 |

### 1.3 When to Use This Document

This is a 0→1 UX document. Use it when:

- Making design decisions during the initial build (Q2–Q3 2026)
- Onboarding future collaborators to the product's design rationale
- Evaluating whether a proposed feature or change aligns with user needs
- Preparing for design reviews and launch readiness assessments
- Resolving disagreements about interaction patterns or visual treatment

### 1.4 Document Dependencies

| Document | Purpose | Required Sections |
|----------|---------|-------------------|
| Compass MRD v0.1 | Market opportunity, user research, competitive positioning | §1 Problem hypothesis, §3 Job executor profile, §4 Job map, §5 Forces of progress, §7 Competitive analysis |
| Compass PRD v0.1 | Detailed product specifications | §3 User stories, §4 Information architecture, §5 Technical architecture, §6 Page specs, §7 Design system |
| SA Political System Article Series | Content architecture for all 15 articles | Full series structure and generation prompts |

---

## 2. Strategy Plane

*The foundation upon which all design decisions are built. Strategy defines why Compass exists and who it serves.*

### 2.1 User Needs Discovery

#### 2.1.1 Primary Persona Definition

| Attribute | Description | Design Implications |
|-----------|-------------|---------------------|
| **Persona Name** | Thabo — "The Frustrated Taxpayer" | Humanises design discussions; anchors all UX decisions to a real person's daily frustrations |
| **Demographics** | Black South African, 25–45, living in a Gauteng metro (Johannesburg, Tshwane, or Ekurhuleni). Household income R8,000–R29,000/month (deciles 5–8). Formally employed — technician, nurse, teacher, mid-level public servant, retail manager, or small business owner | Content must respect intelligence while assuming zero prior knowledge of governance structures. No jargon without explanation. Onboarding is the product itself |
| **Core Job-to-be-Done** | Evaluate government performance and identify accountable officials when experiencing service delivery failures or making electoral decisions, in order to direct complaints, votes, and civic energy toward the correct sphere, department, or individual | Drives the entire content architecture — every article must help the reader assign accountability accurately |
| **Struggling Moment** | Experiences a service delivery failure (water outage, pothole, clinic without medication) and cannot determine whether to blame their ward councillor, provincial MEC, or a national minister. Feels angry but powerless because frustration is misdirected | The "struggling moment" is the entry point for the product. Article 1.1 must answer this question within the first few scrolls. Search landing pages must match this intent |
| **Current Workaround** | Consumes event-driven news (Daily Maverick, News24) that covers scandals but never explains the system. Participates in WhatsApp political discussions that are emotionally charged but informationally empty. Defaults to cynicism: "They're all the same" | Compass must feel categorically different from news media — structural, not event-driven; educational, not sensational; empowering, not exhausting |
| **Success Definition** | "I can now tell you exactly who is responsible for my water, my roads, and my clinic — and I know where to look up whether they're actually doing their job. I shared the article in my WhatsApp group and people actually said it was useful." | Success metrics: 8+ minutes time on page, WhatsApp share clicks, return visits, email subscriptions. The emotional payoff is agency and social credibility |

*Source: MRD §1.2, §3.1. Persona grounded in Stats SA Income & Expenditure Survey, UCT Liberty Institute data, Afrobarometer Rounds 8–9.*

#### 2.1.2 Secondary Personas

**Lerato — "The Pre-Election Researcher"**

- Key differentiator: Triggered by upcoming elections (2026 local, 2029 national) rather than a specific service failure. Wants an evaluative framework, not just information
- Unique needs: Needs to compare incumbent performance across municipalities; wants data sources she can verify independently
- Feature implications: Series overview page with sphere filtering; Data Sources page as standalone reference; practical toolkit sections in each article
- Priority: MVP (the foundational articles serve this persona directly)

**Sipho — "The WhatsApp Debater"**

- Key differentiator: Enters Compass via a forwarded WhatsApp link, not through search. Has approximately 30 seconds of attention before deciding whether to read or close
- Unique needs: Instant page load; immediately compelling title and subtitle; scannable structure so he can find the "answer" to the debate; easy re-sharing to his own groups
- Feature implications: OG image optimisation for WhatsApp previews; sub-3-second load times on 4G; reading progress indicator to reduce perceived effort; one-tap WhatsApp share button
- Priority: MVP (WhatsApp is the primary distribution channel per MRD §5.2, H3)

**Nomsa — "The Civic Activist"**

- Key differentiator: Already politically engaged through community organisations. Needs the data source references and complaint mechanisms rather than the explanatory content
- Unique needs: Quick navigation to "practical framework" sections; Data Sources page; links to AGSA, National Treasury, DPME portals
- Feature implications: Article footer toolkit sections with visual distinction; anchor links in table of contents; Data Sources page as a standalone reference hub
- Priority: Post-MVP (the Citizen's Toolkit article in Part 5 serves this persona most directly)

#### 2.1.3 Jobs-to-be-Done Analysis

**Forces of Progress Model** *(Source: MRD §5.1)*

| Force | Description | Research Evidence | Design Response |
|-------|-------------|-------------------|-----------------|
| **Push (Pain)** | Cannot identify which sphere of government is responsible for a service failure — frustration is real but misdirected | Afrobarometer: 85% say country going in wrong direction; PARI research on accountability confusion across three spheres | Article 1.1 directly addresses sphere responsibility. Search-optimised for queries like "who is responsible for water in South Africa." Article structure leads with concrete examples before explaining the system |
| **Pull (Attraction)** | A clear, structured "mental model" for navigating the governance system — not just "what happened" but "how it works" | Competitive gap analysis: no existing SA publication provides systematic, plain-language governance education | O'Reilly-style conversational register; 15-article MECE series structure; every article ends with actionable tools. Design signals depth and seriousness without academic intimidation |
| **Anxiety (Barrier)** | "Is this pushing a political agenda?" — deep suspicion of any political content platform in a low-trust environment (21% trust Parliament, 23% trust national government) | Afrobarometer trust data; 35% of registered voters say no party represents their views | Non-partisan visual language: no party colours, no political imagery. Transparent About page with editorial principles. Data-anchored content with visible source links. Absence of ads and paywalls is itself a trust signal |
| **Habit (Barrier)** | The effort cost of reading 5,000+ word articles vs. scrolling WhatsApp or watching a 2-minute news clip. Current coping mechanism (cynicism, disengagement) requires zero effort | Reuters Institute: 77% access news via social media; WhatsApp 88% penetration. Event-driven news consumption is habitual | Reading progress bar reduces perceived effort. Estimated reading time sets expectations. Generous typography and whitespace make long-form feel manageable. Practical "toolkit" sections reward completion. WhatsApp-shareable insights create social incentive to read |

#### 2.1.4 User Research Synthesis

| Finding ID | User Insight | Source | Confidence | Design Implication |
|------------|-------------|--------|------------|-------------------|
| USR-001 | Citizens routinely blame national government for municipal failures and vice versa — accountability confusion is the norm, not the exception | Constitution of RSA (Chapter 3, Schedules 4–5); PARI cooperative governance research | High | Article 1.1 must be the canonical resource for resolving sphere-of-responsibility confusion. IA must surface this article for relevant search queries |
| USR-002 | 23.5 million eligible South Africans did not vote in 2024 (59.1% of voting-age population). Non-voting correlates with frustration and information deficit, not apathy | IEC 2024 Official Results; Afrobarometer 2024 Pre-Election Survey | High | Product positioning must avoid framing users as "apathetic" — they are underserved. Tone must be empowering, not lecturing |
| USR-003 | Government produces extensive performance data (AGSA, DPME, Treasury) but citizens have no practical guide to finding or interpreting it. Fewer than 30 of 257 municipalities achieve clean audits | AGSA MFMA Reports 2022/23; DPME MTSF Progress Reports | High | Every article must include direct links to primary data sources. Data Sources page aggregates all references. "Here's what to look for" guidance accompanies every data link |
| USR-004 | WhatsApp is the dominant platform for political information, but content circulating in groups is overwhelmingly unstructured, unreliable, and partisan | Reuters Institute Digital News Report SA; Social Research Foundation | High | WhatsApp sharing is a first-class design concern — not an afterthought. OG preview optimisation, pre-filled share messages, UTM tracking for attribution |
| USR-005 | The target segment will read 5,000+ word articles if content is conversational, practical, and directly relevant to lived experience | Hypothesis (MRD H2) — medium confidence, requires validation | Medium | Design must eliminate friction for long-form reading: large body type (19px desktop, 17px mobile), 680px max content width, 1.65 line height, no distractions |
| USR-006 | 44% of Black ANC voters have fluctuated between voting, abstaining, or switching in recent cycles — the target segment is politically dealigned | Afrobarometer; Social Research Foundation surveys | High | Non-partisan positioning is not optional — it is a prerequisite for trust. Design must be rigorously neutral: no party colours in palette, no political imagery, editorial principles prominently displayed |

### 2.2 Business Objectives

#### 2.2.1 Product Vision Statement

*"Compass is a free political education blog that enables South Africa's missing middle — 38 million citizens locked out of meaningful civic participation — to evaluate government performance and hold the right people accountable by making the governance system legible through plain-language, data-anchored, long-form articles. Unlike news media (event-driven, assumes structural knowledge), academic publications (deep but inaccessible), and WhatsApp groups (peer-driven, unreliable), Compass provides systematic, practically actionable political education for non-experts."*

*Source: MRD §1.1–1.3, §7.2*

#### 2.2.2 Business Goals and Metrics

| Goal Category | Specific Goal | Metric | MVP Target (Months 3–6) | V1.0 Target (Months 7–12) |
|---------------|--------------|--------|--------------------------|---------------------------|
| Acquisition | Unique monthly readers | Plausible unique visitors | 1,000 | 10,000 |
| Activation | Article engagement | Average time on page (long-form) | 8 minutes | 8 minutes |
| Retention | Returning visitors | Returning visitor rate | — | 40% |
| Referral | WhatsApp distribution | WhatsApp referral share of traffic | 30% | 30% |
| Engagement | Email subscribers | Subscriber count | 500 | 2,000 |
| **North Star** | **Readers with 2+ articles and 8+ min total time on site** | **Composite metric** | **100/month** | **1,000/month** |

*Source: MRD §9.2, PRD §2.3*

#### 2.2.3 Success Criteria Matrix

| User Outcome | Business Value | Metric | MVP Target | V1.0 Target |
|-------------|---------------|--------|-----------|-------------|
| Reader can identify which sphere of government is responsible for a specific service | Validates core value proposition (MRD H1) | Post-launch reader survey; qualitative feedback | 80% of surveyed readers report improved understanding | 90% |
| Reader shares article with peers | Organic distribution via WhatsApp (MRD H3) | WhatsApp share button clicks; UTM-tagged referral traffic | 30% of traffic from WhatsApp | 30% |
| Reader subscribes to email notifications | Retention and trust signal (MRD H6) | Email subscriptions via Netlify Forms | 500 subscribers | 2,000 subscribers |
| Reader navigates to primary data sources (AGSA, Treasury, DPME) | Evidence of action-oriented engagement | Outbound link click events (Plausible custom event) | Tracking active | Baseline established |
| Reader completes multiple articles | Deep engagement with structural content (MRD H2) | North Star metric: 2+ articles, 8+ min | 100/month | 1,000/month |

### 2.3 Brand Definition

#### 2.3.1 Brand Attributes Matrix

| Attribute | Definition | Design Implication | Anti-Pattern (Avoid) |
|-----------|-----------|-------------------|---------------------|
| **Trustworthy** | Credibility earned through transparency, data anchoring, and visible non-partisanship. In a low-trust environment, trust is the product's most valuable asset | Clean, restrained visual design. Sources always visible. Author identifiable. No ads, no paywalls — and this absence is visually obvious | Clickbait headlines, flashy animations, pop-ups, dark UX patterns, anything that signals "this site wants something from me" |
| **Empowering** | The reader leaves with agency — not just knowledge, but the ability to act on it. Understanding the system is the first step toward holding it accountable | Every article ends with a "Practical Framework / Toolkit" section. Data source links are direct and accompanied by "here's what to look for" guidance | Overwhelming the reader with complexity. Making governance feel like a subject only experts can engage with. Patronising tone |
| **Accessible** | Complex governance concepts made legible to intelligent non-experts. The O'Reilly register: conversational, specific, practical | Large reading-optimised typography (19px body). 680px max content width. Plain language with technical terms explained on first use. Mobile-first responsive design | Academic jargon without explanation. Dense layouts. Small type. Assuming the reader has prerequisite knowledge |
| **Serious** | This is not entertainment — it is civic education. The design communicates that the content matters | Professional visual restraint. Serif body font for long-form reading authority. Minimal colour palette. No decorative elements that don't serve function | Gamification. Trivialising governance. Excessive use of emoji or informal visual elements. Design that signals "this is content marketing" |
| **Non-partisan** | Rigorously neutral. No party alignment, no political agenda, no editorial opinion on partisan questions. Data speaks; the reader decides | No party colours in the palette (green chosen for SA flag association and trust, not ANC association). No political imagery. Editorial principles on the About page. Sphere tags are colour-coded functionally, not politically | Using any colour, imagery, or language that could be perceived as aligned with a political party. Taking editorial positions on partisan questions |

#### 2.3.2 Voice and Tone Guidelines

| Context | Tone | Example (Do) | Example (Don't) |
|---------|------|--------------|-----------------|
| **Article body** | Conversational, authoritative, direct. Uses "you" throughout. Leads with concrete examples. Treats reader as intelligent but uninformed | "Here's how this affects you: when your water stops running, the first question is whether it's a bulk supply issue (national/water board) or a reticulation issue (your municipality). Here's how to tell the difference." | "The intergovernmental relations framework as established by Chapter 3 of the Constitution delineates concurrent and exclusive competencies across the three spheres of government." |
| **Success / Completion** | Warm, genuine, understated. Acknowledges effort without being performative | "You now have the tools to look up your municipality's audit outcome and understand what it means. That puts you ahead of most people — including many elected officials." | "Congratulations! You've completed the module! 🎉🎓 You're a governance expert now!" |
| **Error / Recovery** | Supportive, solution-focused. Assumes the problem is ours, not theirs | "Something went wrong on our end. Please try again — and if it keeps happening, let us know at hello@compass.co.za." | "Error 500: Internal Server Error. Invalid request." |
| **Empty states** | Inviting, action-oriented. Guides toward value | "This article is coming soon. In the meantime, start with The Architecture of the State — it explains how South Africa's Constitution divides power." | "No content available." |
| **Email notifications** | Respectful, brief, useful. No marketing fluff | Subject: "Following the Money — New on Compass". Body: one sentence hook + direct article link. "We'll only email you when a new article drops." | Long HTML emails with multiple CTAs, images, social links, and "Don't miss out!" urgency language |

---

## 3. Scope Plane

*Translating strategy into specific requirements. Scope defines what features and content Compass will include at launch and beyond.*

### 3.1 Functional Specifications

#### 3.1.1 Feature Prioritisation Framework

| Priority | Definition | Phase | Criteria |
|----------|-----------|-------|----------|
| **Must Have** | Product fails without this | MVP (Q3 2026) | Blocks the core job-to-be-done if missing |
| **Should Have** | Important but not critical | V1.0 (Q4 2026) | Significantly improves the core reading experience |
| **Could Have** | Nice to have | V1.1+ (Q1 2027+) | Enhances experience for specific user segments |
| **Won't Have (Now)** | Explicitly excluded with rationale | Backlog | Validated need but not current priority; reconsider at PMF assessment |

#### 3.1.2 Feature Specifications

**FR-001: Article Reading Experience**

- PRD Trace: PRD §6.3
- Priority: Must Have
- Brand Alignment: Trustworthy, Accessible, Serious

User Story: *As Thabo (primary persona), I want to read a 5,000+ word article comfortably on my Samsung A15 over 4G, so that I can understand which sphere of government is responsible for my water outage.*

Functional Requirements:
- FR-001.1: Article pages render in a reading-optimised single-column layout at 680px max content width with 19px serif body font (17px on mobile) — aligns with "Accessible" brand attribute
- FR-001.2: Reading progress bar fixed to the top of the viewport shows percentage completion — reduces perceived effort (addresses MRD Habit force)
- FR-001.3: Estimated reading time displayed in article metadata header, calculated at build time (word count ÷ 200 wpm) — sets expectations for long-form content
- FR-001.4: Table of contents on desktop (sticky sidebar with active-section highlighting) and mobile (collapsible inline below metadata) — enables scanning before committing to read
- FR-001.5: "Practical Framework / Toolkit" section at article end with distinct visual treatment (dashed border callout) — delivers on "Empowering" brand attribute

Acceptance Criteria:
- Given a reader on a 360px-wide screen, when they load an article, then the body text is legible without horizontal scrolling and line length does not exceed ~75 characters
- Given a reader at 60% scroll depth, when they glance at the progress bar, then they can see they are 60% through the article
- Given a returning reader, when they visit an article they've partially read, then the TOC lets them navigate directly to the section they need

Outcome Measurement: Average time on page ≥ 8 minutes; scroll depth events at 75% and 100%; article-to-article navigation clicks

---

**FR-002: WhatsApp Sharing**

- PRD Trace: PRD §14.1
- Priority: Must Have
- Brand Alignment: Empowering, Trustworthy

User Story: *As Thabo, I want to share a Compass article to my building's WhatsApp group with one tap, so that my neighbours can also understand who is responsible for our water outage.*

Functional Requirements:
- FR-002.1: WhatsApp share button present on all article pages using `https://api.whatsapp.com/send?text=` URL scheme
- FR-002.2: Pre-filled share message includes: article title, one-sentence hook, UTM-tagged article URL, and "— From Compass: Making SA's governance system legible"
- FR-002.3: OG meta tags optimised per article: OG title (under 60 chars), OG description (under 160 chars), OG image (1200×630px with Compass branding, article title, sphere tag)
- FR-002.4: All shared links include UTM parameters: `utm_source=whatsapp&utm_medium=share&utm_campaign=article-[slug]`

Acceptance Criteria:
- Given a reader on mobile, when they tap the WhatsApp share button, then WhatsApp opens with a pre-filled message containing the article link
- Given a user receiving a Compass link in a WhatsApp group, when WhatsApp renders the link preview, then they see a branded OG image with the article title and a compelling description

Outcome Measurement: WhatsApp share button click events (Plausible custom event); WhatsApp referral traffic share (target: 30%)

---

**FR-003: Email Subscription**

- PRD Trace: PRD §13
- Priority: Must Have
- Brand Alignment: Trustworthy, Empowering

User Story: *As Thabo, I want to subscribe to be notified when new Compass articles are published, so that I don't have to remember to check the site.*

Functional Requirements:
- FR-003.1: Email capture form requires only an email address — no name, no other fields. Single input + submit button
- FR-003.2: Form placed at three locations per article page: (1) inline after first major section, (2) article footer, (3) standalone /subscribe page
- FR-003.3: Success state replaces form with confirmation message: "You're subscribed. We'll email you when new articles drop." — client-side replacement, no page reload
- FR-003.4: Privacy assurance visible adjacent to form: "No spam, no sharing your data. Unsubscribe anytime."
- FR-003.5: Backend: Netlify Forms → webhook → Buttondown (or Mailchimp). Double opt-in confirmation email

Acceptance Criteria:
- Given a reader who enters a valid email, when they submit, then they see a confirmation message within 2 seconds and receive a confirmation email within 60 seconds
- Given a reader on mobile, when they encounter the email form, then the input field and button are thumb-friendly (min 48px tap target)

Outcome Measurement: Email form submission events by location (Plausible custom event); subscriber count; confirmation rate

---

**FR-004: Copy Link Sharing**

- PRD Trace: PRD §14.2
- Priority: Should Have
- Brand Alignment: Empowering

User Story: *As a reader, I want to copy the article link to share via LinkedIn, X, or SMS.*

Functional Requirements:
- FR-004.1: "Copy Link" button copies article URL with UTM parameters to clipboard
- FR-004.2: Brief "Copied!" confirmation displayed for 2 seconds

---

**FR-005: Static Site Search**

- PRD Trace: PRD §5.1
- Priority: Should Have
- Brand Alignment: Accessible

User Story: *As a returning reader, I want to search across all Compass articles to find the section that explains municipal finances.*

Functional Requirements:
- FR-005.1: Pagefind-powered static search index generated at build time
- FR-005.2: Search accessible from header navigation
- FR-005.3: Results show article title, matching excerpt, and sphere tag

---

**FR-006: Series Overview with Sphere Filtering**

- PRD Trace: PRD §6.2
- Priority: Must Have
- Brand Alignment: Accessible, Empowering

User Story: *As Lerato (secondary persona), I want to see the full 15-article series and filter by sphere so I can read everything about municipal government before the 2026 elections.*

Functional Requirements:
- FR-006.1: Series page displays all 15 articles grouped by Part with publication status
- FR-006.2: View toggle: "Reading Order" (default) | "By Sphere" — allows filtering by National, Provincial, Municipal, All Spheres
- FR-006.3: Published articles are linked; coming-soon articles show titles with "Coming soon" label

### 3.2 Content Requirements

#### 3.2.1 Content Types Inventory

| Content Type | Purpose | Owner | Update Frequency | Brand Alignment |
|-------------|---------|-------|-----------------|-----------------|
| Long-form articles (5,000+ words) | Core product — structural political education | Tshepo Machele | Published sequentially over 10 months; permanent once live | Trustworthy, Accessible, Serious, Empowering |
| Expert anecdotes (within articles) | Credibility and human specificity | Tshepo Machele (sourced from interviews) | Published with articles | Trustworthy, Accessible |
| Practical Framework / Toolkit sections | Actionable takeaways at end of each article | Tshepo Machele | Published with articles | Empowering |
| Article metadata | Reading time, publish date, sphere tag, part number | Auto-generated at build time | Per article | Accessible |
| Data Sources reference page | Aggregated links to AGSA, Treasury, DPME, StatsSA, IEC | Tshepo Machele | Updated as new sources are referenced | Empowering, Trustworthy |
| About page | Author identity, editorial principles, non-partisan commitment | Tshepo Machele | Rarely (foundational content) | Trustworthy, Non-partisan |
| Email notifications | New article alerts | Tshepo Machele | Per article publication | Trustworthy |
| OG images | WhatsApp link previews | Auto-generated via Python script | Per article | Serious, Trustworthy |
| Empty states | "Coming soon" placeholders for unpublished articles | Tshepo Machele | Removed as articles are published | Accessible |
| Error messages | 404, form submission errors, network errors | Tshepo Machele | Stable | Trustworthy |

#### 3.2.2 Content Voice Guidelines

| Context | Use These Words | Avoid These Words |
|---------|----------------|-------------------|
| Explaining governance | "Here's how this works", "Think of it this way", "In practice, this means" | "It is important to note that", "The framework stipulates", "Pursuant to" |
| Citing data | "According to the Auditor-General's 2022/23 report", "National Treasury data shows", "You can verify this yourself at [link]" | "Studies show", "Experts say" (without naming them), unsourced claims |
| Encouraging action | "Here's what you can do", "Look up your municipality's audit here", "Share this with your WhatsApp group" | "You must", "It is your duty", "Citizens should" |
| Acknowledging complexity | "This is complicated — but here's the key thing to understand", "Don't worry about memorising the details — the framework below gives you the shortcut" | "This is simple", "Obviously", "As everyone knows" |
| Addressing frustration | "Your frustration is legitimate — and now you know exactly where to direct it", "The system is complicated by design, but it's not impenetrable" | "Stop complaining", "It's actually not that bad", "Both sides have a point" |

---

## 4. Structure Plane

*Defining how users move through Compass and interact with its content. Structure establishes the conceptual model and interaction patterns.*

### 4.1 Information Architecture

#### 4.1.1 Site Map

```
compass.co.za
│
├── / (Home)
│   └── Series overview, latest article, email capture CTA
│
├── /about
│   └── Who is behind Compass, editorial principles, non-partisan commitment
│
├── /series
│   └── Full 15-article table of contents with sphere filtering
│
├── /articles/[slug]
│   └── Individual article pages (the core content)
│   │
│   ├── /articles/architecture-of-the-state         (1.1) [MVP]
│   ├── /articles/following-the-money                (1.2) [MVP]
│   ├── /articles/who-watches-the-watchers           (1.3) [MVP]
│   ├── /articles/measuring-what-matters             (1.4) [MVP]
│   ├── /articles/inside-the-machine                 (2.1)
│   ├── /articles/your-national-budget               (2.2)
│   ├── /articles/parliament-and-you                 (2.3)
│   ├── /articles/province-as-policy-lab             (3.1)
│   ├── /articles/provincial-budgets-and-performance (3.2)
│   ├── /articles/gauteng-deep-dive                  (3.3)
│   ├── /articles/your-municipality-explained        (4.1)
│   ├── /articles/municipal-money                    (4.2)
│   ├── /articles/when-municipalities-fail           (4.3)
│   ├── /articles/your-ward-your-power               (4.4)
│   └── /articles/citizens-toolkit                   (5.1)
│
├── /data-sources
│   └── Curated links to AGSA, Treasury, DPME, StatsSA, IEC, oversight bodies
│
├── /subscribe
│   └── Standalone email subscription page
│
└── /privacy
    └── Plain-language privacy policy
```

#### 4.1.2 Navigation Model

| Nav Level | Type | Contents | Behaviour | Brand Alignment |
|-----------|------|----------|-----------|-----------------|
| **Primary** | Persistent header bar | Home · Series · Data Sources · About | Always visible. Simple horizontal text links on desktop; hamburger on mobile. Minimal — four items maximum | Trustworthy (restraint), Accessible (predictable) |
| **Article-level** | Contextual within article pages | Series breadcrumb (Part X → Article X.X) · Previous/Next article links · Reading progress bar (fixed top) | Breadcrumb appears below header. Prev/Next appear in article footer as large, clear links. Progress bar spans full viewport width | Accessible (wayfinding), Empowering (progress visibility) |
| **Footer** | Persistent footer | Subscribe · About · Privacy · "Built by Tshepo Machele" | Present on all pages. Lightweight. Contact email included | Trustworthy (transparency), Non-partisan (individual authorship visible) |

#### 4.1.3 Content Taxonomy

Articles are organised along two dimensions that allow flexible navigation:

**Part (sequential):** Defines reading order — foundational concepts build toward applied knowledge.

| Part | Title | Articles | MVP? |
|------|-------|----------|------|
| Part 1 | Foundational Framework | 1.1, 1.2, 1.3, 1.4 | Yes |
| Part 2 | National Government | 2.1, 2.2, 2.3 | No |
| Part 3 | Provincial Government | 3.1, 3.2, 3.3 | No |
| Part 4 | Municipal Government | 4.1, 4.2, 4.3, 4.4 | No |
| Part 5 | Citizen's Toolkit | 5.1 | No |

**Sphere (categorical):** Allows readers to filter by their area of interest.

| Sphere | Colour Code | Articles |
|--------|------------|----------|
| All Spheres | `#1B6B4A` (compass-green) | 1.1, 1.2, 1.3, 1.4, 5.1 |
| National | `#2563EB` (blue) | 2.1, 2.2, 2.3 |
| Provincial | `#7C3AED` (purple) | 3.1, 3.2, 3.3 |
| Municipal | `#DC2626` (red) | 4.1, 4.2, 4.3, 4.4 |

### 4.2 Interaction Design

#### 4.2.1 Core Interaction Principles

| Principle | Definition | Application | Brand Connection |
|-----------|-----------|-------------|-----------------|
| **Reading is sacred** | The reading experience takes absolute priority over every other interaction | No pop-ups, no interstitials, no auto-playing media, no sidebar ads. The article body is an uninterrupted column of text. Every interaction element is positioned to support reading, not interrupt it | Trustworthy, Serious |
| **Immediate feedback** | Users know their actions registered | Button press states render within 100ms. Email form success replaces form inline. "Copied!" confirmation on link copy. Progress bar updates on scroll | Accessible |
| **Minimal decisions** | Reduce cognitive load — the reader came to learn about governance, not to navigate a complex UI | Four primary nav items. One email field. One share button. Sequential article navigation (prev/next). No configuration, no settings, no accounts | Accessible, Empowering |
| **Data costs money** | Every byte the reader downloads costs them real money (≈R2/MB on prepaid). Performance is a UX principle, not just a technical requirement | Total page weight under 200KB. Zero client-side JS by default (Astro static HTML). Font payload under 80KB. No images in article body for MVP | Trustworthy (respect for reader's resources) |
| **Trust through restraint** | In a low-trust environment, what you don't do communicates as loudly as what you do | No tracking cookies (Plausible is cookie-less). No consent banners. No newsletter pop-ups. No social media embeds. No third-party scripts beyond analytics | Trustworthy, Non-partisan |

#### 4.2.2 User Flow Documentation

**FLOW 1: First-time Reader via WhatsApp**

- PRD Trace: US-1
- Target Completion Time: Article load in under 3 seconds; "answer" findable within 60 seconds; total reading session 8+ minutes
- Brand Alignment: Trustworthy (fast load, no dark patterns), Accessible (readable on 360px screen), Empowering (actionable content)
- Entry Point: WhatsApp group message containing a Compass link with OG preview

Steps:

1. **Receive link in WhatsApp** → WhatsApp chat
   - User action: Sees OG preview image with article title, Compass branding, and sphere tag. Taps link
   - System response: Browser opens; page begins loading
   - Brand moment: The OG image is the first brand touchpoint — clean, professional, informative. No clickbait

2. **Article loads** → Article page
   - User action: Sees article title, subtitle, reading time, and sphere tag. Scrolls to begin reading
   - System response: Page renders in under 3 seconds on 4G. Reading progress bar appears at top. TOC is available
   - Brand moment: The clean, ad-free, generous layout signals "this is different from what you're used to." Trust begins here

3. **Reads article** → Article body
   - User action: Scrolls through content. May use TOC to jump to sections. Sees expert anecdotes in callout boxes, source links inline
   - System response: Progress bar updates. Scroll depth events fire at 25%, 50%, 75%, 100%
   - Brand moment: The O'Reilly conversational register — "Here's how this affects you" — makes complex content feel personal and navigable

4. **Reaches Practical Framework section** → Article footer area
   - User action: Reads the actionable toolkit. May click outbound links to AGSA or National Treasury to look up their own municipality
   - System response: Outbound click events tracked. Data source links open in new tabs
   - Brand moment: The payoff — "You now know where to look." Empowerment delivered

5. **Shares or subscribes** → Share/subscribe CTAs
   - User action: Taps WhatsApp share button to forward to another group. May enter email to subscribe
   - System response: WhatsApp opens with pre-filled message. Email form submits and shows confirmation
   - Brand moment: The share message includes "— From Compass: Making SA's governance system legible" — the reader becomes a distributor of the brand

Error Handling:
- Slow connection (>3s load): Static HTML renders progressively — text appears before fonts finish loading (`font-display: swap`)
- WhatsApp share fails (rare): "Copy Link" button as fallback
- Email submission fails: "Something went wrong on our end. Please try again." — blame is on the system, not the user

Success State: Reader has spent 8+ minutes on the article, understands sphere responsibility, has shared the link, and has subscribed. They are now in the North Star metric cohort.

---

**FLOW 2: Search-driven Reader**

- PRD Trace: US-2
- Target Completion Time: Answer findable within 60 seconds of landing
- Entry Point: Google search result for query like "who is responsible for water in South Africa"

Steps:

1. **Lands on article from search** → Article page (likely Article 1.1)
   - User action: Scans title and subtitle to confirm relevance
   - System response: SEO-optimised meta description matches search intent. Article renders immediately
   - Brand moment: No consent banner, no pop-up, no interstitial — straight to the content

2. **Scans TOC for relevant section** → Table of contents
   - User action: Expands mobile TOC or scans sidebar TOC to find the section on municipal vs. national responsibilities
   - System response: TOC shows all H2 headings; tapping scrolls to section
   - Brand moment: Structured, navigable content signals depth and organisation — "this person has done the work"

3. **Reads targeted section** → Article body (specific section)
   - User action: Reads the relevant section. May read surrounding context
   - System response: Section is self-contained enough to answer the specific question

4. **Decides whether to continue reading** → Article body / footer
   - User action: Either continues to the Practical Framework section or bookmarks for later
   - System response: If they continue, progress bar and sequential navigation encourage full read-through

#### 4.2.3 Error Handling Philosophy

| Error Type | Traditional Approach | Compass Approach (Brand-Aligned) |
|------------|---------------------|----------------------------------|
| **Network error** | "Connection failed" | "We couldn't load the page — you might be on a slow connection. The good news: Compass articles are small (under 200KB), so it should work even on limited data. Try refreshing." |
| **404 — Page not found** | "404 Error: Page not found" | "This page doesn't exist — but if you're looking for an article, start with the Series overview, or try The Architecture of the State as your entry point." |
| **Email form error** | "Submission failed" | "Something went wrong on our end. Please try again — and if it keeps happening, email us at hello@compass.co.za and we'll add you manually." |
| **Article not yet published** | "Coming soon" | "This article is coming soon. In the meantime, start with The Architecture of the State — it lays the foundation for everything that follows." |

#### 4.2.4 Empty States Design

| Screen | Empty State Message | Primary CTA | Brand Tone |
|--------|-------------------|-------------|------------|
| Unpublished article in series list | "Coming Q4 2026 — subscribe to be notified when this article drops." | Subscribe email input | Inviting, transparent about timeline |
| Search — no results | "We couldn't find a match. Try a different term, or browse the full series." | View Series | Helpful, redirects to value |
| Data Sources — section with no links yet | "Data sources for this section will be added when the relevant articles are published." | Browse available sources | Honest, sets expectations |

---

## 5. Skeleton Plane

*Arranging interface elements for optimal usability. The skeleton defines the layout and component patterns that readers interact with.*

### 5.1 Interface Design Principles

| Principle | Application | Rationale | Brand Alignment |
|-----------|------------|-----------|-----------------|
| **Primary action prominent** | "Start Reading →" is the largest CTA on the home page. WhatsApp share and email subscribe are the most visible actions on article pages | Reduces cognitive load — the reader should never wonder "what do I do next?" | Accessible, Empowering |
| **8px grid system** | All spacing uses multiples of 8px. Component padding, margins, and gaps align to grid | Creates visual harmony and consistency across all pages and breakpoints | Serious, Trustworthy |
| **Touch-friendly targets** | Minimum 48×48px for all interactive elements (buttons, links, form inputs) on mobile | WCAG compliance; the target reader is on a smartphone with a possibly cracked screen | Accessible |
| **Generous whitespace** | Content width capped at 680px. Ample margins around article body, between sections, around callout components | Reduces visual stress during long reading sessions. Signals that content — not ad inventory — is what matters here | Trustworthy, Accessible, Serious |
| **Clear visual hierarchy** | H1 > H2 > H3 > body text progression through size, weight, and spacing. Callout components use border and background to distinguish from body text | Guides attention naturally through long-form content. Enables scanning | Accessible |

### 5.2 Component Library

#### 5.2.1 Core Components

| Component | Purpose | States | Brand Alignment |
|-----------|---------|--------|-----------------|
| **Reading Progress Bar** | Shows scroll progress through article; fixed to top of viewport | 0%–100% fill (compass-gold on neutral background). Respects `prefers-reduced-motion` | Empowering (reduces perceived effort) |
| **WhatsApp Share Button** | One-tap article sharing to WhatsApp | Default (green, prominent), Active (pressed state), Loading (WhatsApp opening) | Empowering |
| **Copy Link Button** | Copies article URL to clipboard | Default, Active ("Copied!" confirmation for 2 seconds) | Empowering |
| **Email Capture Form** | Single-field email subscription | Empty, Focused (input active), Submitting (loading state), Success ("You're subscribed"), Error ("Something went wrong") | Trustworthy |
| **Callout: Expert Anecdote** | Attributed expert quote/narrative within article body | Default (4px compass-green left border, light background) | Trustworthy, Accessible |
| **Callout: Key Takeaway** | Bottom-line-up-front summary or section summary | Default (compass-gold left border, `--bg-secondary` background) | Accessible, Empowering |
| **Callout: Practical Toolkit** | Actionable section at article end | Default (dashed compass-green border, slightly elevated visual weight) | Empowering |
| **Sphere Tag** | Coloured pill indicating article's sphere category | National (blue), Provincial (purple), Municipal (red), All Spheres (green) | Accessible (colour-coded navigation) |
| **Article Card** | Content card for series overview and home page | Default (title, subtitle, part number, sphere tag, status). Published (linked) or Coming Soon (greyed, not linked) | Accessible, Serious |
| **Previous / Next Navigation** | Sequential article navigation at article footer | Default (large, clear links with full article titles: "← Previous: [Title]" and "Next: [Title] →") | Accessible, Empowering |
| **Table of Contents** | Article section navigation | Desktop: sticky sidebar with active-section highlighting. Mobile: collapsible inline, tap to expand | Accessible |
| **Article Metadata Line** | Reading time, publish date, sphere tag, part number | Single horizontal line below article title | Serious, Trustworthy |

#### 5.2.2 Component Behaviour Guidelines

- All interactive components must have visible focus states for keyboard accessibility
- Loading states (email form submission, page transitions) must appear within 100ms of action initiation
- Error states must include recovery guidance — never just an error label
- Success states are understated and genuine — no confetti, no gamification
- Disabled states (e.g., "Coming Soon" articles) must be visually distinct but not hidden — transparency about what exists and what's coming builds trust
- The reading progress bar uses `prefers-reduced-motion` to disable animation when the reader's OS setting requests it

### 5.3 Page Layout Templates

#### 5.3.1 Article Page Layout (Primary Template)

This is the most important page in the product — everything else exists to get readers here.

```
┌─────────────────────────────────────────────┐
│ [Progress Bar — full width, fixed top]      │
├─────────────────────────────────────────────┤
│ [Header: Home · Series · Data Sources · About] │
├─────────────────────────────────────────────┤
│                                             │
│  Breadcrumb: Part 1 → Article 1.1           │
│                                             │
│  ┌─────────────────────────────────┐        │
│  │  H1: Article Title              │        │
│  │  Subtitle                       │        │
│  │  Metadata: 25 min · 1 Aug 2026  │        │
│  │  [Sphere Tag: All Spheres]      │        │
│  └─────────────────────────────────┘        │
│                                             │
│  ┌──────┐  ┌───────────────────────┐        │
│  │ TOC  │  │  Article body         │        │
│  │(desk)│  │  (680px max width)    │        │
│  │      │  │                       │        │
│  │ H2   │  │  ┌─ Expert Anecdote ─┐│        │
│  │ H2   │  │  │ callout box       ││        │
│  │ H2 ← │  │  └──────────────────┘│        │
│  │(actv)│  │                       │        │
│  │ H2   │  │  Body text continues  │        │
│  │ H2   │  │                       │        │
│  └──────┘  │  ┌─ Key Takeaway ────┐│        │
│            │  │ callout box       ││        │
│            │  └──────────────────┘│        │
│            │                       │        │
│            │  ┌═ PRACTICAL ═══════┐│        │
│            │  ║ TOOLKIT section   ║│        │
│            │  ║ (dashed border)   ║│        │
│            │  └═══════════════════┘│        │
│            │                       │        │
│            │  Sources & Further    │        │
│            │  Reading              │        │
│            └───────────────────────┘        │
│                                             │
│  ┌─────────────────────────────────┐        │
│  │ ← Previous: [Title]            │        │
│  │                Next: [Title] →  │        │
│  └─────────────────────────────────┘        │
│                                             │
│  ┌─────────────────────────────────┐        │
│  │ 📧 Email capture CTA           │        │
│  │ [email input] [Subscribe]       │        │
│  └─────────────────────────────────┘        │
│                                             │
│  ┌─────────────────────────────────┐        │
│  │ 💬 WhatsApp share CTA           │        │
│  │ [Share to WhatsApp]  [Copy Link]│        │
│  └─────────────────────────────────┘        │
│                                             │
├─────────────────────────────────────────────┤
│ [Footer: Subscribe · About · Privacy ·      │
│  Built by Tshepo Machele]                   │
└─────────────────────────────────────────────┘
```

#### 5.3.2 Home Page Layout

```
┌─────────────────────────────────────────────┐
│ [Header: Home · Series · Data Sources · About] │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────┐        │
│  │  COMPASS                        │        │
│  │  Making South Africa's          │        │
│  │  governance system legible      │        │
│  │  to ordinary citizens.          │        │
│  │                                 │        │
│  │  [Start Reading →]              │        │
│  │  [View the Series]              │        │
│  └─────────────────────────────────┘        │
│                                             │
│  The Problem (2–3 sentences)                │
│                                             │
│  ┌──────┐ ┌──────┐ ┌──────┐                │
│  │Part 1│ │Part 2│ │Part 3│  ...            │
│  │ 4 art│ │ 3 art│ │ 3 art│                │
│  │[Live]│ │[Soon]│ │[Soon]│                │
│  └──────┘ └──────┘ └──────┘                │
│                                             │
│  ┌─────────────────────────────────┐        │
│  │ 📧 Get notified when new        │        │
│  │    articles drop                │        │
│  │ [email input] [Subscribe]       │        │
│  └─────────────────────────────────┘        │
│                                             │
│  About teaser → /about                      │
│                                             │
├─────────────────────────────────────────────┤
│ [Footer]                                    │
└─────────────────────────────────────────────┘
```

### 5.4 Responsive Design

| Breakpoint | Width Range | Layout Approach | Navigation Pattern |
|------------|------------|----------------|-------------------|
| **Mobile (small)** | 320–479px | Single column. Body text at 17px. TOC is collapsible inline. Share buttons are full-width. CTA buttons are full-width and thumb-friendly (min 48px height) | Hamburger menu for primary nav. Bottom of article share/subscribe CTAs |
| **Mobile (large)** | 480–767px | Single column with wider margins. Same as small mobile but more breathing room | Hamburger menu |
| **Tablet** | 768–1023px | Single column for article body (680px max). TOC may appear as sidebar if space permits | Horizontal text nav in header |
| **Desktop** | 1024px+ | Article body at 680px max width with sticky sidebar TOC. Series cards in grid layout | Horizontal text nav in header. Sticky sidebar TOC on article pages |

---

## 6. Surface Plane

*The sensory experience of Compass. Surface defines the visual language that brings the brand to life.*

### 6.1 Visual Design System

#### 6.1.1 Colour Palette

**Primary Colours:**

| Name | Hex Value | Usage | Accessibility Note |
|------|-----------|-------|-------------------|
| Compass Green | `#1B6B4A` | Primary brand colour; header accents; callout borders; sphere tag (All Spheres) | 7.2:1 contrast on white — passes AAA |
| Compass Green Light | `#E8F5EE` | Background for Expert Anecdote callouts; light tint for section breaks | Background only — not for text |
| Compass Gold | `#C8A951` | Progress bar fill; active states; Key Takeaway callout border. Used sparingly | 3.1:1 on white — AA for large text only. Never used for body text |

**Neutral Colours:**

| Name | Hex Value | Usage | Accessibility Note |
|------|-----------|-------|-------------------|
| Text Primary | `#1A1A1A` | Body text, headings | 16.5:1 on white — passes AAA |
| Text Secondary | `#4A4A4A` | Metadata, captions, secondary information | 9.7:1 on white — passes AAA |
| Background Primary | `#FFFFFF` | Page background | Base layer |
| Background Secondary | `#F8F8F8` | Section breaks, callout backgrounds, Key Takeaway callout | Subtle elevation from white |
| Border | `#E0E0E0` | Subtle borders, dividers | Decorative only |

**Semantic / Sphere Tag Colours:**

| Name | Hex Value | Usage | Brand Note |
|------|-----------|-------|-----------|
| Sphere National | `#2563EB` | Sphere tag for national government articles | Functional colour coding, not political |
| Sphere Provincial | `#7C3AED` | Sphere tag for provincial government articles | Functional colour coding, not political |
| Sphere Municipal | `#DC2626` | Sphere tag for municipal government articles | Functional colour coding, not political |
| Sphere All | `#1B6B4A` | Sphere tag for foundational/cross-cutting articles | Matches primary brand colour |

*Source: PRD §7.2. Palette deliberately avoids party-political colour associations. Green is chosen for SA flag resonance and trust connotation, not ANC association.*

#### 6.1.2 Typography

| Style | Font / Size / Weight | Usage | Line Height |
|-------|---------------------|-------|-------------|
| H1 (article title) | Inter or DM Sans / 36px (mobile: 28px) / Bold | Article titles, hero heading | 1.3 |
| H2 (section) | Inter or DM Sans / 28px (mobile: 22px) / SemiBold | Major article sections; page titles | 1.3 |
| H3 (subsection) | Inter or DM Sans / 22px (mobile: 18px) / SemiBold | Article subsections | 1.4 |
| Body | Source Serif 4 or Literata / 19px (mobile: 17px) / Regular | Primary article content — the text the reader spends 8+ minutes with | 1.65 |
| Body Small | Source Serif 4 or Literata / 14px / Regular | Metadata, captions, secondary information | 1.5 |
| UI / Navigation | Inter or DM Sans / 14–16px / Medium | Nav links, buttons, form labels | 1.4 |

**Typography rationale:**

- **Serif body font** (Source Serif 4 / Literata): Optimised for sustained screen reading of long-form content. Signals authority and seriousness — aligns with textbook-quality positioning. Free, open-source, excellent Latin character support
- **Sans-serif heading font** (Inter / DM Sans): Clean, modern, system-like quality. Provides visual contrast against serif body. Variable weight support minimises font file count
- **Max content width: 680px**: Ensures line length stays within the optimal 55–75 character range for reading comprehension
- **Font loading**: `font-display: swap` with body font preloaded. Subset to Latin characters only. Total font payload target: under 80KB (hard limit: 120KB)

#### 6.1.3 Iconography

- **Style:** Rounded/outlined to match the approachable-but-professional brand personality
- **Stroke weight:** 1.5px for consistency
- **Sizes:** 16px (inline with text), 24px (buttons and navigation), 32px (prominent callouts)
- **Usage:** Minimal. Icons for WhatsApp share, copy link, email, external link indicator, and navigation arrows only. No decorative icons
- **Source:** Lucide Icons (open-source, consistent, lightweight SVGs)

### 6.2 Motion Design

#### 6.2.1 Animation Principles

| Principle | Application | Brand Alignment |
|-----------|------------|-----------------|
| **Purposeful** | Every animation serves a function — progress indication, state change confirmation, scroll-linked feedback. No decorative animation | Serious, Trustworthy |
| **Natural** | Ease-in-out curves. No bouncing, no overshoot. Movements feel smooth and inevitable | Trustworthy (nothing flashy or gimmicky) |
| **Brief** | Most animations 100–300ms. Nothing lingers | Accessible (respects reader's time and attention) |
| **Accessible** | All animations respect `prefers-reduced-motion`. The reading progress bar disables smooth fill when this preference is set | Accessible |

#### 6.2.2 Animation Library

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Button press (share, subscribe, copy) | 100ms | ease-out | On tap/click |
| Email form success state transition | 200ms | ease-in-out | On successful submission |
| "Copied!" confirmation appear/fade | 200ms appear, 2000ms visible, 300ms fade | ease-out / ease-in | On copy link click |
| Reading progress bar | Continuous, scroll-linked | Linear (tied to scroll position) | Scroll events |
| Mobile TOC expand/collapse | 200ms | ease-in-out | Tap on TOC toggle |
| Mobile hamburger menu open/close | 250ms | ease-out (open), ease-in (close) | Tap on menu icon |

### 6.3 Accessibility Requirements

| Requirement | Standard | Implementation | Testing Method |
|-------------|----------|---------------|----------------|
| **Colour contrast** | WCAG AAA (7:1 for body text; AA 4.5:1 minimum for all text) | All text colours verified against backgrounds per §6.1.1 palette. Body text (#1A1A1A on #FFFFFF) achieves 16.5:1 | Automated tools (Lighthouse, axe); manual spot-checks on callout backgrounds |
| **Touch targets** | 48×48px minimum (exceeds WCAG's 44px recommendation) | All buttons, links, and form inputs meet minimum on mobile | Manual review on physical Android device |
| **Screen reader support** | Full semantic HTML coverage | `<article>`, `<nav>`, `<main>`, `<header>`, `<footer>` landmarks. All headings use proper `<h1>`–`<h3>` hierarchy. All images have alt text. Form inputs have associated `<label>` elements. `<html lang="en-ZA">` set | VoiceOver (iOS) and TalkBack (Android) testing |
| **Keyboard navigation** | Full functionality via keyboard | Tab order follows visual order. All interactive elements have visible focus indicators (2px compass-green outline). Skip-to-content link for keyboard users | Keyboard-only testing in Chrome and Firefox |
| **Reduced motion** | System preference respected | Reading progress bar disables smooth animation when `prefers-reduced-motion: reduce` is set. No other animations are essential | Settings toggle + manual verification |
| **Text scaling** | Up to 200% zoom | Responsive typography using `rem` units. No fixed-width containers that break at larger text sizes. Line length adapts | Browser zoom testing at 200% |
| **Responsive text** | Minimum 16px on all devices | Body text is 17px minimum (mobile). No text anywhere in the UI is smaller than 14px (metadata only) | Responsive testing across breakpoints |
| **Link clarity** | Descriptive link text | No "click here" or "read more" links. External links visually indicated (subtle icon or underline style) | Manual content review |

---

## 7. Implementation Roadmap

### 7.1 Phase Planning

| Phase | Focus | Duration | Key UX Deliverables | Brand Validation |
|-------|-------|----------|---------------------|-----------------|
| **Phase 0: Build** | Platform development | Weeks 1–8 | Article layout template; reading progress bar; share buttons; email capture; TOC component; all page templates; responsive testing on Android devices | Design system validated against brand attributes; Lighthouse audit (performance ≥ 95, accessibility ≥ 90) |
| **Phase 1: MVP Launch** | Part 1 content (4 articles) | Weeks 9–16 | Articles 1.1–1.4 published with full reading experience; WhatsApp distribution initiated | Time-on-page ≥ 8 min validates reading experience; WhatsApp share clicks validate distribution UX; email subscriptions validate trust |
| **Phase 2: National** | Part 2 content (3 articles) | Weeks 17–24 | Articles 2.1–2.3 published; sphere filtering validated with real content across categories | Returning visitor rate validates navigation UX; article-to-article navigation clicks validate sequential reading flow |
| **Phase 3: Provincial + Municipal** | Parts 3–4 content (7 articles) | Weeks 25–40 | Municipal articles prioritised for 2026 local elections; full series architecture tested at scale | Series overview filtering by sphere validated with comprehensive content; Data Sources page at full coverage |
| **Phase 4: Toolkit** | Part 5 capstone | Weeks 41–44 | Full 15-article series complete; Citizen's Toolkit article live | End-to-end reading journey validated; North Star metric assessment |
| **Phase 5: PMF Assessment** | Evaluation | Week 48+ | Reader survey; engagement data review; UX iteration recommendations | Go/no-go on v2 features from MRD §10.2 |

### 7.2 Design Review Checklist

Before each release, validate against these criteria:

- **Strategy alignment:** Does every feature trace to a user need (MRD §4) and business goal (MRD §9)?
- **Brand consistency:** Do all elements reflect the five brand attributes (Trustworthy, Empowering, Accessible, Serious, Non-partisan)?
- **Reading experience:** Can a reader complete an article in a single session without distraction or friction?
- **Performance:** Does the page load in under 3 seconds on 4G? Is total page weight under 200KB?
- **Accessibility:** Do all components meet WCAG 2.1 AA (target: AAA for text contrast)?
- **Content quality:** Does all copy follow the voice and tone guidelines in §2.3.2?
- **Error handling:** Are all error states supportive and actionable per §4.2.3?
- **Empty states:** Do all empty states guide users toward value per §4.2.4?
- **Mobile-first:** Does the experience work on a 360px screen on Chrome for Android?
- **Data cost:** Is the page weight respectful of the reader's prepaid data budget?
- **Trust signals:** Is the absence of ads, pop-ups, tracking cookies, and dark patterns visually obvious?

### 7.3 Design-to-Development Handoff Specifications

Since Tshepo Machele is both designer and developer, this section serves as a self-check for implementation completeness:

- All Astro components match the component library in §5.2 with all states implemented
- Tailwind configuration implements the colour palette (§6.1.1) and typography scale (§6.1.2)
- Responsive breakpoints match §5.4 and are tested on Chrome DevTools (Galaxy S20, iPhone 12, iPad)
- All interactive elements have focus states, hover states, and active states
- Plausible custom events match PRD Appendix B (scroll depth, share clicks, email submissions, outbound links, article navigation)
- OG images generated per article via Python script (PRD Appendix C)
- `prefers-reduced-motion` respected on reading progress bar
- `font-display: swap` set on all `@font-face` declarations
- Lighthouse audit: Performance ≥ 95, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90

---

## Appendices

### Appendix A: MRD/PRD Traceability Matrix

| MRD Reference | PRD Reference | UX Section | Component / Screen | Brand Alignment |
|--------------|--------------|-----------|-------------------|----------------|
| MRD §1.1 — Problem hypothesis (accountability confusion) | PRD §1.2 — Product vision | §2.1.1 — Primary persona (struggling moment) | Article 1.1 landing experience; search-optimised meta | Trustworthy, Empowering |
| MRD §3.1 — Job executor (smartphone, prepaid data, English) | PRD §11 — Performance requirements | §4.2.1 — "Data costs money" principle; §5.4 — Responsive design | All pages — performance budget, mobile-first layout | Accessible, Trustworthy |
| MRD §4.1 — Job map (DEFINE → CONCLUDE) | PRD §3 — User stories | §4.2.2 — User flow documentation | Article reading flow; data source outbound links | Empowering |
| MRD §4.2 — Outcome #1 (identify responsible sphere) | PRD §6.3 — Article "practical framework" sections | §3.1.2 — FR-001 (Article Reading Experience) | Practical Toolkit callout component | Empowering |
| MRD §5.1 — Anxiety: "Is this pushing an agenda?" | PRD §7 — Non-partisan visual language | §2.3.1 — Brand attribute: Non-partisan | Colour palette (no party colours); About page | Non-partisan, Trustworthy |
| MRD §5.1 — Habit: effort cost of 5,000-word articles | PRD §6.3 — Reading progress indicator | §5.2.1 — Reading Progress Bar component | Progress bar; reading time metadata; TOC | Accessible, Empowering |
| MRD §5.2 — Switching trigger: WhatsApp debate | PRD §14 — Social sharing | §3.1.2 — FR-002 (WhatsApp Sharing) | WhatsApp share button; OG preview | Empowering |
| MRD §8.1 — MVP scope (4 articles + email + WhatsApp) | PRD §15 — Launch plan | §7.1 — Phase planning | Phase 0–1 deliverables | All attributes |
| MRD §8.3 — Target customer for MVP (Gauteng professionals) | PRD §10 — SEO strategy | §4.2.2 — Flow 2 (search-driven reader) | SEO meta; search landing experience | Accessible |
| MRD §9.1 — North Star metric (2+ articles, 8+ min) | PRD §2.3 — Post-launch metrics | §2.2.2 — Business goals | Analytics events; article-to-article navigation | Empowering |

### Appendix B: Glossary

| Term | Definition |
|------|-----------|
| 0→1 Product | A completely new product built from scratch with no existing user base |
| Jobs-to-be-Done | Framework for understanding user motivation based on the progress they want to make in their lives |
| Forces of Progress | The four forces (push, pull, anxiety, habit) that influence whether a user switches to a new solution |
| O'Reilly Register | The conversational, specific, practical writing style characteristic of O'Reilly technical books — treats the reader as intelligent but uninformed |
| Sphere (of government) | One of South Africa's three constitutionally defined levels of government: national, provincial, and municipal |
| AGSA | Auditor-General of South Africa — the constitutional body that audits government spending |
| DPME | Department of Planning, Monitoring and Evaluation — responsible for government performance tracking |
| MECE | Mutually Exclusive, Collectively Exhaustive — a structuring principle ensuring no gaps or overlaps |
| North Star Metric | The single metric that best captures the core value Compass delivers to readers |
| Plausible | Privacy-respecting, cookie-less web analytics platform used by Compass |
| Astro | Static site generator used to build Compass — renders HTML at build time with minimal client-side JavaScript |

### Appendix C: Document Maintenance

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | 2026-02-15 | Tshepo Machele | Initial UX design document — all five planes defined for MVP |

---

*— End of Document —*
