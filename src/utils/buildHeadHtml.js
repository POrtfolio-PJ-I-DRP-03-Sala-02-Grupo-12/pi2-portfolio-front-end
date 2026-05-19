import { buildCanonical, buildPageTitle, siteConfig } from "../config/seo";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Builds static <head> HTML for SSR (React 19 compatible).
 * @param {import('../config/routeSeo').getSeoForPath extends (...args: any) => infer R ? R : never} seo
 */
export function buildHeadHtml(seo) {
  const pageTitle = buildPageTitle(seo.title);
  const description = seo.description || siteConfig.description;
  const canonical = buildCanonical(seo.path || "/");
  const image = seo.image || siteConfig.defaultImage;
  const robots = seo.noIndex ? "noindex, nofollow" : "index, follow";

  const tags = [
    `<title>${escapeHtml(pageTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(siteConfig.name)}" />`,
    `<meta property="og:locale" content="${escapeHtml(siteConfig.locale)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${escapeHtml(pageTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(pageTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
  ];

  if (siteConfig.twitterHandle) {
    tags.push(
      `<meta name="twitter:site" content="${escapeHtml(siteConfig.twitterHandle)}" />`
    );
  }

  if (seo.jsonLd) {
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(seo.jsonLd)}</script>`
    );
  }

  return tags.join("\n    ");
}
