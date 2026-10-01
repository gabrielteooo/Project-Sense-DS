import { HandbookDocTable } from '../foundation/HandbookDocTable';
import { SafeRichText } from '../../doc-blocks/safeRichText';
import type { ComponentPageUpdatesTab } from '../../types/componentPageTemplate';

const SECTION_GAP = 40;

type Props = {
  tab: ComponentPageUpdatesTab;
};

/** Fixed headings: Updates (table), Roadmap (rich text). */
export function ComponentPageTemplateUpdatesTab({ tab }: Props) {
  return (
    <div className="component-doc-tab component-page-template component-page-template--updates">
      <section className="component-doc-section">
        <h2 className="colours-overview-section__title">Updates</h2>
        <HandbookDocTable columns={tab.changelog.columns} rows={tab.changelog.rows} />
      </section>

      <section className="component-doc-section" style={{ marginTop: SECTION_GAP }}>
        <h2 className="colours-overview-section__title">Roadmap</h2>
        <SafeRichText body={tab.roadmapRichText} format="markdown" />
      </section>
    </div>
  );
}
