import { test, expect } from "@playwright/test";

test.describe("Article reading journey", () => {
  test("should navigate from home to article", async ({ page }) => {
    await page.goto("/");

    // Click on the CTA to read article 1.1
    const ctaLink = page.locator(
      'a[href*="/articles/1-1-architecture-of-the-state"]',
    );
    await expect(ctaLink).toBeVisible();
    await ctaLink.click();

    // Verify article page loaded
    await expect(page).toHaveURL(/articles\/1-1-architecture-of-the-state/);
    await expect(
      page.locator("h1"),
    ).toContainText("The Architecture of the State");
  });

  test("should display article metadata", async ({ page }) => {
    await page.goto("/articles/1-1-architecture-of-the-state/");

    // Article number
    await expect(page.locator("text=Article 1.1")).toBeVisible();

    // Sphere tag
    await expect(page.locator("text=National").first()).toBeVisible();

    // Reading time
    await expect(page.locator("text=min read")).toBeVisible();
  });

  test("should render callout components", async ({ page }) => {
    await page.goto("/articles/1-1-architecture-of-the-state/");

    const callouts = page.locator("[data-callout]");
    await expect(callouts).toHaveCount(3);

    // Check each type exists
    await expect(page.locator('[data-callout="expert"]')).toBeVisible();
    await expect(page.locator('[data-callout="takeaway"]')).toBeVisible();
    await expect(page.locator('[data-callout="framework"]')).toBeVisible();
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

    // Desktop nav should be hidden
    const desktopNav = page.locator("ul.hidden.md\\:flex");
    await expect(desktopNav).toBeHidden();

    // Click hamburger
    const menuToggle = page.locator("[data-menu-toggle]");
    await menuToggle.click();

    // Mobile menu should be visible
    const seriesLink = page.locator("[data-mobile-menu] a[href='/series']");
    await expect(seriesLink).toBeVisible();
    await seriesLink.click();

    await expect(page).toHaveURL(/series/);
  });
});
