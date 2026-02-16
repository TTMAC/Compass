interface ArticleLink {
  id: string;
  title: string;
  articleNumber: string;
  status: string;
}

interface SeriesNav {
  prev: ArticleLink | null;
  next: ArticleLink | null;
}

interface ArticleEntry {
  id: string;
  data: {
    title: string;
    articleNumber: string;
    status: string;
    series: {
      prev: string | null;
      next: string | null;
    };
  };
}

export function getSeriesNavigation(
  currentArticle: ArticleEntry,
  allArticles: ArticleEntry[],
): SeriesNav {
  const { prev, next } = currentArticle.data.series;

  return {
    prev: prev
      ? findArticleLink(prev, allArticles)
      : null,
    next: next
      ? findArticleLink(next, allArticles)
      : null,
  };
}

function findArticleLink(
  slug: string,
  articles: ArticleEntry[],
): ArticleLink | null {
  const article = articles.find(
    (a) => a.id === slug || a.id === `${slug}.md`,
  );
  if (!article) return null;

  return {
    id: article.id.replace(/\.md$/, ""),
    title: article.data.title,
    articleNumber: article.data.articleNumber,
    status: article.data.status,
  };
}
