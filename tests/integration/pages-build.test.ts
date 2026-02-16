import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

const distDir = resolve(__dirname, "../../dist");

describe("Pages build", () => {
  const expectedPages = [
    ["index", "index.html"],
    ["about", "about/index.html"],
    ["series", "series/index.html"],
    ["data-sources", "data-sources/index.html"],
    ["subscribe", "subscribe/index.html"],
    ["privacy", "privacy/index.html"],
    ["404", "404.html"],
    [
      "article 1.1",
      "articles/1-1-architecture-of-the-state/index.html",
    ],
  ];

  it.each(expectedPages)("should build %s page", (_name, path) => {
    expect(existsSync(resolve(distDir, path))).toBe(true);
  });

  it("should render article content", () => {
    const articleHtml = readFileSync(
      resolve(
        distDir,
        "articles/1-1-architecture-of-the-state/index.html",
      ),
      "utf-8",
    );
    expect(articleHtml).toContain("The Architecture of the State");
    expect(articleHtml).toContain("Article 1.1");
    expect(articleHtml).toContain("National");
  });

  it("should render home page with series overview", () => {
    const indexHtml = readFileSync(
      resolve(distDir, "index.html"),
      "utf-8",
    );
    expect(indexHtml).toContain("The Architecture");
    expect(indexHtml).toContain("The Money");
    expect(indexHtml).toContain("The Accountability");
    expect(indexHtml).toContain("The Participation");
    expect(indexHtml).toContain("The Assessment");
  });

  it("should render privacy page with POPIA content", () => {
    const privacyHtml = readFileSync(
      resolve(distDir, "privacy/index.html"),
      "utf-8",
    );
    expect(privacyHtml).toContain("POPIA");
    expect(privacyHtml).toContain("Google Analytics 4");
    expect(privacyHtml).toContain("Consent Mode");
    expect(privacyHtml).toContain("2 months");
    expect(privacyHtml).toContain("Buttondown");
  });

  it("should render subscribe page with Netlify form", () => {
    const subscribeHtml = readFileSync(
      resolve(distDir, "subscribe/index.html"),
      "utf-8",
    );
    expect(subscribeHtml).toContain('data-netlify="true"');
    expect(subscribeHtml).toContain("bot-field");
  });
});
