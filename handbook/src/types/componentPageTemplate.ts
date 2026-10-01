/** v2 component page layout (Pages CMS template). Fixed section titles are rendered in React. */

export type ComponentPageImage = {
  src?: string;
  alt: string;
  caption?: string;
};

export type ComponentPageFigureSection = {
  id: string;
  title: string;
  description?: string;
  image: ComponentPageImage;
};

export type ComponentPageDesignTab = {
  anatomyImage: ComponentPageImage;
  specificationGuidelinesImage: ComponentPageImage;
  sections: ComponentPageFigureSection[];
};

export type ComponentPageUsageTab = {
  guidelineRichText: string;
  usageRichText: string;
  sections: ComponentPageFigureSection[];
};

export type ComponentPageUpdatesTab = {
  changelog: {
    columns: string[];
    rows: string[][];
  };
  roadmapRichText: string;
};

export type ComponentPageTabs = {
  design: ComponentPageDesignTab;
  usage: ComponentPageUsageTab;
  updates: ComponentPageUpdatesTab;
};

export type ComponentPageTemplateV2 = {
  pageFormatVersion: 2;
  slug: string;
  pageTitle: string;
  pageDescription: string;
  figmaNodeId?: string;
  tabs: ComponentPageTabs;
};

export function isComponentPageTemplateV2(doc: unknown): doc is ComponentPageTemplateV2 {
  if (!doc || typeof doc !== 'object') return false;
  const record = doc as Record<string, unknown>;
  return record.pageFormatVersion === 2 && record.tabs != null && typeof record.tabs === 'object';
}
