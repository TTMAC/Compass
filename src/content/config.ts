import { z, defineCollection } from "astro:content";

const sphereEnum = z.enum(["national", "provincial", "municipal", "all"]);

const articles = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
    part: z.number().int().min(1).max(5),
    articleNumber: z
      .string()
      .regex(/^\d+\.\d+$/, "Must be in X.Y format (e.g. 1.1)"),
    sphere: sphereEnum,
    description: z
      .string()
      .min(150, "Description must be at least 150 characters for SEO")
      .max(160, "Description must be at most 160 characters for SEO"),
    publishDate: z.coerce.date(),
    readingTime: z.number().int().positive(),
    status: z.enum(["published", "draft", "coming-soon"]),
    series: z.object({
      prev: z.string().nullable().default(null),
      next: z.string().nullable().default(null),
    }),
    seo: z.object({
      ogImage: z.string().optional(),
      canonicalUrl: z.string().url().optional(),
      keywords: z.array(z.string()).default([]),
    }),
  }),
});

export const collections = { articles };
