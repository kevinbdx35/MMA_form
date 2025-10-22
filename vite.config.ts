import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // En dev, pas de base path
  // En production (build), utiliser le nom du repo GitHub
  base: command === 'serve' ? '/' : '/mma-course-tracker-static/',
}))
