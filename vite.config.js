import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    minify: 'esbuild', // Быстрая и эффективная минификация
    assetsDir: 'assets'
  },
  server: {
    port: 3000
  }
});
