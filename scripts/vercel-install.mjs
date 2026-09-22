import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const handbookDir = path.join(repoRoot, 'handbook');
const token = process.env.FONTAWESOME_NPM_AUTH_TOKEN;

if (!token?.trim()) {
  console.error(
    'Set FONTAWESOME_NPM_AUTH_TOKEN in Vercel (Font Awesome npm token) to install @awesome.me/kit.',
  );
  process.exit(1);
}

const npmrc = `@awesome.me:registry=https://npm.fontawesome.com/
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=${token.trim()}
`;

fs.writeFileSync(path.join(handbookDir, '.npmrc'), npmrc);

const result = spawnSync('npm', ['ci'], {
  cwd: handbookDir,
  stdio: 'inherit',
  env: process.env,
});

process.exit(result.status ?? 1);
