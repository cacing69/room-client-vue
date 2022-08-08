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

const getCache = ({ name, pattern }: any) => ({
  urlPattern: pattern,
  handler: "CacheFirst" as const,
  options: {
    cacheName: name,
    expiration: {
      maxEntries: 500,
      maxAgeSeconds: 60 * 60 * 24 * 365 * 2, // 2 years
    },
    cacheableResponse: {
      statuses: [200],
    },
  },
});

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
        // importScripts: ["sw-code.js"],
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        cleanupOutdatedCaches: false,
        runtimeCaching: [
          getCache({
            pattern: /^https:\/\/s3.amazonaws.com\/my-library-cover-uploads/,
            name: "local-images1",
          }),
          getCache({
            pattern: /^https:\/\/my-library-cover-uploads.s3.amazonaws.com/,
            name: "local-images2",
          }),
        ],
      },
      manifest: {
        name: "My Awesome App",
        short_name: "MyApp",
        display: "standalone",
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
        navigateFallback: "index.html",
      },
    }),
    // replace(replaceOptions),
  ],
});
