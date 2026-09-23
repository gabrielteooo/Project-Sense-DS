import elevationShadow from '../../content/foundation/elevation-shadow.json';
import { ShadowTokenTable } from '../components/foundation/ShadowTokenTable';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

const SECTION_GAP_PX = 40;

/** Elevation — Shadow (Figma 113:3026) */
export function ElevationShadowPage() {
  return (
    <article className="foundation-elevation-page">
      <HandbookPageHeader
        title="Shadow"
        description={elevationShadow.pageDescription}
      />

      <section className="elevation-shadow-section">
        <h2 className="colours-overview-section__title">{elevationShadow.sectionTitle}</h2>
        <ShadowTokenTable rows={elevationShadow.rows} />
      </section>

      <p className="elevation-shadow-footnote" style={{ marginTop: SECTION_GAP_PX }}>
        {elevationShadow.footnote}
      </p>
    </article>
  );
}
