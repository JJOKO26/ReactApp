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
        enabled: true, // 開発環境でもPWA有効化
      },
      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "レシピブックアプリ",
        short_name: "レシピブック",
        description: "React + Vite PWA Example",
        start_url: "/ReactApp/",
        scope: "/ReactApp/",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
      },
    }),
    tailwindcss(),
  ],
  server: {
    port: 5273, // ポート番号5273で受け付ける場合
  },
  base: "/ReactApp/",
});
