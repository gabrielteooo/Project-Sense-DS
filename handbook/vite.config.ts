import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoRoot = path.resolve(__dirname, '..');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@content': path.resolve(__dirname, 'content'),
    },
  },
  publicDir: path.join(repoRoot, 'tokens'),
  server: {
    port: 5173,
    open: true,
    fs: {
      allow: [repoRoot],
    },
  },
});
