# Imagery Batch 1 — Economic Growth & Development

**Scope:** 17 articles, slugs `eg-1-1` through `eg-5-3`
**Source:** Unsplash (demo tier, 50 reqs/hr)
**Pipeline:** `scripts/source-article-images.mjs`
**Run dates:** 2026-04-28 (sub-batches 1–2 + ad hoc retries) and 2026-04-29 (cron-driven sub-batches 3–5 + final query fixes)
**Closed:** 2026-04-29

## Result

**51 of 51 placements delivered** across 17 articles. 100% completion.

## Image inventory

| Article | img-1 | img-2 | img-3 | Dir total |
|---|---|---|---|---|
| eg-1-1-the-seven-thousand-rand-economy | 63.0 KB | 42.5 KB | 21.9 KB | 132 KB |
| eg-1-2-how-we-got-here | 73.1 KB | 42.1 KB | 37.7 KB | 160 KB |
| eg-1-3-the-comparator-countries | 21.4 KB | 51.2 KB | 30.8 KB | 108 KB |
| eg-2-1-resource-optimisation | 30.8 KB | 46.7 KB | 85.3 KB | 168 KB |
| eg-2-2-infrastructure-foundations | 30.4 KB | 25.8 KB | 34.3 KB | 96 KB |
| eg-2-3-financing-the-build | 67.3 KB | 46.3 KB | 39.0 KB | 156 KB |
| eg-2-4-the-efficiency-transition | 44.2 KB | 25.5 KB | 31.2 KB | 108 KB |
| eg-2-5-innovation-driven-growth | 27.2 KB | 8.3 KB | 18.6 KB | 60 KB |
| eg-3-1-three-engines-of-growth | 25.7 KB | 62.3 KB | 26.7 KB | 120 KB |
| eg-3-2-the-execution-machine | 48.5 KB | 6.6 KB | 38.7 KB | 100 KB |
| eg-3-3-watching-the-watchers | 28.8 KB | 22.8 KB | 28.0 KB | 88 KB |
| eg-4-1-the-municipal-performance-index | 84.2 KB | 86.2 KB | 8.6 KB | 188 KB |
| eg-4-2-the-metro-rankings | 57.1 KB | 20.5 KB | 35.7 KB | 120 KB |
| eg-4-3-infrastructure-planning-vs-reality | 37.5 KB | 16.7 KB | 11.6 KB | 72 KB |
| eg-5-1-the-political-economy-of-growth | 60.9 KB | 32.2 KB | 19.9 KB | 120 KB |
| eg-5-2-from-strategy-to-reality | 15.4 KB | 27.6 KB | 43.1 KB | 88 KB |
| eg-5-3-your-economic-citizenship | 17.3 KB | 12.5 KB | 72.8 KB | 112 KB |

**Disk total:** ~2.0 MB (1996 KB) for 51 `.webp` files at 680×450, quality 78.
**Heaviest article:** eg-4-1 at 188 KB total imagery (84 + 86 + 9 KB).
**Lightest:** eg-2-5 at 60 KB.
**Average per article:** ~117 KB.

## Format & licence

- Dimensions: 680×450 (matches Core series convention)
- Format: WebP, quality 78
- Source: Unsplash (free commercial use, attribution courtesy)
- Attribution baked into alt text: `<caption> | Photo by <photographer> on Unsplash`

## Page-weight impact

Build run: `npm run build && npm run budget:strict` on 2026-04-29.
**Budget: 0 pages over the 450 KB hard limit.** Heaviest EG article HTML: 48.5 KB gzipped (`eg-1-2`); lightest 42.4 KB (`eg-2-3`). All EG pages well under the 250 KB target. Inline images load separately and don't count toward HTML page weight, but the cumulative `.webp` payload (avg ~117 KB per article) is itself well within the 4G-friendly margin the page-weight budget exists to protect.

## Query iterations & failures

5 of the original 51 queries returned zero Unsplash results on first run and were swapped to generic photographable concepts. All were filled successfully on the retry pass.

| Article / placement | Original query | Replacement |
|---|---|---|
| eg-2-3 / img-1 | `Johannesburg stock exchange trading floor` → `Sandton financial district skyline` | `skyscraper financial district city` |
| eg-3-2 / img-3 | `Malaysia Putrajaya government complex` | `government complex modern architecture` |
| eg-4-2 / img-2 | `Johannesburg metro rail station` | `urban metro train commuters` |
| eg-4-2 / img-3 | `South African suburb residential street` | `residential houses aerial neighbourhood` |
| eg-5-2 / img-1 | `Kigali Rwanda city skyline` | `African city skyline modern` |
| eg-5-2 / img-2 | `project timeline gantt chart` | `strategic planning whiteboard team` |

**Pattern:** Unsplash has thin coverage for queries combining named cities/institutions with industry terms ("Sandton", "Putrajaya", "Kigali", "Johannesburg + metro", "South African + suburb"). Generic photographable concepts succeeded uniformly. Carry this lesson forward to the hd-/ra-/ss- batches: prefer concrete subjects ("hospital ward", "court room") over named-place specificity.

The eg-5-2 img-2 caption was edited at the same time to remove a Rwanda-specific reference that no longer matched the generic skyline image.

## Editorial guardrails

- **Non-partisan:** No party logos, campaign material, or political-figure portraits in any selected image. Imagery skewed institutional (Treasury-style buildings, ports, factories), infrastructural (rail, electricity, water), and economic-activity (workers, traders, students).
- **South African relevance where applicable:** Core SA-specific articles received South African or Sub-Saharan African imagery where Unsplash carried it; comparator-country articles (`eg-1-3`, `eg-3-2`, `eg-5-2`) drew on international imagery (Vietnam, South Korea, Singapore) appropriate to their content.
- **Sensitivity:** Low-risk batch overall. No exploitative or graphic imagery surfaced.

## Operational notes for future batches

- **Demo-tier rate limit (50 reqs/hr) is the binding constraint.** 3-article sub-batches consume ~18 reqs and fit comfortably. 5-article sub-batches fit a single fire but exhaust the window. The cron approach (hourly, off-minute) drained the queue cleanly across 3 fires — recommend reusing for hd-/ra-/ss-.
- **Caching gotcha:** repeated `--force` re-runs on the same article populate stale entries in `.astro/data-store.json`, producing harmless `[glob-loader] Duplicate id` warnings on subsequent builds. Resolution: `rm -rf .astro` before a clean build. Only affects the local dev loop; CI builds from a clean tree.
- **Cron flow worked end-to-end.** `CronCreate` with a self-detecting offset prompt drained the remaining 9 articles across 3 fires without supervision. `CronDelete` cleanup was manual (intentional — auto-deletion would be brittle).
- **Caption discipline:** when a query is swapped for a generic alternative, audit the caption — image-specific references (e.g. "Rwanda's public dashboard") become misleading alt-text if the resulting image isn't of the named place. Build the caption around the section's argument, not the image's content where possible.

## Distribution spot-check

Pending. Site is at govcompass.co.za but the EG articles still carry `status: "draft"` (publishDate 2028-07-01 across the EG batch), so they don't render in the production sitemap or social previews yet. Distribution validation should be deferred to the launch cadence rather than verified here.

## Outstanding items

- **OG images:** still falling back to `/og/default.png` for all 17 EG articles. Generation script `scripts/generate-og-images.py` covers all 79 articles by frontmatter; running it would produce per-article OG images at 1200×630. Decision to do so is owner's — not blocking inline-image batch closure.
- **Per-article inspection:** owner has been committing as work progressed. Visual review of selected images on `localhost:4321` recommended before promoting any EG article to `published` status.

## Batch closure

Imagery Batch 1 (Economic Growth) — Done.
Next batch per Item 39 sequencing: **Imagery Batch 2 — Human Development** (15 articles, `hd-1-1` through `hd-5-2`). Sensitivity bar rises sharply (GBV / HIV / TB / child mortality content).
