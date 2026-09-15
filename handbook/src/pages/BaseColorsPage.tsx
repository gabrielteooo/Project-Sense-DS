import baseColors from '../../content/foundation/base-colors.json';
import { BaseColourTable } from '../components/foundation/BaseColourTable';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';
import { HANDBOOK_SHELL } from '../figma/metrics';

const PAGE_DESCRIPTION = [
  'Base colours form the core, foundational palette of the FMS design system. They are fixed, non-semantic hex scales that serve as the building blocks for the entire system, living under Colours / Base in design tokens and powering all role-based UI colours (like primary, error, and text) through aliases.',
  'The palette consists of 12 distinct colour ramps named using the Ant Design naming convention (e.g., Cyan_Ant, Green_Ant, Red_Ant). Each ramp contains 10 steps numbered from 1 to 10 in order of increasing darkness',
];

export function BaseColorsPage() {
  return (
    <article className="base-colours-page">
      <HandbookPageHeader title="Base colour" description={PAGE_DESCRIPTION} />

      <section className="base-colours-section">
        <h2 className="base-colours-section__title">Primary colour tokens</h2>

        {baseColors.palettes.map((palette, index) => (
          <div
            key={palette.id}
            className="base-palette"
            style={
              index > 0 ? { marginTop: HANDBOOK_SHELL.paletteSectionGapPx } : undefined
            }
          >
            <h4 className="base-palette__title">{palette.id}</h4>
            <BaseColourTable steps={palette.steps} paletteId={palette.id} />
          </div>
        ))}
      </section>
    </article>
  );
}
