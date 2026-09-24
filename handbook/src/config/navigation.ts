export type HandbookNavItem = {
  id: string;
  label: string;
  href?: string;
  children?: HandbookNavItem[];
  /** Top-level link styled like foundation section titles (semibold). */
  emphasis?: 'section';
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
    id: 'get-started',
    label: 'Get started',
    matchPath: '/get-started',
    href: '/get-started',
  },
  {
    id: 'foundations',
    label: 'Foundations',
    matchPath: '/foundation',
    href: '/foundation/colours/overview',
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

/** Get started tab — section links + Content group */
export const HANDBOOK_GET_STARTED_NAV: HandbookNavItem[] = [
  {
    id: 'get-started-home',
    label: 'Get started',
    href: '/get-started',
    emphasis: 'section',
  },
  {
    id: 'content',
    label: 'Content',
    children: [
      {
        id: 'writing-guidelines',
        label: 'Writing guidelines',
        href: '/get-started/writing-guidelines',
      },
      {
        id: 'content-formatting',
        label: 'Content formatting',
        href: '/get-started/content-formatting',
      },
      {
        id: 'numbers-formatting',
        label: 'Numbers formatting',
        href: '/get-started/numbers-formatting',
      },
      {
        id: 'date-time-formatting',
        label: 'Date time formatting',
        href: '/get-started/date-time-formatting',
      },
      {
        id: 'results-formatting',
        label: 'Results formatting',
        href: '/get-started/results-formatting',
      },
    ],
  },
  {
    id: 'data-persistence',
    label: 'Data persistence',
    href: '/get-started/data-persistence',
    emphasis: 'section',
  },
  {
    id: 'error-handling',
    label: 'Error handling',
    href: '/get-started/error-handling',
    emphasis: 'section',
  },
];

/** Figma side menu 1:12439 — Foundations tab */
export const HANDBOOK_FOUNDATIONS_NAV: HandbookNavItem[] = [
  {
    id: 'colours',
    label: 'Colours',
    children: [
      {
        id: 'colours-overview',
        label: 'Overview',
        href: '/foundation/colours/overview',
      },
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
    id: 'elevation',
    label: 'Elevation',
    children: [
      {
        id: 'elevation-overview',
        label: 'Overview',
        href: '/foundation/elevation/overview',
      },
      {
        id: 'elevation-shadow',
        label: 'Shadow',
        href: '/foundation/elevation/shadow',
      },
    ],
  },
  {
    id: 'icons',
    label: 'Icons',
    children: [
      {
        id: 'icons-overview',
        label: 'Overview',
        href: '/foundation/icons/overview',
      },
      {
        id: 'icons-designer-guide',
        label: 'Designer guide',
        href: '/foundation/icons/designer-guide',
      },
      {
        id: 'icons-developer-guide',
        label: 'Developer guide',
        href: '/foundation/icons/developer-guide',
      },
    ],
  },
  {
    id: 'layout',
    label: 'Layout',
    children: [
      {
        id: 'layout-responsive-grid',
        label: 'Responsive grid',
        href: '/foundation/layout/responsive-grid',
      },
    ],
  },
  {
    id: 'spacing',
    label: 'Spacing',
    children: [
      {
        id: 'spacing-overview',
        label: 'Overview',
        href: '/foundation/spacing/overview',
      },
      {
        id: 'spacing-margin',
        label: 'Margin',
        href: '/foundation/spacing/margin',
      },
      {
        id: 'spacing-padding',
        label: 'Padding',
        href: '/foundation/spacing/padding',
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
        label: 'Text styles',
        href: '/foundation/typography/text-styles',
      },
      {
        id: 'text-system',
        label: 'Text system',
        href: '/foundation/typography/text-system',
      },
    ],
  },
];

export const HANDBOOK_NAV_DEFAULT_OPEN = [
  'colours',
  'elevation',
  'icons',
  'layout',
  'spacing',
  'typography',
  'content',
] as const;
