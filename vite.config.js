import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Music Battle',
        short_name: 'MusicBattle',
        description: 'Музыкальная викторина',
        theme_color: '#07090d',
        background_color: '#07090d',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        id: '/',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    assetsDir: 'assets'
  },
  server: {
    port: 3000
  }
});
