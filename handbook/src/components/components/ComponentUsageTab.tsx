import { HandbookDocTable } from '../foundation/HandbookDocTable';
import type { ComponentDocContent } from '../../types/componentDoc';

const SECTION_GAP = 40;

type Props = {
  doc: ComponentDocContent;
};

export function ComponentUsageTab({ doc }: Props) {
  const { guidelines, usage, examples } = doc.usage;

  return (
    <div className="component-doc-tab">
      <section className="component-doc-section">
        <h2 className="colours-overview-section__title">{guidelines.title}</h2>
        {guidelines.description ? (
          <p className="component-doc-section__body">{guidelines.description}</p>
        ) : null}
        <HandbookDocTable
          columns={guidelines.dosDonts.columns}
          rows={guidelines.dosDonts.rows}
        />
      </section>

      <section className="component-doc-section" style={{ marginTop: SECTION_GAP }}>
        <h2 className="colours-overview-section__title">{usage.title}</h2>
        <ul className="component-doc-usage__list">
          {usage.items.map((item) => (
            <li key={item.heading} className="component-doc-usage__item">
              <h3 className="component-doc-usage__heading">{item.heading}</h3>
              <p className="component-doc-section__body">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {examples && (examples.items.length > 0 || examples.intro) ? (
        <section className="component-doc-section" style={{ marginTop: SECTION_GAP }}>
          <h2 className="colours-overview-section__title">{examples.title}</h2>
          {examples.intro ? (
            <p className="component-doc-section__body">{examples.intro}</p>
          ) : null}
          {examples.items.length > 0 ? (
            <div className="component-doc-examples__grid">
              {examples.items.map((item) => (
                <figure key={item.label} className="component-doc-examples__item">
                  {item.imageSrc ? (
                    <img src={item.imageSrc} alt={item.imageAlt ?? item.label} />
                  ) : null}
                  <figcaption>{item.label}</figcaption>
                </figure>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
