import dataColors from '../../content/foundation/data-colors.json';
import { SemanticColourTokenTable } from '../components/foundation/SemanticColourTokenTable';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';
import { HANDBOOK_SHELL } from '../figma/metrics';

const PAGE_DESCRIPTION =
  'These curated colour palettes include a range of hues dedicated to charts’ usage, and comply with WCAG AA and AAA accessibility guidelines for optimal readability and contrast.';

/** Data colour — chart palette tokens (steps 1–8 per hue). */
export function DataColorsPage() {
  return (
    <article className="foundation-colours-page">
      <HandbookPageHeader title="Data colour" description={PAGE_DESCRIPTION} />

      <section className="base-colours-section">
        <h2 className="base-colours-section__title">Colour tokens</h2>

        {dataColors.sections.map((section, index) => (
          <div
            key={section.id}
            className="colour-token-group"
            style={
              index > 0 ? { marginTop: HANDBOOK_SHELL.paletteSectionGapPx } : undefined
            }
          >
            <h3 className="colour-token-group__title">{section.title}</h3>
            <SemanticColourTokenTable rows={section.tokens} />
          </div>
        ))}
      </section>
    </article>
  );
}
