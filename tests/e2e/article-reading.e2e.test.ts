import { test, expect } from "@playwright/test";

test.describe("Article reading journey", () => {
  test("should navigate from home to article", async ({ page }) => {
    await page.goto("/");

    // Click on the CTA to read article 1.1 (the homepage links to it from
    // more than one place, so target the first match).
    const ctaLink = page
      .locator('a[href*="/articles/1-1-architecture-of-the-state"]')
      .first();
    await expect(ctaLink).toBeVisible();
    await ctaLink.click();

    // Verify article page loaded
    await expect(page).toHaveURL(/articles\/1-1-architecture-of-the-state/);
    await expect(page.locator("h1")).toContainText(
      "The Architecture of the State",
    );
  });

  test("should display article metadata", async ({ page }) => {
    await page.goto("/articles/1-1-architecture-of-the-state/");

    // Article number (appears in more than one place on the page)
    await expect(page.locator("text=Article 1.1").first()).toBeVisible();

    // Sphere badge — article 1.1 is cross-cutting, shown as "All"
    await expect(page.getByText("All", { exact: true }).first()).toBeVisible();

    // Reading time
    await expect(page.locator("text=min read").first()).toBeVisible();
  });

  test("should render callout components", async ({ page }) => {
    await page.goto("/articles/1-1-architecture-of-the-state/");

    const callouts = page.locator("[data-callout]");
    expect(await callouts.count()).toBeGreaterThanOrEqual(3);

    // Article 1.1 uses all three callout types (each may appear more than once)
    await expect(page.locator('[data-callout="expert"]').first()).toBeVisible();
    await expect(
      page.locator('[data-callout="takeaway"]').first(),
    ).toBeVisible();
    await expect(
      page.locator('[data-callout="framework"]').first(),
    ).toBeVisible();
  });

  test("should have reading progress bar", async ({ page }) => {
    await page.goto("/articles/1-1-architecture-of-the-state/");
    const progressBar = page.locator('[data-testid="reading-progress"]');
    await expect(progressBar).toBeVisible();
  });

  test("should have share buttons", async ({ page }) => {
    await page.goto("/articles/1-1-architecture-of-the-state/");
    const shareButtons = page.locator('[data-testid="share-buttons"]');
    await expect(shareButtons).toBeVisible();

    // WhatsApp link
    const whatsappLink = page.locator('a[href*="api.whatsapp.com"]');
    await expect(whatsappLink).toBeVisible();

    // Copy button
    const copyBtn = page.locator("[data-copy-btn]");
    await expect(copyBtn).toBeVisible();
  });

  test("should have email capture form", async ({ page }) => {
    await page.goto("/articles/1-1-architecture-of-the-state/");
    const emailCapture = page.locator('[data-testid="email-capture"]').first();
    await expect(emailCapture).toBeVisible();
  });

  test("should have skip-to-content link", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeAttached();
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    await page.goto("/articles/1-1-architecture-of-the-state/");

    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);

    const h2s = page.locator("article h2");
    expect(await h2s.count()).toBeGreaterThan(0);
  });

  test("should navigate using mobile menu", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto("/");

    // Desktop nav should be hidden at mobile width
    const desktopNav = page.locator("ul.hidden.lg\\:flex");
    await expect(desktopNav).toBeHidden();

    // Open the mobile menu
    const menuToggle = page.locator("[data-menu-toggle]");
    await menuToggle.click();

    // Expand the Topics accordion and navigate to a pillar. Open the
    // <details> directly rather than clicking its summary, to avoid racing
    // the mobile menu's height animation.
    const menu = page.locator("[data-mobile-menu]");
    await menu
      .locator("details")
      .first()
      .evaluate((d) => d.setAttribute("open", ""));
    const pillarLink = menu.locator('a[href^="/pillars/"]').first();
    await expect(pillarLink).toBeVisible();
    // Activate the anchor via its DOM click() — Playwright's pointer click
    // scrolls the link under the sticky header (z-40), which then intercepts
    // the event. el.click() navigates directly without hit-testing.
    await pillarLink.evaluate((el) => el.click());

    await expect(page).toHaveURL(/\/pillars\//);
  });
});
