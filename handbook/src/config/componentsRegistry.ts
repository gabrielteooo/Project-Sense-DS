import type { ComponentCatalogEntry } from '../types/componentDoc';

/** Core component list for landing cards and side nav (alphabetical by label). */
export const COMPONENT_CATALOG: ComponentCatalogEntry[] = [
  {
    id: 'alert',
    label: 'Alert',
    slug: 'alert',
    iconClass: 'fa-solid fa-circle-exclamation',
  },
  {
    id: 'breadcrumb',
    label: 'Breadcrumb',
    slug: 'breadcrumb',
    iconClass: 'fa-solid fa-ellipsis',
  },
  {
    id: 'button',
    label: 'Button',
    slug: 'button',
    iconClass: 'fa-solid fa-hand-pointer',
    documented: true,
  },
  {
    id: 'checkbox',
    label: 'Checkbox',
    slug: 'checkbox',
    iconClass: 'fa-solid fa-square-check',
  },
  {
    id: 'dropdown',
    label: 'Dropdown',
    slug: 'dropdown',
    iconClass: 'fa-solid fa-caret-down',
    documented: true,
  },
  {
    id: 'input',
    label: 'Input',
    slug: 'input',
    iconClass: 'fa-solid fa-i-cursor',
  },
  {
    id: 'modal',
    label: 'Modal',
    slug: 'modal',
    iconClass: 'fa-solid fa-window-maximize',
  },
  {
    id: 'radio',
    label: 'Radio',
    slug: 'radio',
    iconClass: 'fa-solid fa-circle-dot',
    documented: true,
  },
  {
    id: 'select',
    label: 'Select',
    slug: 'select',
    iconClass: 'fa-solid fa-list-ul',
  },
  {
    id: 'table',
    label: 'Table',
    slug: 'table',
    iconClass: 'fa-solid fa-table',
  },
  {
    id: 'tabs',
    label: 'Tabs',
    slug: 'tabs',
    iconClass: 'fa-solid fa-folder',
  },
  {
    id: 'tag',
    label: 'Tag',
    slug: 'tag',
    iconClass: 'fa-solid fa-tag',
  },
  {
    id: 'tooltip',
    label: 'Tooltip',
    slug: 'tooltip',
    iconClass: 'fa-solid fa-comment-dots',
  },
].sort((a, b) => a.label.localeCompare(b.label));

export function componentHref(slug: string, tab: 'design' | 'usage' | 'updates' = 'design') {
  return `/components/${slug}#${tab}`;
}

export function catalogEntryForSlug(slug: string) {
  return COMPONENT_CATALOG.find((entry) => entry.slug === slug);
}
