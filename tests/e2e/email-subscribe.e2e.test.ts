import { test, expect } from "@playwright/test";

test.describe("Email subscription", () => {
  test("should display subscribe form on standalone page", async ({
    page,
  }) => {
    await page.goto("/subscribe/");

    const form = page.locator('[data-testid="subscribe-form"]');
    await expect(form).toBeVisible();

    const emailInput = form.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();

    const submitButton = form.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toContainText("Subscribe");
  });

  test("should have honeypot field hidden", async ({ page }) => {
    await page.goto("/subscribe/");

    const form = page.locator('[data-testid="subscribe-form"]');
    const honeypot = form.locator('input[name="bot-field"]');
    await expect(honeypot).toBeHidden();
  });

  test("should validate email input", async ({ page }) => {
    await page.goto("/subscribe/");

    const form = page.locator('[data-testid="subscribe-form"]');
    const emailInput = form.locator('input[type="email"]');
    await expect(emailInput).toHaveAttribute("required", "");
  });

  test("should display inline email capture on article page", async ({
    page,
  }) => {
    await page.goto("/articles/1-1-architecture-of-the-state/");

    const emailCapture = page.locator('[data-testid="email-capture"]').first();
    await expect(emailCapture).toBeVisible();
  });

  test("should have privacy link near subscribe form", async ({ page }) => {
    await page.goto("/subscribe/");

    const privacyLink = page.locator('a[href="/privacy"]').first();
    await expect(privacyLink).toBeVisible();
  });
});
