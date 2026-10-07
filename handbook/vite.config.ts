import fs from 'node:fs';
import path from 'node:path';
import { createReadStream, existsSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const repoRoot = path.resolve(__dirname, '..');
const docsImagesDir = path.join(__dirname, 'public/images/docs');

/** Handbook doc images in public/images/docs are served at /images/docs/ in dev and copied to dist on build. */
function handbookDocsImagesPlugin(): Plugin {
  return {
    name: 'handbook-docs-images',
    configureServer(server) {
      server.middlewares.use('/images/docs', (req, res, next) => {
        const pathname = (req.url ?? '').split('?')[0] ?? '';
        const relative = pathname.replace(/^\/+/, '');
        const filePath = path.normalize(path.join(docsImagesDir, relative));
        if (!filePath.startsWith(docsImagesDir) || !existsSync(filePath)) {
          next();
          return;
        }
        res.setHeader('Cache-Control', 'no-cache');
        createReadStream(filePath).pipe(res);
      });
    },
    closeBundle() {
      if (!existsSync(docsImagesDir)) return;
      const outDir = path.join(__dirname, 'dist/images/docs');
      fs.mkdirSync(outDir, { recursive: true });
      fs.cpSync(docsImagesDir, outDir, { recursive: true });
    },
  };
}

export default defineConfig({
  plugins: [react(), handbookDocsImagesPlugin()],
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
