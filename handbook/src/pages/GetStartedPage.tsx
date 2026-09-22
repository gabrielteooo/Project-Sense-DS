import getStarted from '../../content/get-started/overview.json';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';
import { HANDBOOK_SHELL } from '../figma/metrics';

const sectionGapStyle = { marginTop: HANDBOOK_SHELL.paletteSectionGapPx };

/** Get started — handbook purpose and audience (global tab) */
export function GetStartedPage() {
  const { audiences, whatYouWillFind, howToUse } = getStarted;

  return (
    <article className="get-started-page">
      <HandbookPageHeader
        title={getStarted.pageTitle}
        description={[
          getStarted.pageDescription,
          ...getStarted.introParagraphs,
        ]}
      />

      <section className="get-started-section">
        <h2 className="base-colours-section__title">{audiences.title}</h2>
        <ul className="get-started-audience__list">
          {audiences.items.map((item) => (
            <li key={item.title} className="get-started-audience__item">
              <p className="get-started-audience__item-title">{item.title}</p>
              <p className="get-started-audience__item-body">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="get-started-section" style={sectionGapStyle}>
        <h2 className="base-colours-section__title">{whatYouWillFind.title}</h2>
        <ul className="get-started-topics__list">
          {whatYouWillFind.items.map((item) => (
            <li key={item.title} className="get-started-topics__item">
              <p className="get-started-topics__item-title">{item.title}</p>
              <p className="get-started-topics__item-body">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="get-started-section" style={sectionGapStyle}>
        <h2 className="base-colours-section__title">{howToUse.title}</h2>
        <ul className="typography-guidelines__list">
          {howToUse.items.map((item) => (
            <li key={item} className="typography-guidelines__item">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
