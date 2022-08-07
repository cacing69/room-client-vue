import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import { VitePWA } from "vite-plugin-pwa";
import replace from "@rollup/plugin-replace";

const replaceOptions = {
  __DATE__: new Date().toISOString(),
  preventAssignment : true,
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
    VitePWA({
      mode: "development",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      registerType: "autoUpdate",
      // strategies: "injectManifest",
      // selfDestroying: true,
      // injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        cleanupOutdatedCaches: false,
      },
      manifest: {
        name: "My Awesome App",
        short_name: "MyApp",
        description: "My Awesome App description",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      devOptions: {
        enabled: true,
        /* other options */
        type: "module",
        // navigateFallback: "index.html",
        navigateFallback: "index.html",
      },
    }),
    replace(replaceOptions),
  ],
});
