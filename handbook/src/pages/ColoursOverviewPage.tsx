import coloursOverview from '../../content/foundation/colours-overview.json';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

const SECTION_GAP_PX = 40;

/** Colours — Overview (Figma 91:1820) */
export function ColoursOverviewPage() {
  return (
    <article className="foundation-colours-page">
      <HandbookPageHeader
        title="Overview"
        description={coloursOverview.pageDescription}
      />

      <section className="colours-overview-principles">
        <h2 className="colours-overview-section__title">Principles:</h2>
        <ol className="colours-overview-principles__list">
          {coloursOverview.principles.map((principle) => (
            <li key={principle.title} className="colours-overview-principles__item">
              <p className="colours-overview-principles__item-title">{principle.title}</p>
              <p className="colours-overview-principles__item-body">{principle.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="colours-overview-guidelines"
        style={{ marginTop: SECTION_GAP_PX }}
      >
        <h2 className="colours-overview-section__title">Guidelines</h2>
        <ul className="colours-overview-guidelines__list">
          {coloursOverview.guidelines.map((item) => (
            <li key={item.title} className="colours-overview-guidelines__item">
              <p className="colours-overview-guidelines__item-title">{item.title}</p>
              <p className="colours-overview-guidelines__item-body">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
