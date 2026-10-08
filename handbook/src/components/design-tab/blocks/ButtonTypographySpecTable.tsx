import { Tag } from '../../ui/Tag';
import type { ButtonTypographyTableRow } from '../demos/buttonTypographySpec';

type Props = {
  rows: ButtonTypographyTableRow[];
};

/** Typography specification — Size, Element, Font size, Font weight, Token. Figma 251:10769 */
export function ButtonTypographySpecTable({ rows }: Props) {
  if (rows.length === 0) {
    return null;
  }

  return (
    <div className="design-tab-table-block base-colour-table-wrap button-typography-spec-table-wrap">
      <table className="base-colour-table handbook-doc-table button-typography-spec-table">
        <colgroup>
          <col className="button-typography-spec-table__col--size" />
          <col className="button-typography-spec-table__col--element" />
          <col className="button-typography-spec-table__col--font-size" />
          <col className="button-typography-spec-table__col--font-weight" />
          <col className="button-typography-spec-table__col--token" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">Size</th>
            <th scope="col">Element</th>
            <th scope="col">Font size (px)</th>
            <th scope="col">Font weight</th>
            <th scope="col">Token</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.size}-${index}`}>
              <td>{row.size}</td>
              <td>{row.element}</td>
              <td>{row.fontSizeLineHeight}</td>
              <td>{row.fontWeight}</td>
              <td>
                <Tag>{row.tokenLabel}</Tag>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
