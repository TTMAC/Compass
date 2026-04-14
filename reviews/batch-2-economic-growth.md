# Batch 2 — Economic Growth & Development Editorial Standards Review

**Scope:** Economic Growth & Development series, 16 articles
**Standard:** GovCompass Content Style Guide
**Automated pass:** Clean — 16/16 over 4,500 words, 0 frontmatter / linkage / emoji / forbidden-term issues (see `reviews/automated-pass.md`)
**Method:** Direct manual read-through against voice, structural, evidentiary, and accessibility criteria
**Date:** 2026-04-14

---

## Pass/Fail Matrix

| # | Slug | Words | Verdict | Blockers | Should-fix | Nits |
|---|---|---:|:-:|:-:|:-:|:-:|
| 1 | eg-1-1-the-seven-thousand-rand-economy | 7,372 | **Pass** | 0 | 3 | 3 |
| 2 | eg-1-2-how-we-got-here | 8,223 | **Pass** | 0 | 2 | 2 |
| 3 | eg-1-3-the-comparator-countries | 7,189 | **Pass** | 0 | 1 | 2 |
| 4 | eg-2-1-resource-optimisation | 8,417 | **Pass** | 0 | 1 | 2 |
| 5 | eg-2-2-infrastructure-foundations | 8,550 | **Fix** | 0 | 3 | 2 |
| 6 | eg-2-3-the-efficiency-transition | 7,636 | **Fix** | 0 | 2 | 2 |
| 7 | eg-2-4-innovation-driven-growth | 8,544 | **Pass** | 0 | 1 | 2 |
| 8 | eg-3-1-three-engines-of-growth | 9,365 | **Pass** | 0 | 1 | 2 |
| 9 | eg-3-2-the-execution-machine | 7,896 | **Pass** | 0 | 1 | 3 |
| 10 | eg-3-3-watching-the-watchers | 7,901 | **Pass** | 0 | 1 | 2 |
| 11 | eg-4-1-the-municipal-performance-index | 9,395 | **Pass** | 0 | 0 | 2 |
| 12 | eg-4-2-the-metro-rankings | 8,691 | **Pass** | 0 | 1 | 2 |
| 13 | eg-4-3-infrastructure-planning-vs-reality | 8,937 | **Pass** | 0 | 1 | 2 |
| 14 | eg-5-1-the-political-economy-of-growth | 9,191 | **Pass** | 0 | 1 | 2 |
| 15 | eg-5-2-from-strategy-to-reality | 11,207 | **Pass** | 0 | 1 | 2 |
| 16 | eg-5-3-your-economic-citizenship | 9,266 | **Pass** | 0 | 1 | 2 |

**Summary: 14 Pass, 2 Fix, 0 Rewrite. 0 blockers. Both Fix items are structural (heading consistency) rather than content.**

---

## Blockers (must fix before publication)

**None across the entire batch.** The EG series is substantively publication-ready.

---

## Should-fix (recommended before publication)

Grouped by pattern, cross-article.

### SF-1 — Structural: missing opening H2 heading and heading-case inconsistency in Part 2

Two articles in Part 2 deviate from the H2 pattern used across all other articles in both Batch 1 and Batch 2:

- **`eg-2-2-infrastructure-foundations`** — has **no opening H2 heading** before the BLUF. The intro paragraph at line 51 ("Every growth strategy in history...") begins without a parent `##` section header. Every other article in the core and EG series opens with an H2 like `## A $7,000 Economy Stuck in First Gear` or `## The Economy Was Built This Way on Purpose`. This breaks the table-of-contents generation and the visual rhythm of the article.
- **`eg-2-2-infrastructure-foundations`** and **`eg-2-3-the-efficiency-transition`** — use **sentence-case subheadings** (`## The energy crisis: how South Africa lost the lights`, `## Manufacturing scale-up: where South Africa can realistically compete`, `## Services export development: the underexploited advantage`) inconsistent with the Title Case used across all 14 other EG articles and all 15 core-series articles.

**Recommendation:** Add an opening H2 to `eg-2-2` and convert both articles' subheadings to Title Case. Mechanical sweep, ~15 minutes.

### SF-2 — Expert-anecdote attribution lacks specific publication titles/years

Several expert blocks name the institution but not the specific publication or year. This is the same pattern flagged in Batch 1 (SF-1).

- **`eg-1-1`** — WEF "Global Competitiveness Reports have consistently classified" — no year; Harvard Growth Lab "Atlas of Economic Complexity and associated working papers" — no year.
- **`eg-1-2`** — TIPS research on the minerals-energy complex — institution named, no specific working paper title/year; REDI3x3 research on structural unemployment — same gap.
- **`eg-2-1`** — Minerals Council South Africa "in its 2023 report" — year present, report title missing.
- **`eg-2-4`** — Porter *The Competitive Advantage of Nations* (1990) cited correctly; other expert blocks less specific.
- **`eg-3-1`** — TIPS evaluation of MSME support architecture — no publication year.
- **`eg-3-2`** — NPC Assessment, PARI Analysis, GTAC Research — all named but no specific publication years.
- **`eg-3-3`** — expert blocks reference DPME frameworks without citing specific DPME publications.
- **`eg-4-2`** — SACN *State of South African Cities Report* — no specific cycle year (2016, 2021).
- **`eg-4-3`** — DBSA Infrastructure Barometer, Water Research Commission Analysis, National Treasury Infrastructure Analysis — no publication years.
- **`eg-5-1`** — Acemoglu & Robinson reference uses "their landmark work on why nations fail" — should cite *Why Nations Fail* (2012).
- **`eg-5-2`** — Rwanda EDPRS model cited without specific implementation-review year.
- **`eg-5-3`** — International Budget Partnership *Open Budget Survey* — no cycle year.

**Recommendation:** Single-sweep pass adding `(Publication Title, Year)` parentheticals to expert-block source lines. Same fix pattern as Batch 1's SF-1.

### SF-3 — Time-sensitive figures without explicit date anchoring

- **`eg-1-1`** — Comparator GDP per capita figures (Turkey $10,000, Malaysia $12,000, Chile $16,000, Poland $18,000, South Korea $33,000) use "approximately" without a year. These are the headline comparative numbers of the article — each should be anchored to a specific year (e.g., "as of 2023 World Bank data").
- **`eg-1-1`** — Gini coefficient "0.63 or above" — no specific StatsSA or World Bank survey year.
- **`eg-1-1`** — Gross fixed capital formation "sits below 15%" — no year anchor.
- **`eg-1-1`** — "Debt service costs exceeded R380 billion" — year present (2024/25), but should cite the specific MTBPS.
- **`eg-1-2`** — Manufacturing share "approximately 12 per cent by the mid-2020s" — should cite a specific StatsSA release.
- **`eg-2-1`** — "Hydrogen could supply up to twelve per cent of global energy by 2050" — IEA projection named, but should cite a specific IEA publication.
- **`eg-2-3`** — "600,000 vehicles per year" and local content "from roughly 40 per cent to 60 per cent" — figures need a reference year (e.g., 2023 NAAMSA data).
- **`eg-3-2`** — "GDP growth averaged around 2.8 per cent between 1996 and 2000" — correct, but a StatsSA historical-series citation would strengthen it.

**Recommendation:** Audit every percentage, currency figure, and rank in Parts 1–4 for a year anchor. This is Batch 2's closest analogue to Batch 1's SF-2.

### SF-4 — Section openings that lead with generalisation

Style-guide rule: sections lead with a number / institution / year, not a generalisation.

- **`eg-1-1`** § "Making Seven Thousand Dollars Concrete" — opens with "Numbers in the billions and trillions are difficult to grasp." General reader-addressing sentence; should lead with the specific comparator table.
- **`eg-1-3`** § "The Comparative Method — Learning Without Copying" — opens with "Before diving into individual countries..." — methodological scene-setting, acceptable but soft.
- **`eg-2-4`** § "What Innovation-Driven Growth Actually Means" — reasonable, references Porter.
- **`eg-3-2`** § "The Strategy Graveyard" — good specific opener.

**Recommendation:** Lighter touch than Batch 1; only `eg-1-1` § "Making Seven Thousand Dollars Concrete" clearly warrants a rewrite. Others are acceptable for their methodology-framing function.

### SF-5 — Mild editorial drift

Not blockers, but worth tightening.

- **`eg-3-2`** line 41: "The pattern is so consistent that it has become a kind of dark comedy among policy researchers." — "dark comedy" reads editorial. Suggest neutralising to "the pattern is so consistent that policy researchers have developed shorthand for it" or similar.
- **`eg-1-1`** — "it should trouble you regardless of your political affiliation" (line 59) — direct address appropriate, but "should trouble you" edges prescriptive. Acceptable; lighter touch would read "This divergence is the central economic fact of post-apartheid South Africa."
- **`eg-2-1`** — "the absurdity" (line 57, describing PGM export pattern) — memorable but slightly editorial. Keep or neutralise to "the pattern" — editorial call.

### SF-6 — Very data-heavy articles benefit from one inline source link per figure

The EG series is unusually data-dense — every article hinges on specific percentages, ratios, and comparator figures. Currently most of these figures rely on the Resources section to carry the citation. Readers reading on mobile (per `CLAUDE.md`, the primary audience is on 4G prepaid data) may not scroll through to Resources.

**Recommendation:** For the 5–10 most load-bearing figures per article (Gini, GDP per capita, unemployment rates, debt-to-GDP, manufacturing share), add a short inline parenthetical like "(StatsSA QLFS Q2 2024)" or "(World Bank WDI 2023)". This doesn't require adding new sources — all are already in Resources — but it makes the claims verifiable in-line.

This is a Batch-2-specific recommendation that wasn't needed in Batch 1 because the core series is more narrative and less data-driven.

---

## Nits (optional polish)

Not tracked individually — approximately 35 nits total across the 16 articles, mostly:
- Minor phrasing softening ("absurdity" in eg-2-1, "dark comedy" in eg-3-2)
- Slightly long introductions before the BLUF lands (eg-1-3, eg-5-1)
- Occasional section tangents that could be tightened by 200–300 words (eg-1-2 "What the Comparator Countries Did Differently" previews material covered in eg-1-3)
- One or two comparator analogies that could be updated (eg-1-1's South Korea 1960 reference is accurate but overused across the series)

These can be handled opportunistically by an editor and should not gate publication.

---

## Cross-Batch Patterns Worth Noting

1. **The EG series is in very strong shape.** 14/15 Pass verdicts, zero blockers, zero partisan-drift problems despite the Part 5 political-economy material being the highest-risk content in the pillar. This is MVP-ready work.
2. **The dominant weakness is the same pattern as Batch 1: evidentiary-attribution precision.** Expert anecdotes name the right institutions but rarely cite the specific publication/year in-text. A single-sweep fix as in Batch 1.
3. **Structural inconsistency in eg-2-2 and eg-2-3 is unique to this batch.** These two articles appear to have been drafted with a different heading convention (sentence case, no opening H2 in one case) than the rest of the series. Likely a drafting artifact rather than a deliberate choice. Easy to fix.
4. **Non-partisan discipline holds.** Across the 16 articles — including high-risk political-economy and metro-ranking material — the framing remains rigorously factual. `eg-4-2` in particular handles the Cape Town / Johannesburg comparison carefully, explicitly saying "political commentary about the city's governance challenges" is less instructive than the data. `eg-5-1` maps "winners and losers" by sector and constituency rather than by party.
5. **BLUF and practical-tool compliance is 100%.** Every article opens with a clear bottom-line and closes with a usable framework, checklist, scorecard, or toolkit. `eg-4-1` and `eg-4-2` together provide the Municipal Performance Index — a tool substantial enough to be a deliverable in its own right.
6. **Data density is higher than Batch 1.** The EG series hinges on specific percentages, rankings, and comparator figures in a way the core series does not. This makes SF-3 (date anchoring) and SF-6 (inline citations) more important than they were in Batch 1.

---

## Top 5 Priority Fixes (if time is short)

1. **Fix `eg-2-2` and `eg-2-3` heading inconsistencies** — add opening H2 to eg-2-2, convert sentence-case subheadings to Title Case in both. (SF-1, ~15 min)
2. **Comparator GDP figures in `eg-1-1` need year anchors** — these are the headline comparative numbers of the entire series. (SF-3, ~10 min)
3. **Expert-attribution sweep** across all 16 articles. (SF-2, pattern from Batch 1, ~60 min)
4. **Section opening rewrite** for `eg-1-1` § "Making Seven Thousand Dollars Concrete". (SF-4, ~5 min)
5. **Neutralise "dark comedy" phrasing** in `eg-3-2`. (SF-5, ~2 min)

Estimated time for all five: ~90 minutes of focused editing work.

---

## Recommendation

**Proceed to severity triage with the owner.** The EG series is substantively ready. Suggested workflow:

1. Owner signs off on severity labels above, or redirects.
2. I apply fixes in a single pass, grouped by pattern (SF-1 structural as one commit, SF-2 attribution sweep as another, SF-3 date anchors as a third).
3. Re-run `node scripts/audit-articles.mjs` after fixes to confirm no regression.
4. Move to Batch 3 (Human Development, 15 articles).

**Open question for owner:** For the heavier SF-3 date-anchor work on `eg-1-1`'s comparator GDP figures, should I anchor each figure to the latest World Bank World Development Indicators year (2023), or to the MTBPS projection year the article was drafted against? The former is more accurate; the latter preserves the article's internal consistency if it was written from the MTBPS baseline.
