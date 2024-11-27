import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.svg', 'og-image.png'],
      manifest: {
        name: 'TypeMaster - Hızlı Yazma Testi',
        short_name: 'TypeMaster',
        description: 'Türkçe ve İngilizce yazma hızınızı test edin. Profesyonel yazma hızı testi ile WPM, doğruluk ve performansınızı ölçün.',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        icons: [
          {
            src: 'logo.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react']
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion': ['framer-motion'],
          'ui': ['lucide-react', 'react-confetti']
        }
      }
    }
  }
});