# Figure Audit — Pillar Articles

**Date:** 2026-06-29 · **Phase 1 (audit only — no article content changed).**
**Method:** parallel read-only agents per pillar; key/load-bearing + unsourced figures web-verified against authoritative sources (Stats SA, SARB, SARS, National Treasury, AGSA, DWS, SAPS, DCS, NPA, PSIRA, World Bank, OECD, IMF, UNDP, WHO, UNAIDS, WIPO, PIRLS/TIMSS, Davis Tax Committee, academic studies).
**Verdict key:** ✅ Verified · 🕒 Outdated (year drift) · ❌ Wrong/inconsistent · 📎 Unsourced-but-plausible (needs citation) · ⚖️ Contested · ❓ Unverifiable.

> **Coverage note:** Phase 1 (below) covered Government Structure, all Economic Growth, Safety & Security, Youth, Human Development Parts 1–3, and Reform Agenda through `ra-4-1`. **Phase 1b (addendum at the end of this doc, 2026-06-29)** completed the rest — `hd-4-1…hd-6-2`, `ra-4-2…ra-5-4`, and the EG Part 1/2 value lookups. The HD/RA portion was **re-run with live web verification** (cited URLs) after the first pass leaned on internal knowledge; the addendum reflects the source-checked results.

---

## 🔴 Priority — likely WRONG / inconsistent, live now

1. **`ss-2-2-policing-a-divided-country`** — ❌ **"2.7 million [PSIRA] … roughly three times the number of SAPS officers."** The math is **~14×** (2.7M ÷ ~190k), and the sibling article `ss-2-5` correctly says _"fourteen times."_ → **✅ APPLIED 2026-06-29 (commit `6713ba3`): "three times" → "fourteen times."**
2. **`ss-2-4-the-systems-gravest-failure`** — ⚖️ **"2,500 to 3,000 women killed annually by partners"** — this is the _total_ femicide count, wrongly attributed to intimate partners. → **✅ APPLIED 2026-06-29 (commit `da9b8f1`): relabelled as total femicide; added the correct intimate-partner figure — ~3 women/day, rate ~5.5/100k (SAMRC Fourth National Femicide Study 2020/21, via UN Women).**
3. **`eg-4-2-the-execution-machine`** — ❌ **manufacturing employment "declined from ~1.7M to 1.5M by 2017"** mixed measures (the ~1.7M is the broader QLFS household figure incl. informal). → **✅ APPLIED 2026-06-29: replaced with Stats SA's formal manufacturing-enterprise survey — 1.40M (2005) → 1.18M (2017) → 1.09M (2021), measure labelled.** Source: [Stats SA](https://www.statssa.gov.za/?p=16493). Strengthens the point (sector lost jobs vs IPAP's +1M target).

---

## 🕒 Outdated / year-drift (still broadly correct, needs refresh + year label)

- `2-1-following-the-money`: "~7.4 million registered individual taxpayers (2022/23)" → update to latest SARS Tax Statistics year.
- `3-2-health-and-education…`: "Gauteng medico-legal claims exceeded R130 billion" — add year; verify vs latest provincial PFMA audit.
- `ra-2-1` / `ra-2-3` (and others): **PIRLS** referenced as 2016 / "consistent" while HD articles use **PIRLS 2021 (81% can't read for meaning)** — standardise on PIRLS 2021. **TIMSS 2019** described as "most recent" — check for TIMSS 2023.
- Reform Agenda generally: many figures cite 2022/23 or 2023 reports but articles read as "current" (dated 2026) — refresh against 2024/25 / 2025-26 editions (AGSA MFMA, DWS Blue/Green/No Drop, SARS, NSC).
- Budget/grant figures across Government Structure (DORA 2024/25, equitable share, MIG, etc.): verified for 2024/25 — add "(2024/25)" labels; they need annual updates.

---

## 📎 Unsourced-but-plausible (add a named source + year; values likely fine)

**Economic Growth — Part 1/2 (the known backlog):**

- `eg-1-1`: "median individual income ~R4,000–R7,000/month"; "youth unemployment >60% (15–34)"; "28M social-grant recipients / >45% of population."
- `eg-1-2`: "per-pupil spending on white education ~10× black education (1970s)" (attribute to SALDRU/historical budgets).
- `eg-1-3`: **Vietnam GDP/capita $230 (1986) → $4,300 (2023); poverty >60% → <5%; South Korea 1960 "lower than Ghana"; Botswana "12 km paved road," "<100 graduates," "7%+ growth 1966–2000."** All commonly-cited but uncited — add World Bank / Maddison / Botswana sources.
- `eg-2-1`: "~70% of world platinum"; "~80% manganese reserves"; "2nd-largest citrus exporter after Spain"; Chile fruit/wine export values.
- `eg-2-4`: "Germany ~300k apprentices/yr vs SA <30k"; "SA ~30k STEM graduates/yr vs Korea 600k / Poland 200k"; "intra-SADC trade <25%."
- `eg-2-5`: Korea R&D 4.8% / Israel 5.4% / OECD avg 2.7% (cite OECD MSTI, by year); PCT filings (cite WIPO).

**Economic Growth — Part 4/5/6:**

- `eg-4-1`: "minerals ~30–40% of merchandise exports"; "intra-African trade ~15–18%" — add SARS/AfCFTA year.
- `eg-5-1`: "youth unemployment routinely >50% in some municipalities" — add QLFS year + examples.
- `eg-5-3`: "NIP delivery 20–40%" and "maintenance backlog >R400bn" — cite the specific DBSA Infrastructure Barometer edition.
- `eg-6-1`: "union density >30% (mid-90s) → <25% today"; "8M+ unemployed (expanded)" — add QLFS year.
- `eg-6-2`: R&D targets (1.5%/2%) — clarify these are **author recommendations**, not official policy.

**Youth — `yt-1-1`:** six QLFS/DBE figures (Grade 1 enrolment, matric writers, 45% / >60% / NEET rates, "3.4M NEET") all name the right source but **lack the specific quarter/year**. The article's own Resources note says _"confirm against latest releases before publication"_ — yet it's published. Confirm against latest QLFS (≈Q1 2026) and add editions. _(yt-1-2…yt-3-3 are qualitative/explicitly-illustrative — nothing to verify.)_

**Reform Agenda (audited subset):** AGSA audit counts (clean audits 41/257; R27.3bn fruitless; R2.32bn water tankers / R419m irregular), housing backlog 2.3M, 900k missing title deeds, WSA count (144/278), SARS R2.303tn (2024/25) — all cite legitimate bodies but need the specific report + year pinned, and "current/as of" claims verified against the newest editions.

---

## ❓ Unverifiable from public data (need owner confirmation, do not invent a source)

- `1-3`: "over 60 municipalities under Section 139 (1998–2023)" — no authoritative consolidated count; soften or footnote.
- ~~`2-1`~~ **`2-3-from-treasury-to-your-town`** (audit mislabelled the file): "R78bn municipal debt to Eskom (2024)" → **✅ RESOLVED 2026-06-29 (commit pending): anchored to National Treasury's dated figure — R56.3bn at 31 Dec 2022 (up from R44.8bn Mar 2022) — and added the 2023 Budget municipal debt-relief programme. The R78bn (2024) sits on the verified trajectory to >R110bn (2026).** Source: Treasury 2023 Budget, Annexure W3.
- `2-3`: "consumer debt to municipalities >R300bn (mid-2024)" — cite a specific Treasury S71 report.

---

## ✅ Largely verified (high confidence)

- **Government Structure:** budget/debt/grant figures (R2.16tn gross tax, R5.2tn debt ~74% GDP, R356bn debt service, DORA transfers), AGSA clean-audit (28/257) & irregular expenditure (R53.55bn), TIMSS 2019 (374), PIRLS 2016 (78%), 5.8M on ART, SASSA ~28M.
- **Economic Growth Part 3 (Fiscal Levers):** tax figures cited to SARS Tax Stats 2025, SA-TIED, Chatterjee/Czajka/Gethin, IMF/Keen — re-check held up. Part 4–6: REIPPPP R210bn & ~80% solar cost fall, Medupi R145bn/Kusile R161bn overruns, rail freight 81→<55 Mt, Blue Drop 87%→47%, NDP targets, SAA R30bn+.
- **Human Development (Parts 1–3):** UNDP HDR 2023/24 (HDI 0.713, IHDI 0.468), PIRLS 2021 (81%), SAPS 2022/23 (27,494 murders, ~45/100k), UNAIDS (7.7M PLHIV), WHO TB, SAMRC femicide, Chigwedere et al. 2008 — strongly sourced.
- **Safety & Security:** SAPS/DCS/NPA/PSIRA/SAMRC/ISS/Treasury figures verified or mathematically consistent (the one exception is the ss-2-2 ratio above).

---

## Next steps

- ~~**Phase 1b:** audit the uncovered articles + EG Part 1/2 lookups~~ — **DONE 2026-06-29, see addendum below.**
- **Phase 2 (on approval):** apply fixes — start with the 🔴 list (esp. the `ss-2-2` "three times"→"fourteen times" correction), then year-label + cite the 🕒/📎 items. No fabricated citations; anything ❓ comes back to you. Each batch verified with `astro sync` + tests + build before commit.

---

# Phase 1b addendum — 2026-06-29

**Coverage now complete** for `hd-4-1…hd-6-2`, `ra-4-2…ra-5-4`, and the EG Part 1/2 value lookups.

> **Confidence note:** all three areas below are now **live-web-verified with cited URLs.** EG Part 1/2 was web-checked in the first pass (and I re-checked the exact article wording before recording). HD Parts 4–6 and RA Parts 4–5 were **re-run on 2026-06-29** with real searches after the first agents leaned on internal knowledge — the HD/RA sections below reflect those source-checked results, not the earlier plausibility checks.

## 🔴 New priority — likely WRONG (high confidence)

1. **`eg-1-1-the-seven-thousand-rand-economy`** — ❌ **"Among South Africans aged 15 to 34, the expanded unemployment rate exceeds 60%."** StatsSA expanded unemployment for **15–34 is ~45–46%**; the **>60% figure is the 15–24 band**. → **✅ APPLIED 2026-06-29 (commit `6713ba3`): band narrowed to "15 to 24" (keeps both the >60% figure and the "majority cannot find work" claim true).** Recap line (~144) "60%+ youth unemployment" stays valid under the 15–24 reading.
2. **`ra-4-3-fixing-waste-and-roads`** — road maintenance backlog "R417bn — R242bn municipal, R150bn provincial." → ⚠️ **MY FIRST FIX (R417bn→R392bn, commit `6713ba3`) WAS WRONG and has been REVERTED.** The RA web pass confirmed the **UCT 2019 headline really is ~R417bn**; the components don't sum to it because the article dropped a third (~gravel-upgrade) component, not because the total was off. → **✅ RE-FIXED: restored "approximately R417 billion, including R242bn municipal and R150bn provincial" + added "(2019)".** Source: [UCT News](https://www.news.uct.ac.za/article/-2019-07-10-south-africas-road-maintenance-backlog) / [Engineering News](https://www.engineeringnews.co.za/article/uct-researchers-say-road-maintenance-backlog-exceeds-r400bn-2019-07-08).

## 🕒 / ⚖️ EG Part 1/2 — web-verified, needs confirm-then-edit

- **`eg-2-1` citrus:** "world's **second-largest** exporter of fresh citrus after Spain." Agent reports **SA overtook Spain in 2025** to become #1 by volume (~3.23M vs 2.98M tonnes). Flips by year/measure (Spain still larger by value). → **Verify against the 2025 CGA / Trade Map figures; if confirmed, change to "world's largest exporter of fresh citrus (by volume), having overtaken Spain in 2025."**
- **`eg-2-4` STEM graduates:** "~30,000 [SA] … ~**600,000 in South Korea** … ~**200,000 in Poland**." Agent's search suggests Korea ~140k and Poland ~44k _annual STEM graduates_ — possibly **overstated 3–4×**. BUT the article's own per-capita framing elsewhere ("over 1,000 per 100k" → ~520k for Korea) is internally consistent with the larger number, so the two figures may use different definitions (all tertiary vs STEM-only). → **Pin to one OECD/UNESCO source + definition before changing; do not edit blind.**
- **`eg-2-4` German apprentices:** "over **300,000** new apprentices per year" — understated; Germany registers **~480,000** new apprenticeship contracts/yr. → **Optional: update to "~480,000" (strengthens the contrast); add a year.**
- **`eg-2-5` R&D intensity:** Korea 4.8% / Israel 5.4% / OECD 2.7% — these are **~2020** values; latest are higher (Korea ~5.2% 2022, Israel ~6.3% 2023). → **Add "(2020)" or refresh to latest OECD MSTI.**
- **`eg-1-3` Vietnam 1986 GDP/capita "$230":** agent flagged as possibly ~$700, but command-economy-era USD figures vary wildly by source/exchange-rate method. → **⚖️ Verify against a single named source (World Bank/Maddison); $230 is a commonly-cited figure, keep unless a cleaner source disagrees.**

## ✅ EG Part 1/2 — agent over-flags I checked and CLEARED (no change)

- **`eg-2-1` platinum "produces roughly seventy per cent of the world's platinum"** — correct: that's **production share** (~70%). The agent compared it to _reserves_ (~83%), a different metric. **Leave as is.**
- **`eg-1-3` Botswana "fewer than one hundred citizens had university degrees"** — **true** (the precise figure is ~22). Conservative but not wrong; optionally tighten to "fewer than two dozen graduates" for impact.
- **`eg-1-1` "28 million social-grant recipients / >45%"** and **"median income R4,000–R7,000"** — verified (SASSA 2023/24; StatsSA IES 2022/23). Just **add the citations**.
- **`eg-1-2` white:black per-pupil spending ~10×** — verified (1975/76 was ~15×). Add source; the "ten times" wording is safe.

## HD Parts 4–6 — WEB-VERIFIED (re-run 2026-06-29, real searches w/ cited URLs)

**Needs a fix:**

- 🕒 **`hd-5-2` emigrants "approximately 900,000":** UN DESA International Migrant Stock mid-2024 now puts SA emigrants at **~1 million** (UK ~250k, Australia ~200k largest). → **Change to "approximately one million" (fits the article's own 800k–1.2M range).**
- 🕒 **`hd-5-3` Costa Rica "99% renewable electricity":** drought cut it to **~91.3% (2023) / 89.4% (2024)**; 99% was a 2015–21 peak (IEA / Tico Times). → **Reword: "~98–99% in good hydrological years, dipping to ~90% in the 2023–24 drought."**
- 🕒 **`hd-4-3` informal sector "17–18%":** StatsSA narrow measure is **~19.5% (QLFS Q4 2024)**; broad measure (incl. informal jobs in formal firms + agriculture) is ~30%+. → **Update to "around 18–20%" AND add the narrow-vs-broad caveat (article currently gives none).**
- 📎 **`hd-5-2` doctor-training cost "R3–4M each":** sourced figure is **~R1.3M (2015 undergraduate MBChB)**, ~R2M inflation-adjusted; R3–4M only if internship + community service + specialist training are bundled (text doesn't say so). → **Rescope ("several million once specialist training is included") or cite the ~R1.3M (2015) figure.** _**Correction to the Phase-1b draft above: `hd-4-4` does NOT contain a per-doctor training-cost claim — it's only in `hd-5-2`.**_
- 🕒 **`hd-5-2` year-label:** the **R356bn debt-service** figure is Treasury's **2023/24** (article labels it "2024/25"; 2025/26 is ~R389bn). → **Fix the year label.**

**Cleared (✅ verified — no figure change, sourcing/wording only):**

- **`hd-5-2` "debt service > entire public health system"** — ✅ holds vs the ~R276bn consolidated health budget (R356bn > R276bn). Scope is fine; only the year label slips (above).
- **`hd-5-2` "~20,000 doctors abroad ≈ public-sector doctors"** — ✅ the comparison is solid (OECD recorded ~23k SA-born medical workers abroad; public-sector doctors ~20,926 in 2020). → only **soften the "HPCSA estimated 20,000" attribution to OECD/SAMP** (couldn't confirm a clean HPCSA statement of exactly 20,000).
- **`hd-5-3` Costa Rica** HDI **0.806** ✅, U5MR **8.0** ✅, health spend **~$979** ✅; life expectancy "80" is pre-pandemic (77.3 in 2022) — optional hedge. **Sri Lanka** HDI **0.782** (2020 peak) ✅, LE **76.9** ✅, U5MR **6.9** ✅.
- **`hd-5-1` comparators** all ✅: Korea HDI **0.929**; Botswana 12km road / 22 graduates / HIV peak **~27%** / LE 65→46→62; Rwanda U5MR **196→45**, deaths 800k–1M (upper end of the 500k–1M range); Malaysia Bumiputera **2.4%→19%**, poverty **49%→8%**, HDI **0.803**.
- **`hd-5-1` South Korea 1953 "~$67" per-capita** — ✅ **RESOLVED** (was the only ❓): countryeconomy.com shows **$66 (1953) / $69 (1954)**, so "~$67" is accurate. Just add the citation.

## RA Parts 4–5 — WEB-VERIFIED (re-run 2026-06-29, real searches w/ cited URLs)

**Needs a fix:**

- ❌ **`ra-5-2` "R232 billion irregular expenditure (2022/23), all spheres":** the AG's **disclosed irregular expenditure for 2022/23 was ~R63bn**; the cumulative UIFW balance was ~R264bn — R232bn matches neither cleanly and reads like an annual/cumulative mix-up. → **Replace with the correct 2022/23 figure (~R63bn) or relabel as a cumulative balance, with a source.** (Sources: [PMG](https://pmg.org.za/committee-meeting/38122/), [SAnews](https://www.sanews.gov.za/south-africa/ag-unauthorised-expenditure-remains-high).) **NEW — not in the Phase-1 audit.**
- 🕒 **`ra-4-3` refuse removal "60% of households nationally":** Census 2022 puts weekly removal at **~66.3%** (GHS 2023: 84.4% urban / **12.5% rural** — the rural figure ✅ matches). → **Update national to ~66% (Census 2022); keep 12.5% rural.**
- ⚠️ **`ra-4-3` potholes wording:** "25 million potholes — a **67 per cent increase over five years**." Number/date/source ✅ (AA, Apr 2025), but the AA said **~67% of them _formed_ in the past five years**, not a 67% increase. → **Reword to match the source.**
- 📎 **`ra-4-4` engineer salaries:** municipal "~R260k" ✅ (PayScale 2025); the **R650k private / R970k consulting** figures ❓ **could not be web-confirmed** (PayScale civil ~R384k, professional ~R603k use different bases). → **Source or revise the two higher figures.**
- ❓ **`ra-4-4` Buffalo City "district electricity engineer post vacant 80 months":** no web source found → effectively **unsourced**. → **Find the primary source (likely a parliamentary Q&A / SAICE submission) or qualify/remove.**
- 📎 **`ra-4-4` AGSA detail figures:** 41/257 clean ✅, R1.47bn consultants ✅, **R8.74bn** material-irregularity loss ✅ — BUT **"R31.79bn unauthorised", "R28.72bn irregular", "446 material irregularities", "7 disclaimers for 3–8 yrs"** ❓ could not be confirmed against the primary AGSA MFMA 2023-24 report (PDF bot-gated). → **Spot-confirm these four against the AGSA consolidated report.**
- 📎 **`ra-4-2` electricity surplus "40% in some rural municipalities":** the **25–30% average ✅** (OECD 2025), but the 40% rural extension isn't in the source → **cite or soften.**

**Cleared (✅ web-verified — sourcing/wording only, no figure change):**

- **`ra-4-2` "141 accredited civil engineers across all municipalities"** ✅ (FF Plus citing govt figures, IOL Jan 2023; also confirms Rand West has zero electrical engineers) — just **add "(as of 2022/23)"**.
- **`ra-4-2` City Power "R4.3bn loss FY ending 30 June 2025"** ✅ AND **"municipalities owe Eskom >R110bn, up from R4.3bn in 2014"** ✅ — **the two R4.3bn figures are NOT a copy error** (City Power FY25 loss and the 2014 Eskom-debt baseline coincidentally share the value; both independently verified).
- **`ra-4-2` NERSA tariffs 12.74% / 9.01%** ✅ (nuance: 12.74% is the _direct-customer_ increase; the 2025/26 _municipal-bulk_ equivalent was 11.32% — optional clarify).
- **`ra-4-2` electricity revenue 25–30% of municipal income** ✅ (OECD 2025).
- **`ra-4-3` "25 million potholes" (AA, Apr 2025)** ✅ (only the "67% increase" phrasing needs the reword above).
- **`ra-5-2` construction-collusion penalties ~R1.46bn (2013, 15 firms)** ✅; **VBS ~R1.5bn municipal deposits / ~R2bn looted** ✅ (article says "fourteen" municipalities vs the commonly-cited "fifteen" — minor).

**Not separately checked:** standard constitutional thresholds in `ra-5-1`/`ra-5-4` (Section 74/75/76 majorities, "18 amendments since 1996") — stable legal facts, not market figures. Flag if you want these checked too.

## Status / recommendation (updated 2026-06-29)

- **HD + RA web-verification pass: DONE** (re-run with live searches + cited URLs; results folded into the two sections above). The earlier knowledge-based flags are superseded.
- **Applied so far (commit `6713ba3` + follow-up):** `ss-2-2` "three times"→"fourteen times" ✅; `eg-1-1` band → "15 to 24" ✅; `ra-4-3` backlog — _first fix was wrong, reverted and re-fixed to ~R417bn (2019) with clearer framing_ ✅.
- **Confirmed live errors — ✅ APPLIED 2026-06-29 (commit `19dff60`, Phase 2 batch 1):** `ra-5-2` R232bn irregular → ~R63bn (2022/23); `hd-5-2` emigrants ~900k → ~1M; `hd-5-3` Costa Rica renewables 99% → ~98–99% good years / ~90% in 2023–24 drought; `hd-4-3` informal 17–18% → ~18–20% + narrow/broad caveat; `ra-4-3` refuse 60% → ~66%; `ra-4-3` potholes "67% increase" → "~67% formed in 5 yrs"; `hd-5-2` debt-service year-label 2024/25 → 2023/24. _(Verified astro sync + build, 124 pages.)_
- **Source-or-soften — ✅ APPLIED 2026-06-29 (commit `f75b092`, Phase 2 batch 2):** `hd-5-2` doctor-training R3–4M → "estimated R2–4M (more for specialists)"; `ra-4-4` R650k/R970k salaries reframed as approximate (R260k municipal kept, PayScale-verified); Buffalo City 80-month vacancy marked "reportedly" in `ra-4-1`/`ra-4-2`. **AGSA R31.79bn/R28.72bn/446-MI/7-disclaimer detail left unchanged** — already attributed to the AGSA MFMA 2023/24 report (in Resources), so it's _sourced_; web couldn't independently confirm (PDF bot-gated) but nothing contradicts it.
- **Citation pass (figures correct, just add source):** EG Part 1/2 cleared items; all `hd-5-1` comparators incl. Korea 1953 $67 (countryeconomy.com); doctors-abroad attribution → OECD/SAMP.
