import Pages from 'vite-plugin-pages';
import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import generateSitemap from 'vite-plugin-pages-sitemap';
import viteImagemin from 'vite-plugin-imagemin';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const hostname = process.env.VITE_APP_HOST || 'https://cifrum-digital.ru';

console.log('HOSTNAME:' + hostname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages({
      onRoutesGenerated: (routes) => generateSitemap({ routes, hostname }),
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 15,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.6, 0.7],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: process.env.HOST,
    port: parseInt(process.env.PORT || '8080') || 8080,
  },
  build: {
    target: 'ios11',
  },
});
