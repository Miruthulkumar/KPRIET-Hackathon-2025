import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    allowedHosts: [
      // Allow all ngrok domains dynamically
      ".ngrok-free.app",
      ".ngrok.io",
    ],
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
    hmr: {
      clientPort: 443,
    },
    server: {
      open: true,
    },
  },
});
