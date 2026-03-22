import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// import tailwind to provide as a plug in
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
})
