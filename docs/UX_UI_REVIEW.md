# GovCompass UX/UI Review

**Date:** 2026-03-26
**Reviewer:** Claude (automated review of codebase)
**Scope:** Full site — pages, components, layouts, design system, accessibility

---

## What's Working Well

### Typography
- Serif body (Source Serif 4) + sans-serif headings (Inter) is a strong editorial pairing
- 680px content measure and 1.65 line-height optimise long-form reading comfort
- Responsive sizing (17px mobile / 19px desktop) is well-calibrated

### Color System
- Pillar color-coding (green/blue/amber/purple) and sphere badges create a clear visual taxonomy
- Consistent application across cards, breadcrumbs, and tags

### Performance
- Font preloads, lazy loading, minimal JS — well-suited for 4G audience
- Static-first architecture keeps page weight well within the 450KB hard limit

### Accessibility Fundamentals
- Skip-to-content link, `lang="en-ZA"`, ARIA labels, keyboard focus indicators
- `prefers-reduced-motion` support disables all animations
- Screen-reader-only labels on form fields

### Article Layout
- Breadcrumbs, sphere badges, reading time metadata
- Sticky desktop TOC with IntersectionObserver active-section highlighting
- Collapsible mobile TOC using native `<details>`

---

## Issues Found

### High Priority (Quick Wins)

| # | Issue | Impact | Fix |
|---|-------|--------|-----|
| 1 | **Homepage hero has no CTA** — visitors land on a green block with tagline but no action | First-time visitors don't know where to go | Add "Start reading" button linking to Article 1.1 |
| 2 | ~~**ShareButtons and ArticleNav not wired into ArticleLayout**~~ — **Already implemented** in `[...slug].astro` (ShareButtons, CrossLinks, EmailCapture, ArticleNav all render after content) | N/A | No action needed |
| 3 | **Email capture has no privacy context** — form collects email with zero mention of data handling | POPIA compliance gap; erodes trust | Add small privacy link next to subscribe button |
| 4 | **Topics dropdown aria-expanded is hardcoded `false`** — never updates on hover/focus | Screen readers always report dropdown as collapsed | Toggle `aria-expanded` via JS on mouseenter/mouseleave and focus |
| 5 | **Mobile hamburger icon doesn't change to X** — three-line icon stays static when menu is open | Users lose visual confirmation that menu is open | Toggle SVG path between hamburger and X on click |

### Medium Priority (Polish)

| # | Issue | Impact | Suggested Fix |
|---|-------|--------|---------------|
| 6 | **Pillar cards are visually flat** — all four cards look identical; "Start here" label is `text-xs` and easy to miss | New visitors don't know where to begin | Give "Government Structure" card a subtle tint or colored left border; increase "Start here" label size |
| 7 | **Mobile feedback loop diagram is disconnected** — diagram link text "See how they connect" is `text-xs` | Relationship between cards and diagram is unclear on mobile | Add brief intro text above the diagram on mobile |
| 8 | **CTA button hover is barely perceptible** — `hover:bg-opacity-90` on `#1B6B4A` is near-invisible | Weak interactive feedback | Use a darker hover shade (`#145236`) or add subtle shadow/transform |
| 9 | **Footer navigation is dense** — 9+ links in a single flat list | Cognitive overload | Group links into "Topics" and "About & Legal" sub-sections |
| 10 | **Reading progress bar visibility** — gold (`#C8A951`) at 4px on white may be hard to see on some screens | Low contrast for a progress indicator | Test compass-green as alternative; consider 5-6px height |

### Low Priority (Future)

| # | Issue | Impact | Suggested Fix |
|---|-------|--------|---------------|
| 11 | **Cookie consent is binary Accept/Decline** — no granular category control | POPIA/GDPR best practice gap (acceptable for MVP) | Add category-level toggles (analytics vs functional) post-MVP |
| 12 | **No post-article email capture** — after 15+ min of reading, no subscribe prompt | Missed conversion opportunity | Add EmailCapture component after ArticleNav |

---

## Implementation Plan

### Phase 1: Quick Wins (implementing now)

1. **Hero CTA** — Add "Start reading" button in hero section of `index.astro`
2. **Article end components** — Wire `ShareButtons` + `ArticleNav` into `ArticleLayout.astro`
3. **Privacy link on email forms** — Add link to `/privacy` in `EmailCapture.astro`
4. **Topics dropdown a11y** — Toggle `aria-expanded` in `Header.astro` script
5. **Hamburger icon toggle** — Swap SVG paths on menu open/close in `Header.astro`

### Phase 2: Polish (next iteration)

6. Differentiate "Start here" pillar card
7. Improve mobile feedback loop context
8. Darken CTA hover state
9. Group footer navigation
10. Test progress bar visibility

### Phase 3: Future

11. Granular cookie consent
12. Post-article email capture
