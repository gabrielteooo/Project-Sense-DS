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
      { id: 'brand', label: 'Brand colour' },
      { id: 'system', label: 'System colour' },
      { id: 'neutral', label: 'Neutral colour' },
      { id: 'data', label: 'Data colour' },
    ],
  },
];

export const HANDBOOK_NAV_DEFAULT_OPEN = ['colours'] as const;
