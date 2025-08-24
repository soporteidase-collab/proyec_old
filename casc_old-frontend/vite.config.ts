// vite.config.ts (frontend)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      // Todas las llamadas a /api irán al backend de Laravel
      '/api': {
        target: process.env.VITE_API_TARGET || 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        // Si alguna vez tu backend estuviera montado en subcarpeta, puedes usar "rewrite"
        // rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
  build: {
    outDir: '../public_html', // Para Hostinger
    emptyOutDir: true,
  },
});
