# Content Execution Plan

**GovCompass — govcompass.co.za**

---

| Field | Detail |
|-------|--------|
| **Document Owner** | Tshepo Machele |
| **Version** | 1.0 |
| **Date** | 17 February 2026 |
| **Status** | Active |

---

## 1. Purpose & Scope

This document is the operational playbook for producing all 15 articles in the GovCompass series. It synthesises three source documents into a single execution reference: the [Article Series Plan](GovCompass_article_series.md) (15 article titles with detailed generation prompts), the [Content Style Guide](GovCompass_Content_Style_Guide.md) (editorial standards, voice, structure, and pre-publication checklist), and the [Autonomous Operations Instruction Set](GovCompass_Autonomous_Operations.md) (7-agent pipeline, skills, MCPs, approval gates, and 14-day production cycle). The audience for this document is the seven autonomous agents (A1–A7) executing the content pipeline and the human approver (Tshepo Machele) who reviews at every approval gate.

---

## 2. Article Execution Template

This reusable 6-phase template governs production of any single article in the series. Each phase maps to the autonomous operations agents and references the style guide constraints. The full cycle targets 14 days per article.

| Phase | Days | Agent(s) | Key Actions | Style Guide Constraints | Approval Gate? |
|-------|------|----------|-------------|------------------------|----------------|
| **1. Research** | 1–3 | A1 (Content Strategist) | Compile sources from AGSA, National Treasury, DPME, StatsSA, and academic journals (Politikon, JOSAS, Transformation, Development Southern Africa). Identify 2–3 expert contacts for anecdotes (from DPME, SAMEA, Twende Mbele, PARI, HSRC, or SA universities). **Verify every proposed expert is a real person with published research in the relevant field** — confirm via Google Scholar, institutional pages, ORCID, or academic databases (minimum two independent sources). Verify all source URLs are live and current. Draft research brief with primary sources, data points, expert contacts, and **expert verification evidence** (links to Google Scholar profiles, institutional bios, or key publications). | Every claim must be anchored in data (§5.3). Use most recent available data; state the year explicitly (§5.3). Sources must be from high-credibility institutions. **Every named expert must be verified before inclusion in the research brief — zero tolerance for unverified or fabricated experts** (§5.1). | **Yes** — Tshepo approves research brief (SLA: 24 hours) |
| **2. Drafting** | 4–8 | A2 (Content Author) | Generate article from approved research brief + article generation prompt. Produce valid YAML frontmatter (title, subtitle, part, articleNumber, sphere, description 150–160 chars, publishDate, readingTime, status, series.prev, series.next, seo.keywords). Write in O'Reilly conversational register with BLUF opening, flowing prose (no bullet points), 2–3 named expert anecdotes, and Practical Framework ending (`:::framework` callout). Minimum 4,500 words. Calculate reading time (word count / 200 wpm). Generate SEO meta description (150–160 chars) and title (<60 chars). | Direct address with "you" throughout (§4.2). Lead with specifics (§4.2). BLUF in first 1–2 paragraphs (§5.1). No bullet points in prose (§5.1). No hype words (§7.1). Non-partisan tone (§12). British English spelling (§6.1). Oxford comma (§6.1). Define technical terms on first use (§5.2). | **Yes** — Tshepo approves draft (SLA: 72 hours) |
| **3. Editorial QA** | 9–10 | A3 (Editorial Quality Agent) | Run Zod schema validation on frontmatter. Proofread for grammar, spelling, and style. Enforce O'Reilly conversational register — flag academic or corporate tone. Verify BLUF structure, expert anecdotes (2–3, named with institutional affiliation), Practical Framework section (`:::framework` callout), and Sources section with hyperlinks. **Run expert verification checks: confirm each named expert is a real person at the stated institution with published research in the cited field (Google Scholar, ORCID, institutional pages — minimum two independent sources). Verify that paraphrased insights accurately represent the expert's documented research positions and that specific publications are cited. Flag any expert who cannot be verified for replacement with an institutional source.** Verify Resources section exists with links to verifiable publications and institutional sources. Test all internal and external links. Flag partisan language, hype words, unexplained jargon. Verify heading hierarchy (H2/H3, no H1 in body). Generate structured quality report (pass/fail per criterion, **including expert verification status for each cited expert**). | All pre-publication checklist items (§13) must pass. Zero tolerance for partisan language. **Zero tolerance for unverified or fabricated experts.** All links must be functional. All five brand attributes must hold (Trustworthy, Empowering, Accessible, Serious, Non-partisan). | **Yes** — Tshepo approves quality report (SLA: 24 hours) |
| **4. Revision** | 11–12 | A2 + A3 | Incorporate Tshepo's feedback and A3's quality report findings. Re-validate frontmatter schema. Re-test all links. Re-verify tone, BLUF, anecdotes, and framework section. A3 produces updated quality report confirming all issues resolved. | Same constraints as Phases 2 and 3. Content must pass all Zod schema validations before proceeding. | **Yes** — Tshepo approves final version (SLA: 24 hours) |
| **5. Publish** | 13 | A4 (Publishing & Deployment) + A7 (Site Reliability) | A4: Create feature branch (`content/{part}-{article}-{slug}`), commit Markdown to `/src/content/articles/`, open PR with article summary. Verify `npm run build` succeeds. Monitor Netlify deploy preview — verify article renders, sphere tag colour, OG image (1200x630px), prev/next navigation, callout styling. A7: Run post-deploy health checks, Lighthouse audit (Performance >90, Accessibility >95, SEO >95), page weight check (<400KB, target <200KB), verify Pagefind index includes new article. | Page weight target: 200KB, hard limit: 400KB (§11). Heading hierarchy must render correctly. Metadata line must show reading time, sphere tag, and publish date (§8). | **Yes** — Tshepo approves PR merge (SLA: 24 hours) |
| **6. Distribute & Monitor** | 14+ | A5 (Distribution & Growth) + A6 (Analytics & Insights) | A5: Draft notification email (Subject: "[Article Title] — New on GovCompass"; body: title, subtitle, one-sentence hook, UTM-tagged link; plain text or minimal HTML). Verify WhatsApp share button constructs correct pre-filled message with UTM parameters. Verify OG preview renders correctly in WhatsApp. A6: Track engagement — page views, time on page, scroll depth (25/50/75/100%), WhatsApp shares, email click-throughs, outbound clicks to government data sources. | Email: no images, no complex HTML (§10.4 distribution standards). WhatsApp share text includes article title, one-sentence hook, UTM-tagged URL, GovCompass sign-off (§10.3). | **Yes** — Tshepo approves notification email send (SLA: 12 hours) |

---

## 3. Publication Schedule

The publication order interleaves municipal articles (Part 4) before some provincial articles (Part 3) to align with 2026 local government election relevance, per PRD §15.4 and Appendix D.

| Seq | Article ID | Title | Part | Sphere | Target | Status |
|-----|-----------|-------|------|--------|--------|--------|
| 1 | 1.1 | The Architecture of the State | 1: Foundational Framework | All | Q3 2026 (Week 10) | Planned |
| 2 | 1.2 | Following the Money | 1: Foundational Framework | All | Q3 2026 (Week 12) | Planned |
| 3 | 1.3 | Who Watches the Watchers | 1: Foundational Framework | All | Q3 2026 (Week 14) | Planned |
| 4 | 1.4 | Measuring What Matters | 1: Foundational Framework | All | Q3 2026 (Week 16) | Planned |
| 5 | 2.1 | Inside the Machine | 2: National Government | National | Q4 2026 (Week 18) | Planned |
| 6 | 2.2 | The Report Card | 2: National Government | National | Q4 2026 (Week 20) | Planned |
| 7 | 2.3 | When National Policy Hits Reality | 2: National Government | National | Q4 2026 (Week 22) | Planned |
| 8 | 4.1 | Where the Rubber Meets the Road | 4: Municipal Government | Municipal | Early Q1 2027 (Week 26) | Planned |
| 9 | 4.2 | The Municipal Crisis | 4: Municipal Government | Municipal | Early Q1 2027 (Week 28) | Planned |
| 10 | 3.1 | The Awkward Middle Child | 3: Provincial Government | Provincial | Mid Q1 2027 (Week 30) | Planned |
| 11 | 4.3 | Section 139 and Beyond | 4: Municipal Government | Municipal | Mid Q1 2027 (Week 32) | Planned |
| 12 | 3.2 | Health and Education at the Provincial Coal Face | 3: Provincial Government | Provincial | Late Q1 2027 (Week 34) | Planned |
| 13 | 4.4 | Metropolitan vs Rural | 4: Municipal Government | Municipal | Late Q1 2027 (Week 36) | Planned |
| 14 | 3.3 | When Provinces Fail | 3: Provincial Government | Provincial | Late Q1 2027 (Week 38) | Planned |
| 15 | 5.1 | The Citizen's Toolkit | 5: Citizen's Toolkit | All | Early Q2 2027 (Week 42) | Planned |

---

## 4. Quality Gates Summary

This table consolidates the approval gates from the Autonomous Operations (§5.2) with the pre-publication checklist from the Content Style Guide (§13).

### 4.1 Approval Gates

| Gate | Who Approves | What They Check | SLA |
|------|-------------|-----------------|-----|
| Research brief | Tshepo | Sources are from high-credibility institutions (AGSA, Treasury, DPME, StatsSA, academic journals). Expert contacts are relevant. Data points are current. Research scope matches the article's generation prompt. | 24 hours |
| Article draft | Tshepo | Content quality, factual accuracy, O'Reilly voice/tone, expert anecdote framing, non-partisan positioning, BLUF structure, practical framework ending. | 72 hours |
| Quality report | Tshepo | Final editorial sign-off — schema valid, tone correct, sources verified, all links tested, no partisan language, all brand attributes hold. | 24 hours |
| PR merge | Tshepo | Content renders correctly in deploy preview — article loads, sphere tag colour correct, OG image present, prev/next navigation works, callouts render, Lighthouse scores pass thresholds. | 24 hours |
| Notification email | Tshepo | Email copy, subject line format, link correctness, UTM parameters. | 12 hours |
| Infrastructure changes | Tshepo | Any modification to config, DNS, templates, or components. | Immediate |
| Remediation plans | Tshepo | Response to any performance, SEO, or accessibility regression. | 24 hours |

### 4.2 Pre-Publication Checklist

Every article must pass all 13 checks from the Content Style Guide (§13) before proceeding to publication. A3 verifies these as part of the Editorial QA phase and reports pass/fail status in the quality report.

| # | Check | Verified By |
|---|-------|-------------|
| 1 | Article opens with a BLUF conclusion in the first 1–2 paragraphs | A3 |
| 2 | Article uses "you" to address the reader throughout | A3 |
| 3 | Zero bullet points in article body prose | A3 |
| 4 | At least 2–3 named expert anecdotes with institutional affiliation | A3 |
| 4a | Every named expert verified as a real person with published research in the cited field (Google Scholar, institutional pages, ORCID — minimum two independent sources) | A3 |
| 4b | All expert insights paraphrased from verifiable published research with specific publications cited (no fabricated quotes — zero tolerance) | A3 |
| 4c | Resources section present with links to verifiable publications and institutional sources cited in expert blocks | A3 |
| 5 | Article ends with a Practical Framework section (`:::framework` callout) | A3 |
| 6 | Every substantive claim supported by a specific data point or source | A3 |
| 7 | All technical terms defined on first use | A3 |
| 8 | Article free of hype words, emoji, and gamified language | A3 |
| 9 | Article free of partisan editorial opinion | A3 |
| 10 | All source links direct to primary documents (AGSA, Treasury, DPME, StatsSA) | A3 |
| 11 | Metadata includes reading time, sphere tag, and publish date | A3 |
| 12 | Total article page weight under 400KB (target: 200KB) | A7 |
| 13 | All five brand attributes hold (Trustworthy, Empowering, Accessible, Serious, Non-partisan) | A3 + Tshepo |

---

## 5. Content Production Rhythm

The 14-day article cycle from the Autonomous Operations (§5.4), showing which agent is active each day and what artefacts are produced.

```
Day  1  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
     │  A1: Begin source compilation
     │      → Government reports (AGSA, Treasury, DPME, StatsSA)
     │      → Academic literature search
     │      → Expert contact identification
     │
Day  2  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
     │  A1: Continue research
     │      → Verify source URLs are live and current
     │      → Compile data points for the article
     │
Day  3  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
     │  A1: Draft research brief
     │      → Deliver: Research brief (sources, experts, data)
     │      → 🚦 GATE: Tshepo approves research brief (24h SLA)
     │
Day  4  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     │  A2: Begin article drafting
     │      → Load approved brief + generation prompt
     │      → Generate frontmatter (Zod schema)
     │      → Write BLUF opening
     │
Day  5  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     │  A2: Continue drafting
     │      → Body sections in O'Reilly conversational register
     │      → Expert anecdotes integrated (2–3, named, attributed)
     │
Day  6  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     │  A2: Continue drafting
     │      → Cross-references to other GovCompass articles
     │      → Sources and Further Reading section
     │
Day  7  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     │  A2: Continue drafting
     │      → Practical Framework concluding section
     │      → SEO meta description + title
     │
Day  8  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     │  A2: Finalise draft
     │      → Deliver: Complete Markdown file (≥4,500 words)
     │      → 🚦 GATE: Tshepo approves draft (72h SLA)
     │
Day  9  ████████████████████████████████████████████
     │  A3: Begin editorial QA
     │      → Zod schema validation
     │      → Proofread (grammar, spelling, punctuation)
     │      → Tone enforcement (flag academic/corporate drift)
     │      → Verify BLUF, anecdotes, framework, sources
     │
Day 10  ████████████████████████████████████████████
     │  A3: Complete editorial QA
     │      → Test all hyperlinks (internal + external)
     │      → Flag partisan language, hype words, unexplained jargon
     │      → Deliver: Quality report (pass/fail per criterion)
     │      → 🚦 GATE: Tshepo approves quality report (24h SLA)
     │
Day 11  ▓▓▓▓████████████████████████████████████████
     │  A2 + A3: Revision cycle
     │      → A2 incorporates Tshepo's feedback + A3 findings
     │      → A3 re-validates corrected content
     │
Day 12  ▓▓▓▓████████████████████████████████████████
     │  A2 + A3: Finalise revision
     │      → Deliver: Final validated Markdown file
     │      → 🚦 GATE: Tshepo approves final version (24h SLA)
     │
Day 13  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
     │  A4: Publishing pipeline
     │      → Create feature branch, commit, open PR
     │      → Verify build succeeds on deploy preview
     │      → Verify: article renders, sphere tag, OG image, nav links
     │  A7: Post-deploy verification
     │      → Lighthouse audit (Perf >90, A11y >95, SEO >95)
     │      → Page weight check (<400KB target <200KB)
     │      → Pagefind index verification
     │      → 🚦 GATE: Tshepo approves PR merge (24h SLA)
     │  A4: Merge to main → production deploy
     │
Day 14  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
     │  A5: Distribution
     │      → Draft notification email
     │      → 🚦 GATE: Tshepo approves email send (12h SLA)
     │      → Send notification to subscriber list
     │      → Verify WhatsApp share message + OG preview
     │  A6: Begin monitoring
     │      → Track: views, time on page, scroll depth,
     │        WhatsApp shares, data source outbound clicks
     │
Days 14–28  (Overlaps with next article's research phase)
     │  A6: Ongoing engagement monitoring
     │      → Article performance ranking
     │      → Monthly dashboard compilation
     │      → Feed insights back to A1 for next article
```

**Legend:**
- `░` Research phase (A1)
- `▓` Drafting/revision phase (A2)
- `█` Editorial QA phase (A3)
- `▒` Publishing phase (A4 + A7)
- `░` Distribution/monitoring phase (A5 + A6)

---

## 6. Document Maintenance

This document is updated when the publication schedule changes, when a new approval gate is introduced, or when the production cycle timing is adjusted. The three source documents remain the authorities for their respective domains:

- **[Article Series Plan](GovCompass_article_series.md)** — authoritative for article titles, generation prompts, and series structure
- **[Content Style Guide](GovCompass_Content_Style_Guide.md)** — authoritative for editorial standards, voice, tone, and pre-publication checklist
- **[Autonomous Operations Instruction Set](GovCompass_Autonomous_Operations.md)** — authoritative for agent responsibilities, skills, MCPs, and approval gate definitions

In the event of a conflict between this execution plan and any source document, the source document takes precedence.

---

*Last updated: 2026-02-17*
