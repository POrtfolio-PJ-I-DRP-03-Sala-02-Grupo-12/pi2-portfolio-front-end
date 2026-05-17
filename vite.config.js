import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
  },
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
    },
  },
  ssr: {
    noExternal: ["@clerk/clerk-react"],
  },

  // server: {
  //   host: true, //Enables --host (already using it)
  //   watch: {
  //     usePolling: true, //Force polling (fixes Docker + WSL)
  //   },
  // },
});
