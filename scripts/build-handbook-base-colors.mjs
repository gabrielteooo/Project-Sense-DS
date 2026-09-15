import path from 'node:path';
import { ROOT, readJson, writeJson, writeText } from './lib/token-utils.mjs';

const colors = readJson(path.join(ROOT, 'tokens/dist/foundation/colors.resolved.json')).Colors
  .Base;

const INTRO = {
  title: 'Base colour',
  summary:
    'Primitive colour ramps (steps 1–10). Use semantic tokens (Brand, System, Neutral) in UI; Base is the source palette for those aliases.',
  usage:
    'Step 1–2: backgrounds and hover tints. Step 6: primary on-ramp. Steps 7–10: active states and text on tinted surfaces.',
};

/** @type {Record<string, { title: string; description: string; semantic?: string }>} */
const PALETTE_META = {
  Blue_Ant: {
    title: 'Blue',
    description:
      'Cool blue ramp for information and link-adjacent accents. Feeds System Info semantic tokens.',
    semantic: 'System → Info',
  },
  Cyan_Ant: {
    title: 'Cyan',
    description: 'Primary brand ramp. Feeds Brand Primary semantic tokens across the product.',
    semantic: 'Brand → Primary',
  },
  Geekblue_Ant: {
    title: 'Geek blue',
    description: 'Deep blue-violet accent for supplementary UI (e.g. calendar highlights).',
  },
  Gold_Ant: {
    title: 'Gold',
    description: 'Warm gold accent for highlights and decorative emphasis.',
  },
  Green_Ant: {
    title: 'Green',
    description: 'Positive and success states. Feeds System Success semantic tokens.',
    semantic: 'System → Success',
  },
  Lime_Ant: {
    title: 'Lime',
    description: 'Yellow-green accent for supplementary status and highlights.',
  },
  Magenta_Ant: {
    title: 'Magenta',
    description: 'Pink-magenta accent for supplementary emphasis.',
  },
  Orange_Ant: {
    title: 'Orange',
    description: 'Attention and warning contexts. Feeds System Warning semantic tokens.',
    semantic: 'System → Warning',
  },
  Purple_Ant: {
    title: 'Purple',
    description: 'Purple accent for supplementary emphasis and data-adjacent UI.',
  },
  Red_Ant: {
    title: 'Red',
    description: 'Error and destructive emphasis. Feeds System Error semantic tokens.',
    semantic: 'System → Error',
  },
  Volcano_Ant: {
    title: 'Volcano',
    description: 'Red-orange accent for strong warm emphasis.',
  },
  Yellow_Ant: {
    title: 'Yellow',
    description: 'Bright yellow accent for highlights and alerts.',
  },
};

function tokenPath(paletteKey, step) {
  return `Colors.Base.${paletteKey}.${step}`;
}

function cssVar(paletteKey, step) {
  const slug = paletteKey.replace(/_/g, '-').toLowerCase();
  return `--fms-colors-base-${slug}-${step}`;
}

const palettes = Object.keys(colors)
  .sort((a, b) => (PALETTE_META[a]?.title ?? a).localeCompare(PALETTE_META[b]?.title ?? b))
  .map((key) => {
    const meta = PALETTE_META[key] ?? { title: key.replace('_Ant', ''), description: '' };
    const steps = [];
    for (let step = 1; step <= 10; step += 1) {
      const node = colors[key][String(step)];
      if (!node?.$value?.hex) continue;
      steps.push({
        step,
        hex: node.$value.hex,
        token: tokenPath(key, step),
        cssVar: cssVar(key, step),
      });
    }
    return {
      id: key,
      title: meta.title,
      description: meta.description,
      semantic: meta.semantic ?? null,
      steps,
    };
  });

const payload = { ...INTRO, palettes };
writeJson(path.join(ROOT, 'handbook/content/foundation/base-colors.json'), payload);

const md = [
  '# Base colour — Figma / handbook copy',
  '',
  INTRO.summary,
  '',
  INTRO.usage,
  '',
  ...palettes.flatMap((p) => [
    `---`,
    '',
    `## ${p.title}`,
    `**Token group:** \`${p.id}\``,
    p.semantic ? `**Semantic:** ${p.semantic}` : '',
    '',
    p.description,
    '',
    '| Step | Hex | Figma token | CSS variable |',
    '| --- | --- | --- | --- |',
    ...p.steps.map(
      (s) => `| ${s.step} | ${s.hex} | \`${s.token}\` | \`${s.cssVar}\` |`,
    ),
    '',
  ]),
].join('\n');

writeText(path.join(ROOT, 'handbook/content/foundation/base-colors.md'), md);
console.log(`Handbook base colours: ${palettes.length} palettes → handbook/content/foundation/`);
