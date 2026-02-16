import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const distDir = resolve(__dirname, "../../dist");

describe("OG meta tags", () => {
  it("should have OG tags on home page", () => {
    const html = readFileSync(resolve(distDir, "index.html"), "utf-8");
    expect(html).toContain('property="og:title"');
    expect(html).toContain('property="og:description"');
    expect(html).toContain('property="og:type"');
    expect(html).toContain('property="og:url"');
    expect(html).toContain('property="og:image"');
  });

  it("should have Twitter card tags on home page", () => {
    const html = readFileSync(resolve(distDir, "index.html"), "utf-8");
    expect(html).toContain('name="twitter:card"');
    expect(html).toContain("summary_large_image");
  });

  it("should have article-specific OG tags", () => {
    const html = readFileSync(
      resolve(
        distDir,
        "articles/1-1-architecture-of-the-state/index.html",
      ),
      "utf-8",
    );
    expect(html).toContain('property="og:type" content="article"');
    expect(html).toContain("The Architecture of the State");
  });

  it("should have JSON-LD on article page", () => {
    const html = readFileSync(
      resolve(
        distDir,
        "articles/1-1-architecture-of-the-state/index.html",
      ),
      "utf-8",
    );
    expect(html).toContain("application/ld+json");
    expect(html).toContain('"@type":"Article"');
  });

  it("should have site name in OG tags", () => {
    const html = readFileSync(resolve(distDir, "index.html"), "utf-8");
    expect(html).toContain('property="og:site_name" content="Compass"');
  });

  it("should have en_ZA locale", () => {
    const html = readFileSync(resolve(distDir, "index.html"), "utf-8");
    expect(html).toContain('property="og:locale" content="en_ZA"');
  });
});
