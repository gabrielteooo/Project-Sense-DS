import resultsFormatting from '../../content/get-started/results-formatting.json';
import chartMultipleSelectionsImg from '../../public/get-started/results-formatting/chart-multiple-selections.png';
import chartNoSelectionImg from '../../public/get-started/results-formatting/chart-no-selection.png';
import chartOneSelectionImg from '../../public/get-started/results-formatting/chart-one-selection.png';
import dashboardAllImg from '../../public/get-started/results-formatting/dashboard-all.png';
import dashboardMultipleImg from '../../public/get-started/results-formatting/dashboard-multiple.png';
import dashboardSingleImg from '../../public/get-started/results-formatting/dashboard-single.png';
import tableMultipleResultsImg from '../../public/get-started/results-formatting/table-multiple-results.png';
import tableNoDataImg from '../../public/get-started/results-formatting/table-no-data.png';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

const EXAMPLE_IMAGES = {
  dashboardSingle: dashboardSingleImg,
  dashboardMultiple: dashboardMultipleImg,
  dashboardAll: dashboardAllImg,
  chartNoSelection: chartNoSelectionImg,
  chartOneSelection: chartOneSelectionImg,
  chartMultipleSelections: chartMultipleSelectionsImg,
  tableNoData: tableNoDataImg,
  tableMultipleResults: tableMultipleResultsImg,
} as const;

type TextPart = { text: string; strong?: boolean };

type ResultBullet = string | { parts: (string | TextPart)[] };

function ResultsBulletItem({ bullet }: { bullet: ResultBullet }) {
  if (typeof bullet === 'string') {
    return <li>{bullet}</li>;
  }

  return (
    <li>
      {bullet.parts.map((part, index) => {
        if (typeof part === 'string') {
          return <span key={index}>{part}</span>;
        }
        if (part.strong) {
          return <strong key={index}>{part.text}</strong>;
        }
        return <span key={index}>{part.text}</span>;
      })}
    </li>
  );
}

function examplesGridClass(layout: string | undefined): string {
  if (layout === 'three-column') {
    return 'numbers-formatting__examples numbers-formatting__examples--three-column';
  }
  return 'numbers-formatting__examples';
}

function frameClass(variant: string | undefined): string {
  if (variant === 'dashboard') {
    return 'numbers-formatting__frame numbers-formatting__frame--dashboard';
  }
  if (variant === 'tall') {
    return 'numbers-formatting__frame numbers-formatting__frame--tall';
  }
  return 'numbers-formatting__frame';
}

/** Get started — Results formatting (Figma 100:5465) */
export function ResultsFormattingPage() {
  return (
    <article className="get-started-page numbers-formatting-page results-formatting-page">
      <HandbookPageHeader
        title={resultsFormatting.pageTitle}
        description={resultsFormatting.pageDescription}
      />

      <div className="numbers-formatting__sections">
        {resultsFormatting.sections.map((section) => (
          <section key={section.number} className="numbers-formatting__section">
            <h2 className="writing-guidelines__section-title">
              {section.number}. {section.title}
            </h2>
            <ul className="writing-guidelines__list writing-guidelines__list--content-formatting">
              {section.bullets.map((bullet, index) => (
                <ResultsBulletItem key={index} bullet={bullet as ResultBullet} />
              ))}
            </ul>
            {'examples' in section && section.examples?.length ? (
              <div className={examplesGridClass(section.examplesLayout)}>
                {section.examples.map((example) => (
                  <figure key={example.imageKey} className="icons-overview-usage__figure">
                    <figcaption className="icons-overview-usage__caption">
                      {example.label}
                    </figcaption>
                    <div className={frameClass(section.exampleFrameVariant)}>
                      <img
                        className="numbers-formatting__image"
                        src={
                          EXAMPLE_IMAGES[
                            example.imageKey as keyof typeof EXAMPLE_IMAGES
                          ]
                        }
                        alt={example.imageAlt}
                      />
                    </div>
                  </figure>
                ))}
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}
