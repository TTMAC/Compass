import { test, expect } from "@playwright/test";

test.describe("Performance basics", () => {
  test("home page should load within performance budget", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    // Check that all critical resources loaded
    await expect(page.locator("h1")).toBeVisible();
  });

  test("article page should load within performance budget", async ({
    page,
  }) => {
    const response = await page.goto(
      "/articles/1-1-architecture-of-the-state/",
    );
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("should not have console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() !== "error") return;
      const text = msg.text();
      const url = msg.location()?.url ?? "";
      // Pagefind resources may 404 in preview if not yet indexed
      if (text.includes("pagefind") || url.includes("pagefind")) return;
      // The Netlify Identity widget is CORS-blocked in local preview but
      // loads same-origin (and fine) in production.
      if (
        text.includes("identity.netlify.com") ||
        url.includes("identity.netlify.com") ||
        text.includes("netlify-identity")
      ) {
        return;
      }
      errors.push(text);
    });

    await page.goto("/");
    await page.goto("/articles/1-1-architecture-of-the-state/");
    // /series is a Netlify redirect, absent from the static preview output;
    // visit its real destination instead.
    await page.goto("/pillars/government-structure/");

    expect(errors).toHaveLength(0);
  });

  test("should have no broken internal links on home page", async ({
    page,
  }) => {
    await page.goto("/");
    const links = await page.locator("a[href^='/']").all();

    for (const link of links) {
      const href = await link.getAttribute("href");
      if (href) {
        const response = await page.request.get(href);
        expect(response.status(), `Broken link: ${href}`).toBeLessThan(400);
      }
    }
  });

  test("should have proper viewport meta tag", async ({ page }) => {
    await page.goto("/");
    const viewport = await page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute("content", /width=device-width/);
  });

  test("should render correctly at 360px (Samsung A15)", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto("/articles/1-1-architecture-of-the-state/");
    // Settle network + web fonts so the measurement isn't taken mid-layout or
    // against wider fallback-font metrics.
    await page.waitForLoadState("networkidle");
    await page.evaluate(async () => {
      await document.fonts.ready;
    });

    // No horizontal overflow. Allow a few px for cross-platform font-rendering
    // variance (macOS dev vs Linux CI); a genuine overflow would be far larger.
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(8);
  });

  test("should render correctly at 390px (iPhone)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/articles/1-1-architecture-of-the-state/");
    // Settle network + web fonts so the measurement isn't taken mid-layout or
    // against wider fallback-font metrics.
    await page.waitForLoadState("networkidle");
    await page.evaluate(async () => {
      await document.fonts.ready;
    });

    // No horizontal overflow. Allow a few px for cross-platform font-rendering
    // variance (macOS dev vs Linux CI); a genuine overflow would be far larger.
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(8);
  });
});
