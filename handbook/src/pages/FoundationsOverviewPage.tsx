import { Link } from 'react-router-dom';
import foundationsOverview from '../../content/foundation/foundations-overview.json';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

/** Foundations landing — widget grid (Figma 136:12296) */
export function FoundationsOverviewPage() {
  return (
    <article className="foundations-landing-page">
      <HandbookPageHeader
        title={foundationsOverview.pageTitle}
        description={foundationsOverview.pageDescription}
        variant="landing"
      />

      <section className="foundations-landing__grid-section" aria-label="Foundation topics">
        <div className="foundations-landing__grid">
          {foundationsOverview.widgets.map((widget) => (
            <Link
              key={widget.id}
              to={widget.href}
              className="foundations-landing-widget"
            >
              <span className="foundations-landing-widget__icon-wrap" aria-hidden>
                <i className={`${widget.iconClass} foundations-landing-widget__icon`} />
              </span>
              <span className="foundations-landing-widget__label">{widget.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
