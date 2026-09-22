import type { CSSProperties } from 'react';
import { Tag } from '../ui/Tag';

export type TextSystemTableRow =
  | {
      previewType: 'text';
      previewText: string;
      value: string;
      figmaToken: string;
      cssVar: string;
    }
  | {
      previewType: 'scale';
      fontSizePx: number;
      value: string;
      figmaToken: string;
      cssVar: string;
    }
  | {
      previewType: 'weight';
      fontWeight: number;
      value: string;
      figmaToken: string;
      cssVar: string;
    };

type Props = {
  rows: TextSystemTableRow[];
};

const previewFontFamily =
  'var(--fms-typography-font-inter, Inter), system-ui, sans-serif';

function previewStyle(row: TextSystemTableRow): CSSProperties {
  const base: CSSProperties = {
    margin: 0,
    fontFamily: previewFontFamily,
    color: 'var(--fms-colors-neutral-text-color-text, rgba(0, 0, 0, 0.88))',
  };

  if (row.previewType === 'text') {
    return {
      ...base,
      fontSize: 'var(--fms-typography-font-size-base, 16px)',
      lineHeight: 'var(--fms-typography-line-height-base, 24px)',
      fontWeight: 400,
    };
  }
  if (row.previewType === 'scale') {
    return {
      ...base,
      fontSize: `${row.fontSizePx}px`,
      lineHeight: 1,
      fontWeight: 400,
    };
  }
  return {
    ...base,
    fontSize: 'var(--fms-typography-font-size-base, 16px)',
    lineHeight: 'var(--fms-typography-line-height-base, 24px)',
    fontWeight: row.fontWeight,
  };
}

function previewContent(row: TextSystemTableRow): string {
  if (row.previewType === 'text') return row.previewText;
  return 'Ag';
}

/** Figma Text system — Figma token, Value, Preview */
export function TextSystemTokenTable({ rows }: Props) {
  return (
    <div className="base-colour-table-wrap">
      <table className="base-colour-table text-system-table">
        <colgroup>
          <col className="text-system-table__col--token" />
          <col className="text-system-table__col--value" />
          <col className="text-system-table__col--preview" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">Figma token</th>
            <th scope="col">Value</th>
            <th scope="col">Preview</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.figmaToken}>
              <td>
                <Tag>{row.figmaToken}</Tag>
              </td>
              <td>
                <code>{row.value}</code>
              </td>
              <td>
                <p className="text-system-table__preview" style={previewStyle(row)}>
                  {previewContent(row)}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
