import { useState } from 'react';
import type { DesignTabFigureTableSection } from '../../types/designTab';
import { DocSegmentedControl } from '../components/DocSegmentedControl';
import { DesignTabFigure } from './blocks/DesignTabFigure';
import { DesignTabTableBlock } from './blocks/DesignTabTableBlock';
import { getDesignTabDemo } from './demos/designTabDemoRegistry';
import { DesignTabPreviewPanel } from './blocks/DesignTabPreviewPanel';

type Props = {
  section: DesignTabFigureTableSection;
};

export function DesignTabFigureTableSectionView({ section }: Props) {
  const sizeOptions = section.sizeOptions ?? [];
  const defaultSize = section.defaultSize ?? sizeOptions[0]?.id ?? 'base';
  const [size, setSize] = useState(defaultSize);

  const figure =
    section.figuresBySize?.[size] ?? section.figure ?? undefined;
  const table = section.tablesBySize?.[size] ?? section.table ?? undefined;
  const structureDemo =
    !figure && section.structureDemoId ? getDesignTabDemo(section.structureDemoId) : undefined;
  const StructureDemoComponent = structureDemo?.Component;

  return (
    <>
      {sizeOptions.length > 1 ? (
        <DocSegmentedControl
          ariaLabel={`${section.title} size`}
          options={sizeOptions.map((option) => ({ value: option.id, label: option.label }))}
          value={size}
          onChange={setSize}
        />
      ) : null}

      {figure ? (
        <DesignTabFigure figure={figure} className="component-doc-figure-block--structure" />
      ) : StructureDemoComponent ? (
        <DesignTabPreviewPanel label={structureDemo.label}>
          <StructureDemoComponent />
        </DesignTabPreviewPanel>
      ) : null}

      {table ? <DesignTabTableBlock table={table} /> : null}
    </>
  );
}
