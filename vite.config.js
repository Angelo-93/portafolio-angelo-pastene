import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Rutas relativas ('./') para que el build funcione en GitHub Pages sin
  // importar el nombre del repositorio (la página queda en /<repo>/, no en /).
  base: './',
})
