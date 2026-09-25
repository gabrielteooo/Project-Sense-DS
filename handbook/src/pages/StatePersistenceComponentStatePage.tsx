import componentState from '../../content/get-started/state-persistence-component-state.json';
import { StatePersistenceTopicContent } from '../components/get-started/StatePersistenceTopicContent';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

/** Get started — State persistence / Component state (Figma 142:15219) */
export function StatePersistenceComponentStatePage() {
  return (
    <article className="get-started-page state-persistence-topic-page">
      <HandbookPageHeader
        title={componentState.pageTitle}
        description={componentState.pageDescription}
      />
      <StatePersistenceTopicContent section={componentState.section} />
    </article>
  );
}
