import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
 server: {
  host: true, 
  port: 5175,
  strictPort: false,
  cors: true,
  hmr: {
    protocol: 'ws',
    host: 'localhost',
    port: 5173,
  },
},
  base: '',
  build: {
    outDir: 'dist',
    assetsDir: './',
  },
})