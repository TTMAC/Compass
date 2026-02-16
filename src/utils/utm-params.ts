interface UtmParams {
  source: string;
  medium: string;
  campaign: string;
}

export function buildUtmUrl(baseUrl: string, params: UtmParams): string {
  const url = new URL(baseUrl);
  url.searchParams.set("utm_source", params.source);
  url.searchParams.set("utm_medium", params.medium);
  url.searchParams.set("utm_campaign", params.campaign);
  return url.toString();
}

export function buildWhatsAppShareUrl(
  articleTitle: string,
  articleSubtitle: string,
  articleUrl: string,
  slug: string,
): string {
  const utmUrl = buildUtmUrl(articleUrl, {
    source: "whatsapp",
    medium: "share",
    campaign: `article-${slug}`,
  });

  const message = [
    articleTitle,
    articleSubtitle,
    `Read it here: ${utmUrl}`,
    "-- From Compass: Making SA's governance system legible",
  ].join("\n");

  return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
}

export function buildCopyLinkUrl(articleUrl: string, slug: string): string {
  return buildUtmUrl(articleUrl, {
    source: "clipboard",
    medium: "share",
    campaign: `article-${slug}`,
  });
}
