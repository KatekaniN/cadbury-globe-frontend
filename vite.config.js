import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png', 'icon.png', 'gift.png', 'gift1.png', 'bg1.png', 'globe.png'],
      manifest: {
        name: 'Cadbury Festive Flavour Globe',
        short_name: 'Cadbury Globe',
        description: 'AI mood selfie + quiz to recommend the perfect Cadbury chocolate gift.',
        theme_color: '#431a8b',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          { src: '/icon.png', sizes: '192x192', type: 'image/png' },
          { src: '/logo.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,woff2,ttf}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === self.location.origin,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
            }
          },
          {
            // Cache backend API responses cautiously
            urlPattern: ({ url }) => /\/detect-mood/.test(url.pathname),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 5,
            }
          }
        ]
      }
    })
  ],
})
