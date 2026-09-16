import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));

const steps = [
  'split-foundation.mjs',
  'normalize-effects.mjs',
  'build-text-styles.mjs',
  'resolve-tokens.mjs',
  'build-css.mjs',
  'build-antd-theme.mjs',
  'build-handbook-base-colors.mjs',
  'build-handbook-data-colors.mjs',
];

for (const step of steps) {
  const script = path.join(dir, step);
  console.log(`\n> node ${step}`);
  const result = spawnSync(process.execPath, [script], { stdio: 'inherit' });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log('\nTokens build complete.');
