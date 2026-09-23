import { Tag } from '../ui/Tag';

export type ShadowTokenTableRow = {
  styleToken: string;
  valueLines: string[];
  description: string;
};

type Props = {
  rows: ShadowTokenTableRow[];
};

/** Elevation shadow tokens — Figma 113:3026 */
export function ShadowTokenTable({ rows }: Props) {
  return (
    <div className="base-colour-table-wrap shadow-token-table-wrap">
      <table className="base-colour-table shadow-token-table">
        <colgroup>
          <col className="shadow-token-table__col--style" />
          <col className="shadow-token-table__col--value" />
          <col className="shadow-token-table__col--description" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">Style</th>
            <th scope="col">Value</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.styleToken}>
              <td>
                <Tag>{row.styleToken}</Tag>
              </td>
              <td>
                <div className="shadow-token-table__value">
                  {row.valueLines.map((line, index) => (
                    <p key={index} className="shadow-token-table__value-line">
                      {line}
                    </p>
                  ))}
                </div>
              </td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
