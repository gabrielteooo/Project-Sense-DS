import globalFilters from '../../content/get-started/state-persistence-global-filters.json';
import { StatePersistenceTopicContent } from '../components/get-started/StatePersistenceTopicContent';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

/** Get started — State persistence / Global filter (Figma 135:10497) */
export function StatePersistenceGlobalFiltersPage() {
  return (
    <article className="get-started-page state-persistence-topic-page">
      <HandbookPageHeader
        title={globalFilters.pageTitle}
        description={globalFilters.pageDescription}
      />
      <StatePersistenceTopicContent section={globalFilters.section} />
    </article>
  );
}
