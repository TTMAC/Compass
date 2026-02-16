import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const distDir = resolve(__dirname, "../../dist");
const indexHtml = readFileSync(resolve(distDir, "index.html"), "utf-8");

describe("Layout structure", () => {
  it("should have lang=en-ZA on html element", () => {
    expect(indexHtml).toContain('lang="en-ZA"');
  });

  it("should have a skip-to-content link", () => {
    expect(indexHtml).toContain('href="#main-content"');
    expect(indexHtml).toContain("Skip to content");
  });

  it("should have main element with id", () => {
    expect(indexHtml).toContain('id="main-content"');
  });

  it("should have banner role on header", () => {
    expect(indexHtml).toContain('role="banner"');
  });

  it("should have contentinfo role on footer", () => {
    expect(indexHtml).toContain('role="contentinfo"');
  });

  it("should have nav with aria-label", () => {
    expect(indexHtml).toContain('aria-label="Main navigation"');
  });

  it("should have meta description", () => {
    expect(indexHtml).toMatch(/meta name="description" content=".+"/);
  });

  it("should have canonical URL", () => {
    expect(indexHtml).toContain('rel="canonical"');
  });

  it("should have Open Graph tags", () => {
    expect(indexHtml).toContain('property="og:title"');
    expect(indexHtml).toContain('property="og:description"');
    expect(indexHtml).toContain('property="og:type"');
  });

  it("should preload fonts", () => {
    expect(indexHtml).toContain('rel="preload"');
    expect(indexHtml).toContain('as="font"');
  });

  it("should have mobile menu toggle with aria attributes", () => {
    expect(indexHtml).toContain("data-menu-toggle");
    expect(indexHtml).toContain('aria-expanded="false"');
  });

  it("should have 48px min tap targets on mobile nav", () => {
    expect(indexHtml).toContain("w-12 h-12");
  });
});
