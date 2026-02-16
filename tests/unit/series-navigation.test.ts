import { describe, it, expect } from "vitest";
import { getSeriesNavigation } from "../../src/utils/series-navigation";

const mockArticles = [
  {
    id: "1-0-introduction.md",
    data: {
      title: "Introduction",
      articleNumber: "1.0",
      series: { prev: null, next: "1-1-architecture" },
    },
  },
  {
    id: "1-1-architecture.md",
    data: {
      title: "The Architecture of the State",
      articleNumber: "1.1",
      series: { prev: "1-0-introduction", next: "1-2-who-does-what" },
    },
  },
  {
    id: "1-2-who-does-what.md",
    data: {
      title: "Who Does What",
      articleNumber: "1.2",
      series: { prev: "1-1-architecture", next: null },
    },
  },
];

describe("getSeriesNavigation", () => {
  it("should return null prev for first article", () => {
    const nav = getSeriesNavigation(mockArticles[0], mockArticles);
    expect(nav.prev).toBeNull();
  });

  it("should return null next for last article", () => {
    const nav = getSeriesNavigation(mockArticles[2], mockArticles);
    expect(nav.next).toBeNull();
  });

  it("should return both prev and next for middle article", () => {
    const nav = getSeriesNavigation(mockArticles[1], mockArticles);
    expect(nav.prev).not.toBeNull();
    expect(nav.next).not.toBeNull();
  });

  it("should return correct prev article details", () => {
    const nav = getSeriesNavigation(mockArticles[1], mockArticles);
    expect(nav.prev!.title).toBe("Introduction");
    expect(nav.prev!.articleNumber).toBe("1.0");
    expect(nav.prev!.id).toBe("1-0-introduction");
  });

  it("should return correct next article details", () => {
    const nav = getSeriesNavigation(mockArticles[1], mockArticles);
    expect(nav.next!.title).toBe("Who Does What");
    expect(nav.next!.articleNumber).toBe("1.2");
    expect(nav.next!.id).toBe("1-2-who-does-what");
  });

  it("should form a valid doubly-linked list", () => {
    // Verify: first.next.prev === first
    const firstNav = getSeriesNavigation(mockArticles[0], mockArticles);
    expect(firstNav.next!.id).toBe("1-1-architecture");

    const middleNav = getSeriesNavigation(mockArticles[1], mockArticles);
    expect(middleNav.prev!.id).toBe("1-0-introduction");

    // Verify: last.prev.next === last
    const lastNav = getSeriesNavigation(mockArticles[2], mockArticles);
    expect(lastNav.prev!.id).toBe("1-1-architecture");
    expect(middleNav.next!.id).toBe("1-2-who-does-what");
  });

  it("should return null for broken links", () => {
    const brokenArticle = {
      id: "orphan.md",
      data: {
        title: "Orphan",
        articleNumber: "9.9",
        series: { prev: "nonexistent", next: "also-nonexistent" },
      },
    };
    const nav = getSeriesNavigation(brokenArticle, mockArticles);
    expect(nav.prev).toBeNull();
    expect(nav.next).toBeNull();
  });
});
