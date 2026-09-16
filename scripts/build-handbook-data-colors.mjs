import path from 'node:path';
import { ROOT, readJson, writeJson } from './lib/token-utils.mjs';

/** Handbook section order — matches Figma data colour page */
const PALETTE_ORDER = [
  'Purple',
  'Blue',
  'Green',
  'Orange',
  'Red',
  'Yellow',
  'Grey',
  'Cyan',
  'Pink',
];

/** Shade labels when token JSON has no $description */
const SHADE_LABELS = [
  'Lightest',
  'Lighter',
  'Light',
  'Default',
  'Medium',
  'Dark',
  'Darker',
  'Darkest',
];

const data = readJson(
  path.join(ROOT, 'tokens/dist/foundation/colors.resolved.json'),
).Colors.Data;

/** @param {unknown} value */
function hexFromValue(value) {
  if (value && typeof value === 'object' && 'hex' in value && typeof value.hex === 'string') {
    return value.hex.toUpperCase();
  }
  return undefined;
}

const sections = PALETTE_ORDER.filter((name) => data[name]).map((paletteName) => {
  const steps = data[paletteName];
  const tokens = SHADE_LABELS.map((fallbackLabel, index) => {
    const step = String(index + 1);
    const node = steps[step];
    const hex = hexFromValue(node?.$value);
    const figmaDesc =
      typeof node?.$description === 'string' ? node.$description.trim() : undefined;
    const description =
      figmaDesc && figmaDesc.length > 0
        ? figmaDesc.replace(/\s*[–-]\s*/g, ' — ').replace(/\.$/, '')
        : fallbackLabel;

    return {
      token: `ColorData${paletteName}${step}`,
      value: hex ?? '',
      swatchHex: hex,
      description,
    };
  });

  return {
    id: paletteName.toLowerCase(),
    title: `Data ${paletteName}`,
    tokens,
  };
});

writeJson(path.join(ROOT, 'handbook/content/foundation/data-colors.json'), { sections });
