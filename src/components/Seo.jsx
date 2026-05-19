import { useEffect } from "react";
import { useLocation } from "react-router";
import { getSeoForPath } from "../config/routeSeo";
import { buildCanonical, buildPageTitle, siteConfig } from "../config/seo";

function upsertMeta(attribute, key, content) {
  if (!content) return;

  let element = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertLink(rel, href) {
  if (!href) return;

  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function upsertJsonLd(jsonLd) {
  const id = "seo-json-ld";
  let script = document.getElementById(id);

  if (!jsonLd) {
    script?.remove();
    return;
  }

  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(jsonLd);
}

function applySeo(seo) {
  const pageTitle = buildPageTitle(seo.title);
  const description = seo.description || siteConfig.description;
  const canonical = buildCanonical(seo.path || "/");
  const image = seo.image || siteConfig.defaultImage;
  const robots = seo.noIndex ? "noindex, nofollow" : "index, follow";

  document.title = pageTitle;
  upsertMeta("name", "description", description);
  upsertMeta("name", "robots", robots);
  upsertLink("canonical", canonical);

  upsertMeta("property", "og:site_name", siteConfig.name);
  upsertMeta("property", "og:locale", siteConfig.locale);
  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:title", pageTitle);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:url", canonical);
  upsertMeta("property", "og:image", image);

  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", pageTitle);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", image);

  if (siteConfig.twitterHandle) {
    upsertMeta("name", "twitter:site", siteConfig.twitterHandle);
  }

  upsertJsonLd(seo.jsonLd);
}

/** Syncs document head on client-side route changes. SSR uses buildHeadHtml(). */
export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    applySeo(getSeoForPath(pathname));
  }, [pathname]);

  return null;
}
