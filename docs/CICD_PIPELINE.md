# CI/CD Pipeline — GovCompass

This document describes how code moves from development to production for the GovCompass project.

## Architecture Overview

GovCompass uses **GitHub Actions** for continuous integration and **Netlify** for deployment. Three long-lived branches map to three environments on a single Netlify site using branch deploys:

| Branch    | Environment | URL                                    | GA4     |
| --------- | ----------- | -------------------------------------- | ------- |
| `develop` | Development | `develop--{netlify-site}.netlify.app`  | Off     |
| `staging` | Staging     | `staging--{netlify-site}.netlify.app`  | Off     |
| `main`    | Production  | `govcompass.co.za`                     | On      |

## Promotion Flow

```
feature-branch
      |
      | PR (CI must pass)
      v
   develop  ──> Development deploy
      |
      | PR (CI must pass)
      v
   staging  ──> Staging deploy
      |
      | PR (CI must pass)
      v
    main    ──> Production deploy
```

1. Create a feature branch off `develop`.
2. Open a PR to `develop`. CI runs automatically.
3. Merge when CI is green. Netlify deploys to the development URL.
4. When ready to validate a release candidate, open a PR from `develop` to `staging`. CI runs again.
5. Merge when green. Netlify deploys to the staging URL.
6. When confident, open a PR from `staging` to `main`. CI runs a final time.
7. Merge when green. Netlify deploys to production.

For hotfixes: branch off `main`, fix, PR to `main`. After merging, back-merge `main` into `staging` and `develop` to keep them in sync.

## CI Pipeline (GitHub Actions)

Defined in `.github/workflows/ci.yml`. Triggers on pushes and PRs to `main`, `staging`, and `develop`.

### Jobs

The pipeline runs four jobs in this order:

```
  lint ──┐
         ├──> build ──> e2e
  test ──┘
```

**1. Lint** (runs in parallel with Test)
- `npm run lint` — ESLint across `.ts` and `.astro` files
- `npm run format:check` — Prettier formatting check

**2. Unit Tests** (runs in parallel with Lint)
- `npm test` — Vitest unit tests with happy-dom

**3. Build** (runs after Lint and Test pass)
- Sets `SITE_URL` dynamically based on the target branch
- `npm run build` — Runs the scheduled-publish script, Astro build, and Pagefind indexing
- Uploads the `dist/` directory as an artifact for the E2E job

**4. E2E Tests** (runs after Build)
- Downloads the build artifact
- Installs Playwright with Chromium
- `npm run test:e2e` — Runs Playwright tests against the built site (Desktop Chrome + Mobile Chrome)
- Uploads the Playwright HTML report as an artifact (retained for 7 days)

### Concurrency

Concurrent runs on the same branch are cancelled automatically. If you push twice in quick succession, only the latest run proceeds.

## Netlify Deployment

Netlify is configured to auto-deploy when code is pushed to `main`, `staging`, or `develop`. Since branch protection rules require CI to pass before PRs can merge, Netlify only deploys code that has passed the full pipeline.

### Branch Deploy Contexts

Each environment gets its own `SITE_URL` via `netlify.toml`:

```toml
[context.production.environment]
  SITE_URL = "https://govcompass.co.za"

[context.staging.environment]
  SITE_URL = "https://staging--govcompass.netlify.app"
  PUBLIC_GA4_ID = ""

[context.develop.environment]
  SITE_URL = "https://develop--govcompass.netlify.app"
  PUBLIC_GA4_ID = ""
```

The `SITE_URL` feeds into `astro.config.mjs` (`site` property), which makes `Astro.site` available throughout the codebase for generating canonical URLs, OG tags, and JSON-LD schema.

### Environment Variables

| Variable             | Production           | Staging / Develop | Where Set                              |
| -------------------- | -------------------- | ----------------- | -------------------------------------- |
| `SITE_URL`           | `govcompass.co.za`   | Branch URL        | `netlify.toml` contexts               |
| `PUBLIC_GA4_ID`      | Real GA4 ID          | Empty             | Netlify UI (Production context only)   |
| `BUTTONDOWN_API_KEY` | Real key             | Empty             | Netlify UI (Production context only)   |
| `UNSPLASH_ACCESS_KEY`| Real key             | Real key          | Netlify UI (all contexts)              |

GA4 and the email newsletter API key are intentionally disabled on non-production environments to avoid polluting analytics and sending test emails.

## Scheduled Publishing

A separate workflow (`.github/workflows/scheduled-publish.yml`) runs hourly on `main`. It checks for articles with `status: "scheduled"` whose `scheduledPublishDate` has passed, promotes them to `status: "published"`, commits, and pushes. This push triggers both the CI pipeline and a Netlify production deploy.

The `github-actions[bot]` user is exempted from branch protection on `main` so it can push directly.

## Branch Protection Rules

Configured in GitHub repository settings:

**`main` branch:**
- Require status checks to pass (lint, test, build, e2e)
- Exempt `github-actions[bot]` (for scheduled publishing)

**`staging` branch:**
- Require status checks to pass (lint, test, build, e2e)

**`develop` branch:**
- Optional — can allow direct pushes for faster iteration during development

## Key Files

| File | Purpose |
| ---- | ------- |
| `.github/workflows/ci.yml` | CI pipeline definition |
| `.github/workflows/scheduled-publish.yml` | Hourly scheduled article publishing |
| `netlify.toml` | Build config, branch deploy contexts, headers, redirects |
| `astro.config.mjs` | Reads `SITE_URL` from environment |
| `scripts/scheduled-publish.mjs` | Promotes scheduled articles to published |
