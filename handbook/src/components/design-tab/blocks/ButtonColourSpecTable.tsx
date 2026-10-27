import { Tag } from '../../ui/Tag';
import type { ButtonColourTableRow } from '../demos/buttonColourSpec';

type Props = {
  rows: ButtonColourTableRow[];
};

/** Colour specification table — State, Element, Property, Token (handbook Tag). Figma 246:7978 */
export function ButtonColourSpecTable({ rows }: Props) {
  if (rows.length === 0) {
    return null;
  }

  return (
    <div className="design-tab-table-block base-colour-table-wrap button-colour-spec-table-wrap">
      <table className="base-colour-table handbook-doc-table button-colour-spec-table">
        <colgroup>
          <col className="button-colour-spec-table__col--state" />
          <col className="button-colour-spec-table__col--element" />
          <col className="button-colour-spec-table__col--property" />
          <col className="button-colour-spec-table__col--token" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">State</th>
            <th scope="col">Element</th>
            <th scope="col">Property</th>
            <th scope="col">Token</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.state}-${row.element}-${row.property}-${index}`}>
              <td>{row.state}</td>
              <td>{row.element}</td>
              <td>{row.property}</td>
              <td>
                <Tag swatchHex={row.tokenTag.swatchHex}>{row.tokenTag.label}</Tag>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
