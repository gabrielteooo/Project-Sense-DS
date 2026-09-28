import { HandbookDocTable } from '../foundation/HandbookDocTable';
import type { ComponentDocContent } from '../../types/componentDoc';

const SECTION_GAP = 40;

type Props = {
  doc: ComponentDocContent;
};

export function ComponentUpdatesTab({ doc }: Props) {
  const { changelog, roadmap } = doc.updates;

  return (
    <div className="component-doc-tab">
      <section className="component-doc-section">
        <h2 className="colours-overview-section__title">{changelog.title}</h2>
        <HandbookDocTable columns={changelog.columns} rows={changelog.rows} />
      </section>

      <section className="component-doc-section" style={{ marginTop: SECTION_GAP }}>
        <h2 className="colours-overview-section__title">{roadmap.title}</h2>
        <HandbookDocTable columns={roadmap.columns} rows={roadmap.rows} />
      </section>
    </div>
  );
}
