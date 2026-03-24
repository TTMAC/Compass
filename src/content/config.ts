import { z, defineCollection } from "astro:content";

const sphereEnum = z.enum(["national", "provincial", "municipal", "all"]);

const pillarEnum = z.enum([
  "government-structure",
  "safety-security",
  "economic-growth",
  "human-development",
  "reform-agenda",
]);

const articles = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
    pillar: pillarEnum.default("government-structure"),
    part: z.number().int().min(1).max(10),
    articleNumber: z
      .string()
      .regex(/^\d+\.\d+$/, "Must be in X.Y format (e.g. 1.1)"),
    sphere: z
      .union([sphereEnum, z.array(sphereEnum)])
      .transform((v) => (Array.isArray(v) ? v : [v]))
      .optional(),
    tags: z.array(z.string()).default([]),
    description: z
      .string()
      .min(150, "Description must be at least 150 characters for SEO")
      .max(160, "Description must be at most 160 characters for SEO"),
    publishDate: z.coerce.date(),
    scheduledPublishDate: z.coerce.date().optional(),
    readingTime: z.number().int().positive(),
    status: z.enum(["published", "draft", "coming-soon", "scheduled"]),
    series: z.object({
      prev: z.preprocess((v) => (v === "" ? null : v), z.string().nullable().default(null)),
      next: z.preprocess((v) => (v === "" ? null : v), z.string().nullable().default(null)),
    }),
    crossLinks: z.array(z.object({
      slug: z.string(),
      label: z.string(),
      relationship: z.string(),
    })).optional(),
    seo: z.object({
      ogImage: z.string().optional(),
      canonicalUrl: z.string().url().optional(),
      keywords: z.array(z.string()).default([]),
    }),
  }).refine(
    (data) => data.status !== "scheduled" || data.scheduledPublishDate !== undefined,
    { message: "scheduledPublishDate is required when status is 'scheduled'", path: ["scheduledPublishDate"] },
  ),
});

export const collections = { articles };
