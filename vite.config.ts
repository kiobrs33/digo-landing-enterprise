import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
    },
  },
  server: {
    port: 4112,
    strictPort: true,
    // En local los formularios llaman a /api del mismo origen: Vite lo reenvía al backend.
    proxy: { '/api': process.env.CONTENT_API_URL ?? 'http://localhost:4110' },
  },
})
