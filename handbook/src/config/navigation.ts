export type HandbookNavItem = {
  id: string;
  label: string;
  href?: string;
  children?: HandbookNavItem[];
};

export type HandbookTab = {
  id: string;
  label: string;
  /** Route prefix used to mark the tab active */
  matchPath: string;
  /** Default route when selecting the tab */
  href: string;
};

/** Figma global header 1:10453 */
export const HANDBOOK_TABS: HandbookTab[] = [
  {
    id: 'guidelines',
    label: 'Guidelines',
    matchPath: '/guidelines',
    href: '/guidelines',
  },
  {
    id: 'foundations',
    label: 'Foundations',
    matchPath: '/foundation',
    href: '/foundation/colours/base',
  },
  {
    id: 'components',
    label: 'Components',
    matchPath: '/components',
    href: '/components',
  },
  {
    id: 'templates',
    label: 'Templates',
    matchPath: '/templates',
    href: '/templates',
  },
];

/** Figma side menu 1:12439 — Foundations tab */
export const HANDBOOK_FOUNDATIONS_NAV: HandbookNavItem[] = [
  {
    id: 'colours',
    label: 'Colours',
    children: [
      {
        id: 'base',
        label: 'Base colour',
        href: '/foundation/colours/base',
      },
      {
        id: 'brand',
        label: 'Brand colour',
        href: '/foundation/colours/brand',
      },
      {
        id: 'system',
        label: 'System colour',
        href: '/foundation/colours/system',
      },
      {
        id: 'neutral',
        label: 'Neutral colour',
        href: '/foundation/colours/neutral',
      },
      {
        id: 'data',
        label: 'Data colour',
        href: '/foundation/colours/data',
      },
    ],
  },
  {
    id: 'typography',
    label: 'Typography',
    children: [
      {
        id: 'typography-overview',
        label: 'Overview',
        href: '/foundation/typography/overview',
      },
      {
        id: 'text-styles',
        label: 'Text Styles',
        href: '/foundation/typography/text-styles',
      },
      {
        id: 'text-system',
        label: 'Text System',
        href: '/foundation/typography/text-system',
      },
    ],
  },
];

export const HANDBOOK_NAV_DEFAULT_OPEN = ['colours', 'typography'] as const;
