import guide from '../../content/foundation/icons-designer-guide.json';
import step1Img from '../../public/foundation/icons/designer-guide/step-1-figma-assets.png';
import step2Img from '../../public/foundation/icons/designer-guide/step-2-fontawesome-search.png';
import step3Img from '../../public/foundation/icons/designer-guide/step-3-copy-glyph.png';
import step4Img from '../../public/foundation/icons/designer-guide/step-4-paste-icon-name.png';
import { HandbookDocTable } from '../components/foundation/HandbookDocTable';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

const SECTION_GAP_PX = 40;

const STEP_IMAGES = {
  step1: step1Img,
  step2: step2Img,
  step3: step3Img,
  step4: step4Img,
} as const;

type FigmaStep = (typeof guide.figmaUsage.steps)[number];

function FigmaUsageStep({ step }: { step: FigmaStep }) {
  const imageSrc = STEP_IMAGES[step.imageKey as keyof typeof STEP_IMAGES];

  return (
    <div className="icons-designer-guide__step">
      <p className="icons-designer-guide__step-text">
        <span className="icons-designer-guide__step-label">{step.label}</span>
        {'body' in step && step.body ? (
          <span>{step.body}</span>
        ) : (
          <>
            {'bodyBeforeLink' in step ? step.bodyBeforeLink : null}
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
            {'bodyAfterLink' in step ? step.bodyAfterLink : null}
          </>
        )}
      </p>
      <div
        className={
          step.number === 1
            ? 'icons-designer-guide__frame icons-designer-guide__frame--step1'
            : step.number === 4
              ? 'icons-designer-guide__frame icons-designer-guide__frame--step4'
              : 'icons-designer-guide__frame'
        }
      >
        <img
          className="icons-designer-guide__image"
          src={imageSrc}
          alt={step.imageAlt}
        />
      </div>
    </div>
  );
}

/** Icons — Designer guide (Figma 97:1152) */
export function IconsDesignerGuidePage() {
  const { guidelinesTable, figmaUsage } = guide;

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
        <h2 className="icons-dev-guide__section-title">{figmaUsage.title}</h2>
        <div className="icons-designer-guide__steps">
          {figmaUsage.steps.map((step) => (
            <FigmaUsageStep key={step.number} step={step} />
          ))}
        </div>
      </section>
    </article>
  );
}
