import neutralColors from '../../content/foundation/neutral-colors.json';
import { SemanticColourTokenTable } from '../components/foundation/SemanticColourTokenTable';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';
import { HANDBOOK_SHELL } from '../figma/metrics';

const PAGE_DESCRIPTION =
  'These colour palettes include a range of hues dedicated to representing the text, icon, background, border, and fill colours, each accounting for various states.';

/** Neutral colour — text, icon, background, border, and fill tokens. */
export function NeutralColorsPage() {
  return (
    <article className="foundation-colours-page">
      <HandbookPageHeader title="Neutral colour" description={PAGE_DESCRIPTION} />

      <section className="base-colours-section">
        <h2 className="base-colours-section__title">Colour tokens</h2>

        {neutralColors.sections.map((section, index) => (
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
