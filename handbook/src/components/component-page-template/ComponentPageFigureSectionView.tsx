import type { ComponentPageFigureSection } from '../../types/componentPageTemplate';
import { ComponentPageImageView } from './ComponentPageImageView';

type Props = {
  section: ComponentPageFigureSection;
  marginTop?: number;
};

export function ComponentPageFigureSectionView({ section, marginTop = 40 }: Props) {
  return (
    <section
      className="component-doc-section component-page-template__figure-section"
      style={{ marginTop }}
      data-section-id={section.id}
    >
      <h3 className="component-doc-h3">{section.title}</h3>
      {section.description ? (
        <p className="component-doc-section__body">{section.description}</p>
      ) : null}
      <ComponentPageImageView image={section.image} />
    </section>
  );
}
