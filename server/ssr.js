import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

function getProjectRoot() {
  if (process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return process.cwd();
  }
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
}

export async function renderPage(url) {
  const root = getProjectRoot();
  const template = fs.readFileSync(
    path.resolve(root, "dist/client/index.html"),
    "utf-8"
  );
  const entryServerPath = pathToFileURL(
    path.resolve(root, "dist/server/entry-server.js")
  ).href;
  const { render } = await import(entryServerPath);
  const { html: appHtml, head } = render(url);

  return template
    .replace("<!--ssr-outlet-->", appHtml)
    .replace("<!--app-head-->", head);
}
