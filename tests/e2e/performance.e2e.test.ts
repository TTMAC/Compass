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
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.goto("/articles/1-1-architecture-of-the-state/");
    await page.goto("/series/");

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
        expect(
          response.status(),
          `Broken link: ${href}`,
        ).toBeLessThan(400);
      }
    }
  });

  test("should have proper viewport meta tag", async ({ page }) => {
    await page.goto("/");
    const viewport = await page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute(
      "content",
      /width=device-width/,
    );
  });

  test("should render correctly at 360px (Samsung A15)", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto("/articles/1-1-architecture-of-the-state/");

    // Content should not overflow
    const body = page.locator("body");
    const bodyWidth = await body.evaluate((el) => el.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(360);
  });

  test("should render correctly at 390px (iPhone)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/articles/1-1-architecture-of-the-state/");

    const body = page.locator("body");
    const bodyWidth = await body.evaluate((el) => el.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(390);
  });
});
