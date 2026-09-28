export type ComponentDocTabId = 'design' | 'usage' | 'updates';

export type ComponentCatalogEntry = {
  id: string;
  label: string;
  slug: string;
  iconClass: string;
  /** When false, landing card is disabled and side nav omits until documented */
  documented?: boolean;
};

export type ComponentAnatomyPart = {
  label: string;
  description: string;
};

export type ComponentCanvasMeasurement = {
  label: string;
  /** CSS position class suffix: top | right | bottom | left */
  edge: 'top' | 'right' | 'bottom' | 'left';
};

export type ComponentDocButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'link'
  | 'icon-only';

export type ComponentDocContent = {
  slug: string;
  pageTitle: string;
  pageDescription: string;
  figmaNodeId?: string;
  design: {
    anatomy: {
      title: string;
      description?: string;
      imageSrc?: string;
      imageAlt?: string;
      parts: ComponentAnatomyPart[];
    };
    specification: {
      title: string;
      description?: string;
      demoVariant: ComponentDocButtonVariant;
      demoLabel: string;
      measurements: ComponentCanvasMeasurement[];
    };
    types: {
      title: string;
      description?: string;
      variants: { id: ComponentDocButtonVariant; label: string }[];
    };
  };
  usage: {
    guidelines: {
      title: string;
      description?: string;
      dosDonts: {
        columns: string[];
        rows: string[][];
      };
    };
    usage: {
      title: string;
      items: { heading: string; body: string }[];
    };
    examples?: {
      title: string;
      intro?: string;
      items: { label: string; imageSrc?: string; imageAlt?: string }[];
    };
  };
  updates: {
    changelog: {
      title: string;
      columns: string[];
      rows: string[][];
    };
    roadmap: {
      title: string;
      columns: string[];
      rows: string[][];
    };
  };
};
