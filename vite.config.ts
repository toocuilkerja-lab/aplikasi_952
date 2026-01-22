
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Memastikan API_KEY dari environment Vercel tertanam ke dalam bundle klien
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || process.env.GEMINI_API_KEY || "")
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
