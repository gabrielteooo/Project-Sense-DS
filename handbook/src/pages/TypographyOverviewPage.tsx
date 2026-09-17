import { Tag } from '../components/ui/Tag';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';
import { HANDBOOK_SHELL } from '../figma/metrics';

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

const GUIDELINES = [
  'Heavier weights (e.g., Bold/700) grab attention for headings and important text.',
  'Lighter weights (e.g., Regular/400) used for body text and supporting content.',
  'Bold colour for heading makes it stand out and draw attention.',
  'Subdued colour for supporting content to reduce visual prominence.',
] as const;

const sectionGapStyle = { marginTop: HANDBOOK_SHELL.paletteSectionGapPx };

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

      <section className="typography-section" style={sectionGapStyle}>
        <h2 className="base-colours-section__title">Typeface</h2>
        <ul className="typography-guidelines__list">
          <li className="typography-guidelines__item typography-guidelines__item--text">
            FMS uses Inter Regular 400 and Bold 700.
          </li>
          <li className="typography-guidelines__item typography-guidelines__item--text">
            FMS uses a base text size of{' '}
            <strong className="typography-prose__strong">16px</strong> with increments of 4px
            for font sizing, with the exception of H1, H2, and Caption.
          </li>
          <li className="typography-guidelines__item typography-guidelines__item--text">
            The base colour for the type is{' '}
            <Tag swatchHex="#000000E0">Colors/Neutral/Text-colorText</Tag>.
          </li>
        </ul>
      </section>

      <section className="typography-section" style={sectionGapStyle}>
        <h2 className="base-colours-section__title">Guidelines</h2>
        <div className="typography-prose">
          <p className="typography-prose__intro">
            Use weights and colours to create information hierarchy:
          </p>
          <ul className="typography-guidelines__list">
            {GUIDELINES.map((item) => (
              <li key={item} className="typography-guidelines__item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
