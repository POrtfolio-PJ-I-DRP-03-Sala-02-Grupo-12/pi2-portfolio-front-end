import { renderPage } from "../../server/ssr.js";

function getRequestPath(event) {
  if (event.path) return event.path;
  if (event.rawUrl) {
    try {
      return new URL(event.rawUrl).pathname;
    } catch {
      return "/";
    }
  }
  return "/";
}

export const handler = async (event) => {
  try {
    const url = getRequestPath(event);
    const html = await renderPage(url);

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
      body: html,
    };
  } catch (error) {
    console.error("SSR handler error:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
      body: "Internal Server Error",
    };
  }
};
