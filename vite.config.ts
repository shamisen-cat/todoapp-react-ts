import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@todo': '/src/features/todo',
      '@api': '/src/features/api',
      '@view-mode': '/src/features/view-mode',
      '@shared': '/src/shared',
      '@logger': '/src/shared/utils/logger.ts',
      '@styles': '/src/styles',
    },
  },
});
