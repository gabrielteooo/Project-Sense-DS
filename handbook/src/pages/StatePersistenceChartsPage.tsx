import charts from '../../content/get-started/state-persistence-charts.json';
import { StatePersistenceTopicContent } from '../components/get-started/StatePersistenceTopicContent';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

/** Get started — State persistence / Charts (Figma 142:14705) */
export function StatePersistenceChartsPage() {
  return (
    <article className="get-started-page state-persistence-topic-page">
      <HandbookPageHeader
        title={charts.pageTitle}
        description={charts.pageDescription}
      />
      <StatePersistenceTopicContent section={charts.section} />
    </article>
  );
}
