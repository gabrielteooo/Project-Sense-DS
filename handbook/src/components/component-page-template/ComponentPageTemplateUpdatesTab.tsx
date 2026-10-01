import { SafeRichText } from '../../doc-blocks/safeRichText';
import type { ComponentPageUpdatesTab } from '../../types/componentPageTemplate';

const SECTION_GAP = 40;

type Props = {
  tab: ComponentPageUpdatesTab;
};

/** Fixed headings: Updates and Roadmap (both rich text). */
export function ComponentPageTemplateUpdatesTab({ tab }: Props) {
  return (
    <div className="component-doc-tab component-page-template component-page-template--updates">
      <section className="component-doc-section">
        <h2 className="colours-overview-section__title">Updates</h2>
        <SafeRichText body={tab.changelogRichText} format="markdown" />
      </section>

      <section className="component-doc-section" style={{ marginTop: SECTION_GAP }}>
        <h2 className="colours-overview-section__title">Roadmap</h2>
        <SafeRichText body={tab.roadmapRichText} format="markdown" />
      </section>
    </div>
  );
}
