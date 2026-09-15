/** Handbook token slug shown in Figma table (e.g. base-blue-ant-1) */
export function handbookTokenSlug(paletteId: string, step: number) {
  const hue = paletteId.replace(/_Ant$/i, '').replace(/_/g, '-').toLowerCase();
  return `base-${hue}-ant-${step}`;
}
