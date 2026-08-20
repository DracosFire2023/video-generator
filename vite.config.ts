import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/video-generator/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      mangle: false, // Prevents Terser from renaming state handlers and hook functions
      compress: {
        keep_fnames: true,
        keep_classnames: true,
      },
    },
  }
})
