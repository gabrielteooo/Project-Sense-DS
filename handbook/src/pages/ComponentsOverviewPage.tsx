import { Link } from 'react-router-dom';
import overview from '../../content/components/components-overview.json';
import { ComponentOverviewPreview } from '../components/components/ComponentOverviewPreview';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';
import { COMPONENT_CATALOG, componentHref } from '../config/componentsRegistry';

export function ComponentsOverviewPage() {
  return (
    <article className="components-overview-page">
      <HandbookPageHeader
        title={overview.pageTitle}
        description={overview.pageDescription}
      />

      <section className="components-overview__content" aria-label="Component library">
        <div className="components-overview__grid">
          {COMPONENT_CATALOG.map((entry) => {
            const documented = entry.documented === true;
            const card = (
              <>
                <div className="component-overview-card__head">
                  <span className="component-overview-card__title">{entry.label}</span>
                </div>
                <div className="component-overview-card__body">
                  <ComponentOverviewPreview slug={entry.slug} />
                </div>
              </>
            );

            if (!documented) {
              return (
                <div
                  key={entry.id}
                  className="component-overview-card component-overview-card--soon"
                  aria-disabled="true"
                  title="Documentation in progress"
                >
                  {card}
                </div>
              );
            }

            return (
              <Link
                key={entry.id}
                to={componentHref(entry.slug)}
                className="component-overview-card"
              >
                {card}
              </Link>
            );
          })}
        </div>
      </section>
    </article>
  );
}
