import { Tag } from '../ui/Tag';

export type SpacingTokenBadge = {
  label: string;
  variant?: 'default' | 'primary';
};

export type SpacingVisualRow = {
  figmaTokens: SpacingTokenBadge[];
  pxLabel: string;
  visualWidthPx: number;
};

export type SpacingAliasRow = {
  figmaTokens: SpacingTokenBadge[];
  pxLabel: string;
  aliasToken: string;
};

type Props =
  | { tableType: 'visual'; rows: SpacingVisualRow[] }
  | { tableType: 'alias'; rows: SpacingAliasRow[] };

function TokenBadges({ tokens }: { tokens: SpacingTokenBadge[] }) {
  return (
    <div className="spacing-token-table__badges">
      {tokens.map((token) => (
        <Tag key={token.label} variant={token.variant ?? 'default'}>
          {token.label}
        </Tag>
      ))}
    </div>
  );
}

function VisualBar({ widthPx }: { widthPx: number }) {
  return (
    <span
      className="spacing-token-table__visual"
      style={{ width: widthPx }}
      aria-hidden
    />
  );
}

/** Spacing reference — Figma token, px, Visual or Alias token */
export function SpacingTokenTable({ tableType, rows }: Props) {
  const thirdColumn = tableType === 'visual' ? 'Visual' : 'Alias token';

  return (
    <div className="base-colour-table-wrap">
      <table className="base-colour-table spacing-token-table">
        <colgroup>
          <col className="spacing-token-table__col--token" />
          <col className="spacing-token-table__col--px" />
          <col className="spacing-token-table__col--third" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">Figma token</th>
            <th scope="col">px</th>
            <th scope="col">{thirdColumn}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.figmaTokens.map((t) => t.label).join('|') + row.pxLabel}>
              <td>
                <TokenBadges tokens={row.figmaTokens} />
              </td>
              <td>
                <code>{row.pxLabel}</code>
              </td>
              <td>
                {tableType === 'visual' ? (
                  <VisualBar widthPx={(row as SpacingVisualRow).visualWidthPx} />
                ) : (
                  <Tag>{(row as SpacingAliasRow).aliasToken}</Tag>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
