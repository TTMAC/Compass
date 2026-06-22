/**
 * Centralised URL builders for article and pillar links.
 *
 * The Reform section ("reform-agenda" pillar) lives under a gated `/reform/*`
 * namespace served on-demand, while every other pillar is prerendered and
 * public. Routing a link to the right place depends solely on the target's
 * pillar, so both the public and gated routes (and every shared nav component)
 * funnel through these helpers instead of hardcoding `/articles/...`.
 */

const REFORM_PILLAR = "reform-agenda";

/** Strip a trailing `.md` from a collection id to get the URL slug. */
export function articleSlug(idOrSlug: string): string {
  return idOrSlug.replace(/\.md$/, "");
}

/** Link to an article, gated under /reform/articles for reform-agenda content. */
export function articleHref(idOrSlug: string, pillar?: string): string {
  const slug = articleSlug(idOrSlug);
  return pillar === REFORM_PILLAR
    ? `/reform/articles/${slug}`
    : `/articles/${slug}`;
}

/** Link to a pillar landing page; reform-agenda maps to the gated /reform index. */
export function pillarHref(pillar: string): string {
  return pillar === REFORM_PILLAR ? "/reform" : `/pillars/${pillar}`;
}

export { REFORM_PILLAR };
