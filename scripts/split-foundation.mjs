import path from 'node:path';
import {
  ROOT,
  readJson,
  writeJson,
  componentFileName,
} from './lib/token-utils.mjs';

const sourcePath = path.join(ROOT, 'tokens/source/foundation.tokens.json');
const foundation = readJson(sourcePath);

const meta = foundation.$extensions ? { $extensions: foundation.$extensions } : {};
const foundationKeys = ['Colors', 'Typography', 'Border Radius', 'Size', 'Space'];

for (const key of foundationKeys) {
  if (!(key in foundation)) continue;
  const fileKey = key.toLowerCase().replace(/\s+/g, '-');
  writeJson(path.join(ROOT, `tokens/foundation/${fileKey}.json`), {
    ...meta,
    [key]: foundation[key],
  });
}

const components = foundation.Components ?? {};
const index = { components: [] };

for (const [name, subtree] of Object.entries(components)) {
  const file = componentFileName(name);
  writeJson(path.join(ROOT, `tokens/components/${file}`), {
    ...meta,
    [name]: subtree,
  });
  index.components.push({ name, file });
}

index.components.sort((a, b) => a.name.localeCompare(b.name));
writeJson(path.join(ROOT, 'tokens/components/index.json'), index);

console.log(
  `Split foundation: ${foundationKeys.length} foundation files, ${index.components.length} component files`,
);
