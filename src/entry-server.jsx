import { ClerkProvider } from "@clerk/clerk-react";
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App.jsx";
import "./index.css";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export function render(url) {
  return renderToString(
    <StrictMode>
      <ClerkProvider publishableKey={clerkPubKey}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </ClerkProvider>
    </StrictMode>
  );
}
