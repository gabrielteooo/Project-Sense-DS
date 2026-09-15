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
        <thead>
          <tr>
            <th scope="col">Preview</th>
            <th scope="col">Hex</th>
            <th scope="col">Contrast</th>
            <th scope="col">Token</th>
            <th scope="col">CSS variable</th>
          </tr>
        </thead>
        <tbody>
          {steps.map((s) => (
            <tr key={s.step}>
              <td>
                <PreviewSwatch hex={s.hex} step={s.step} />
              </td>
              <td>
                <code>{s.hex}</code>
              </td>
              <td>
                <ContrastBadge hex={s.hex} />
              </td>
              <td>
                <code>{handbookTokenSlug(paletteId, s.step)}</code>
              </td>
              <td>
                <code>{s.cssVar}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
