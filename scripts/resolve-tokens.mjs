import fs from 'node:fs';
import path from 'node:path';
import {
  ROOT,
  readJson,
  writeJson,
  deepResolveW3C,
} from './lib/token-utils.mjs';

const fullFoundation = readJson(path.join(ROOT, 'tokens/source/foundation.tokens.json'));

function resolveFile(inputPath, outputPath) {
  const data = readJson(inputPath);
  const resolved = deepResolveW3C(data, fullFoundation);
  writeJson(outputPath, resolved);
}

const foundationDir = path.join(ROOT, 'tokens/foundation');
for (const file of fs.readdirSync(foundationDir).filter((f) => f.endsWith('.json'))) {
  resolveFile(
    path.join(foundationDir, file),
    path.join(ROOT, 'tokens/dist/foundation', file.replace('.json', '.resolved.json')),
  );
}

const componentsDir = path.join(ROOT, 'tokens/components');
for (const file of fs.readdirSync(componentsDir).filter((f) => f.endsWith('.json') && f !== 'index.json')) {
  resolveFile(
    path.join(componentsDir, file),
    path.join(ROOT, 'tokens/dist/components', file.replace('.json', '.resolved.json')),
  );
}

const foundationOnly = { ...fullFoundation };
delete foundationOnly.Components;
writeJson(
  path.join(ROOT, 'tokens/dist/foundation.resolved.json'),
  deepResolveW3C(foundationOnly, fullFoundation),
);

console.log('Resolved foundation + component token files into tokens/dist/');
