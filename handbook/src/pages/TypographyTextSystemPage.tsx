import textSystem from '../../content/foundation/text-system.json';
import { TextSystemTokenTable } from '../components/foundation/TextSystemTokenTable';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

const SECTION_GAP_PX = 40;

/** Typography — Text system (Figma 62:21858) */
export function TypographyTextSystemPage() {
  return (
    <article className="foundation-typography-page">
      <HandbookPageHeader title="Text system" description={textSystem.pageDescription} />

      {textSystem.sections.map((section, index) => (
        <section
          key={section.id}
          className="text-system-section"
          style={index > 0 ? { marginTop: SECTION_GAP_PX } : undefined}
        >
          <h2 className="text-system-section__title">{section.title}</h2>
          <p className="text-styles-section__description">{section.description}</p>
          <TextSystemTokenTable rows={section.rows} />
        </section>
      ))}
    </article>
  );
}
