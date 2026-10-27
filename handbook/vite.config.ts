import fs from 'node:fs';
import path from 'node:path';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const repoRoot = path.resolve(__dirname, '..');
const handbookPublicDir = path.join(__dirname, 'public');

/** URL prefixes served from handbook/public/ in dev and copied to dist on build. */
const PUBLIC_STATIC_PREFIXES = ['/images/docs', '/components/button'] as const;

function handbookPublicStaticPlugin(): Plugin {
  return {
    name: 'handbook-public-static',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = (req.url ?? '').split('?')[0] ?? '';
        const allowed = PUBLIC_STATIC_PREFIXES.some(
          (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
        );
        if (!allowed) {
          next();
          return;
        }
        const relative = pathname.replace(/^\/+/, '');
        const filePath = path.normalize(path.join(handbookPublicDir, relative));
        if (
          !filePath.startsWith(handbookPublicDir) ||
          !existsSync(filePath) ||
          !statSync(filePath).isFile()
        ) {
          next();
          return;
        }
        res.setHeader('Cache-Control', 'no-cache');
        createReadStream(filePath).pipe(res);
      });
    },
    closeBundle() {
      for (const prefix of PUBLIC_STATIC_PREFIXES) {
        const segment = prefix.replace(/^\//, '');
        const srcDir = path.join(handbookPublicDir, segment);
        if (!existsSync(srcDir)) continue;
        const outDir = path.join(__dirname, 'dist', segment);
        fs.mkdirSync(outDir, { recursive: true });
        fs.cpSync(srcDir, outDir, { recursive: true });
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), handbookPublicStaticPlugin()],
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
