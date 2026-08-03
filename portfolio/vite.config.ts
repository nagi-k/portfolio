import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages 项目页需把 base 改为 '/仓库名/'；自定义域名或用户主页保持 '/'
const base = process.env.VITE_BASE_URL || '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 6000,
    rollupOptions: {
      output: {
        manualChunks: {
          admin: ['decap-cms-app'],
        },
      },
    },
  },
})
