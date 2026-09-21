import path from 'node:path';
import { ROOT, readJson, writeJson } from './lib/token-utils.mjs';

const meta = readJson(path.join(ROOT, 'handbook/content/foundation/text-styles.meta.json'));
const tokenStyles = readJson(path.join(ROOT, 'tokens/typography/text-styles.json')).styles;

/** @param {string} name */
function cssSlugFromFigmaName(name) {
  return name.replace(/\//g, '-').replace(/\s+/g, '-').toLowerCase();
}

const byName = new Map(tokenStyles.map((s) => [s.name, s]));

const sections = meta.sections.map((section) => {
  const rows = section.styleNames.map((figmaName) => {
    const style = byName.get(figmaName);
    if (!style) {
      throw new Error(`Missing text style in tokens: ${figmaName}`);
    }
    const rowMeta = section.rows[figmaName];
    if (!rowMeta) {
      throw new Error(`Missing row meta for ${figmaName} in text-styles.meta.json`);
    }
    const slug = cssSlugFromFigmaName(figmaName);
    return {
      styleLabel: rowMeta.styleLabel,
      figmaToken: figmaName,
      sizeLineHeight: `${style.fontSize} / ${style.lineHeight}`,
      fontSize: style.fontSize,
      lineHeight: style.lineHeight,
      usage: rowMeta.usage,
      cssSlug: slug,
      cssVarPrefix: `--fms-text-${slug}`,
    };
  });

  return {
    id: section.id,
    title: section.title,
    description: section.description,
    rows,
  };
});

writeJson(path.join(ROOT, 'handbook/content/foundation/text-styles.json'), {
  pageDescription: meta.pageDescription,
  sections,
});

console.log(`Wrote handbook text styles (${sections.length} sections)`);
