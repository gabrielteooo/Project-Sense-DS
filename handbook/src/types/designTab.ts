/** Figma handbook Design tab — content schema (JSON) + layout kinds. */

export type DesignTabHeadingLevel = 2 | 3;

export type DesignTabFigure = {
  src: string;
  alt: string;
  caption?: string;
};

export type DesignTabLegendItem = {
  label: string;
  description: string;
};

export type DesignTabTable = {
  columns: string[];
  rows: string[][];
  columnTooltips?: Record<string, string>;
};

export type DesignTabSizeOption = {
  id: string;
  label: string;
};

export type DesignTabAnatomySection = {
  id: string;
  kind: 'anatomy';
  title: string;
  headingLevel: 2;
  /** Static export; omit when using coded demoId */
  figure?: DesignTabFigure;
  /** Coded figure (e.g. live anatomy canvas) — registry id */
  figureDemoId?: string;
  legend: DesignTabLegendItem[];
};

export type DesignTabControlledSection = {
  id: string;
  kind: 'controlledExample';
  title: string;
  headingLevel: DesignTabHeadingLevel;
  description?: string;
  demoId: string;
};

export type DesignTabFigureTableSection = {
  id: string;
  kind: 'figureTable';
  title: string;
  headingLevel: DesignTabHeadingLevel;
  description?: string;
  sizeOptions?: DesignTabSizeOption[];
  defaultSize?: string;
  figuresBySize?: Record<string, DesignTabFigure>;
  /** Fallback coded structure demo when no PNG for size */
  structureDemoId?: string;
  tablesBySize?: Record<string, DesignTabTable>;
  /** Single figure/table when size toggle not used */
  figure?: DesignTabFigure;
  table?: DesignTabTable;
};

export type DesignTabSectionGroup = {
  id: string;
  kind: 'sectionGroup';
  title: string;
  headingLevel: 2;
  children: DesignTabSubsection[];
};

export type DesignTabSubsection =
  | DesignTabControlledSection
  | DesignTabFigureTableSection;

export type DesignTabTopSection =
  | DesignTabAnatomySection
  | DesignTabControlledSection
  | DesignTabSectionGroup;

export type DesignTabDocument = {
  figmaNodeId?: string;
  sections: DesignTabTopSection[];
};

export function isDesignTabSectionGroup(
  section: DesignTabTopSection | DesignTabSubsection,
): section is DesignTabSectionGroup {
  return section.kind === 'sectionGroup';
}
