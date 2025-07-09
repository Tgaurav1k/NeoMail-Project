import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://neo-mail-project.vercel.app', // your backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
