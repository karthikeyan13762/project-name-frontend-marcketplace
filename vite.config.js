import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://marcketplace-8.netlify.app", // Backend server URL
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Removes '/api' prefix
      },
    },
  },
  plugins: [react()],
});
