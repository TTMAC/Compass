# Testing Strategy — Compass: A Political Literacy Blog for South Africa's Missing Middle

> **Purpose:** Define the testing practices, standards, and quality gates for the Compass project. This document serves as the authoritative reference for how tests should be written, organized, and maintained. Compass is a static site (Astro + Netlify), so testing focuses on content schema validation, component behaviour, performance compliance, and accessibility — not on database transactions or server-side state.

---

## 1. Testing Philosophy

**TDD Adoption Level:** TDD for content schema validation and component logic; test-after for layout/styling components.

**Core Principles:**

1. Tests are documentation — they describe what the content schema accepts and what components do
2. Performance is a test — Lighthouse audits are part of the test suite, not an afterthought
3. The reader's device is the test environment — all testing assumes a Samsung Galaxy A15 on 4G prepaid data
4. Schema validation prevents content bugs — if the Zod schema passes, the content is structurally valid

**Test-Driven Development Workflow:**

```
┌─────────────────────────────────────────────────────────────┐
│  RED         →        GREEN        →        REFACTOR       │
│  Write a          Write minimal         Clean up code      │
│  failing test     code to pass          while tests pass   │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Test Pyramid

**Target Distribution:**

```
                    ┌───────────┐
                   /   E2E/UI   \          ~10%
                  / (slow, few)  \
                 /────────────────\
                /   Integration    \       ~20%
               /  (moderate, some)  \
              /──────────────────────\
             /        Unit Tests      \    ~70%
            /     (fast, many)         \
           /────────────────────────────\
```

| Test Type | Target % | Max Execution Time | Scope |
|-----------|----------|-------------------|-------|
| Unit | 70% | < 100ms per test | Schema validation, pure functions, utility logic |
| Integration | 20% | < 5s per test | Component rendering, build output verification, OG meta |
| E2E / Lighthouse | 10% | < 30s per test | Critical reader journeys, performance budget compliance |

---

## 3. Test Types & Standards

### 3.1 Unit Tests

**Definition:** Tests that verify content schema validation rules, pure utility functions, and isolated logic without requiring a build or browser.

**Scope:**

- Zod schema validation (article frontmatter accepts valid input, rejects invalid input)
- Series navigation integrity (doubly-linked list validation)
- Reading time calculation
- UTM parameter generation for share links
- Sphere enum validation
- Description length validation (150–160 chars)
- ArticleNumber format validation (X.Y)

**Isolation Rules:**

| Dependency Type | Approach |
|-----------------|----------|
| Astro build system | Not needed — test Zod schemas directly |
| File system | Mock or use inline test data |
| External APIs (GA4, ESP) | Not tested at unit level |
| Browser APIs (Clipboard, scroll) | Mock in unit tests if testing logic |

**Naming Convention (BDD-style):**

```
should_<expected_behavior>_when_<condition>

Examples:
should_reject_article_when_part_exceeds_5
should_accept_article_when_all_required_fields_present
should_calculate_reading_time_for_5000_word_article
should_reject_description_when_under_150_chars
should_validate_series_navigation_links_to_existing_slugs
```

**Structure (AAA Pattern):**

```typescript
// Arrange: Set up test data (valid/invalid frontmatter)
// Act: Run Zod schema parse
// Assert: Verify success or specific error
```

**Example:**

```typescript
import { describe, it, expect } from 'vitest';
import { articleSchema } from '../src/content/config';

describe('Article Schema', () => {
  describe('sphere validation', () => {
    it('should_reject_article_when_sphere_is_invalid', () => {
      // Arrange
      const invalidArticle = {
        ...validArticleBase,
        sphere: 'federal', // Invalid — not in enum
      };

      // Act & Assert
      expect(() => articleSchema.parse(invalidArticle)).toThrow();
    });

    it('should_accept_article_when_sphere_is_national', () => {
      // Arrange
      const article = {
        ...validArticleBase,
        sphere: 'national',
      };

      // Act
      const result = articleSchema.parse(article);

      // Assert
      expect(result.sphere).toBe('national');
    });
  });
});
```

---

### 3.2 Integration Tests

**Definition:** Tests that verify components render correctly, build output meets specifications, and integrations produce expected results.

**Scope:**

- Astro component rendering (ArticleLayout produces correct HTML structure)
- OG meta tags in built HTML match frontmatter values
- Series page correctly groups articles by Part
- Sphere filter produces correct filtered output
- Email form renders with correct Netlify Forms attributes
- Sitemap includes all published articles
- Reading progress component attaches to correct DOM elements

**Environment:**

- Build: Astro build (`npm run build`) produces static HTML in `dist/`
- Component testing: Astro's built-in test utilities or DOM parsing of build output
- No database, no containers needed

**Data Management:**

| Strategy | When to Use |
|----------|-------------|
| Test fixture articles | Markdown files with known frontmatter for build-output testing |
| Inline Zod test data | Quick schema validation without touching filesystem |

**Naming Convention:**

```
<Component>Integration_<scenario>

Examples:
ArticleLayoutIntegration_rendersCorrectOGMetaTags
SeriesPageIntegration_groupsArticlesByPart
EmailCaptureIntegration_includesNetlifyFormsAttributes
SitemapIntegration_includesAllPublishedArticles
```

---

### 3.3 End-to-End (E2E) Tests

**Definition:** Tests that verify complete reader journeys through the built site, including performance budget compliance.

**Scope:**

- Critical reader journeys (happy paths)
- Performance budget verification (Lighthouse)
- Accessibility compliance (WCAG 2.1 AA)

**Framework:** Playwright (for browser-based E2E) + Lighthouse CI (for performance)

**Environment:** Local preview server (`npm run preview` against `dist/` output)

**Critical Paths to Cover:**

| Journey | Priority | Frequency |
|---------|----------|-----------|
| Reader loads article → reading progress bar works → reaches footer → sees prev/next | P0 | Every deploy |
| Reader submits email → sees inline confirmation (no page reload) | P0 | Every deploy |
| WhatsApp share button → opens WhatsApp with correct UTM URL | P1 | Every deploy |
| Series page → sphere filter → correct articles shown | P1 | Weekly |
| Lighthouse Performance ≥ 90 on article page (4G throttle) | P0 | Every deploy |
| Lighthouse Accessibility ≥ 90 on all page types | P0 | Every deploy |

**E2E Test Rules:**

- Maximum 10 E2E tests total (static site — keep it lean)
- Each test must be independent
- Use `data-testid` selectors
- Lighthouse tests run against the built `dist/` output served locally
- Never test edge cases in E2E — that's what unit tests are for

---

### 3.4 Performance Tests (Lighthouse)

**Definition:** Automated Lighthouse audits that enforce the performance budget derived from MRD constraints (Samsung Galaxy A15, 4G prepaid data).

**Tool:** Lighthouse CI (`@lhci/cli`)

**Baseline Metrics:**

| Metric | Target | Hard Limit (Fail Build) |
|--------|--------|------------------------|
| FCP | < 1.0s | < 1.5s |
| LCP | < 1.5s | < 2.5s |
| CLS | < 0.05 | < 0.1 |
| Performance Score | ≥ 95 | ≥ 90 |
| Accessibility Score | ≥ 95 | ≥ 90 |
| Total page weight | < 250KB | < 450KB |
| Total JavaScript | < 20KB | < 35KB |

**Lighthouse Configuration:**

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:4321/', 'http://localhost:4321/articles/architecture-of-the-state'],
      settings: {
        throttling: { cpuSlowdownMultiplier: 4 }, // Simulate mid-range device
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.90 }],
        'categories:accessibility': ['error', { minScore: 0.90 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1500 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
  },
};
```

---

## 4. Test Organization

### 4.1 Directory Structure (Separate test directory)

```
compass-blog/
├── src/
│   ├── content/
│   │   └── config.ts              # Content collection schema (test target)
│   ├── components/                 # Astro components (test targets)
│   └── ...
├── tests/
│   ├── unit/
│   │   ├── content-schema.test.ts         # Zod schema validation
│   │   ├── reading-time.test.ts           # Reading time calculation
│   │   ├── series-navigation.test.ts      # Doubly-linked list integrity
│   │   ├── utm-params.test.ts             # Share URL generation
│   │   └── sphere-validation.test.ts      # Sphere enum edge cases
│   ├── integration/
│   │   ├── article-rendering.test.ts      # Built HTML structure
│   │   ├── og-meta.test.ts                # OG tags match frontmatter
│   │   ├── email-form.test.ts             # Netlify Forms attributes
│   │   ├── sitemap.test.ts                # Published articles in sitemap
│   │   └── series-page.test.ts            # Part grouping and sphere filtering
│   ├── e2e/
│   │   ├── article-reading.e2e.test.ts    # Core reading journey
│   │   ├── email-subscribe.e2e.test.ts    # Email capture flow
│   │   └── performance.e2e.test.ts        # Lighthouse budget checks
│   ├── fixtures/
│   │   ├── valid-article.md               # Known-good article for testing
│   │   ├── invalid-articles/              # Articles with specific schema violations
│   │   └── test-helpers.ts                # Shared test utilities
│   └── setup.ts                           # Vitest global setup
├── lighthouserc.js                        # Lighthouse CI config
├── vitest.config.ts                       # Vitest configuration
└── playwright.config.ts                   # Playwright E2E configuration
```

### 4.2 File Naming Conventions

| Test Type | Pattern | Example |
|-----------|---------|---------| 
| Unit | `<name>.test.ts` | `content-schema.test.ts` |
| Integration | `<name>.test.ts` (in integration/) | `og-meta.test.ts` |
| E2E | `<name>.e2e.test.ts` | `article-reading.e2e.test.ts` |
| Performance | `performance.e2e.test.ts` | Runs Lighthouse CI assertions |

---

## 5. Coverage Standards

### 5.1 Coverage Targets

| Layer | Minimum Coverage | Target Coverage |
|-------|------------------|-----------------|
| Content Schema (Zod validation, series nav) | 90% | 95% |
| Component Logic (utilities, share URL generation) | 80% | 90% |
| Integration (rendering, OG meta, forms) | 70% | 80% |
| **Overall** | 80% | 85% |

### 5.2 Coverage Exclusions

The following are excluded from coverage calculations:

- [x] Astro configuration files (`astro.config.mjs`, `tailwind.config.mjs`)
- [x] Netlify configuration (`netlify.toml`)
- [x] Layout templates (HTML structure, not logic)
- [x] Static assets (fonts, OG images)
- [x] Markdown article content (tested by schema validation, not line coverage)
- [x] Third-party integrations (GA4 script — tested via E2E consent flow)

### 5.3 Coverage Tool

**Tool:** Vitest with V8 coverage provider

**Configuration file:** `vitest.config.ts`

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/content/config.ts', 'src/components/**/*.ts', 'src/utils/**/*.ts'],
      exclude: ['src/**/*.astro', 'scripts/**'],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
```

---

## 6. Test Data Management

### 6.1 Test Data Strategies

| Strategy | Use Case | Example |
|----------|----------|---------| 
| Fixtures (Markdown) | Full article files for build-output testing | `tests/fixtures/valid-article.md` |
| Inline objects | Quick Zod schema tests | `{ title: 'Test', part: 1, sphere: 'national', ... }` |
| Invalid variants | Schema rejection testing | Articles with part=6, sphere='federal', description of 100 chars |

### 6.2 Test Data Builders

```typescript
// tests/fixtures/test-helpers.ts

interface ArticleFrontmatter {
  title: string;
  subtitle: string;
  part: number;
  articleNumber: string;
  sphere: 'national' | 'provincial' | 'municipal' | 'all';
  description: string;
  publishDate: Date;
  readingTime: number;
  status: 'published' | 'draft' | 'coming-soon';
  series: { prev: string | null; next: string | null };
  seo: { ogImage?: string; canonicalUrl?: string; keywords: string[] };
}

class ArticleBuilder {
  private props: ArticleFrontmatter = {
    title: 'Test Article',
    subtitle: 'A test subtitle',
    part: 1,
    articleNumber: '1.1',
    sphere: 'all',
    description: 'A test description that is exactly one hundred and fifty-five characters long for valid SEO meta description testing purposes here.',
    publishDate: new Date('2026-09-01'),
    readingTime: 25,
    status: 'published',
    series: { prev: null, next: null },
    seo: { keywords: ['test'] },
  };

  withPart(part: number) { this.props.part = part; return this; }
  withSphere(sphere: ArticleFrontmatter['sphere']) { this.props.sphere = sphere; return this; }
  withStatus(status: ArticleFrontmatter['status']) { this.props.status = status; return this; }
  withDescription(desc: string) { this.props.description = desc; return this; }
  withSeriesNav(prev: string | null, next: string | null) {
    this.props.series = { prev, next };
    return this;
  }
  published() { this.props.status = 'published'; return this; }
  draft() { this.props.status = 'draft'; return this; }
  comingSoon() { this.props.status = 'coming-soon'; return this; }

  build(): ArticleFrontmatter { return { ...this.props }; }
}

// Usage in tests:
const article = new ArticleBuilder().withPart(3).withSphere('provincial').published().build();
```

### 6.3 Shared Test Utilities Location

```
tests/fixtures/test-helpers.ts
```

---

## 7. Mocking & Stubbing Standards

### 7.1 Mocking Framework

**Framework:** Vitest (built-in mocking capabilities)

### 7.2 Mocking Rules

| Do | Don't |
|----|-------|
| Mock browser APIs (Clipboard, scroll events) in unit tests | Mock Zod — test the real schema |
| Mock Netlify Forms submission for E2E if needed | Mock the Astro build system in integration tests — test real build output |
| Stub GA4 `gtag()` calls in component tests | Over-mock — most Compass logic is pure functions |

### 7.3 Mock vs Real in Context

| Dependency | Unit Tests | Integration Tests | E2E Tests |
|------------|-----------|-------------------|-----------|
| Zod schema | Real | Real | N/A |
| Astro build | N/A | Real (build then inspect output) | Real |
| Browser APIs | Mock | Mock | Real (Playwright) |
| Netlify Forms | N/A | Verify HTML attributes | Stub submission |
| GA4 | N/A | N/A | Verify consent flow |

---

## 8. TDD Workflow Guidelines

### 8.1 When to Apply TDD

| Scenario | TDD Required? | Rationale |
|----------|---------------|-----------|
| Content schema changes | Yes | Schema is the invariant enforcer — test first |
| Series navigation logic | Yes | Broken links break the core reading experience |
| New utility functions | Yes | Pure functions are ideal TDD candidates |
| Bug fixes | Yes | Write failing test that reproduces bug first |
| New Astro components | Test-after | Component rendering is best tested via build output |
| Layout/styling changes | No | Visual — verify via browser and Lighthouse |
| Markdown content authoring | No | Validated by schema at build time |

### 8.2 TDD Micro-Cycle

```
1. RED    - Write smallest failing test (should take <5 min)
2. GREEN  - Write minimal code to pass (no more than needed)
3. REFACTOR - Clean up while green (no new functionality)
4. REPEAT
```

### 8.3 Test-First Checklist

Before writing implementation code, Claude should confirm:

- [ ] Test exists and fails
- [ ] Test failure message is clear
- [ ] Test name describes expected behavior
- [ ] Test covers one behavior only

---

## 9. CI/CD Integration

### 9.1 Test Execution in Pipeline

| Stage | Tests Run | Failure Action |
|-------|-----------|----------------|
| Pre-commit (local) | Unit tests (fast subset) | Block commit |
| Push to branch | All unit + integration | Block merge to main |
| Push to main | All tests + Lighthouse CI | Alert; failed build does not deploy (Netlify keeps previous deploy) |
| Weekly | Full suite including all E2E | Alert |

### 9.2 Quality Gates

| Gate | Threshold | Enforcement |
|------|-----------|-------------|
| Unit tests pass | 100% | Block merge |
| Integration tests pass | 100% | Block merge |
| Coverage (overall) | ≥ 80% | Block merge |
| Lighthouse Performance | ≥ 90 | Block deploy |
| Lighthouse Accessibility | ≥ 90 | Block deploy |
| Total page weight | < 450KB | Block deploy |
| No skipped tests | 0 (or justified) | Warning |

### 9.3 Test Reporting

**Reports generated:**

- [x] Coverage report (HTML + JSON via Vitest)
- [x] Lighthouse HTML reports (via `@lhci/cli`)
- [x] Test duration tracking (Vitest verbose output)

**Report location:** `./coverage/` (gitignored), Netlify deploy logs

---

## 10. Handling Flaky Tests

**Policy:**

1. Flaky tests must be fixed within 48 hours or quarantined
2. Quarantined tests tracked in GitHub Issues with `flaky-test` label
3. Static site tests should rarely be flaky — if they are, it's likely a build environment issue

**Common Causes & Fixes for Compass:**

| Cause | Symptom | Fix |
|-------|---------|-----|
| Build order | Component test fails intermittently | Ensure test runs against fresh build output |
| Port conflict | E2E preview server doesn't start | Use dynamic port allocation in Playwright config |
| Lighthouse variance | Performance score fluctuates ±3 points | Use median of 3 runs; set thresholds with margin |

---

## 11. Testing Anti-Patterns to Avoid

| Anti-Pattern | Problem | Better Approach |
|--------------|---------|-----------------|
| Testing Tailwind class names | Brittle, breaks on styling refactor | Test rendered output behaviour, not CSS classes |
| Testing Markdown content | Content is validated by schema | Test the schema rules, not individual articles |
| E2E for schema validation | Slow and unnecessary | Unit-test Zod schemas directly |
| Skipping Lighthouse | Performance regression goes unnoticed | Automate Lighthouse in CI |
| Testing GA4 fires correctly | Flaky, depends on consent state | Test consent flow; trust GA4's own validation |

---

## 12. Claude-Specific Instructions

**When writing code, Claude should:**

- [ ] Write the test first (failing) before implementation for schema and utility changes
- [ ] Run tests after each change to verify state
- [ ] Follow the naming conventions in Section 3
- [ ] Use the ArticleBuilder from Section 6 for test data
- [ ] Ensure new code meets coverage thresholds
- [ ] Run Lighthouse after any change that adds JS, CSS, or fonts

**When reviewing or modifying existing tests, Claude should:**

- [ ] Preserve existing test coverage
- [ ] Flag if changes reduce coverage below thresholds
- [ ] Update test names if behavior changes
- [ ] Remove obsolete tests rather than commenting out

**When asked to skip tests or reduce coverage, Claude should:**

1. Clarify the reason (spike? time pressure? tech debt?)
2. Document the gap and plan to address
3. Never merge code that reduces coverage without explicit approval

**Test output verbosity:** Show failures only (default); verbose on CI

---

## 13. Tools & Configuration Reference

| Purpose | Tool | Config File |
|---------|------|-------------|
| Test runner | Vitest | `vitest.config.ts` |
| Assertions | Vitest (built-in expect) | — |
| Mocking | Vitest (built-in vi) | — |
| Coverage | Vitest + V8 | `vitest.config.ts` |
| E2E | Playwright | `playwright.config.ts` |
| Performance | Lighthouse CI | `lighthouserc.js` |

---

## 14. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-16 | Tshepo Machele | Initial testing strategy for Compass MVP |

---

*Last updated: 2026-02-16*
