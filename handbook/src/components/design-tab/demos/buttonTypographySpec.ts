/** Typography specification table — Figma 251:10769 */

export type ButtonTypographyTableRow = {
  size: string;
  element: string;
  fontSizeLineHeight: string;
  fontWeight: string;
  tokenLabel: string;
};

export const BUTTON_TYPOGRAPHY_TABLE_ROWS: ButtonTypographyTableRow[] = [
  {
    size: 'Base',
    element: 'Button Label',
    fontSizeLineHeight: '16 / 24',
    fontWeight: 'Regular / 400',
    tokenLabel: 'Base/Normal',
  },
  {
    size: 'Small',
    element: 'Button Label',
    fontSizeLineHeight: '14 / 22',
    fontWeight: 'Regular / 400',
    tokenLabel: 'Base/Normal',
  },
  {
    size: 'X-Small',
    element: 'Button Label',
    fontSizeLineHeight: '14 / 22',
    fontWeight: 'Regular / 400',
    tokenLabel: 'Base/Normal',
  },
];
