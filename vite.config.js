import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  // TEST Configuration
  test: {
    globals: true,                    /* Allows using describe, test, and expect without importing them */
    environment: 'jsdom',             /* Injects the virtual browser runtime environment */
    setupFiles: './src/test/setup.js' /* Registers global DOM matcher rules */
  },
})
