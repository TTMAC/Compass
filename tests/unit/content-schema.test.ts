import { describe, it, expect } from "vitest";
import { z } from "astro/zod";
import { ArticleBuilder } from "../fixtures/test-helpers";

// Mirror the schema from src/content/config.ts for unit testing
const sphereEnum = z.enum(["national", "provincial", "municipal", "all"]);

const articleSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  part: z.number().int().min(1).max(5),
  articleNumber: z
    .string()
    .regex(/^\d+\.\d+$/, "Must be in X.Y format (e.g. 1.1)"),
  sphere: z
    .union([sphereEnum, z.array(sphereEnum)])
    .transform((v) => (Array.isArray(v) ? v : [v])),
  description: z
    .string()
    .min(150, "Description must be at least 150 characters for SEO")
    .max(160, "Description must be at most 160 characters for SEO"),
  publishDate: z.coerce.date(),
  scheduledPublishDate: z.coerce.date().optional(),
  readingTime: z.number().int().positive(),
  status: z.enum(["published", "draft", "coming-soon", "scheduled"]),
  series: z.object({
    prev: z.string().nullable().default(null),
    next: z.string().nullable().default(null),
  }),
  seo: z.object({
    ogImage: z.string().optional(),
    canonicalUrl: z.string().url().optional(),
    keywords: z.array(z.string()).default([]),
  }),
}).refine(
  (data) => data.status !== "scheduled" || data.scheduledPublishDate !== undefined,
  { message: "scheduledPublishDate is required when status is 'scheduled'", path: ["scheduledPublishDate"] },
);

describe("Article Schema", () => {
  describe("valid articles", () => {
    it("should accept a valid article with all required fields", () => {
      const article = new ArticleBuilder().build();
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(true);
    });

    it("should accept all valid sphere values", () => {
      const spheres = ["national", "provincial", "municipal", "all"] as const;
      for (const sphere of spheres) {
        const article = new ArticleBuilder().withSphere(sphere).build();
        const result = articleSchema.safeParse(article);
        expect(result.success).toBe(true);
      }
    });

    it("should accept an array of sphere values", () => {
      const article = new ArticleBuilder()
        .withSphere(["national", "provincial"])
        .build();
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.sphere).toEqual(["national", "provincial"]);
      }
    });

    it("should normalize a single sphere to an array", () => {
      const article = new ArticleBuilder().withSphere("national").build();
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.sphere).toEqual(["national"]);
      }
    });

    it("should accept all valid status values", () => {
      const statuses = ["published", "draft", "coming-soon"] as const;
      for (const status of statuses) {
        const article = new ArticleBuilder().withStatus(status).build();
        const result = articleSchema.safeParse(article);
        expect(result.success).toBe(true);
      }
      // scheduled requires scheduledPublishDate
      const scheduled = new ArticleBuilder()
        .withStatus("scheduled")
        .withScheduledPublishDate("2025-06-01T10:00:00.000Z")
        .build();
      const result = articleSchema.safeParse(scheduled);
      expect(result.success).toBe(true);
    });

    it("should accept article numbers in X.Y format", () => {
      const validNumbers = ["1.1", "2.3", "5.5", "1.10"];
      for (const num of validNumbers) {
        const article = new ArticleBuilder().withArticleNumber(num).build();
        const result = articleSchema.safeParse(article);
        expect(result.success).toBe(true);
      }
    });

    it("should accept parts 1 through 5", () => {
      for (let part = 1; part <= 5; part++) {
        const article = new ArticleBuilder().withPart(part).build();
        const result = articleSchema.safeParse(article);
        expect(result.success).toBe(true);
      }
    });

    it("should accept string dates and coerce to Date", () => {
      const article = new ArticleBuilder()
        .withPublishDate("2025-03-01")
        .build();
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.publishDate).toBeInstanceOf(Date);
      }
    });

    it("should accept series with prev and next links", () => {
      const article = new ArticleBuilder()
        .withSeries("1-0-introduction", "1-2-who-does-what")
        .build();
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(true);
    });

    it("should accept series with null prev and next", () => {
      const article = new ArticleBuilder().withSeries(null, null).build();
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(true);
    });

    it("should accept seo with optional fields", () => {
      const article = new ArticleBuilder()
        .withSeo({
          ogImage: "/og/test.png",
          canonicalUrl: "https://compass.co.za/articles/test",
          keywords: ["test", "article"],
        })
        .build();
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(true);
    });

    it("should default seo keywords to empty array", () => {
      const article = new ArticleBuilder().build();
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.seo.keywords).toEqual([]);
      }
    });

    it("should accept description at exactly 150 characters", () => {
      const desc = "A".repeat(150);
      const article = new ArticleBuilder().withDescription(desc).build();
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(true);
    });

    it("should accept description at exactly 160 characters", () => {
      const desc = "A".repeat(160);
      const article = new ArticleBuilder().withDescription(desc).build();
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(true);
    });

    it("should accept scheduled status with scheduledPublishDate", () => {
      const article = new ArticleBuilder()
        .withStatus("scheduled")
        .withScheduledPublishDate("2025-06-01T10:00:00.000Z")
        .build();
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(true);
    });

    it("should accept non-scheduled status without scheduledPublishDate", () => {
      const article = new ArticleBuilder().withStatus("draft").build();
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(true);
    });
  });

  describe("invalid articles", () => {
    it("should reject empty title", () => {
      const article = new ArticleBuilder().withTitle("").build();
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(false);
    });

    it("should reject empty subtitle", () => {
      const article = new ArticleBuilder().withSubtitle("").build();
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(false);
    });

    it("should reject part 0", () => {
      const article = new ArticleBuilder().withPart(0).build();
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(false);
    });

    it("should reject part 6", () => {
      const article = new ArticleBuilder().withPart(6).build();
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(false);
    });

    it("should reject non-integer part", () => {
      const article = new ArticleBuilder().withPart(1.5).build();
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(false);
    });

    it("should reject invalid article number format", () => {
      const invalidNumbers = ["1", "abc", "1-1", "1.1.1", ""];
      for (const num of invalidNumbers) {
        const article = new ArticleBuilder().withArticleNumber(num).build();
        const result = articleSchema.safeParse(article);
        expect(result.success).toBe(false);
      }
    });

    it("should reject invalid sphere value", () => {
      const article = new ArticleBuilder().build();
      (article as Record<string, unknown>).sphere = "federal";
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(false);
    });

    it("should reject description shorter than 150 characters", () => {
      const article = new ArticleBuilder()
        .withDescription("Too short")
        .build();
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(false);
    });

    it("should reject description longer than 160 characters", () => {
      const desc = "A".repeat(161);
      const article = new ArticleBuilder().withDescription(desc).build();
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(false);
    });

    it("should reject zero reading time", () => {
      const article = new ArticleBuilder().withReadingTime(0).build();
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(false);
    });

    it("should reject negative reading time", () => {
      const article = new ArticleBuilder().withReadingTime(-5).build();
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(false);
    });

    it("should reject invalid status", () => {
      const article = new ArticleBuilder().build();
      (article as Record<string, unknown>).status = "archived";
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(false);
    });

    it("should reject invalid canonical URL", () => {
      const article = new ArticleBuilder()
        .withSeo({ canonicalUrl: "not-a-url" })
        .build();
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(false);
    });

    it("should reject missing title", () => {
      const article = new ArticleBuilder().build();
      const { title, ...noTitle } = article;
      void title;
      const result = articleSchema.safeParse(noTitle);
      expect(result.success).toBe(false);
    });

    it("should reject missing sphere", () => {
      const article = new ArticleBuilder().build();
      const { sphere, ...noSphere } = article;
      void sphere;
      const result = articleSchema.safeParse(noSphere);
      expect(result.success).toBe(false);
    });

    it("should reject scheduled status without scheduledPublishDate", () => {
      const article = new ArticleBuilder().withStatus("scheduled").build();
      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(false);
    });
  });
});
