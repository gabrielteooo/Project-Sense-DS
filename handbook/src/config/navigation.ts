export type HandbookNavItem = {
  id: string;
  label: string;
  href?: string;
  children?: HandbookNavItem[];
  /** Font Awesome class for hb-submenu-title icon (Figma 151:2442). */
  iconClass?: string;
  /** Horizontal rule between nav groups (Figma 152:2987). */
  divider?: boolean;
  /** @deprecated Section links use root hb-menu-item; kept for IA only */
  emphasis?: 'section';
};

import { COMPONENT_CATALOG, componentHref } from './componentsRegistry';

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
    href: '/foundation',
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
    id: 'state-persistence',
    label: 'State persistence',
    children: [
      {
        id: 'state-persistence-global-filters',
        label: 'Global filters',
        href: '/get-started/state-persistence/global-filters',
      },
      {
        id: 'state-persistence-charts',
        label: 'Charts',
        href: '/get-started/state-persistence/charts',
      },
      {
        id: 'state-persistence-table',
        label: 'Table',
        href: '/get-started/state-persistence/table',
      },
      {
        id: 'state-persistence-component-state',
        label: 'Component state',
        href: '/get-started/state-persistence/component-state',
      },
      {
        id: 'state-persistence-forms',
        label: 'Forms',
        href: '/get-started/state-persistence/forms',
      },
    ],
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
    iconClass: 'fa-solid fa-palette',
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
    iconClass: 'fa-solid fa-clone',
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
    iconClass: 'fa-solid fa-icons',
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
    iconClass: 'fa-solid fa-table-cells-large',
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
    iconClass: 'fa-solid fa-arrows-left-right-to-line',
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
    iconClass: 'fa-solid fa-font-case',
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

/** Components tab — overview + changelog, divider, then doc pages (Figma 152:2932). */
export const HANDBOOK_COMPONENTS_NAV: HandbookNavItem[] = [
  {
    id: 'components-overview',
    label: 'Component Overview',
    href: '/components',
  },
  {
    id: 'components-changelog',
    label: 'Change Log',
  },
  { id: 'components-nav-divider', label: '', divider: true },
  ...COMPONENT_CATALOG.filter((entry) => entry.documented)
    .sort((a, b) => a.label.localeCompare(b.label))
    .map((entry) => ({
      id: `component-${entry.slug}`,
      label: entry.label,
      href: componentHref(entry.slug, 'design'),
    })),
];

function navHrefMatchesPath(pathname: string, href: string): boolean {
  if (pathname === href) return true;
  if (href === '/get-started' || href === '/foundation') {
    return pathname === href;
  }
  return pathname.startsWith(`${href}/`);
}

function navTreeContainsPath(item: HandbookNavItem, pathname: string): boolean {
  if (item.href) {
    const hrefPath = item.href.split('#')[0];
    if (navHrefMatchesPath(pathname, hrefPath)) return true;
  }
  return item.children?.some((child) => navTreeContainsPath(child, pathname)) ?? false;
}

/** Branch section ids that should be expanded for the current route (e.g. `colours` on `/foundation/colours/base`). */
export function navBranchIdsForPathname(
  items: HandbookNavItem[],
  pathname: string,
): string[] {
  return items
    .filter((item) => item.children?.length && navTreeContainsPath(item, pathname))
    .map((item) => item.id);
}
