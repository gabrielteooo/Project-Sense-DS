import { useState } from 'react';
import buttonDoc from '../../../content/components/button.json';
import { HandbookDocTable } from '../foundation/HandbookDocTable';
import { DocSegmentedControl } from './DocSegmentedControl';

type SpecSize = 'base' | 'small' | 'x-small';

const SECTION_GAP = 40;

/** Coded Design tab section — not edited in Pages CMS (legacy JSON + segmented sizes). */
export function ButtonCodedSpecificationGuidelines() {
  const specificationGuidelines = buttonDoc.design.specificationGuidelines as {
    title: string;
    sizeOptions: { id: SpecSize; label: string }[];
    tables: Record<SpecSize, { columns: string[]; rows: string[][] }>;
  };

  const [specSize, setSpecSize] = useState<SpecSize>('base');
  const specTable = specificationGuidelines.tables[specSize];

  return (
    <section className="component-doc-section" style={{ marginTop: SECTION_GAP }}>
      <h2 className="component-doc-h2">{specificationGuidelines.title}</h2>
      <DocSegmentedControl
        ariaLabel="Button specification size"
        options={specificationGuidelines.sizeOptions.map((option) => ({
          value: option.id,
          label: option.label,
        }))}
        value={specSize}
        onChange={(value) => setSpecSize(value as SpecSize)}
      />
      <HandbookDocTable columns={specTable.columns} rows={specTable.rows} />
    </section>
  );
}
