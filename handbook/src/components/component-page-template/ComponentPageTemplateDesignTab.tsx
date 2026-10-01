import type { ReactNode } from 'react';
import type { ComponentPageDesignTab } from '../../types/componentPageTemplate';
import { SafeRichText } from '../../doc-blocks/safeRichText';
import { ComponentPageFigureSectionView } from './ComponentPageFigureSectionView';
import { ComponentPageImageView } from './ComponentPageImageView';

const SECTION_GAP = 40;

type Props = {
  tab: ComponentPageDesignTab;
  /** Optional coded sections rendered after CMS figure blocks (e.g. specification guidelines). */
  codedAfterSections?: ReactNode;
};

/** Fixed heading: Anatomy, then CMS figure sections. */
export function ComponentPageTemplateDesignTab({ tab, codedAfterSections }: Props) {
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

      {codedAfterSections}
    </div>
  );
}
