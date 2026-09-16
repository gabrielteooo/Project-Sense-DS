import baseColors from '../../content/foundation/base-colors.json';
import { handbookTokenSlug } from './tokenDisplay';

const slugToHex = new Map<string, string>();

/** Figma ramp labels in semantic tables → base palette ids */
const RAMP_PALETTE_IDS: Record<string, string> = {
  cyan: 'Cyan_Ant',
  green: 'Green_Ant',
  orange: 'Orange_Ant',
  blue: 'Blue_Ant',
  red: 'Red_Ant',
};

for (const palette of baseColors.palettes) {
  for (const step of palette.steps) {
    slugToHex.set(handbookTokenSlug(palette.id, step.step), step.hex);
  }
}

/** Resolve handbook value (e.g. Green/3 or base-green-ant-3) to hex from base colour ramps. */
export function hexForBaseColorSlug(value: string): string | undefined {
  const ramp = value.match(/^([A-Za-z]+)\/(\d+)$/);
  if (ramp) {
    const paletteId = RAMP_PALETTE_IDS[ramp[1].toLowerCase()];
    if (paletteId) {
      return slugToHex.get(handbookTokenSlug(paletteId, Number(ramp[2])));
    }
  }
  return slugToHex.get(value);
}
