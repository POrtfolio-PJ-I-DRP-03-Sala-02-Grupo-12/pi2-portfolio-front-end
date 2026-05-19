import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { renderPage } from "./ssr.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const isProduction = process.env.NODE_ENV === "production";
const base = process.env.BASE || "/";

export async function createApp() {
  const app = express();

  let vite;
  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
      base,
    });
    app.use(vite.middlewares);
  } else {
    app.use(
      base,
      express.static(path.resolve(root, "dist/client"), { index: false })
    );
  }

  app.use("*all", async (req, res, next) => {
    let url = req.originalUrl;
    if (base !== "/" && url.startsWith(base)) {
      url = url.slice(base.length) || "/";
    }

    try {
      let html;

      if (!isProduction) {
        const fs = await import("node:fs");
        let template = fs.readFileSync(
          path.resolve(root, "index.html"),
          "utf-8"
        );
        template = await vite.transformIndexHtml(url, template);
        const render = (await vite.ssrLoadModule("/src/entry-server.jsx"))
          .render;
        const { html: appHtml, head } = render(url);
        html = template
          .replace("<!--ssr-outlet-->", appHtml)
          .replace("<!--app-head-->", head);
      } else {
        html = await renderPage(url);
      }

      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (error) {
      if (!isProduction && vite) {
        vite.ssrFixStacktrace(error);
      }
      next(error);
    }
  });

  app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).send(
      isProduction ? "Internal Server Error" : `<pre>${error.stack}</pre>`
    );
  });

  return app;
}
