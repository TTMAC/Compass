# Reform Section — Login Gating

The **Reform** section of GovCompass is a private, members-only area. All reform
content lives under a gated `/reform/*` namespace that is rendered **on-demand**
and protected by [Clerk](https://clerk.com) authentication. Every other page on
the site stays **fully static and public**, ships **zero Clerk JavaScript**, and
is unaffected by the gate.

This document describes how the gating is implemented and the **manual setup
steps** required to actually turn the gate on in production.

---

## TL;DR — current state

- The implementation is **complete and committed**.
- The gate is **dormant** until Clerk credentials are set: with no
  `PUBLIC_CLERK_PUBLISHABLE_KEY`, the middleware passes every request through and
  the build succeeds without any Clerk account. Dev and deploy previews stay
  open.
- To **engage** the gate you must (1) create a Clerk app, (2) set two env vars on
  **production only** in Netlify, and (3) add the production domain to Clerk's
  allowed origins. See [Production setup](#production-setup-required-to-engage-the-gate).

---

## How it works

### Architecture

The site's default Astro output is `static` (everything prerendered). Only the
gated routes opt into on-demand rendering with `export const prerender = false`,
which means the auth middleware actually runs for them at request time. The
Netlify adapter provides the SSR function that serves those on-demand routes.

```
Public, prerendered (static CDN)         Gated, on-demand (SSR function + Clerk)
─────────────────────────────────        ──────────────────────────────────────
/  /about  /pillars/*  /articles/*        /reform                (index)
/big-picture  /grand-strategy  ...        /reform/programme
                                          /reform/metrics
                                          /reform/scorecard
                                          /reform/diagnostic-frameworks
                                          /reform/roadmap
                                          /reform/advocacy-playbooks
                                          /reform/articles/[...slug]   (ra-* only)
                                          /login
```

A request to a `/reform/*` path:

1. Hits the Netlify SSR function (these paths are **not** prerendered, so there
   is no static file to serve).
2. Runs `src/middleware.ts`. If Clerk is enabled and the user is not signed in,
   it redirects to the Clerk sign-in flow (`/login`).
3. Otherwise renders the page, which boots Clerk on the client via
   `<ClerkBoot />` and shows the `<ReformBar />` members bar with a sign-out
   control.

### Why public pages ship zero Clerk JS

The official `@clerk/astro` integration injects two global client-boot scripts
(`before-hydration` and `page` stages) that would load Clerk's CDN bundle on
**every** page — including zero-JS static pages. That would bust the page-weight
budget and make cross-origin requests our public-page CSP forbids.

`src/lib/clerk-server-first.mjs` wraps the integration and strips exactly those
two `injectScript` stages, leaving every other Clerk feature (env schema, Vite
config, middleware) intact. Clerk is then booted **manually** — only on pages
that render `<ClerkBoot />`, i.e. the gated routes and `/login`. The boot
self-guards on the publishable key, so when Clerk is unconfigured it never loads.

### Dormant-when-unconfigured

Three places check `PUBLIC_CLERK_PUBLISHABLE_KEY` and no-op when it is absent, so
the whole feature is inert without credentials:

| File | Behaviour when key absent |
|------|---------------------------|
| `src/middleware.ts` | `onRequest` is a pass-through; no redirect, no Clerk. |
| `src/components/identity/ClerkBoot.astro` | Skips `runInjectionScript()`; Clerk never loads. |
| `src/components/identity/ReformBar.astro` | Hides the sign-out button, shows a neutral label. |
| `src/pages/login.astro` | Renders a "sign-in not configured" notice instead of the widget. |

This is what keeps **dev** and **open deploy previews** working with no Clerk
account, and lets CI build keyless.

---

## Key files

### Added

| File | Purpose |
|------|---------|
| `src/middleware.ts` | The gate. Protects `/reform(.*)`; dormant without a key. |
| `src/lib/clerk-server-first.mjs` | Wraps `@clerk/astro` to strip its global client-boot scripts. |
| `src/components/identity/ClerkBoot.astro` | Manually boots Clerk on gated pages only. |
| `src/components/identity/ReformBar.astro` | "Members area" bar + sign-out, shown atop each `/reform/*` page. |
| `src/utils/article-url.ts` | `articleHref()` / `pillarHref()` — route links to `/reform/*` for reform-agenda, public paths otherwise. |
| `src/pages/login.astro` | Clerk `<SignIn />` page (on-demand). |
| `src/pages/reform/index.astro` | Gated reform landing page (ported from the reform-agenda pillar view). |
| `src/pages/reform/articles/[...slug].astro` | Gated reform article route; 404s any non-reform-agenda slug. |
| `src/pages/reform/{programme,metrics,scorecard,diagnostic-frameworks,roadmap,advocacy-playbooks}.astro` | The six standalone reform pages, moved under `/reform/`. |

### Changed

| File | Change |
|------|--------|
| `astro.config.mjs` | Added Netlify adapter, React, sitemap filter (excludes `/reform`, `/login`), and the wrapped Clerk integration (`signInUrl`/`signUpUrl` → `/login`). |
| `netlify.toml` | `NODE_VERSION=20`; Clerk-relaxed CSP scoped to `/reform/*` and `/login`; 301s from old reform URLs; **removed the `/* → /404` catch-all** (it would have swallowed the on-demand routes). |
| `src/pages/pillars/[slug].astro` | `getStaticPaths` excludes `reform-agenda`; "Related Topics" links via `pillarHref`. |
| `src/pages/articles/[...slug].astro` | `getStaticPaths` excludes reform-agenda articles (never prerendered publicly). |
| `src/layouts/ArticleLayout.astro` | Added a `banner` slot (used by the reform article route for `<ReformBar />`). |
| `src/components/{Header,Footer}.astro` | Reform nav points at `/reform/*`; reform-agenda removed from the public "Topics" lists. |
| `src/components/{ArticleNav,CrossLinks}.astro`, `src/utils/series-navigation.ts` | Route article links through `articleHref` so reform links resolve to `/reform/articles/*`. |
| `src/pages/{index,big-picture,about,grand-strategy}.astro` | Reform-agenda cards/links point at `/reform`; in-body `ra-*` article links rewritten to `/reform/articles/*`. |
| `src/content/articles/*.md` | In-body cross-links to `ra-*` articles rewritten to `/reform/articles/*` (image paths untouched). |
| `public/robots.txt` | `Disallow: /reform` and `Disallow: /login`. |
| `.env.example` | Documents the two Clerk env vars. |

### Dependencies added

```
@clerk/astro     ^3.4.6
@astrojs/netlify ^6.6.5
@astrojs/react   ^4.4.2
react / react-dom ^18.3.1
```

---

## Redirects (old → new)

Configured in `netlify.toml` as `301`s so existing links and bookmarks resolve:

| Old URL | New URL |
|---------|---------|
| `/pillars/reform-agenda` | `/reform` |
| `/reform-programme` | `/reform/programme` |
| `/leading-and-lagging-metrics` | `/reform/metrics` |
| `/reform-scorecard` | `/reform/scorecard` |
| `/diagnostic-frameworks` | `/reform/diagnostic-frameworks` |
| `/real-steps-to-reform` | `/reform/roadmap` |
| `/advocacy-playbooks` | `/reform/advocacy-playbooks` |
| `/articles/ra-*` | `/reform/articles/ra-:splat` |

---

## Production setup (required to engage the gate)

> Until these steps are done the gate is **dormant** — `/reform/*` is publicly
> readable everywhere. Do them on **production only**; leaving dev/preview keyless
> is intentional.

### 1. Create the Clerk application

1. Sign in at <https://dashboard.clerk.com> and **create a new application** for
   GovCompass (keep it separate from any other project).
2. **Enable only the sign-in methods you want.** For an invite-only members area,
   email + password (or email code) is sufficient; disable open sign-ups.
3. Restrict who can join: under **User & Authentication → Restrictions**, turn on
   **Allowlist** (or use **Invitations**) so only approved emails can register.
   This is what makes it a true members area rather than open registration.

### 2. Set environment variables in Netlify (production context only)

In **Netlify → Site configuration → Environment variables**, add both keys and
scope them to the **Production** context (not Deploy previews / Branch deploys):

| Variable | Where to find it | Notes |
|----------|------------------|-------|
| `PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk dashboard → **API keys** → Publishable key (`pk_live_…`) | Client-safe; `PUBLIC_` prefix exposes it to the browser. |
| `CLERK_SECRET_KEY` | Clerk dashboard → **API keys** → Secret key (`sk_live_…`) | **Server-only.** Never expose / never prefix with `PUBLIC_`. |

> Setting `PUBLIC_CLERK_PUBLISHABLE_KEY` is the switch that flips the gate from
> dormant to active. Set **both** together — the secret key is needed for
> server-side session verification in the middleware.

### 3. Add the production domain to Clerk

In the Clerk dashboard, configure the instance for the production host:

- Add `https://govcompass.co.za` (and `www`, if used) to Clerk's **allowed
  origins / domains**.
- If using a Clerk **custom domain** for the Frontend API (e.g.
  `clerk.govcompass.co.za`), set up the DNS records Clerk provides. The CSP in
  `netlify.toml` already allows `https://clerk.govcompass.co.za` plus
  `https://*.clerk.accounts.dev` and `https://*.clerk.com`, so either the default
  or a custom Clerk domain will work. If you use a *different* custom domain,
  update the `/reform/*` and `/login` CSP entries in `netlify.toml` to match.

### 4. Deploy and verify

After deploying with the keys set:

- [ ] Visit `/reform` **signed out** → redirected to `/login` (Clerk sign-in).
- [ ] Sign in with an allowlisted account → `/reform` and its sub-pages render,
      with the green "Reform — members area" bar and a working **Sign out**.
- [ ] An old URL (e.g. `/reform-programme`) 301-redirects to its new path.
- [ ] A public page (e.g. `/`) loads with **no Clerk requests** in the network
      tab and no CSP violations in the console.
- [ ] `view-source` of a public page contains no `clerk` script references.

---

## Local development

No Clerk account or keys are needed. The gate is dormant, so `/reform/*` and
`/login` are open and render normally.

```bash
npm install
npm run dev      # /reform/* open; /login shows the "not configured" notice
npm run build    # builds keyless; gated routes become SSR (on-demand) routes
```

To **test the gate locally**, create a Clerk **development** instance and put its
`pk_test_…` / `sk_test_…` keys in a local `.env` (see `.env.example`). With keys
present, `/reform/*` will require sign-in in dev too.

> Note: the Netlify adapter's dev emulation tries to download an Edge Functions
> runtime; in sandboxed/offline environments that download can fail and surface a
> generic error page for on-demand routes. That is an emulation limitation, not a
> code issue — `npm run build` and the deployed SSR function are unaffected.

---

## Security notes

- **`CLERK_SECRET_KEY` is server-only.** Never commit it, never give it a
  `PUBLIC_` prefix, never log it.
- Gated content is **never prerendered** to the public CDN: both shared static
  routes (`pillars/[slug]`, `articles/[...slug]`) exclude reform-agenda, so the
  reform articles exist only behind the SSR function. `robots.txt` and the
  sitemap also exclude `/reform` and `/login`.
- The CSP for `/reform/*` and `/login` is deliberately scoped: it relaxes the
  global policy *only* on those paths to permit Clerk's frontend API, UI, images
  and bot-protection (Cloudflare Turnstile). Public pages keep the stricter `/*`
  policy.
