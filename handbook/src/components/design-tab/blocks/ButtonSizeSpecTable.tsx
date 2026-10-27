import type { ButtonSizeTableRow } from '../demos/buttonSizeSpec';

type Props = {
  rows: ButtonSizeTableRow[];
};

/** Size specification table — Size, Property, Value. Figma 251:10041 */
export function ButtonSizeSpecTable({ rows }: Props) {
  if (rows.length === 0) {
    return null;
  }

  return (
    <div className="design-tab-table-block base-colour-table-wrap button-size-spec-table-wrap">
      <table className="base-colour-table handbook-doc-table button-size-spec-table">
        <thead>
          <tr>
            <th scope="col">Size</th>
            <th scope="col">Property</th>
            <th scope="col">Value</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
