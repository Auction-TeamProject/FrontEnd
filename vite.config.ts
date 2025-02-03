import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: '앱 이름',
        short_name: '앱 짧은 이름',
        description: '앱 설명',
        display: 'standalone',
        start_url: '/login',
        scope: '/',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: '/icon-192.webp',
            sizes: '192x192',
            type: 'image/webp',
            purpose: 'any',
          },
          {
            src: '/icon-512.webp',
            sizes: '512x512',
            type: 'image/webp',
            purpose: 'any',
          },
        ],
      },
    }),
  ],
});
