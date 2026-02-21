interface ArticleData {
  title: string;
  subtitle: string;
  part: number;
  articleNumber: string;
  sphere: "national" | "provincial" | "municipal" | "all" | ("national" | "provincial" | "municipal" | "all")[];
  description: string;
  publishDate: Date | string;
  scheduledPublishDate?: Date | string;
  readingTime: number;
  status: "published" | "draft" | "coming-soon" | "scheduled";
  series: {
    prev: string | null;
    next: string | null;
  };
  seo: {
    ogImage?: string;
    canonicalUrl?: string;
    keywords: string[];
  };
}

export class ArticleBuilder {
  private data: ArticleData;

  constructor() {
    this.data = {
      title: "Test Article Title",
      subtitle: "A test subtitle for the article",
      part: 1,
      articleNumber: "1.1",
      sphere: "national",
      description:
        "This is a valid test description for the article schema. It needs to be within the one hundred and fifty to one hundred sixty character limit for SEO.",
      publishDate: new Date("2025-01-15"),
      readingTime: 5,
      status: "published",
      series: {
        prev: null,
        next: null,
      },
      seo: {
        keywords: [],
      },
    };
  }

  withTitle(title: string): this {
    this.data.title = title;
    return this;
  }

  withSubtitle(subtitle: string): this {
    this.data.subtitle = subtitle;
    return this;
  }

  withPart(part: number): this {
    this.data.part = part;
    return this;
  }

  withArticleNumber(articleNumber: string): this {
    this.data.articleNumber = articleNumber;
    return this;
  }

  withSphere(sphere: ArticleData["sphere"]): this {
    this.data.sphere = sphere;
    return this;
  }

  withDescription(description: string): this {
    this.data.description = description;
    return this;
  }

  withPublishDate(date: Date | string): this {
    this.data.publishDate = date;
    return this;
  }

  withReadingTime(minutes: number): this {
    this.data.readingTime = minutes;
    return this;
  }

  withStatus(status: ArticleData["status"]): this {
    this.data.status = status;
    return this;
  }

  withSeries(prev: string | null, next: string | null): this {
    this.data.series = { prev, next };
    return this;
  }

  withScheduledPublishDate(date: Date | string): this {
    this.data.scheduledPublishDate = date;
    return this;
  }

  withSeo(seo: Partial<ArticleData["seo"]>): this {
    this.data.seo = { ...this.data.seo, ...seo };
    return this;
  }

  build(): ArticleData {
    return { ...this.data };
  }
}
