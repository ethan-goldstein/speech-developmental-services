import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the same build works on GitHub Pages
// (ethan-goldstein.github.io/speech-developmental-services/) and on a
// custom domain later, with no config change.
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 5174,
  },
})
