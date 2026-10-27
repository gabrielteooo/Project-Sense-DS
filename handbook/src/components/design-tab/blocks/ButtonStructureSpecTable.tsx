import { Tag } from '../../ui/Tag';
import type { ButtonStructureTableRow } from '../demos/buttonStructureSpec';

type Props = {
  rows: ButtonStructureTableRow[];
};

/** Structure specification table — Size, Property, Value, Token. Figma 246:8057 */
export function ButtonStructureSpecTable({ rows }: Props) {
  if (rows.length === 0) {
    return null;
  }

  return (
    <div className="design-tab-table-block base-colour-table-wrap button-structure-spec-table-wrap">
      <table className="base-colour-table handbook-doc-table button-structure-spec-table">
        <colgroup>
          <col className="button-structure-spec-table__col--size" />
          <col className="button-structure-spec-table__col--property" />
          <col className="button-structure-spec-table__col--value" />
          <col className="button-structure-spec-table__col--token" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">Size</th>
            <th scope="col">Property</th>
            <th scope="col">Value</th>
            <th scope="col">Token</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.size}-${row.property}-${index}`}>
              {row.sizeRowSpan ? (
                <td rowSpan={row.sizeRowSpan}>{row.size}</td>
              ) : row.size ? (
                <td>{row.size}</td>
              ) : null}
              <td>{row.property}</td>
              <td>{row.value}</td>
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
