import type { ComponentPageDesignTab } from '../../types/componentPageTemplate';
import { ComponentPageFigureSectionView } from './ComponentPageFigureSectionView';
import { ComponentPageImageView } from './ComponentPageImageView';

const SECTION_GAP = 40;

type Props = {
  tab: ComponentPageDesignTab;
};

/** Fixed headings: Anatomy, Specification guidelines (per component page template). */
export function ComponentPageTemplateDesignTab({ tab }: Props) {
  return (
    <div className="component-doc-tab component-page-template component-page-template--design">
      <section className="component-doc-section">
        <h2 className="component-doc-h2">Anatomy</h2>
        <ComponentPageImageView image={tab.anatomyImage} />
      </section>

      <section className="component-doc-section" style={{ marginTop: SECTION_GAP }}>
        <h2 className="component-doc-h2">Specification guidelines</h2>
        <ComponentPageImageView image={tab.specificationGuidelinesImage} />
      </section>

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
