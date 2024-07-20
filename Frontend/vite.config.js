import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://news-app-15hj.onrender.com'

    }
  },
  plugins: [react()],
})
