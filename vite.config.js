// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true, // 開発でもSW有効化
      },
      manifest: {
        name: "Your App Name",
        short_name: "YourApp",
        description: "アプリ説明",
        theme_color: "#ffffff",
        display: "standalone",
        start_url: "/ReactApp/",
        scope: "/ReactApp/",
        icons: [
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
    tailwindcss(),
  ],
  server: {
    port: 5273,
  },
  base: "/ReactApp/",
});
