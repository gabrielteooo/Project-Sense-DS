import numbersFormatting from '../../content/get-started/numbers-formatting.json';
import dataTableImg from '../../public/get-started/numbers-formatting/data-table.png';
import metricCardImg from '../../public/get-started/numbers-formatting/metric-card.png';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

const EXAMPLE_IMAGES = {
  metricCard: metricCardImg,
  dataTable: dataTableImg,
} as const;

type Bullet =
  | string
  | {
      beforeLink: string;
      link: { label: string; href: string };
      afterLink: string;
    };

function NumbersBullet({ bullet }: { bullet: Bullet }) {
  if (typeof bullet === 'string') {
    return <li>{bullet}</li>;
  }
  return (
    <li>
      {bullet.beforeLink}
      <a
        href={bullet.link.href}
        target="_blank"
        rel="noreferrer"
        className="writing-guidelines__link"
      >
        {bullet.link.label}
      </a>
      {bullet.afterLink}
    </li>
  );
}

/** Get started — Numbers formatting (Figma 101:5532) */
export function NumbersFormattingPage() {
  return (
    <article className="get-started-page numbers-formatting-page">
      <HandbookPageHeader
        title={numbersFormatting.pageTitle}
        description={numbersFormatting.pageDescription}
      />

      <div className="numbers-formatting__sections">
        {numbersFormatting.sections.map((section) => (
          <section key={section.number} className="numbers-formatting__section">
            <h2 className="writing-guidelines__section-title">
              {section.number}. {section.title}
            </h2>
            <ul className="writing-guidelines__list writing-guidelines__list--content-formatting">
              {section.bullets.map((bullet, index) => (
                <NumbersBullet key={index} bullet={bullet as Bullet} />
              ))}
            </ul>
            {'examples' in section && section.examples?.length ? (
              <div className="numbers-formatting__examples">
                {section.examples.map((example) => (
                  <figure key={example.label} className="icons-overview-usage__figure">
                    <figcaption className="icons-overview-usage__caption">
                      {example.label}
                    </figcaption>
                    <div className="numbers-formatting__frame">
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
