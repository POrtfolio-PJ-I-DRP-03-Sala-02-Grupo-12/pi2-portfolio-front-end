const siteUrl = (
  import.meta.env.VITE_SITE_URL || "https://www.gabisou.com"
).replace(/\/$/, "");

export const siteConfig = {
  name: "Gabisou",
  siteUrl,
  defaultTitle: "Gabisou — Portfolio de Jogos",
  description:
    "Portfólio de jogos e projetos interativos da Gabisou. Conheça nossos games, demos e trabalhos em desenvolvimento.",
  locale: "pt_BR",
  defaultImage:
    "https://raw.githubusercontent.com/JessicaSaito/images-test-portfolio/refs/heads/master/gabisoulogo.png",
  twitterHandle: "@gabisou",
};

export function buildCanonical(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.siteUrl}${normalizedPath}`;
}

export function buildPageTitle(title) {
  return title ? `${title} | ${siteConfig.name}` : siteConfig.defaultTitle;
}
