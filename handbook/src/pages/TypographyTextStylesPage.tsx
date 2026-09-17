import textStyles from '../../content/foundation/text-styles.json';
import { TextStyleTable } from '../components/foundation/TextStyleTable';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';
import { HANDBOOK_SHELL } from '../figma/metrics';

/** Typography — Text Styles (Figma 62:21858) */
export function TypographyTextStylesPage() {
  return (
    <article className="foundation-typography-page">
      <HandbookPageHeader
        title="Text Styles"
        description={textStyles.pageDescription}
      />

      {textStyles.sections.map((section, index) => (
        <section
          key={section.id}
          className="text-styles-section"
          style={
            index > 0 ? { marginTop: HANDBOOK_SHELL.paletteSectionGapPx } : undefined
          }
        >
          <h2 className="colour-token-group__title">{section.title}</h2>
          <p className="text-styles-section__description">{section.description}</p>
          <TextStyleTable rows={section.rows} />
        </section>
      ))}
    </article>
  );
}
