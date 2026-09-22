import spacing from '../../content/foundation/spacing.json';
import { SpacingTokenTable } from '../components/foundation/SpacingTokenTable';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

const SECTION_GAP_PX = 40;

/** Spacing — Overview (Figma 91:539) */
export function SpacingOverviewPage() {
  const { overview } = spacing;

  return (
    <article className="foundation-spacing-page">
      <HandbookPageHeader title="Spacing" description={overview.pageDescription} />

      <section className="spacing-principles">
        <h2 className="spacing-principles__title">Principles:</h2>
        <ol className="spacing-principles__list">
          {overview.principles.map((principle) => (
            <li key={principle.title} className="spacing-principles__item">
              <p className="spacing-principles__item-title">{principle.title}</p>
              <p className="spacing-principles__item-body">{principle.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="spacing-section" style={{ marginTop: SECTION_GAP_PX }}>
        <h2 className="text-system-section__title">{overview.sizeScale.title}</h2>
        <SpacingTokenTable tableType="visual" rows={overview.sizeScale.rows} />
      </section>
    </article>
  );
}
