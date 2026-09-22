import spacing from '../../content/foundation/spacing.json';
import { SpacingTokenTable } from '../components/foundation/SpacingTokenTable';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

/** Spacing — Padding (Figma 91:1701) */
export function SpacingPaddingPage() {
  const { padding } = spacing;

  return (
    <article className="foundation-spacing-page">
      <HandbookPageHeader title="Padding" description={padding.pageDescription} />

      <section className="spacing-section">
        <h2 className="text-system-section__title">{padding.sectionTitle}</h2>
        <SpacingTokenTable tableType="alias" rows={padding.rows} />
      </section>
    </article>
  );
}
