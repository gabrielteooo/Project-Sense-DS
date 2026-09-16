import { handbookTokenSlug } from '../../utils/tokenDisplay';
import { ContrastBadge } from './ContrastBadge';
import { PreviewSwatch } from './PreviewSwatch';

export type TableStep = {
  step: number;
  hex: string;
  token: string;
  cssVar: string;
  paletteId: string;
};

type Props = {
  steps: Omit<TableStep, 'paletteId'>[];
  paletteId: string;
};

/** Figma Base colour table 1:10488 */
export function BaseColourTable({ steps, paletteId }: Props) {
  return (
    <div className="base-colour-table-wrap">
      <table className="base-colour-table">
        <colgroup>
          <col className="base-colour-table__col base-colour-table__col--token" />
          <col className="base-colour-table__col base-colour-table__col--css-var" />
          <col className="base-colour-table__col base-colour-table__col--hex" />
          <col className="base-colour-table__col base-colour-table__col--contrast" />
          <col className="base-colour-table__col base-colour-table__col--preview" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">Token</th>
            <th scope="col">CSS variable</th>
            <th scope="col">Hex</th>
            <th scope="col">Contrast</th>
            <th scope="col">Preview</th>
          </tr>
        </thead>
        <tbody>
          {steps.map((s) => (
            <tr key={s.step}>
              <td>
                <code>{handbookTokenSlug(paletteId, s.step)}</code>
              </td>
              <td>
                <code>{s.cssVar}</code>
              </td>
              <td>
                <code>{s.hex}</code>
              </td>
              <td>
                <ContrastBadge hex={s.hex} />
              </td>
              <td>
                <PreviewSwatch hex={s.hex} step={s.step} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
