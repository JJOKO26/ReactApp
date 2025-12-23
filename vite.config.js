import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      manifest: {
        name: "レシピブックアプリ",
        short_name: "レシピブック",
        description: "React + Vite PWA Example",
        start_url: "/ReactApp/",
        scope: "/ReactApp/",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        icons: [
          {
            src: "/ReactApp/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/ReactApp/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/ReactApp/pwa-180x180.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
      },
      workbox: {
        // ★ API を SPA フォールバック対象から除外
        navigateFallbackDenylist: [
          /^\/api\//,
          /^https:\/\/api\.open-meteo\.com\//,
        ],

        globPatterns: [
          "**/*.{css,html,ico,js,jpg,jsx,json,md,png,webmanifest}",
        ],

        // ★ 実行時キャッシュ
        runtimeCaching: [
          {
            // フルURLに一致させる形（正規表現）
            urlPattern: /^https:\/\/api\.open-meteo\.com\/v1\/forecast/i,
            handler: "NetworkFirst",
            method: "GET",
            options: {
              cacheName: "api-open-meteo",
              networkTimeoutSeconds: 3,
              cacheableResponse: { statuses: [0, 200] },
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 10, // 10分で期限切れ
                purgeOnQuotaError: true,
              },
            },
          },
        ],
      },
    }),
    tailwindcss(),
  ],
  server: { port: 5273 },
  base: "/ReactApp/",
});
