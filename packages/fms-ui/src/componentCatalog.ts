/**
 * Machine-readable map from Figma / UI need → approved `@fms/ui` export.
 * Screen-building agents must use this table. Status `planned` means the
 * export is not implemented yet — do not invent a substitute.
 */
export type FmsComponentStatus = 'planned' | 'in review' | 'ready';

export type FmsComponentCatalogEntry = {
  id: string;
  /** Name designers instance in Project Sense DS (original). */
  figmaName: string;
  handbookSlug?: string;
  exportName: string;
  importPath: '@fms/ui';
  status: FmsComponentStatus;
  /** Repo-relative component note. Present once the component ships. */
  docs?: string;
};

export const FMS_COMPONENT_CATALOG: readonly FmsComponentCatalogEntry[] = [
  {
    id: 'button',
    figmaName: 'Button',
    handbookSlug: 'button',
    exportName: 'FmsButton',
    importPath: '@fms/ui',
    status: 'ready',
    docs: 'docs/components/button.md',
  },
  {
    id: 'icon-frame',
    figmaName: 'icon frame',
    exportName: 'FmsIconFrame',
    importPath: '@fms/ui',
    status: 'ready',
    docs: 'docs/components/icon-frame.md',
  },
  {
    id: 'breadcrumbs',
    figmaName: 'Breadcrumb',
    exportName: 'FmsBreadcrumbs',
    importPath: '@fms/ui',
    status: 'ready',
    docs: 'docs/components/breadcrumbs.md',
  },
  {
    id: 'badge',
    figmaName: 'Badge',
    exportName: 'FmsBadge',
    importPath: '@fms/ui',
    status: 'in review',
    docs: 'docs/components/badge.md',
  },
  {
    id: 'dropdown',
    figmaName: 'Dropdown',
    handbookSlug: 'dropdown',
    exportName: 'FmsDropdown',
    importPath: '@fms/ui',
    status: 'planned',
  },
  {
    id: 'input',
    figmaName: 'Input',
    handbookSlug: 'input',
    exportName: 'FmsInput',
    importPath: '@fms/ui',
    status: 'planned',
  },
  {
    id: 'side-menu-bar',
    figmaName: 'Side Menu Bar',
    exportName: 'FmsSideMenu',
    importPath: '@fms/ui',
    status: 'planned',
  },
  {
    id: 'header-bar',
    figmaName: 'Header Bar',
    exportName: 'FmsHeaderBar',
    importPath: '@fms/ui',
    status: 'planned',
  },
  {
    id: 'app-shell',
    figmaName: 'App Shell',
    exportName: 'FmsAppShell',
    importPath: '@fms/ui',
    status: 'planned',
  },
] as const;

export function catalogEntryForFigmaName(name: string) {
  const needle = name.trim().toLowerCase();
  return FMS_COMPONENT_CATALOG.find((entry) => entry.figmaName.toLowerCase() === needle);
}
