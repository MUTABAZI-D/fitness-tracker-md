/* eslint-disable import/default */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: false,
      eslint: { lintCommand: 'eslint "./src/**/*.{js,jsx}"' },
      terminal: true,
    }),
  ],
  optimizeDeps: {
    include: ['date-fns'],
  },
});
