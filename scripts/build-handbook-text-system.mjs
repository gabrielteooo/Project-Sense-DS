import path from 'node:path';
import { ROOT, readJson, writeJson, pathToCssVar } from './lib/token-utils.mjs';

const meta = readJson(path.join(ROOT, 'handbook/content/foundation/text-system.meta.json'));

/** @param {string[]} tokenPath */
function cssVarForPath(tokenPath) {
  return pathToCssVar(tokenPath);
}

const sections = meta.sections.map((section) => {
  const rows = section.rows.map((row) => {
    const base = {
      value: row.value,
      figmaToken: row.figmaToken,
      cssVar: cssVarForPath(row.tokenPath),
    };

    if (row.previewType === 'text') {
      return {
        ...base,
        previewType: 'text',
        previewText: row.previewText,
      };
    }
    if (row.previewType === 'scale') {
      return {
        ...base,
        previewType: 'scale',
        fontSizePx: row.fontSizePx,
      };
    }
    return {
      ...base,
      previewType: 'weight',
      fontWeight: row.fontWeight,
    };
  });

  return {
    id: section.id,
    title: section.title,
    description: section.description,
    rows,
  };
});

writeJson(path.join(ROOT, 'handbook/content/foundation/text-system.json'), {
  pageDescription: meta.pageDescription,
  sections,
});

console.log(`Wrote handbook text system (${sections.length} sections)`);
