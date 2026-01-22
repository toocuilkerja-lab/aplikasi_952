
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Mencoba mengambil dari API_KEY, VITE_API_KEY, atau GEMINI_API_KEY
    'process.env.API_KEY': JSON.stringify(
      process.env.API_KEY || 
      process.env.VITE_API_KEY || 
      process.env.GEMINI_API_KEY || 
      ""
    )
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Biarkan console log untuk debugging awal di Vercel
      }
    }
  }
});
