import brandColors from '../../content/foundation/brand-colors.json';
import { SemanticColourTokenTable } from '../components/foundation/SemanticColourTokenTable';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';
import { HANDBOOK_SHELL } from '../figma/metrics';

const PAGE_DESCRIPTION = [
  'The primary colour in our design system serves as the cornerstone of our visual identity, providing a cohesive and recognisable aesthetic across all touch points. It is chosen for its versatility and neutrality, ensuring it complements the individual service colours while maintaining a unified brand presence. This primary colour helps to establish consistency, enhance brand recall, and create a harmonious user experience.',
  'Cyan, is a dynamic mix of green and blue, evokes psychological associations with energy, rationality and openness. It inherently embodies our brand values of collaboration, confidence and efficiency, qualities we want our FMS users to resonate with.',
];

/** Brand colour — page header (content tables to follow). */
export function BrandColorsPage() {
  return (
    <article className="foundation-colours-page">
      <HandbookPageHeader title="Brand colour" description={PAGE_DESCRIPTION} />

      <section className="base-colours-section">
        <h2 className="base-colours-section__title">Colour tokens</h2>

        {brandColors.sections.map((section, index) => (
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
