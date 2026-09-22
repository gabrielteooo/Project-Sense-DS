import path from 'node:path';
import { ROOT, readJson, writeJson, pathToCssVar } from './lib/token-utils.mjs';

const meta = readJson(path.join(ROOT, 'handbook/content/foundation/spacing.meta.json'));
const sizes = readJson(path.join(ROOT, 'tokens/dist/foundation/size.resolved.json')).Size.Base;
const margins = readJson(path.join(ROOT, 'tokens/dist/foundation/space.resolved.json')).Space.Margin;
const paddings = readJson(path.join(ROOT, 'tokens/dist/foundation/space.resolved.json')).Space.Padding;

/** @param {string} sizeKey */
function figmaBaseSizeToken(sizeKey) {
  if (sizeKey === 'size') return 'Base/size';
  return `Base/${sizeKey}`;
}

/** @param {'margin' | 'padding'} group @param {string} key */
function figmaSpaceToken(group, key) {
  const segment = group === 'margin' ? 'margin' : 'padding';
  if (key === 'margin' || key === 'padding') return `Space/${segment}`;
  const suffix = key.replace(/^(margin|padding)/, '');
  return `Space/${segment}${suffix}`;
}

/** @param {string} key @param {Record<string, string>} aliasMap */
function aliasTokenForKey(key, aliasMap) {
  const sizeKey = aliasMap[key];
  return figmaBaseSizeToken(sizeKey);
}

/** @param {string[]} keys */
function buildSizeScaleRows(keys) {
  return keys.map((key) => {
    const px = sizes[key].$value;
    return {
      figmaTokens: [{ label: figmaBaseSizeToken(key), variant: 'default' }],
      pxValue: px,
      pxLabel: `${px}px`,
      cssVar: pathToCssVar(['Size', 'Base', key]),
      visualWidthPx: px,
    };
  });
}

/** @param {string[]} keys @param {'margin' | 'padding'} group @param {Record<string, string>} aliasMap */
function buildSpaceScaleRows(keys, group, aliasMap) {
  const defaultKey = group === 'margin' ? 'margin' : 'padding';
  const defaultBadge = group === 'margin' ? meta.marginDefaultBadge : meta.paddingDefaultBadge;

  return keys.map((key) => {
    const px = (group === 'margin' ? margins : paddings)[key].$value;
    const figmaTokens =
      key === defaultKey
        ? [
            { label: figmaSpaceToken(group, key), variant: 'default' },
            { label: defaultBadge, variant: 'primary' },
          ]
        : [{ label: figmaSpaceToken(group, key), variant: 'default' }];

    return {
      figmaTokens,
      pxValue: px,
      pxLabel: `${px}px`,
      aliasToken: aliasTokenForKey(key, aliasMap),
      cssVar: pathToCssVar(['Space', group === 'margin' ? 'Margin' : 'Padding', key]),
      aliasCssVar: pathToCssVar(['Size', 'Base', aliasMap[key]]),
    };
  });
}

writeJson(path.join(ROOT, 'handbook/content/foundation/spacing.json'), {
  overview: {
    pageDescription: meta.overviewDescription,
    principles: meta.principles,
    sizeScale: {
      title: meta.sizeScaleTitle,
      rows: buildSizeScaleRows(meta.sizeScaleKeys),
    },
  },
  margin: {
    pageDescription: meta.marginDescription,
    sectionTitle: meta.marginSectionTitle,
    rows: buildSpaceScaleRows(meta.marginScaleKeys, 'margin', meta.sizeAliasByMarginKey),
  },
  padding: {
    pageDescription: meta.paddingDescription,
    sectionTitle: meta.paddingSectionTitle,
    rows: buildSpaceScaleRows(meta.paddingScaleKeys, 'padding', meta.sizeAliasByPaddingKey),
  },
});

console.log('Wrote handbook spacing content');
