import table from '../../content/get-started/state-persistence-table.json';
import { StatePersistenceTopicContent } from '../components/get-started/StatePersistenceTopicContent';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

/** Get started — State persistence / Table (Figma 142:15069) */
export function StatePersistenceTablePage() {
  return (
    <article className="get-started-page state-persistence-topic-page">
      <HandbookPageHeader title={table.pageTitle} description={table.pageDescription} />
      <StatePersistenceTopicContent section={table.section} />
    </article>
  );
}
