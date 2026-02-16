import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const distDir = resolve(__dirname, "../../dist");

describe("Email capture form", () => {
  it("should have data-netlify attribute on subscribe page", () => {
    const html = readFileSync(
      resolve(distDir, "subscribe/index.html"),
      "utf-8",
    );
    expect(html).toContain('data-netlify="true"');
  });

  it("should have honeypot field on subscribe page", () => {
    const html = readFileSync(
      resolve(distDir, "subscribe/index.html"),
      "utf-8",
    );
    expect(html).toContain("bot-field");
  });

  it("should have hidden form-name input", () => {
    const html = readFileSync(
      resolve(distDir, "subscribe/index.html"),
      "utf-8",
    );
    expect(html).toContain('name="form-name"');
    expect(html).toContain('value="subscribe"');
  });

  it("should have email input with required attribute", () => {
    const html = readFileSync(
      resolve(distDir, "subscribe/index.html"),
      "utf-8",
    );
    expect(html).toContain('type="email"');
    expect(html).toMatch(/required/);
  });

  it("should have accessible label for email input", () => {
    const html = readFileSync(
      resolve(distDir, "subscribe/index.html"),
      "utf-8",
    );
    expect(html).toContain('for="email"');
    expect(html).toContain("Email address");
  });
});
