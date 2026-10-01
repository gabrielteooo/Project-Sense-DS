import { HandbookDocTable } from '../foundation/HandbookDocTable';
import type { ComponentPageDesignTab } from '../../types/componentPageTemplate';
import { SafeRichText } from '../../doc-blocks/safeRichText';
import { ComponentPageFigureSectionView } from './ComponentPageFigureSectionView';
import { ComponentPageImageView } from './ComponentPageImageView';

const SECTION_GAP = 40;

type Props = {
  tab: ComponentPageDesignTab;
};

/** Fixed headings: Anatomy, then dynamic sections, then Specification guidelines. */
export function ComponentPageTemplateDesignTab({ tab }: Props) {
  const spec = tab.specificationGuidelines;

  return (
    <div className="component-doc-tab component-page-template component-page-template--design">
      <section className="component-doc-section">
        <h2 className="component-doc-h2">Anatomy</h2>
        <ComponentPageImageView image={tab.anatomyImage} />
        {tab.anatomyRichText?.trim() ? (
          <SafeRichText
            body={tab.anatomyRichText}
            format="markdown"
            className="component-page-template__anatomy-rich-text"
          />
        ) : null}
      </section>

      {tab.sections.map((section, index) => (
        <ComponentPageFigureSectionView
          key={section.id}
          section={section}
          marginTop={index === 0 ? SECTION_GAP : 32}
        />
      ))}

      <section
        className="component-doc-section component-page-template__spec-guidelines"
        style={{ marginTop: SECTION_GAP }}
      >
        <h2 className="component-doc-h2">Specification guidelines</h2>
        {spec.description?.trim() ? (
          <p className="component-doc-section__body">{spec.description}</p>
        ) : null}
        <HandbookDocTable columns={spec.table.columns} rows={spec.table.rows} />
      </section>
    </div>
  );
}
