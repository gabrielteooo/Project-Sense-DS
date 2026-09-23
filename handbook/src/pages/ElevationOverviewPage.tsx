import elevationOverview from '../../content/foundation/elevation-overview.json';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

const SECTION_GAP_PX = 40;

/** Elevation — Overview (Figma 112:2095) */
export function ElevationOverviewPage() {
  const { shadow, opacities } = elevationOverview;

  return (
    <article className="foundation-elevation-page">
      <HandbookPageHeader
        title="Overview"
        description={elevationOverview.pageDescription}
      />

      <section className="colours-overview-principles">
        <h2 className="colours-overview-section__title">Principles:</h2>
        <ol className="colours-overview-principles__list">
          {elevationOverview.principles.map((principle) => (
            <li key={principle.title} className="colours-overview-principles__item">
              <p className="colours-overview-principles__item-title">{principle.title}</p>
              <p className="colours-overview-principles__item-body">{principle.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="elevation-overview-section"
        style={{ marginTop: SECTION_GAP_PX }}
      >
        <h2 className="elevation-overview-section__title">{shadow.title}</h2>
        <p className="elevation-overview-section__body">{shadow.body}</p>
        <div className="elevation-shadow-showcase" aria-hidden>
          {shadow.levels.map((level) => (
            <div
              key={level.id}
              className="elevation-shadow-tile"
              style={{ boxShadow: `var(${level.tokenVar})` }}
            />
          ))}
        </div>
      </section>

      <section
        className="elevation-overview-section"
        style={{ marginTop: SECTION_GAP_PX }}
      >
        <h2 className="elevation-overview-section__title">{opacities.title}</h2>
        <p className="elevation-overview-section__body">{opacities.body}</p>
        <div className="elevation-opacity-showcase" aria-hidden>
          <div className="elevation-opacity-modal" />
        </div>
      </section>
    </article>
  );
}
