import { Tag } from '../ui/Tag';
import { hexForBaseColorSlug } from '../../utils/baseColorHex';

export type SemanticColourTokenRow = {
  token: string;
  value: string;
  description: string;
  /** When value is not a base ramp slug (e.g. control tokens). */
  swatchHex?: string;
};

type Props = {
  rows: SemanticColourTokenRow[];
};

/** Semantic colour token reference — Token, Value, Description */
export function SemanticColourTokenTable({ rows }: Props) {
  return (
    <div className="base-colour-table-wrap">
      <table className="base-colour-table semantic-colour-token-table">
        <colgroup>
          <col className="base-colour-table__col semantic-colour-token-table__col--token" />
          <col className="base-colour-table__col semantic-colour-token-table__col--value" />
          <col className="semantic-colour-token-table__col--description" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">Token</th>
            <th scope="col">Value</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.token}-${index}`}>
              <td>
                <code>{row.token}</code>
              </td>
              <td>
                <Tag swatchHex={row.swatchHex ?? hexForBaseColorSlug(row.value)}>
                  {row.value}
                </Tag>
              </td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
