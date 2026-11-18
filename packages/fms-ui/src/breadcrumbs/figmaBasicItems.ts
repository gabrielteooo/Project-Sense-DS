import type { FmsBreadcrumbItem } from './FmsBreadcrumbs';

/** Matches Figma `Type=Basic` (`376:10879`) — Home + 2nd / 3rd / last Breadcrumb Link. */
export const FIGMA_BASIC_BREADCRUMB_ITEMS: FmsBreadcrumbItem[] = [
  { label: 'Home', href: '#', icon: true, iconName: 'house' },
  { label: 'Breadcrumb Link', href: '#' },
  { label: 'Breadcrumb Link', href: '#' },
  { label: 'Breadcrumb Link', current: true },
];