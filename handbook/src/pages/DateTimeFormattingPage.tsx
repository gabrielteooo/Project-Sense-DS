import dateTimeFormatting from '../../content/get-started/date-time-formatting.json';
import dataTableDatesImg from '../../public/get-started/date-time-formatting/data-table-dates.png';
import dateIntervalsImg from '../../public/get-started/date-time-formatting/date-intervals.png';
import monthRangePickerImg from '../../public/get-started/date-time-formatting/month-range-picker.png';
import timeFormatImg from '../../public/get-started/date-time-formatting/time-format.png';
import timeIntervalsImg from '../../public/get-started/date-time-formatting/time-intervals.png';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

const EXAMPLE_IMAGES = {
  dataTableDates: dataTableDatesImg,
  monthRangePicker: monthRangePickerImg,
  dateIntervals: dateIntervalsImg,
  timeFormat: timeFormatImg,
  timeIntervals: timeIntervalsImg,
} as const;

/** Get started — Date time formatting (Figma 101:5789) */
export function DateTimeFormattingPage() {
  return (
    <article className="get-started-page numbers-formatting-page date-time-formatting-page">
      <HandbookPageHeader
        title={dateTimeFormatting.pageTitle}
        description={dateTimeFormatting.pageDescription}
      />

      <div className="numbers-formatting__sections">
        {dateTimeFormatting.sections.map((section) => {
          const isSingle =
            'examplesLayout' in section && section.examplesLayout === 'single';

          return (
            <section key={section.number} className="numbers-formatting__section">
              <h2 className="writing-guidelines__section-title">
                {section.number}. {section.title}
              </h2>
              <ul className="writing-guidelines__list writing-guidelines__list--content-formatting">
                {section.bullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
              {'examples' in section && section.examples?.length ? (
                <div
                  className={
                    isSingle
                      ? 'numbers-formatting__examples numbers-formatting__examples--single'
                      : 'numbers-formatting__examples'
                  }
                >
                  {section.examples.map((example) => (
                    <figure
                      key={example.imageKey}
                      className="icons-overview-usage__figure"
                    >
                      {'label' in example && example.label ? (
                        <figcaption className="icons-overview-usage__caption">
                          {example.label}
                        </figcaption>
                      ) : null}
                      <div
                        className={
                          isSingle
                            ? 'numbers-formatting__frame numbers-formatting__frame--short'
                            : 'numbers-formatting__frame'
                        }
                      >
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
          );
        })}
      </div>
    </article>
  );
}
