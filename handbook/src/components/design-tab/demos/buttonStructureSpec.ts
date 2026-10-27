/** Structure specification table — Figma 246:8057 */

export type ButtonStructureTableRow = {
  size: string;
  /** When set, renders a rowspan on the Size cell (continuation rows omit size text). */
  sizeRowSpan?: number;
  property: string;
  value: string;
  /** Token pill label; use em dash for Figma “-”. */
  tokenLabel: string;
};

export const BUTTON_STRUCTURE_TABLE_ROWS: ButtonStructureTableRow[] = [
  {
    size: 'Base Button',
    sizeRowSpan: 2,
    property: 'padding-left, padding-right',
    value: '16px',
    tokenLabel: 'Button/paddingInlineLG',
  },
  {
    size: '',
    property: 'spacing',
    value: '8px',
    tokenLabel: 'Button/marginXS',
  },
  {
    size: 'Small Button',
    sizeRowSpan: 2,
    property: 'padding-left, padding-right',
    value: '12px',
    tokenLabel: 'Button/paddingInlineSM',
  },
  {
    size: '',
    property: 'spacing',
    value: '8px',
    tokenLabel: 'Button/marginXS',
  },
  {
    size: 'X-Small',
    sizeRowSpan: 2,
    property: 'padding-left, padding-right',
    value: '8px',
    tokenLabel: 'Button/paddingInlineXS',
  },
  {
    size: '',
    property: 'spacing',
    value: '8px',
    tokenLabel: 'Button/marginXS',
  },
];
