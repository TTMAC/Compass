# BookProject — Phase 2 Tooling Scaffold

This folder contains the empty templates required by **Phase 2 (Distillation Pipeline)** of the GovCompass Book Program. See `docs/Book_Program_Brief_And_Execution_Plan.md` in the parent repo for the full plan.

## Layout

```
BookProject/
├── README.md                        ← this file
├── program/                         ← shared tooling (feeds both A and B)
│   ├── source-map.csv               ← article → chapter mapping
│   ├── stat-check.csv               ← every numeric claim, sourced & dated
│   ├── glossary.md                  ← terms in plain-English + technical
│   └── chapter-brief-template.md    ← reusable 1-page chapter brief
├── A/                               ← Product A working directory
│   └── chapters/                    ← (instantiate one brief per chapter here)
└── B/                               ← Product B working directory
    └── volumes/                     ← (instantiate one folder per volume here)
```

## How to use the templates

1. **`source-map.csv`** — One row per source article (78 rows total). Fill the `product_a_*` and `product_b_*` columns as Phase 2 chapter briefs lock. Use `cut_reason` to record articles deliberately excluded.
2. **`stat-check.csv`** — Add a row every time a numeric claim is lifted from a source article into a draft. The `freshness_flag` and `last_verified_date` columns drive the pre-press fact-check sweep.
3. **`glossary.md`** — Add an entry the first time a term appears in either product. Each entry has both a plain-English definition (for A) and a technical definition (for B). Keep alphabetical.
4. **`chapter-brief-template.md`** — Copy into `A/chapters/01-architecture-of-the-state.md` (etc.) or `B/volumes/v1/01-...md` and fill in. Do not draft prose until the brief is signed off.

## CSV vs. spreadsheet

The shared tooling is CSV so it is diff-able under git and transferable across tools. Open in Excel, Numbers, or Google Sheets directly; save back as CSV when committing.

## What's not here yet

- `/source/articles/` — copy the 78 markdown articles from `src/content/articles/` of the GovCompass repo.
- `/source/style-guide.md`, `/source/domain-model.md`, `/source/manifesto.md` — copy from the GovCompass `docs/` folder.
- `/shared/figures/` — create when Phase 3 figure library work begins.
