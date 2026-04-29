# GovCompass Book Program — Brief & Execution Plan

*Self-contained execution document. Designed to be transferred to a separate project workspace and executed without reference to the GovCompass site repository.*

---

## 0. How to use this document

This document defines a **two-product publishing program** built from a single body of source material. It is structured so a new project (separate repo, separate working directory, separate Claude Code session) can pick it up and execute end-to-end.

To start the new project you will need to bring three things:

1. This document.
2. The **source corpus**: 79 markdown articles from `src/content/articles/` in the GovCompass repo (~568,000 words; average ~7,200 words per article). Copy these as read-only reference material into the new project's `/source/` directory.
3. The **GovCompass Content Style Guide** (`docs/GovCompass_Content_Style_Guide.md`) and the **Domain Model** (`docs/DOMAIN_MODEL_GovCompass.md`). These define voice, terminology, and non-partisanship rules that both books must inherit.

Everything else needed to execute is in this document.

---

## 1. Program overview

### 1.1 Context

GovCompass (govcompass.co.za) publishes long-form civic education articles on how the South African state works, why outcomes are what they are, and what reform would require. The site has **79 articles** across **5 thematic series** (Core, Economic Growth, Human Development, Reform Agenda, Safety & Security) totalling **~568,000 words** (average ~7,200 words per article). The audience is South African citizens with prepaid data and limited prior policy literacy. The editorial line is non-partisan and evidence-anchored.

Series breakdown: Core 15 · EG 16 · HD 15 · RA 17 · SS 16.

### 1.2 Program goal

Convert the existing body of work into two complementary printed/digital products that extend reach beyond the website:

- A **general-public book** that serves as a civic on-ramp.
- A **technical analyst series** that serves as a reference and teaching resource.

The two products share research, glossary, citations, and visual assets. They differ in voice, depth, and reading model.

### 1.3 The two products at a glance

| | **Product A — The Compass** | **Product B — The Analyst Series** |
|---|---|---|
| **Audience** | General public, no prerequisites | Policy analysts, journalists, postgraduates, civil servants, CSO staff |
| **Reading model** | Linear narrative, cover-to-cover | Reference + course; volumes read independently |
| **Length** | ~90,000 words, single volume | ~50,000 words × 4 volumes (~200,000 words) |
| **Reading level** | Grade 10 | Grade 14 (university) |
| **Voice** | Narrative, story-led, hooks before theory | Analytical, structured, dense with citations |
| **Visuals** | 20–30 figures, accessible infographics | 60–80 figures, technical charts, methodology boxes |
| **Format** | Trade paperback + ebook | Boxed set or individually sold; ebook + print-on-demand |
| **Price target** | R250–R350 (commercial trade pricing) | R450–R600 per volume; R1,800–R2,200 boxed |
| **Channel** | CNA, Exclusive Books, Takealot, Amazon KDP | Direct-to-institution, Loot, Amazon KDP, university bookshops |
| **Source ratio** | ~16% of source material survives (90k of 568k) | ~35% of source material survives (200k of 568k) |
| **Build order** | First | Second (reuses A's research backbone) |

### 1.4 Why this sequencing

Product A forces the hardest editorial decisions — what is the irreducible spine, which arguments matter most, which examples carry weight. The shared assets produced during A's distillation phase (chapter source maps, stat-check spreadsheet, master glossary, citation database, figure library) become 60–70% of the foundation for Product B. Building B first would invert this and produce a less disciplined A.

A and B can run in **partial parallel from Phase 4 onwards** — once A's draft is locked, a separate drafter can begin B Volume 1 while A is in editing.

---

## 2. Product A — *The Compass*

### 2.1 Brief

**Working title:** *The Compass: A Citizen's Guide to How South Africa Actually Works — and How to Fix It*

**One-line promise:** Read this and you will understand the South African state well enough to hold it accountable.

**Reader profile:** A South African adult, voting-age or near it, without formal training in politics, economics, or law. Curious but time-pressured. Likely to read in 30-minute sittings on a commute or before bed. May not finish if the first 20 pages do not pay off.

**Editorial posture:** Non-partisan but unflinching. Names problems clearly. Names reforms clearly. Does not name parties as villains or heroes.

**Success looks like:** A reader who finishes the book can (a) explain the three spheres of government to a friend, (b) read their own municipality's audit outcome, (c) name three reforms they would push for and why, (d) take one concrete civic action within 30 days of finishing.

### 2.2 Outline

**Target:** ~90,000 words · 14 chapters · 3 parts · 20–30 figures · ~300 pages trade paperback

**Front matter**
- **Prologue** — A single citizen's day (water, taxi, clinic, school, payslip) mapped to the spheres and budgets that shape it. Hook before theory.
- **How to read this book** — Three reading paths: 30-min skim, 3-hour core, full read.

**Part I — The Machine** *(≈25,000 words)*
*"You can't fix what you can't see."*

1. **The Architecture of the State** — Three spheres, separation of powers, the Constitution as operating system. *(Source: 1-1, 1-2, 1-3)*
2. **Following the Rand** — Where money comes from, how it's divided, why your municipality is broke. *(Source: 2-1, 2-2, 2-3)*
3. **Where the Work Actually Happens** — Provinces as the awkward middle, municipalities as the front line. *(Source: 3-1, 3-2, 3-3)*
4. **The Accountability Toolkit** — AG reports, public participation, your right to know. *(Source: 4-x, 5-1, 5-2)*

**Part II — The Verdict** *(≈40,000 words)*
*"Forty years from democracy, what do the numbers say?"*

5. **The Seven-Thousand-Rand Economy** — Growth diagnosis, comparator countries, why we stalled. *(Source: eg-1-x, eg-3-1)*
6. **Beyond GDP: The Development Verdict** — Life expectancy, learning outcomes, the reinforcing cycle. *(Source: hd-1-x, hd-2-1, hd-3-1)*
7. **The Schooling Paradox** — In school, not learning; the link to the wage. *(Source: hd-3-x)*
8. **Violence as the Hidden Tax** — The public-health framing of crime. *(Source: hd-2-2, ss-2-x)*
9. **The Broken Pipeline** — Why the justice system catches almost no one. *(Source: ss-2-1, ss-2-3, ss-2-4)*
10. **Why Institutions Fail** — The eight tests, capture, capability collapse. *(Source: ra-1-1, ra-1-2)*

**Part III — The Repair Manual** *(≈22,000 words)*
*"What working looks like, and what it would take to get there."*

11. **Fixing the Front Line** — Education, primary healthcare, water, electricity: the four reforms with the highest leverage. *(Source: ra-2-x, ra-4-x)*
12. **Re-architecting Safety** — Three-tier policing, independent investigation, sentencing reform. *(Source: ss-3-x)*
13. **The Anti-Capture Architecture** — Constitutional vs legislative reform, sequencing. *(Source: ra-5-1, ra-5-2, ss-4-1)*
14. **From Citizen to Reformer** — A practical 12-month civic action plan. *(Source: 5-3, ra-5-4, hd-5-x)*

**Back matter**
- **Appendix A:** The MPI — how to read your municipality's report card. *(Source: eg-4-x)*
- **Appendix B:** A glossary in plain English (60–80 terms).
- **Appendix C:** Where to find the data yourself (links to AG, Treasury, StatsSA, GovCompass).
- **Source notes by chapter** — keyed to the original articles on govcompass.co.za so the book becomes a gateway, not a substitute.

---

## 3. Product B — *The GovCompass Analyst Series*

### 3.1 Brief

**Working title:** *The GovCompass Analyst Series* (4 volumes)

**One-line promise:** A practitioner-grade reference for understanding and fixing the South African state, written for the people who advise, report on, or work inside it.

**Reader profile:** Policy analysts at think tanks, NGOs, government departments and parliamentary research units. Investigative and policy journalists. Postgraduate students in public policy, public administration, development economics, criminology, public health. Civil society programme leads. Consultants briefing clients on the South African operating environment.

**Editorial posture:** Same non-partisan line as A, but with full methodological transparency, named sources, statistical caveats, contested-evidence footnotes. The reader is trusted with complexity and disagreement.

**Success looks like:** Adopted as supplementary reading in at least three South African public policy / public administration master's programmes within 18 months of publication. Cited in Parliamentary Monitoring Group briefs, AG reports commentary, and credible policy journalism.

### 3.2 Volume structure

**Volume 1 — *How South Africa Works: The State as a System*** *(~50,000 words)*
The constitutional architecture, intergovernmental fiscal system, concurrent functions, accountability institutions. Built from the GovCompass core series (1-x through 5-x) plus expanded methodology on reading public finance documents.

**Volume 2 — *The Growth Question: Diagnosing a Stalled Economy*** *(~50,000 words)*
Growth diagnostics, comparator analysis, infrastructure and capital, the execution machine, the Municipal Performance Index. Built from the EG series (eg-1-x through eg-5-x) plus the MPI methodology in full.

**Volume 3 — *The Human Development Crisis: Health, Learning, and the Reinforcing Cycle*** *(~50,000 words)*
Beyond-GDP framework, life expectancy and the violence-health interaction, the schooling paradox, the development cycle, planetary limits. Built from the HD series (hd-1-x through hd-5-x).

**Volume 4 — *The Reform Agenda: What It Would Take to Fix It*** *(~50,000 words)*
The eight institutional tests, sectoral reform programmes (education, healthcare, water, electricity, settlements), provincial dysfunction, the safety and justice rebuild, anti-capture architecture, sequencing and funding. Built from the RA series (ra-1-x through ra-5-x) and the SS reform chapters (ss-3-x, ss-4-x).

Each volume includes:
- A standalone introduction (so volumes can be bought individually).
- Methodology appendix (data sources, statistical caveats, definitions used).
- Full citation apparatus (footnotes, not endnotes — analyst readers expect them on the page).
- A "Further reading" guide pointing to AG reports, Treasury documents, peer-reviewed literature, and the GovCompass live site.
- Cross-references to the other three volumes where arguments interlock.

### 3.3 What B includes that A does not

- Methodology boxes after every major statistical claim.
- Contested-evidence footnotes where the literature disagrees.
- Named legislation, regulations, and case law.
- Quantitative annexures and replication data where applicable.
- A glossary that retains technical terminology rather than translating it down.
- Diagrams of intergovernmental flows, concurrent function maps, and reform sequencing dependencies.

---

## 4. Shared assets (the program backbone)

These are produced once and feed both products. Build them in Phase 2 of A and treat as permanent program infrastructure.

| Asset | Format | Purpose | Owner |
|---|---|---|---|
| **Source map** | Spreadsheet | Each source article → which book chapters consume it, % retention, what gets cut | Editor |
| **Stat-check spreadsheet** | Spreadsheet | Every numeric claim → source, date, methodology note, freshness flag | Researcher |
| **Master glossary** | Markdown | All terms with two definitions per term: plain-English (for A) and technical (for B) | Editor |
| **Citation database** | Zotero / BibTeX | All sources with full metadata, used by B and lightly by A | Researcher |
| **Figure library** | SVG + source data | All charts, maps, diagrams. A uses simplified versions; B uses full versions | Designer |
| **Voice & non-partisanship guide** | Markdown | Inherited from GovCompass Content Style Guide; extended for book-length argument | Editor |
| **Fact-check log** | Spreadsheet | Issues raised in expert review → resolution → final-text decision | Editor |

---

## 5. Execution plan

### 5.1 Total program shape

**Total elapsed time:** ~14–18 months part-time, or ~9–12 months with a dedicated drafter for B.

**Total out-of-pocket cost (self-published, indicative ZAR):**
- Product A: R55,000–R150,000 (developmental editor, copy edit, design, ISBN, cover, print setup, expert reviewers).
- Product B: R120,000–R280,000 (four developmental edits, four copy edits, technical reviewers, more figures, boxed-set design).
- Shared infrastructure (citation tooling, figure library setup, fact-checker): R20,000–R40,000.
- **Total program: R195,000–R470,000.**

Traditional publishing replaces most of this cost with smaller royalties; decide per product in Phase 1.

### 5.2 Phase plan

#### Phase 1 — Program architecture (Weeks 1–4)
- Confirm both product briefs against current source material; flag any topics that have shifted since publication.
- Produce a **one-page brief** per product (audience, promise, success criteria, voice).
- Choose channel for each product: self-publish vs. traditional vs. hybrid.
- Stand up shared infrastructure: citation database, source map skeleton, glossary skeleton, figure library structure.
- Recruit: developmental editor (A first), technical reviewer pool for B (3–5 named experts spanning economics, public finance, public health, criminology, education).
- **Deliverable:** Two signed-off briefs + populated tooling stubs.

#### Phase 2 — Distillation pipeline (Weeks 5–8)
This phase exists to prevent the most common failure mode: drafting at scale before the editorial spine is locked.

For each chapter of A and each volume of B:
- Build the **source map** entry: which articles feed it, which 3–5 arguments survive, which examples carry weight, what gets cut.
- Write a **chapter brief** (1 page: thesis, narrative arc, key evidence, opening hook, closing turn) before any prose is drafted.
- Identify figures needed and add to figure library backlog.
- Identify glossary terms touched.

Articles are written for screen-skimmers; books are read linearly. Every chapter needs a narrative spine — a question, a story, or a journey — not just a topic.

- **Deliverable:** 14 chapter briefs (A) + 4 volume briefs with chapter-level breakdowns (B). Source map populated for all 79 articles.

#### Phase 3 — Vertical slice (Weeks 9–12)
- Draft **Prologue + Chapter 1 of A** as a vertical slice of the entire pipeline (research → draft → figures → edit → expert review).
- Send to **3–5 lay readers** (not policy people). Iterate until a stranger can read without bouncing.
- Run the same slice for **Volume 1 introduction + Chapter 1 of B**, with two analyst readers.
- Lock voice, figure style, citation style, and chapter template for both products.
- **Deliverable:** Two reviewed vertical slices + locked style templates.

#### Phase 4 — Drafting Product A (Weeks 13–28, ~16 weeks)
- Target ~6,000 words of finished prose per week.
- Draft in chapter order — Part I establishes vocabulary the rest needs.
- Maintain the stat-check spreadsheet and glossary as you write; retrofitting these later is brutal.
- Begin commissioning A's figures in batches as chapters lock.
- **Trigger to start B drafting:** When A reaches end of Part II draft (~Week 22), B Volume 1 drafting can begin in parallel using the now-mature shared infrastructure.
- **Deliverable:** Complete first draft of A.

#### Phase 5 — A editing + B drafting in parallel (Weeks 25–40)

*A track:*
- Self-edit pass for argument and cuts (expect to lose 15–20%).
- Developmental editor.
- Sensitivity & accuracy review by 2–3 domain experts.
- Non-partisan tone audit.
- Copy edit and proofread.
- Design and typeset.

*B track:*
- Volume 1 draft (Weeks 25–32).
- Volume 2 draft (Weeks 29–36).
- Volume 3 draft (Weeks 33–40).
- Volume 4 draft (Weeks 37–44).
- Volumes can overlap because each draws from a distinct source-series cluster.

- **Deliverable:** A is camera-ready by Week 36; B has full first drafts by Week 44.

#### Phase 6 — A launch + B editing (Weeks 37–56)

*A launch:*
- Cover, ISBN, legal deposit (National Library of SA), print-on-demand setup, distribution.
- Launch leverages the live site: book becomes the on-ramp, articles become the deep-dive. Add a "Read the book" CTA site-wide; add "Read the source articles" QR codes inside the book.
- POPIA-compliant pre-order list piped from the existing site.

*B editing:*
- Each volume goes through developmental edit → technical review (named experts per domain) → copy edit → proofread.
- Run as a pipeline so volumes finish editing in sequence.

- **Deliverable:** A is on sale; B is in late-stage editing.

#### Phase 7 — B launch (Weeks 57–72)
- Box set design and print setup; individual volumes also available.
- Direct outreach to public policy / public administration master's programmes for adoption.
- Academic and policy-press review copies.
- Cross-promotion from A and from the live site.
- **Deliverable:** B boxed set on sale; institutional adoption pipeline active.

### 5.3 Cross-product gates

These are the moments where a decision on one product affects the other. Do not skip:

- **End of Phase 2:** Are the chapter briefs of A and the volume briefs of B genuinely complementary, or does B duplicate A at a longer length? If duplicative, restructure B around methodology and depth, not added topics.
- **End of Phase 3:** Are the two voices distinct enough that a reader of B would not feel patronised by A and vice versa? If not, separate the voice rules harder.
- **Mid-Phase 5:** Is any expert reviewer of B raising issues that invalidate claims already locked in A? If yes, decide whether to issue an A erratum or hold for second printing.

---

## 6. Risks

1. **Non-partisanship under book-length scrutiny.** Articles can hedge; books take positions. Decide upfront how strong the reform recommendations get — soft reads as evasive, hard invites attack. The RA source series already commits, so lean *clear but evidence-anchored* in both products.
2. **Data freshness.** Books printed in 2026 are read in 2028. Frame statistics as illustrative-of-pattern, not point-in-time. Direct readers to the live site for current numbers. Consider an annual digital errata sheet.
3. **Scope creep.** Seventy-nine articles (~568,000 words) want to be in the books. They cannot all fit, even in B (which retains only ~35% of source). The discipline of Phase 2 is what makes or breaks the program.
4. **Voice contamination between A and B.** If the same drafter writes both back-to-back without a voice reset, B can drift simple or A can drift technical. Lock voice in Phase 3 and have the editor flag drift in every chapter review.
5. **Expert-reviewer asymmetry.** B's credibility depends on named expert reviewers across at least four domains. Recruit them in Phase 1, not Phase 5 — late recruitment compresses review time and weakens the result.
6. **Cannibalisation fear.** The website team may worry the books reduce site traffic. The opposite is the design: both books treat the site as the live, current, deep-dive layer and route readers to it. Make this explicit in launch comms.

---

## 7. Inputs to bring to the new project

When you start the separate project workspace, populate it with:

- `/source/articles/` — 79 markdown articles from `src/content/articles/` (~568,000 words total).
- `/source/style-guide.md` — copy of `docs/GovCompass_Content_Style_Guide.md`.
- `/source/domain-model.md` — copy of `docs/DOMAIN_MODEL_GovCompass.md`.
- `/source/manifesto.md` — copy of `docs/Manifesto.md`.
- `/program/this-document.md` — this brief.
- `/program/source-map.xlsx` — empty template (build in Phase 2).
- `/program/stat-check.xlsx` — empty template (build in Phase 2).
- `/program/glossary.md` — empty template (build in Phase 2).
- `/A/` — Product A working directory (chapter briefs, drafts, figures).
- `/B/` — Product B working directory (volume briefs, drafts, figures).
- `/shared/figures/` — figure library, source data, SVG outputs.

A `CLAUDE.md` at the new project root should reference this document as the single source of truth for the program plan.

---

## 8. Next decisions before execution

- Confirm channel strategy per product: self-publish, traditional, or hybrid.
- Confirm budget envelope and whether a dedicated drafter is in scope for B.
- Recruit the developmental editor for A (Phase 1 critical path).
- Identify and approach the 3–5 named technical reviewers for B (Phase 1 critical path).
- Decide whether to set up the new project workspace now or after Phase 1 sign-off on this plan.
