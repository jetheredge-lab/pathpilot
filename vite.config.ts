import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // The SPA is served behind /app (the marketing landing page owns /).
  base: '/app/',
  server: {
    port: 3000,
    open: false,
    proxy: {
      // Forward API calls to the local backend during development.
      '/api': {
        target: 'http://localhost:4100',
        changeOrigin: true,
      },
    },
  },
});
