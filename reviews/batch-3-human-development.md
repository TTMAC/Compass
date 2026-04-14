# Batch 3 — Human Development Editorial Standards Review

**Scope:** Human Development series, 15 articles
**Standard:** GovCompass Content Style Guide
**Automated pass:** Clean on word count / frontmatter / linkage / emoji; 1 forbidden-term hit on hd-4-1 (see SF-4)
**Method:** Direct manual read-through against voice, structural, evidentiary, and accessibility criteria
**Date:** 2026-04-14

---

## Pass/Fail Matrix

| # | Slug | Words | Verdict | Blockers | Should-fix | Nits |
|---|---|---:|:-:|:-:|:-:|:-:|
| 1 | hd-1-1-beyond-gdp | 7,563 | **Fix** | 1 | 2 | 2 |
| 2 | hd-1-2-south-africas-report-card | 7,240 | **Fix** | 2 | 1 | 2 |
| 3 | hd-1-3-the-reinforcing-cycle | 8,086 | **Fix** | 1 | 1 | 2 |
| 4 | hd-1-4-the-problem-that-has-no-name | 7,731 | **Fix** | 2 | 3 | 2 |
| 5 | hd-2-1-the-life-expectancy-deficit | 8,703 | **Pass** | 0 | 2 | 2 |
| 6 | hd-2-2-violence-as-public-health-crisis | 7,729 | **Pass** | 0 | 1 | 2 |
| 7 | hd-2-3-the-fiscal-arithmetic-of-health | 11,522 | **Pass** | 0 | 1 | 2 |
| 8 | hd-3-1-the-schooling-paradox | 7,203 | **Pass** | 0 | 1 | 2 |
| 9 | hd-3-2-learning-in-a-war-zone | 6,609 | **Pass** | 0 | 1 | 2 |
| 10 | hd-3-3-from-classroom-to-paycheck | 7,481 | **Pass** | 0 | 1 | 2 |
| 11 | hd-4-1-when-the-cycle-works | 8,309 | **Pass** | 0 | 2 | 2 |
| 12 | hd-4-2-south-africas-broken-cycle | 7,189 | **Fix** | 1 | 1 | 2 |
| 13 | hd-4-3-development-within-limits | 7,625 | **Pass** | 0 | 1 | 2 |
| 14 | hd-5-1-your-development-rights | 10,091 | **Pass** | 0 | 1 | 2 |
| 15 | hd-5-2-building-the-cycle | 8,608 | **Fix** | 1 | 1 | 2 |

**Summary: 9 Pass, 6 Fix, 0 Rewrite. 2 distinct blockers affecting 7 articles total.**

---

## Blockers (must fix before publication)

### B1 — Broken callout directive in 4 Part 1 articles

**Affects:** `hd-1-1`, `hd-1-2`, `hd-1-3`, `hd-1-4` (13 callout blocks total)

The four opening articles of the HD series use `:::expert-perspective` as their expert callout directive. This is **not a registered callout type** — the `remark-callouts.mjs` plugin at `src/plugins/remark-callouts.mjs` only handles `expert`, `takeaway`, `framework`, `timeline`. Every other HD article and every article in the core, EG, RA, and SS series uses `:::expert`.

**Impact:** The 13 expert callout blocks in these 4 articles are **not rendering as styled asides**. They fall through the remark pipeline as unrecognised container directives. The build does not error, but the content is either silently dropped or rendered as raw unstyled markup — either way, the reader experience is broken.

**Fix:** Rename all 13 instances of `:::expert-perspective` to `:::expert` across the 4 files. Mechanical find/replace.

### B2 — HDI / IHDI data inconsistency across the series

**Affects:** `hd-1-1`, `hd-1-2`, `hd-1-4`, `hd-4-2`, `hd-5-2` (plus any downstream reference)

Two different headline HDI/IHDI values are in circulation across the HD series:

| Article | HDI | IHDI |
|---|---|---|
| hd-1-1 line 38 | **0.741** | **0.462** |
| hd-1-2 line 42 | **0.741** | **0.462** |
| hd-1-4 line 56 | **0.713** | — |
| hd-4-2 line 42 | **0.713** | **0.468** |
| hd-5-2 line 49 | **0.713** | — |

The hd-1-1 and hd-1-2 BLUFs are built around 0.741 → 0.462 (a 37.6% penalty). The later articles reference 0.713 → 0.468. A reader working through the series from hd-1-1 through hd-5-2 will encounter contradictory headline numbers for South Africa's flagship HDI and IHDI scores — the exact figures the entire series is built around.

The discrepancy tracks different UNDP Human Development Report editions. 0.713 / 0.468 appears in the UNDP HDR 2023/24 report (based on 2022 data); 0.741 / 0.462 appears in the UNDP HDR 2021/22 report (based on 2019 data, with 2020 COVID adjustments).

**Fix options:**
1. **Unify on 0.713 / 0.468** (the more recent UNDP HDR 2023/24 figures). Update hd-1-1 and hd-1-2 to match. This is the more current and verifiable figure.
2. Unify on 0.741 / 0.462 (older but internally more consistent with the BLUFs already written). Update hd-1-4, hd-4-2, hd-5-2 to match. This preserves the existing hero number in the series-opening articles.

Either way, add an explicit `(UNDP Human Development Report YYYY/YY)` citation in the first use.

**Recommendation:** Option 1 — unify on 0.713 / 0.468 and cite the 2023/24 HDR. It's the more current number, and the "37.6% penalty" narrative framing can be preserved because 0.713 → 0.468 is still close to a 34-35% penalty (which, while not "37.6%", remains "one of the largest inequality penalties among upper-middle-income countries" — the substantive argument is unaffected).

---

## Should-fix (recommended before publication)

### SF-1 — `hd-1-4` structural inconsistencies

Three separate issues in this article:

- **Section heading `## References`** at line 242 — every other article in the entire GovCompass corpus uses `## Resources`. Rename for consistency.
- **`sphere: "national"`** frontmatter field at line 16 — unique to this article; no other HD article has a `sphere` field (they use `pillar: "human-development"`). Either the schema permits both and this is harmless, or it's a drafting artifact. Recommend removing to match the rest of the series.
- **Poverty line figures** "R760 per person per month" and "R1,417" at line 56 — StatsSA poverty lines are published annually and need a year anchor. Add `(Stats SA National Poverty Lines, 2023)` or similar.

### SF-2 — `hd-4-1` Rwanda "level of government" phrasing

Line 167 in the Rwanda case study: "Performance contracts — imihigo — were introduced at every level of government". The `audit-articles.mjs` script flags this as a forbidden term ("sphere of government" preferred). In Rwanda's unitary-state context, "level of government" is technically defensible because Rwanda doesn't have South Africa's constitutional "spheres" framing. But for automated audit consistency and to avoid readers transposing SA constitutional language to Rwanda, rephrase to "every tier of Rwanda's public service" or "across all levels of the Rwandan state."

### SF-3 — Expert-anecdote attribution lacks specific publication titles/years

Same pattern as Batch 1 and Batch 2. Selected gaps:

- **`hd-2-1`** — UNAIDS 95-95-95 cascade cited without year; "approximately 7.7 million people living with HIV" without year anchor.
- **`hd-2-2`** — "approximately 45 per 100,000" homicide rate without year; mentions "2022/23 reporting period" later, so consistency fix.
- **`hd-2-3`** — "approximately 8.5 percent of GDP" on health without year anchor.
- **`hd-3-1`** — "approximately 6.5 per cent of GDP" on education; later gives 2023/24 figures; ensure BLUF figure is dated.
- **`hd-4-1`** — South Korea / Botswana / Rwanda / Malaysia historical milestones well-dated, but the framing citations (World Bank, UNDP) lack specific report titles.
- **`hd-5-1`** — Constitutional Court cases (Grootboom, TAC, Mazibuko) named but need citation format `[2000] ZACC 19` etc.

**Recommendation:** Single-sweep pass as done in Batches 1 and 2.

### SF-4 — Headline figures needing inline anchor

Several load-bearing numbers appear across multiple articles without a year in their first use:

- Life expectancy "approximately 63 years" — Stats SA mid-year estimates; which year?
- HIV prevalence "approximately 7.7 million" — UNAIDS or SA DOH; which year?
- Unemployment "33% expanded" in hd-5-2 vs "42% expanded" in hd-1-3 — Stats SA QLFS cycle?
- Homicide "45 per 100,000" across hd-1-3 and hd-2-2 — SAPS annual; which cycle?

These are consistency issues as well as date-anchor issues. The series should agree on which year's figure is being used and cite it once, clearly.

### SF-5 — `:::framework` block usage uneven across series

The HD series is more uneven than the EG series in its use of closing `:::framework` blocks. Some articles close with a clearly labeled `:::framework` block (hd-1-3, hd-2-2, hd-3-1); others close with an untagged `## What This Means for You` or `## What You Can Do With This Knowledge` heading (hd-3-2, hd-3-3, hd-4-3).

Both patterns deliver a practical tool to the reader, so this is not a compliance failure. But it is a consistency inconsistency — the EG series used `:::framework` uniformly and the HD series could benefit from the same discipline. Flag for consideration; not a blocker.

---

## Nits (optional polish)

Approximately 30 nits across the 15 articles, mostly:
- Comparator-country life-expectancy figures in hd-2-1 undated
- HDI rankings relative positions ("around 50th–60th") vague in places
- Occasional "this is not just a health problem — it is a public health crisis" phrasing that lands twice
- A few section openings leading with general framing where a specific number would be sharper

These can be handled opportunistically.

---

## Cross-Batch Patterns Worth Noting

1. **Two real blockers this batch — both systemic, not scattered.** B1 affects a whole sub-cluster of articles (the Part 1 openers use a broken directive name). B2 is a data-consistency issue between Part 1 openers and everything downstream. Both are mechanical to fix once identified, but both would cause visible problems in production.
2. **The data-consistency problem (B2) is the most substantive finding of the entire Item 34 audit so far.** Batch 1 had two article-specific blockers. Batch 2 had zero. Batch 3 has a cross-series inconsistency in the headline numbers the series is built around. This suggests the HD Part 1 articles were drafted earlier against the UNDP HDR 2021/22 data, and the later articles were drafted against HDR 2023/24, without the openers being refreshed.
3. **Non-partisan discipline holds.** The HD series handles some of the most politically charged material in the corpus — the Carnegie Commission / "Poor Black Problem" framing in hd-1-4, the Mbeki HIV denialism in hd-1-2, state capture in hd-4-2 — with careful factual framing and specific source citations (Harvard School of Public Health study, published court judgments). No editorial drift flagged.
4. **BLUF compliance is 100%.** Every article opens with a strong, specific bottom-line statement.
5. **Practical-tool compliance is 100%**, though the form varies (framework blocks, "What You Can Do" sections, detailed workflows).
6. **The `expert-perspective` vs `expert` directive issue is a drafting-consistency problem that should trigger a broader audit.** Check the other series (RA, SS) for similar unregistered directive names. If RA or SS articles also use `:::expert-perspective`, the same blocker applies.

---

## Top Priority Fixes (if time is short)

1. **B1 — Rename `:::expert-perspective` to `:::expert`** in hd-1-1, hd-1-2, hd-1-3, hd-1-4. Mechanical global find/replace. ~5 min.
2. **B2 — Unify HDI/IHDI values** on 0.713 / 0.468 (UNDP HDR 2023/24) across hd-1-1 and hd-1-2. Also update the "37.6% penalty" framing to match the actual arithmetic of the newer numbers. ~15 min.
3. **SF-1 — Fix `hd-1-4`**: rename `## References` → `## Resources`, remove or verify `sphere: "national"` frontmatter, date-anchor poverty lines. ~5 min.
4. **SF-2 — Rephrase `hd-4-1` Rwanda "level of government"** to avoid the forbidden-term flag. ~2 min.
5. **SF-3 — Sweep expert-block publication years** across the 15 articles. Same pattern as Batches 1–2. ~45 min.

Estimated time: ~75 minutes of focused editing work.

---

## Recommendation

**Proceed to severity triage with the owner.**

1. Owner signs off on severity labels (particularly B2 Option 1 vs Option 2 — which HDI/IHDI number to unify on).
2. Apply fixes grouped by pattern: B1 and B2 first (data integrity), then SF-1/SF-2 (structural), then SF-3 (attribution sweep).
3. Re-run `node scripts/audit-articles.mjs` and `npm run build` to confirm no regression.
4. Move to Batch 4 (Reform Agenda, 16 articles) — note that RA is flagged in the TODO as the **highest partisan-drift risk batch**. Worth a careful read.

**Open questions for owner:**

1. **B2 — HDI/IHDI value choice:** unify on 0.713 / 0.468 (UNDP HDR 2023/24, more current) or 0.741 / 0.462 (older, but preserves existing BLUF narrative in the series-opening articles)?
2. **Broader sweep:** should I also check RA and SS batches for `:::expert-perspective` directive usage before moving to Batch 4, to confirm B1 is contained to the HD Part 1 articles?
