import systemColors from '../../content/foundation/system-colors.json';
import { SemanticColourTokenTable } from '../components/foundation/SemanticColourTokenTable';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';
import { HANDBOOK_SHELL } from '../figma/metrics';

const PAGE_DESCRIPTION =
  'System colours include functional colours to represent various statuses of our design system elements, including success, warning, error, information, link and control.';

/** System colour — semantic functional tokens. */
export function SystemColorsPage() {
  return (
    <article className="foundation-colours-page">
      <HandbookPageHeader title="System colour" description={PAGE_DESCRIPTION} />

      <section className="base-colours-section">
        <h2 className="base-colours-section__title">Colour tokens</h2>

        {systemColors.sections.map((section, index) => (
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
