import { defineConfig } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(__dirname, "src"),
    },
  },
  plugins: [TanStackRouterVite(),react()],
})
