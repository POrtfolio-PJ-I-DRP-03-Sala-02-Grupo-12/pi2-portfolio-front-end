import { siteConfig } from "./seo";

const loginDescription =
  "Área restrita de autenticação do portfólio Gabisou.";
const editorDescription =
  "Painel interno para gerenciar projetos do portfólio Gabisou.";

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
      logo: siteConfig.defaultImage,
    },
    {
      "@type": "WebSite",
      name: siteConfig.defaultTitle,
      url: siteConfig.siteUrl,
      description: siteConfig.description,
      inLanguage: "pt-BR",
      publisher: { "@type": "Organization", name: siteConfig.name },
    },
  ],
};

/** SEO metadata keyed by route (used on server and client). */
export function getSeoForPath(pathname) {
  if (pathname.startsWith("/login")) {
    return {
      title: "Login",
      description: loginDescription,
      path: "/login",
      noIndex: true,
    };
  }

  if (pathname.startsWith("/editor")) {
    return {
      title: "Editor",
      description: editorDescription,
      path: "/editor",
      noIndex: true,
    };
  }

  return {
    title: null,
    description: siteConfig.description,
    path: pathname === "/projects" ? "/projects" : "/",
    noIndex: false,
    jsonLd: homeJsonLd,
  };
}
