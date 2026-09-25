import { HandbookDocTable } from '../foundation/HandbookDocTable';

export type StatePersistenceTopicSection = {
  title: string;
  confirmed: string;
  introParagraphs?: string[];
  footnote?: string;
  table: {
    columns: string[];
    rows: string[][];
    columnTooltips?: Record<string, string>;
  };
};

type Props = {
  section: StatePersistenceTopicSection;
};

/** State persistence — section heading, confirmation, optional intro, behaviour table */
export function StatePersistenceTopicContent({ section }: Props) {
  return (
    <section className="state-persistence-topic">
      <div className="state-persistence-topic__intro">
        <h2 className="colours-overview-section__title">{section.title}</h2>
        <p className="state-persistence-topic__confirmed">{section.confirmed}</p>
        {section.introParagraphs?.map((paragraph) => (
          <p key={paragraph} className="state-persistence-topic__paragraph">
            {paragraph}
          </p>
        ))}
      </div>
      <HandbookDocTable
        className="state-persistence-topic__table"
        columns={section.table.columns}
        rows={section.table.rows}
        columnTooltips={section.table.columnTooltips}
      />
      {section.footnote ? (
        <p className="state-persistence-topic__footnote">{section.footnote}</p>
      ) : null}
    </section>
  );
}
