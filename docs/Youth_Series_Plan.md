# Youth & Nation-Building — Series Plan

**Status:** Scaffold + outlines complete; review gate CLOSED (2026-06-23). Ready for full drafting on green light.

A standalone Topics series proposing a **Dual-Track National Youth Service** for South Africa. The model has a **common foundation and a fork**: every young South African, after matric, does a shared period of **basic military training** together (the cohesion and discipline crucible), then chooses a **deployment track** — continued **military service** or a **civilian track** (education, health, or public-infrastructure). Goals: civic discipline and order, skills-building, opportunity, and national cohesion — designed to be *prestigious* with *real benefits* (jobs, venture finance, recognition). Primary inspiration: Singapore's National Service; also Israel (Sherut Leumi), South Korea, Germany/Nordics.

**Editorial register:** proposal framed *educationally and non-partisanly*, mirroring the Reform Agenda series — describe structural patterns, avoid party attribution, anchor every claim to authoritative sources (Stats SA, DPME, Treasury, DHET, AGSA, comparator primary sources).

## Review-gate decisions (2026-06-23)

1. **Name:** "Youth & Nation-Building" (shortTitle "Youth").
2. **Service basis:** Phased to near-universal — start voluntary (pilots), build legitimacy/prestige, then legislate near-universal service. Engage the constitutional / freedom-of-occupation questions head-on; the civilian track addresses conscientious objection.
3. **Military track:** **Universal basic military training for everyone** is the shared foundation (Stage 1); the dual-track choice (military vs civilian) is the *deployment* phase (Stage 2). Military is foundational, not optional; most participants then serve in civilian tracks.
4. **Scope:** ~8 articles (expanded from 6 — split costing vs funding, and split the model from the comparators).
5. **Cross-links:** wire `crossLinks` into Reform Agenda (anti-capture, measurement) and Human Development (skills/education) once full drafts exist.

## Architecture (scaffolded — all held/uncommitted)

- **Pillar:** `youth` — "Youth & Nation-Building", colour `#0E6E63` (teal), order 6. In `src/content/pillars.ts` + `youth` added to `pillarEnum` in `src/content/config.ts`.
- **Nav:** auto-appears in the Topics dropdown (Header) via `pillars.map(...)`.
- **Route:** `/pillars/youth`; articles render via ArticleLayout (Tshepo Machele byline, no visible date, In Review label while `status: "draft"`).
- **Articles:** 8 stub files `src/content/articles/yt-*.md`, all `status: "draft"`, each with an `## Outline` body and a chained `series.prev/next`.

## The 8 articles

**Part 1 — The Problem**
| # | Slug | Title | Thrust |
|---|------|-------|--------|
| 1.1 | yt-1-1-the-post-matric-cliff | The Post-Matric Cliff | Scale of youth unemployment / NEET; the structural gap at school-exit |
| 1.2 | yt-1-2-the-cohesion-deficit | The Cohesion and Discipline Deficit | Fragmentation + honest audit of why past programmes underdelivered |

**Part 2 — The Dual-Track Model**
| # | Slug | Title | Thrust |
|---|------|-------|--------|
| 2.1 | yt-2-1-one-crucible-two-tracks | One Crucible, Then Two Tracks | Universal basic military training, then the military/civilian deployment fork |
| 2.2 | yt-2-2-lessons-from-abroad | Lessons From Abroad | Singapore-led comparators; what transfers and what doesn't |
| 2.3 | yt-2-3-making-service-prestigious | Making Service Prestigious | Prestige + benefits: jobs, venture finance, recognition |

**Part 3 — The Implementation**
| # | Slug | Title | Thrust |
|---|------|-------|--------|
| 3.1 | yt-3-1-a-phased-rollout | A Phased Rollout | Pilot → scale → universal; institutional + legislative architecture |
| 3.2 | yt-3-2-what-it-would-cost | What It Would Cost | Bottom-up per-participant + per-phase costing |
| 3.3 | yt-3-3-how-to-pay-for-it | How to Pay for It — and How to Know It Works | Funding options + measurement scorecard |

Full per-article outlines live in each stub's `## Outline` section.

## Source master list (to gather/verify during drafting)

- **SA data:** Stats SA QLFS (youth unemployment, NEET); DHET post-school stats; DBE matric throughput; Treasury Budget Review; DPME programme evaluations; AGSA.
- **Existing programmes:** NYDA, National Youth Service, NARYSEC, EPWP / Community Work Programme, Presidential Youth Employment Intervention / SA Youth, Basic Education Employment Initiative.
- **Comparators:** Singapore MINDEF/NS; Israel Sherut Leumi; South Korea conscription literature; Germany Zivildienst; Nordic universal-service models; OECD/academic reviews.
- **Cohesion:** IJR SA Reconciliation Barometer.
- **Finance/benefits:** NYDA grants, SEFA, DFI youth-enterprise funding; SETA/skills-levy data; employer-credential evidence.
- **Defence:** SANDF training-capacity considerations for universal basic training (to pressure-test feasibility in 2.1 / 3.2).

## Next step

On green light, draft full articles to the 4,500-word standard in batches — order: **Batch 1** Part 1 (1.1, 1.2) → **Batch 2** Part 2 (2.1, 2.2, 2.3) → **Batch 3** Part 3 (3.1, 3.2, 3.3). Build + `budget:strict` check per batch; wire cross-links after drafts exist.
