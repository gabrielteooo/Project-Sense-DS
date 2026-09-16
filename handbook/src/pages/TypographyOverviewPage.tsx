import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

const PAGE_DESCRIPTION =
  'Typography sets the visual rhythm of our applications. By applying consistent text styles, line heights, and scale, you establish a clear hierarchy that guides users naturally through complex information while ensuring high legibility across all screen sizes.';

const PRINCIPLES = [
  {
    title: 'Prioritize Legibility to Build Readability',
    body: 'Distinct letterforms create the foundation for smooth, comfortable reading. Choose clean, distinguishable typefaces and configure font size, line height, and contrast so readers process information effortlessly, regardless of device or ability.',
  },
  {
    title: 'Establish Visual Harmony and Hierarchy',
    body: 'Maintain consistent type styles, intentional spacing, and structured headers to bring clarity to complex information. Rhythm, contrast, and alignment form a cohesive visual grid that reduces cognitive load.',
  },
  {
    title: 'Optimize Scannability for User Context',
    body: 'Format content for how people actually consume information in different environments. Use clear headings, short paragraphs, and thoughtful layout structure to accommodate dynamic screen sizes, platform preferences, and fast-paced scanning.',
  },
] as const;

/** Typography — Overview */
export function TypographyOverviewPage() {
  return (
    <article className="foundation-typography-page">
      <HandbookPageHeader title="Overview" description={PAGE_DESCRIPTION} />

      <section className="typography-section">
        <h2 className="base-colours-section__title">Principles:</h2>
        <ol className="typography-principles__list">
          {PRINCIPLES.map((principle) => (
            <li key={principle.title} className="typography-principles__item">
              <p className="typography-principles__item-title">{principle.title}</p>
              <p className="typography-principles__item-body">{principle.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
