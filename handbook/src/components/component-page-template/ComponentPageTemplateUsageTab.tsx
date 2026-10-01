import type { ComponentPageUsageTab } from '../../types/componentPageTemplate';
import { SafeRichText } from '../../doc-blocks/safeRichText';
import { ComponentPageFigureSectionView } from './ComponentPageFigureSectionView';

const SECTION_GAP = 32;

type Props = {
  tab: ComponentPageUsageTab;
};

/** Fixed headings: Guideline, Usage; divider; then dynamic figure sections. */
export function ComponentPageTemplateUsageTab({ tab }: Props) {
  return (
    <div className="component-doc-tab component-doc-usage-tab component-page-template component-page-template--usage">
      <section className="component-doc-section component-doc-usage-section">
        <h2 className="colours-overview-section__title">Guideline</h2>
        <SafeRichText body={tab.guidelineRichText} format="markdown" />
      </section>

      <section
        className="component-doc-section component-doc-usage-section"
        style={{ marginTop: SECTION_GAP }}
      >
        <h2 className="colours-overview-section__title">Usage</h2>
        <SafeRichText body={tab.usageRichText} format="markdown" />
      </section>

      <hr className="component-doc-usage-divider" />

      {tab.sections.map((section, index) => (
        <ComponentPageFigureSectionView
          key={section.id}
          section={section}
          marginTop={index === 0 ? SECTION_GAP : 32}
        />
      ))}
    </div>
  );
}
