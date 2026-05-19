import { ClerkProvider } from "@clerk/clerk-react";
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App.jsx";
import { getSeoForPath } from "./config/routeSeo.js";
import { buildHeadHtml } from "./utils/buildHeadHtml.js";
import "./index.css";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export function render(url) {
  const pathname = url.split("?")[0] || "/";
  const head = buildHeadHtml(getSeoForPath(pathname));

  const html = renderToString(
    <StrictMode>
      <ClerkProvider publishableKey={clerkPubKey}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </ClerkProvider>
    </StrictMode>
  );

  return { html, head };
}
