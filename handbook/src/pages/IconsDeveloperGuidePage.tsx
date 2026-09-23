import guide from '../../content/foundation/icons-developer-guide.json';
import step1Img from '../../public/foundation/icons/developer-guide/step-1-fontawesome-search.png';
import step2Img from '../../public/foundation/icons/developer-guide/step-2-copy-html-react.png';
import { HandbookCodeBlock } from '../components/foundation/HandbookCodeBlock';
import { HandbookDocTable } from '../components/foundation/HandbookDocTable';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

const SECTION_GAP_PX = 40;

const FINDING_ICON_IMAGES = {
  step1: step1Img,
  step2: step2Img,
} as const;

type FindingIconStep = (typeof guide.findingTheIcon.steps)[number];

function FindingTheIconStep({ step }: { step: FindingIconStep }) {
  const imageSrc = FINDING_ICON_IMAGES[step.imageKey as keyof typeof FINDING_ICON_IMAGES];

  return (
    <div className="icons-designer-guide__step">
      <p className="icons-designer-guide__step-text">
        <span className="icons-designer-guide__step-label">{step.label}</span>
        {'body' in step && step.body ? (
          <span>{step.body}</span>
        ) : (
          <>
            {'lead' in step ? step.lead : null}
            {'emphasis' in step && step.emphasis ? (
              <strong className="icons-dev-guide__step-emphasis">{step.emphasis}</strong>
            ) : null}
            {'trail' in step ? step.trail : null}
            {'link' in step && step.link ? (
              <a
                href={step.link.href}
                target="_blank"
                rel="noreferrer"
                className="icons-dev-guide__link"
              >
                {step.link.label}
              </a>
            ) : null}
          </>
        )}
      </p>
      <div className="icons-designer-guide__frame">
        <img
          className="icons-designer-guide__image"
          src={imageSrc}
          alt={step.imageAlt}
        />
      </div>
    </div>
  );
}

/** Icons — Developer guide (Figma 103:5986) */
export function IconsDeveloperGuidePage() {
  const { guidelinesTable, install, findingTheIcon, basicMarkup, sizeAndColour } = guide;

  return (
    <article className="foundation-icons-page icons-dev-guide icons-designer-guide">
      <HandbookPageHeader title={guide.pageTitle} description={guide.pageDescription} />

      <section className="icons-dev-guide__section">
        <h2 className="icons-dev-guide__section-title">Guidelines</h2>
        <HandbookDocTable
          columns={guidelinesTable.columns}
          rows={guidelinesTable.rows}
        />
      </section>

      <section className="icons-dev-guide__section" style={{ marginTop: SECTION_GAP_PX }}>
        <h2 className="icons-dev-guide__section-title">{install.title}</h2>
        <div className="icons-dev-guide__subsection">
          <h3 className="icons-dev-guide__subsection-title">{install.subsectionTitle}</h3>
          <div className="icons-dev-guide__steps">
            {install.steps.map((step, index) => {
              if (step.type === 'numbered') {
                return (
                  <div key={index} className="icons-dev-guide__step">
                    <ol className="icons-dev-guide__step-list" start={step.number}>
                      <li className="icons-dev-guide__step-item">
                        <span>{step.body}</span>
                        {'followUp' in step && step.followUp ? (
                          <p className="icons-dev-guide__step-follow-up">{step.followUp}</p>
                        ) : null}
                      </li>
                    </ol>
                    {step.code ? <HandbookCodeBlock code={step.code} /> : null}
                  </div>
                );
              }
              return (
                <div key={index} className="icons-dev-guide__step">
                  <p className="icons-dev-guide__step-text">{step.body}</p>
                  {step.code ? <HandbookCodeBlock code={step.code} /> : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="icons-dev-guide__section" style={{ marginTop: SECTION_GAP_PX }}>
        <h2 className="icons-dev-guide__section-title">{findingTheIcon.title}</h2>
        <div className="icons-designer-guide__steps">
          {findingTheIcon.steps.map((step) => (
            <FindingTheIconStep key={step.number} step={step} />
          ))}
        </div>
      </section>

      <section className="icons-dev-guide__section" style={{ marginTop: SECTION_GAP_PX }}>
        <h2 className="icons-dev-guide__section-title">{basicMarkup.title}</h2>
        <p className="icons-dev-guide__prose">{basicMarkup.intro}</p>
        <HandbookDocTable
          columns={basicMarkup.styleTable.columns}
          rows={basicMarkup.styleTable.rows}
        />
        <div className="icons-dev-guide__examples">
          <p className="icons-dev-guide__examples-title">{basicMarkup.examplesTitle}</p>
          {basicMarkup.examples.map((snippet) => (
            <HandbookCodeBlock key={snippet} code={snippet} />
          ))}
        </div>
        <p className="icons-dev-guide__prose icons-dev-guide__icon-search-note">
          {basicMarkup.iconSearchNote.beforeLink}
          <a
            href={basicMarkup.iconSearchNote.linkHref}
            target="_blank"
            rel="noreferrer"
            className="icons-dev-guide__link"
          >
            {basicMarkup.iconSearchNote.linkLabel}
          </a>
          {basicMarkup.iconSearchNote.afterLink}
        </p>
      </section>

      <section className="icons-dev-guide__section" style={{ marginTop: SECTION_GAP_PX }}>
        <h2 className="icons-dev-guide__section-title">{sizeAndColour.title}</h2>
        <div className="icons-dev-guide__topic">
          <p className="icons-dev-guide__topic-label">{sizeAndColour.size.label}</p>
          <p className="icons-dev-guide__prose">{sizeAndColour.size.body}</p>
          <HandbookCodeBlock code={sizeAndColour.size.code} />
        </div>
        <div className="icons-dev-guide__topic">
          <p className="icons-dev-guide__topic-label">{sizeAndColour.colour.label}</p>
          {sizeAndColour.colour.body.map((paragraph) => (
            <p key={paragraph} className="icons-dev-guide__prose">
              {paragraph}
            </p>
          ))}
          <HandbookCodeBlock code={sizeAndColour.colour.code} />
        </div>
      </section>
    </article>
  );
}
