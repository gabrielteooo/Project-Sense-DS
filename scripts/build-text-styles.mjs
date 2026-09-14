import path from 'node:path';
import { ROOT, readJson, writeJson } from './lib/token-utils.mjs';

const foundation = readJson(path.join(ROOT, 'tokens/source/foundation.tokens.json'));
const textstyles = readJson(path.join(ROOT, 'tokens/source/textstyles.json'));

const fontSizes = foundation.Typography['Font Size'];
const lineHeights = foundation.Typography['Line Height'];

/** @param {string} styleName @param {number} fontSize */
function lineHeightForStyle(styleName, fontSize) {
  if (styleName.startsWith('Heading/')) {
    const n = styleName.split('/')[1];
    const key = `Heading${n}`;
    if (lineHeights[key]) return lineHeights[key].$value;
  }
  if (styleName === 'Badge count') {
    return lineHeights.SM?.$value ?? lineHeights.Base.$value;
  }
  const prefix = styleName.split('/')[0];
  const map = { Base: 'Base', SM: 'SM', XS: 'SM', LG: 'LG' };
  const key = map[prefix] ?? 'Base';
  return lineHeights[key]?.$value ?? lineHeights.Base.$value;
}

/** @param {string} weightLabel @param {string} styleName */
function mapWeight(weightLabel, styleName) {
  if (weightLabel === 'Italic' || styleName.includes('Italic')) {
    return { fontWeight: 400, fontStyle: 'italic' };
  }
  if (weightLabel === 'Semi Bold') return { fontWeight: 600, fontStyle: 'normal' };
  if (weightLabel === 'Medium') return { fontWeight: 400, fontStyle: 'normal' };
  return { fontWeight: 400, fontStyle: 'normal' };
}

const styles = (textstyles.textStyles ?? []).map((s) => {
  const weight = mapWeight(s.fontWeight, s.name);
  const lineHeight = lineHeightForStyle(s.name, s.fontSize);
  const decoration =
    s.name.includes('Underline') ? 'underline' : s.name.includes('Delete') ? 'line-through' : 'none';

  return {
    name: s.name,
    fontFamily: s.fontFamily,
    fontSize: s.fontSize,
    lineHeight,
    letterSpacing: s.letterSpacing?.value ?? 0,
    textCase: s.textCase,
    ...weight,
    textDecoration: decoration,
  };
});

writeJson(path.join(ROOT, 'tokens/typography/text-styles.json'), {
  fileName: textstyles.fileName,
  fontFamilyIcons: 'Font Awesome 6 Free',
  fontFamilyIconsFigma: foundation.Typography.Font.Icons.$value,
  styles,
});

console.log(`Built ${styles.length} composite text styles`);
