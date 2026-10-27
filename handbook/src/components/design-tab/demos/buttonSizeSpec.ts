/** Size specification table — Figma 251:10041 */

export type ButtonSizeTableRow = {
  size: string;
  sizeRowSpan?: number;
  property: string;
  value: string;
};

export const BUTTON_SIZE_TABLE_ROWS: ButtonSizeTableRow[] = [
  { size: 'Base', sizeRowSpan: 3, property: 'height', value: '40px' },
  { size: '', property: 'min-width', value: '55px' },
  { size: '', property: 'border-radius', value: '8px' },
  { size: 'Small', sizeRowSpan: 3, property: 'height', value: '32px' },
  { size: '', property: 'min-width', value: '44px' },
  { size: '', property: 'border-radius', value: '6px' },
  { size: 'X-Small', sizeRowSpan: 3, property: 'height', value: '24px' },
  { size: '', property: 'min-width', value: '40px' },
  { size: '', property: 'border-radius', value: '4px' },
];
