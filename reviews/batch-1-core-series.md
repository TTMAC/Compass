# Batch 1 — Core Series Editorial Standards Review

**Scope:** Core Series (Parts 1–5), 15 articles
**Standard:** GovCompass Content Style Guide
**Initial review:** 2026-04-14 (three parallel manual read-throughs)
**Fix sweep + post-fix verification:** 2026-04-27
**Automated pass:** Clean — 15/15 over 4,500 words, 0 frontmatter / linkage / emoji / forbidden-term issues (see `reviews/automated-pass.md`)
**Build:** `npm run build` — 104 pages built clean, Pagefind indexed 103 pages

---

## Status Summary

The full Should-fix and Blocker punch list from the 2026-04-14 review has been resolved. Most fixes were applied in the corpus between the original review and the 2026-04-27 verification pass; the residual two items (one SF-4, one SF-5) were closed in the 2026-04-27 sweep.

**Result: 15/15 Pass. 0 blockers, 0 should-fix items remaining.**

---

## Final Pass/Fail Matrix

| # | Slug | Words | Verdict | Open issues |
|---|---|---:|:-:|---|
| 1 | 1-1-architecture-of-the-state | 7,310 | **Pass** | — |
| 2 | 1-2-who-does-what | 6,488 | **Pass** | — |
| 3 | 1-3-how-the-spheres-interact | 6,928 | **Pass** | — |
| 4 | 2-1-following-the-money | 7,998 | **Pass** | — |
| 5 | 2-2-the-budget-process | 7,557 | **Pass** | — |
| 6 | 2-3-from-treasury-to-your-town | 8,050 | **Pass** | — |
| 7 | 3-1-the-awkward-middle-child | 7,937 | **Pass** | — |
| 8 | 3-2-health-and-education-at-the-provincial-coal-face | 7,510 | **Pass** | — |
| 9 | 3-3-municipal-councils | 9,764 | **Pass** | — |
| 10 | 4-1-your-right-to-participate | 9,036 | **Pass** | — |
| 11 | 4-2-ward-committees-and-community-engagement | 7,987 | **Pass** | — |
| 12 | 4-3-making-public-submissions | 6,897 | **Pass** | — |
| 13 | 5-1-reading-the-auditor-generals-reports | 7,308 | **Pass** | — |
| 14 | 5-2-using-government-data | 7,144 | **Pass** | — |
| 15 | 5-3-becoming-an-active-citizen | 5,990 | **Pass** | — |

---

## Resolution log

### Blockers (B1, B2)

Both originally in `3-3-municipal-councils`.

- **B1 — § Council Oversight: AGSA/COGTA evidentiary anchor on MPAC effectiveness** — Resolved. The section now opens with the *Consolidated General Report on Local Government Audit Outcomes 2023-24* finding that "only two — the City of Cape Town and the City of Ekurhuleni — effectively discharged their responsibilities," and the expert callout cites COGTA, MFMA Circular No. 32, and the AGSA 2023-24 report by name. (`3-3-municipal-councils.md` lines 181–203.)
- **B2 — § Coalition Governance: BLUF + dated 2021 metro example with sourced service-impact data** — Resolved. The section opens with an explicit BLUF ("coalition instability has translated directly into worse audit outcomes…"), the rise from 27 hung councils after 2016 to 66 after 2021, and Tshwane / Joburg / Ekurhuleni / Nelson Mandela Bay impact data. The expert callout cites Zweni, Koma & Ndevu (2024), *Journal of Local Government Research and Innovation*, with DOI. (`3-3-municipal-councils.md` lines 233–251.)

### SF-1 — Expert-anecdote attribution sweep

All six flagged articles now name the publication and year in-text rather than relying on the Resources section.

- `1-1` — PARI on Section 139 anchored to "A 2020 study by the Public Affairs Research Institute" (line 176); Naidoo cited as "*Journal of Public Administration* (2016)" in the body callout.
- `1-2` — NEEDU now cited as "*National Report 2012* on the state of literacy teaching and learning in the foundation phase (published 2013)" (line 91); SACN cited as "2016 and 2021 *State of South African Cities Report* cycles" (line 158).
- `1-3` — PARI MinMEC fieldwork dated "between approximately 2014 and 2020" with sectors named (health, education, human settlements) (line 87); Naidoo cited as *Politikon* 36(2) (2009) and Springer *Handbook of Federal Countries* (2020) in body (line 148); Limpopo Section 100 case named in body (lines 143–145).
- `2-1` — FFC callout cites "*Submission for the Division of Revenue 2023/24*" by name (line 89); SACN data anchored to "2022/23 financial year" (line 142).
- `2-2` — PBO callout cites "2023 and 2024 analyses of the Medium-Term Budget Policy Statement" (line 92); PMG callout cites "2022 *Monitoring Parliament* reviews" (line 134).
- `3-2` — Spaull anchored to "the 2013 Centre for Development and Enterprise report 'South Africa's Education Crisis'" with a fully cited source line (lines 96–98).

### SF-2 — Time-sensitive figure date anchoring

- `2-1` — SACN's 70% own-revenue figure now anchored to "2022/23 financial year" (line 142).
- `2-3` — R300bn consumer debt now sourced to "National Treasury's quarterly *Local Government Revenue and Expenditure Report* (Section 71 of the MFMA)" with "by mid-2024" timing (line 174).
- `3-2` — TIMSS 2019 flagged as "the most recent TIMSS cycle for which South African results are available at the time of writing" (line 87).
- `5-1` — Western Cape clean-audit claim now sourced to "the AGSA's *Consolidated General Report on Local Government Audit Outcomes 2023-24* (August 2025)" by name in-text (line 138).

### SF-3 — Section openings leading with specifics

- `1-1` § "What Each Sphere Actually Does" now opens "Schedule 4 of the Constitution lists 33 functional areas of concurrent national and provincial competence." (line 71)
- `1-2` § "Grey Zones" now opens "Section 238 of the Constitution allows any sphere of government to delegate any of its powers to another sphere by agreement, and the Intergovernmental Relations Framework Act, 2005…" (line 163)
- `1-3` § "The Informal Channels" now opens with the concrete vignette "A provincial head of department who has worked alongside a municipal manager for a decade can resolve a cross-sphere coordination problem with a single phone call…" (line 229)
- `2-1` § "Where Money Gets Lost in the Pipeline" now opens "In 2022/23, **South African municipalities collectively failed to spend R5.8 billion of their conditional grants**, according to the Auditor-General's MFMA report…" (line 147)
- `4-2` § "Ward Committees: How They Actually Work" now opens "Section 72 of the Municipal Structures Act 117 of 1998 requires every municipality with a ward system — that is, all 213 Category B local municipalities and all 8 metros — to establish a ward committee… That single statutory provision creates roughly 4,000 ward committees across the country." (line 56)
- `4-3` § "Bills (Draft Legislation)" now opens "Section 59(1)(a) of the Constitution obliges the National Assembly to 'facilitate public involvement…' — and the Constitutional Court has enforced this duty by striking down legislation where the obligation was not met (see the *Doctors for Life International* judgment of 2006 and *Matatiele Municipality* of 2006)." (line 81)

### SF-4 — Jargon first-use definitions

- `1-1` — "audit outcome" no longer used in the article without a glossary; "clean audits" is defined inline at the first occurrence ("free of material misstatements and had no material findings on compliance with legislation or performance information").
- `2-3` — *load shedding* now defined on first use as "Eskom's scheduled rolling blackouts to manage supply shortfalls on the national grid" (line 111, 2026-04-27 fix). SDBIP defined inline at first use (line 238).
- `3-2` — *medico-legal claims crisis* defined on first use as "the accumulating financial liability that provincial health departments face when survivors of medical negligence, or their families, win damages against the state in court" (line 126).
- `3-3` — PR expanded as "proportional representation" inline at line 81; MPAC expanded with full institutional context.
- `4-2` — SDBIP defined on first use as "*Service Delivery and Budget Implementation Plan (SDBIP)*… the operational document that translates the budget into quarterly deliverables" (line 209).

### SF-5 — Unsourced specific claims

- `4-2` — The "2025 PARI study" reference flagged in the original review no longer appears in this article (since removed in the corpus).
- `5-2` — Census 2022 robustness claim reframed as "a live question — still being tested by Stats SA, the Statistics Council, and independent reviewers" (line 111). Textbook crisis now cites *Section27 and Others v Minister of Basic Education and Others* (North Gauteng High Court, 2012) by name in-text (line 253).
- `5-3` — Trust figures cited to "Afrobarometer's South Africa survey rounds… by Round 9 (2021-2023)" (line 146) with full Afrobarometer entry in Resources. Protest figure replaced with "Municipal IQ's *Municipal Hotspots Monitor*, which has tracked major service delivery protests at the municipal level since 2004" (line 164). The previously unsourced "2025 study by the Public Affairs Research Institute" sentence on youth IDP engagement was rephrased to attribute the under-20% voter-registration figure to the IEC's 2021 statistics and the IDP-engagement finding to PARI and the Good Governance Learning Network's *State of Local Governance* publications, with both sources added to the Resources list (2026-04-27 fix, line 152).

### SF-6 — Non-partisan framing tightened

- `2-1` — The previously flagged "This is not a story about corruption" line is no longer in the article; the equivalent argument is now made through the neutral framing "Underspending is not the opposite of corruption. It is a distinct pathology." (line 155).
- `3-1` § "Community Safety: The Missing Mandate" — Closing paragraph reframed to neutral reporting; "whether you agree with that reform proposal or not" language has been removed; reform proposals are described as "argue" without endorsement (lines 283–291).
- `5-1` § "Unqualified with Findings" subheading — Renamed from "Clean Books, Dirty Governance" to neutral "Accurate Books, Material Compliance or Performance Findings" (line 82).
- `5-2` § "When Citizens Use the Data" subheading — Renamed from "Accountability in Action" to neutral "Four Worked Examples" (line 237).

### SF-7 — Practical-tool grounding (single item)

- `3-3` § "Municipal Government and Community Safety" — Section heading revised from "the governance gap that affects you most" to "A Governance Gap the Council Does Not Close." Closing paragraph now adds a sixth diagnostic question to the council-evaluation framework rather than asserting a comparative-harm hierarchy (lines 331–341).

### Nits

The 56 nits flagged across the batch are stylistic polish items (mild phrasing softening, minor consolidations of repetition). They are not gating publication and can be handled opportunistically by an editor in normal copy review.

---

## Cross-Batch Patterns Worth Noting

1. **The core series is publication-ready.** 15/15 Pass verdicts, no blockers, clean automated pass, clean build. This is the MVP-critical batch and it has cleared the editorial standards review.
2. **Evidentiary-attribution precision was the dominant weakness, and it has been resolved.** Expert anecdotes now consistently name the specific publication and year in-text. The single-sweep fix anticipated in the original review proved correct.
3. **Non-partisan discipline holds.** Across 15 articles, only the four cosmetic SF-6 wording items were flagged — all addressed.
4. **BLUF and practical-tool compliance is 100%.** Every article opens with a bottom-line-up-front paragraph and closes with a usable framework, checklist, or toolkit.
5. **Word counts comfortably above the 4,500-word minimum.** Lightest is `5-3-becoming-an-active-citizen` at 5,990 words; heaviest is `3-3-municipal-councils` at 9,764 words. No article is at risk on length.

---

## Recommendation

**Batch 1 is closed. Move to Batch 2 (Economic Growth & Development, 16 articles).**

Method for Batch 2 should mirror Batch 1: automated pass first (already complete in `reviews/automated-pass.md` — 0 issues across all 16 EG articles), then a manual read-through against the voice/evidentiary checklist, then a batch report with severity triage. The eg-series was flagged in the original automated pass as data-heavy — particular attention to comparator-country figures and fiscal numbers will be the focus.
