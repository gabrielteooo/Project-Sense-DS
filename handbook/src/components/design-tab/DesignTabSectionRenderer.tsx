import type {
  DesignTabAnatomySection,
  DesignTabControlledSection,
  DesignTabSectionGroup,
  DesignTabSubsection,
  DesignTabTopSection,
} from '../../types/designTab';
import { DesignTabSection } from './blocks/DesignTabSection';
import { DesignTabFigure } from './blocks/DesignTabFigure';
import { DesignTabLegend } from './blocks/DesignTabLegend';
import { DesignTabPreviewPanel } from './blocks/DesignTabPreviewPanel';
import { getDesignTabDemo } from './demos/designTabDemoRegistry';
import { DesignTabFigureTableSectionView } from './DesignTabFigureTableSectionView';

function AnatomySection({
  section,
  isFirst,
}: {
  section: DesignTabAnatomySection;
  isFirst: boolean;
}) {
  const figureDemo = section.figureDemoId ? getDesignTabDemo(section.figureDemoId) : undefined;
  const FigureDemo = figureDemo?.Component;

  return (
    <DesignTabSection
      id={section.id}
      title={section.title}
      headingLevel={section.headingLevel}
      isFirst={isFirst}
    >
      <div className="component-doc-figure-block component-doc-figure-block--anatomy">
        {section.figure ? (
          <DesignTabFigure figure={section.figure} embedded />
        ) : FigureDemo ? (
          <DesignTabPreviewPanel label={figureDemo.label}>
            <FigureDemo />
          </DesignTabPreviewPanel>
        ) : null}
      </div>
      <DesignTabLegend items={section.legend} />
    </DesignTabSection>
  );
}

function ControlledSection({
  section,
  isFirst,
  nested,
}: {
  section: DesignTabControlledSection;
  isFirst: boolean;
  nested?: boolean;
}) {
  const demo = getDesignTabDemo(section.demoId);
  if (!demo) {
    return (
      <DesignTabSection
        id={section.id}
        title={section.title}
        headingLevel={section.headingLevel}
        description={section.description}
        isFirst={isFirst}
        nested={nested}
      >
        <p className="doc-block doc-block--error">Unknown design tab demo: {section.demoId}</p>
      </DesignTabSection>
    );
  }

  const Demo = demo.Component;
  return (
    <DesignTabSection
      id={section.id}
      title={section.title}
      headingLevel={section.headingLevel}
      description={section.description}
      isFirst={isFirst}
      nested={nested}
    >
      <Demo />
    </DesignTabSection>
  );
}

function FigureTableSubsection({ section }: { section: DesignTabSubsection & { kind: 'figureTable' } }) {
  if (section.kind !== 'figureTable') {
    return null;
  }
  const hasContent =
    section.figure ||
    section.table?.rows.length ||
    section.figuresBySize ||
    section.tablesBySize ||
    section.structureDemoId;
  if (!hasContent && !section.description) {
    return null;
  }

  return (
    <DesignTabSection
      id={section.id}
      title={section.title}
      headingLevel={section.headingLevel}
      description={section.description}
      nested
    >
      <DesignTabFigureTableSectionView section={section} />
    </DesignTabSection>
  );
}

function SectionGroup({
  section,
  isFirst,
}: {
  section: DesignTabSectionGroup;
  isFirst: boolean;
}) {
  const children = section.children.filter((child) => {
    if (child.kind === 'figureTable') {
      const s = child;
      return (
        s.description ||
        s.figure ||
        s.table?.rows.length ||
        s.figuresBySize ||
        s.tablesBySize ||
        s.structureDemoId
      );
    }
    return true;
  });

  if (children.length === 0) {
    return null;
  }

  return (
    <DesignTabSection
      id={section.id}
      title={section.title}
      headingLevel={section.headingLevel}
      isFirst={isFirst}
    >
      {children.map((child) => {
        if (child.kind === 'controlledExample') {
          return (
            <ControlledSection key={child.id} section={child} isFirst={false} nested />
          );
        }
        return <FigureTableSubsection key={child.id} section={child} />;
      })}
    </DesignTabSection>
  );
}

type Props = {
  section: DesignTabTopSection;
  isFirst: boolean;
};

export function DesignTabSectionRenderer({ section, isFirst }: Props) {
  switch (section.kind) {
    case 'anatomy':
      return <AnatomySection section={section} isFirst={isFirst} />;
    case 'controlledExample':
      return <ControlledSection section={section} isFirst={isFirst} />;
    case 'sectionGroup':
      return <SectionGroup section={section} isFirst={isFirst} />;
    default:
      return null;
  }
}
