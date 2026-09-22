import iconsOverview from '../../content/foundation/icons-overview.json';
import usageHeaderImg from '../../public/foundation/icons/header.png';
import usageMenuItemImg from '../../public/foundation/icons/menu item.png';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

const SECTION_GAP_PX = 40;

const USAGE_IMAGE_BY_LABEL: Record<string, string> = {
  Header: usageHeaderImg,
  'Menu item': usageMenuItemImg,
};

const FA_STYLE_CLASS: Record<string, string> = {
  solid: 'fa-solid',
  regular: 'fa-regular',
  light: 'fa-light',
};

/** Icons — Overview (Figma 92:8259) */
export function IconsOverviewPage() {
  const { fontAwesome, guidelines, usage } = iconsOverview;

  return (
    <article className="foundation-icons-page">
      <HandbookPageHeader title="Overview" description={iconsOverview.pageDescription} />

      <section className="icons-overview-section">
        <div className="icons-overview-fontawesome__intro">
          <h2 className="icons-overview-section__title">{fontAwesome.title}</h2>
          <p className="icons-overview-section__body">{fontAwesome.body}</p>
        </div>
        <div className="icons-overview-showcase" role="img" aria-label="Envelope icon in Solid, Regular, and Light styles">
          {fontAwesome.variants.map((variant) => (
            <div key={variant.label} className="icons-overview-showcase__item">
              <i
                className={`${FA_STYLE_CLASS[variant.style]} fa-envelope icons-overview-showcase__icon`}
                aria-hidden
              />
              <p className="icons-overview-showcase__label">{variant.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="icons-overview-section" style={{ marginTop: SECTION_GAP_PX }}>
        <h2 className="icons-overview-section__title">Guideline</h2>
        <ul className="icons-overview-guidelines__list">
          {guidelines.map((item) => (
            <li key={item} className="icons-overview-guidelines__item">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="icons-overview-section" style={{ marginTop: SECTION_GAP_PX }}>
        <h2 className="icons-overview-section__title">{usage.title}</h2>
        <p className="icons-overview-usage__intro">{usage.intro}</p>
        <div className="icons-overview-usage__grid">
          {usage.examples.map((example) => {
            const resolvedSrc =
              USAGE_IMAGE_BY_LABEL[example.label] ?? example.imageSrc;
            return (
              <figure key={example.label} className="icons-overview-usage__figure">
                <figcaption className="icons-overview-usage__caption">{example.label}</figcaption>
                <div className="icons-overview-usage__frame">
                  <img
                    className="icons-overview-usage__image icons-overview-usage__image--usage"
                    src={resolvedSrc}
                    alt={example.imageAlt}
                  />
                </div>
              </figure>
            );
          })}
        </div>
      </section>
    </article>
  );
}
