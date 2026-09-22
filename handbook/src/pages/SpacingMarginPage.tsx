import spacing from '../../content/foundation/spacing.json';
import { SpacingTokenTable } from '../components/foundation/SpacingTokenTable';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

/** Spacing — Margin (Figma 91:1117) */
export function SpacingMarginPage() {
  const { margin } = spacing;

  return (
    <article className="foundation-spacing-page">
      <HandbookPageHeader title="Margin" description={margin.pageDescription} />

      <section className="spacing-section">
        <h2 className="text-system-section__title">{margin.sectionTitle}</h2>
        <SpacingTokenTable tableType="alias" rows={margin.rows} />
      </section>
    </article>
  );
}
