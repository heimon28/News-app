import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'backend-git-main-heimon28s-projects.vercel.app'

    }
  },
  plugins: [react()],
})
