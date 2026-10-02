import buttonTokens from '../../../../../tokens/dist/components/button.resolved.json';

export type ButtonColourTokenTag = {
  label: string;
  swatchHex: string;
};

export type ButtonColourTableRow = {
  state: string;
  element: string;
  property: string;
  tokenTag: ButtonColourTokenTag;
};

type TokenLeaf = { $value?: { hex?: string; alpha?: number; components?: number[] } };

const global = buttonTokens.Button.Global as Record<string, TokenLeaf>;
const component = buttonTokens.Button.Component as Record<string, TokenLeaf>;

function hexFromToken(leaf: TokenLeaf | undefined): string {
  const v = leaf?.$value;
  if (!v?.hex) return '#000000';
  if (v.alpha != null && v.alpha < 1 && v.components) {
    const [r, g, b] = v.components.map((c) => Math.round(c * 255));
    return `rgba(${r}, ${g}, ${b}, ${v.alpha})`;
  }
  return v.hex;
}

function tokenTag(scope: 'global' | 'component', key: string): ButtonColourTokenTag {
  const leaf = (scope === 'global' ? global : component)[key];
  const path = scope === 'global' ? `Button/Global/${key}` : `Button/Component/${key}`;
  return { label: path, swatchHex: hexFromToken(leaf) };
}

function row(
  state: string,
  element: string,
  property: string,
  tokenTag: ButtonColourTokenTag,
): ButtonColourTableRow {
  return { state, element, property, tokenTag };
}

export type ButtonColourVariant = 'primary' | 'secondary' | 'tertiary';

export const BUTTON_COLOUR_TYPE_OPTIONS: { value: ButtonColourVariant; label: string }[] = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'tertiary', label: 'Tertiary' },
];

export function getButtonColourTableRows(variant: ButtonColourVariant): ButtonColourTableRow[] {
  switch (variant) {
    case 'primary':
      return buildPrimaryRows();
    case 'secondary':
      return buildSecondaryRows();
    case 'tertiary':
      return buildTertiaryRows();
    default:
      return [];
  }
}

/** Figma 246:7978 — Primary type */
function buildPrimaryRows(): ButtonColourTableRow[] {
  return [
    row('Default', 'Container', 'background-colour', tokenTag('global', 'colorPrimary')),
    row('Default', 'Label', 'text-colour', tokenTag('global', 'primaryColor')),
    row('Hover', 'Container', 'background-colour', tokenTag('global', 'colorPrimaryHover')),
    row('Pressed', 'Container', 'background-colour', tokenTag('global', 'colorPrimaryActive')),
    row('Disabled', 'Container', 'background-colour', tokenTag('global', 'colorBgContainerDisabled')),
    row('Disabled', 'Container', 'border-colour', tokenTag('component', 'borderColorDisabled')),
    row('Disabled', 'Label', 'text-colour', tokenTag('global', 'colorTextDisabled')),
    row('Danger', 'Container', 'background-colour', tokenTag('global', 'colorError')),
    row('Danger', 'Label', 'text-colour', tokenTag('component', 'dangerColor')),
  ];
}

/** Secondary — same row shape as Primary; tokens for outline type */
function buildSecondaryRows(): ButtonColourTableRow[] {
  return [
    row('Default', 'Container', 'background-colour', tokenTag('component', 'defaultBg')),
    row('Default', 'Container', 'border-colour', tokenTag('component', 'defaultBorderColor')),
    row('Default', 'Label', 'text-colour', tokenTag('component', 'defaultColor')),
    row('Hover', 'Container', 'border-colour', tokenTag('global', 'colorPrimaryBorder')),
    row('Hover', 'Label', 'text-colour', tokenTag('global', 'colorPrimaryHover')),
    row('Pressed', 'Container', 'border-colour', tokenTag('global', 'colorPrimaryActive')),
    row('Pressed', 'Label', 'text-colour', tokenTag('global', 'colorPrimaryActive')),
    row('Disabled', 'Container', 'background-colour', tokenTag('global', 'colorBgContainerDisabled')),
    row('Disabled', 'Container', 'border-colour', tokenTag('component', 'borderColorDisabled')),
    row('Disabled', 'Label', 'text-colour', tokenTag('global', 'colorTextDisabled')),
    row('Danger', 'Container', 'border-colour', tokenTag('global', 'colorError')),
    row('Danger', 'Label', 'text-colour', tokenTag('global', 'colorError')),
  ];
}

/** Tertiary — ghost type; hover/pressed are container background only */
function buildTertiaryRows(): ButtonColourTableRow[] {
  return [
    row('Default', 'Container', 'background-colour', tokenTag('component', 'ghostBg')),
    row('Default', 'Label', 'text-colour', tokenTag('global', 'colorPrimary')),
    row('Hover', 'Container', 'background-colour', tokenTag('component', 'textHoverBg')),
    row('Pressed', 'Container', 'background-colour', tokenTag('global', 'colorBgTextActive')),
    row('Disabled', 'Container', 'background-colour', tokenTag('component', 'ghostBg')),
    row('Disabled', 'Label', 'text-colour', tokenTag('global', 'colorTextDisabled')),
    row('Danger', 'Label', 'text-colour', tokenTag('global', 'colorError')),
  ];
}

export type ButtonColourCanvasState = 'default' | 'hover' | 'pressed' | 'disabled' | 'danger';

export const BUTTON_COLOUR_CANVAS_STATES: {
  id: ButtonColourCanvasState;
  label: string;
}[] = [
  { id: 'default', label: 'Default' },
  { id: 'hover', label: 'Hover' },
  { id: 'pressed', label: 'Pressed' },
  { id: 'disabled', label: 'Disabled' },
  { id: 'danger', label: 'Danger' },
];
