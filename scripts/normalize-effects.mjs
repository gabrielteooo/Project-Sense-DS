import path from 'node:path';
import { ROOT, readJson, writeJson } from './lib/token-utils.mjs';

const effects = readJson(path.join(ROOT, 'tokens/source/effects.tokens.json'));

/** @param {{ shadowType: string; radius: number; color: string; offsetX: number; offsetY: number; spread: number }} layer */
function layerToCss(layer) {
  const { offsetX, offsetY, radius, spread, color } = layer;
  return `${offsetX}px ${offsetY}px ${radius}px ${spread}px ${color}`;
}

/** @param {Record<string, unknown>} node */
function extractShadowLayers(node) {
  const layers = [];
  for (const [key, val] of Object.entries(node)) {
    if (!/^\d+$/.test(key)) continue;
    if (val && typeof val === 'object' && 'value' in val) {
      const v = /** @type {{ value: Parameters<typeof layerToCss>[0] }} */ (val).value;
      layers.push(layerToCss(v));
    }
  }
  return layers;
}

/** @param {Record<string, unknown>} effectBranch */
function normalizeEffectBranch(effectBranch) {
  const shadows = {};
  for (const [key, val] of Object.entries(effectBranch)) {
    if (key === 'component') {
      shadows.component = normalizeEffectBranch(/** @type {Record<string, unknown>} */ (val));
      continue;
    }
    if (!val || typeof val !== 'object') continue;
    const record = /** @type {Record<string, unknown>} */ (val);
    const layers = extractShadowLayers(record);
    if (layers.length === 0) continue;
    shadows[key] = {
      name: key,
      description: typeof record.description === 'string' ? record.description : null,
      layers,
      boxShadow: layers.join(', '),
    };
  }
  return shadows;
}

const gradients = {};
for (const [name, entry] of Object.entries(effects.gradient ?? {})) {
  const e = /** @type {{ value?: { gradientType?: string; rotation?: number; stops?: { position: number; color: string }[] }; description?: string }} */ (
    entry
  );
  const stops = e.value?.stops ?? [];
  const rotation = e.value?.rotation ?? 180;
  const stopCss = stops
    .map((s) => {
      const pct = Math.round(s.position * 1000) / 10;
      const hex = s.color.length === 9 ? `#${s.color.slice(3)}${s.color.slice(1, 3)}` : s.color;
      const color = hex.length === 9 ? `#${hex.slice(1, 7)}` : hex;
      return `${color} ${pct}%`;
    })
    .join(', ');
  gradients[name] = {
    name,
    description: e.description ?? '',
    css: `linear-gradient(${rotation}deg, ${stopCss})`,
    stops: e.value?.stops,
  };
}

const grids = {};
for (const [name, entry] of Object.entries(effects.grid ?? {})) {
  const e = /** @type {{ value?: Record<string, unknown>; description?: string | null }} */ (entry);
  grids[name] = {
    name,
    description: e.description ?? null,
    ...e.value,
  };
}

const shadows = normalizeEffectBranch(effects.effect ?? {});

writeJson(path.join(ROOT, 'tokens/effects/shadows.json'), shadows);
writeJson(path.join(ROOT, 'tokens/effects/gradients.json'), gradients);
writeJson(path.join(ROOT, 'tokens/layout/grids.json'), grids);

console.log(
  `Normalized effects: ${Object.keys(shadows).filter((k) => k !== 'component').length} global shadows, gradients=${Object.keys(gradients).length}, grids=${Object.keys(grids).length}`,
);
