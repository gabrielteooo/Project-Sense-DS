import type { CSSProperties } from 'react';
import { Tag } from '../ui/Tag';

export type TextStyleTableRow = {
  styleLabel: string;
  figmaToken: string;
  sizeLineHeight: string;
  usage: string;
  cssSlug: string;
};

type Props = {
  rows: TextStyleTableRow[];
};

function sampleStyle(slug: string): CSSProperties {
  const base: CSSProperties = {
    fontFamily: 'var(--fms-typography-font-inter, Inter), system-ui, sans-serif',
    fontSize: `var(--fms-text-${slug}-font-size)`,
    lineHeight: `var(--fms-text-${slug}-line-height)`,
    fontWeight: `var(--fms-text-${slug}-font-weight, 400)`,
    color: 'var(--fms-colors-neutral-text-color-text, rgba(0, 0, 0, 0.88))',
    margin: 0,
  };

  return {
    ...base,
    fontStyle: `var(--fms-text-${slug}-font-style, normal)` as CSSProperties['fontStyle'],
    textDecoration: `var(--fms-text-${slug}-text-decoration, none)` as CSSProperties['textDecoration'],
  };
}

/** Figma Text styles reference table — Style, Size / Line height, Usage, Figma token */
export function TextStyleTable({ rows }: Props) {
  return (
    <div className="base-colour-table-wrap">
      <table className="base-colour-table text-style-table">
        <colgroup>
          <col className="text-style-table__col--style" />
          <col className="text-style-table__col--size" />
          <col className="text-style-table__col--usage" />
          <col className="text-style-table__col--token" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">Style</th>
            <th scope="col">Size / Line height</th>
            <th scope="col">Usage</th>
            <th scope="col">Figma token</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.figmaToken}>
              <td>
                <p className="text-style-table__sample" style={sampleStyle(row.cssSlug)}>
                  {row.styleLabel}
                </p>
              </td>
              <td>
                <code>{row.sizeLineHeight}</code>
              </td>
              <td>{row.usage}</td>
              <td>
                <Tag>{row.figmaToken}</Tag>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
