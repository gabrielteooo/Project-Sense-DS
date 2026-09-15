/**
 * Figma — file 6kT7I28zU5LC7cedwE87Ce (Untitled).
 * Replace px values from Dev Mode when available.
 */
export const FIGMA_FILE_KEY = '6kT7I28zU5LC7cedwE87Ce';

export const FIGMA_NODES = {
  colourBaseFrame: '1:10452',
  globalHeader: '1:10878',
  globalHeaderBar: '1:10453',
  handbookContent: '1:11212',
  globalHeaderTabs: '1:12912',
  globalHeaderTab: '1:12914',
  handbookFrame: '1:10873',
  sideMenuBar: '1:12439',
  pageHeader: '1:10480',
  menuItem: '1:10814',
  baseColourTable: '1:10488',
  contrast: '1:10808',
  preview: '1:10805',
} as const;

export const HANDBOOK_VIEWPORT = {
  widthPx: 1440,
  minHeightPx: 1280,
} as const;

export const HANDBOOK_SHELL = {
  sidebarWidthPx: 280,
  globalHeaderPaddingLeftPx: 16,
  globalHeaderPaddingRightPx: 40,
  globalHeaderTitlePaddingBlockPx: 24,
  /** Tabs.Component.horizontalItemGutter */
  globalHeaderTabGapPx: 32,
  /** Tabs lineWidthBold / ink bar */
  globalHeaderTabInkBarPx: 2,
  menuSearchHeightPx: 40,
  menuSearchIconButtonPx: 32,
  menuSearchMarginBottomPx: 16,
  /** Figma content 1:11212 — 40px inset in 1160px main column */
  contentPaddingInlinePx: 40,
  contentPaddingBlockPx: 40,
  menuPaddingTopPx: 16,
  /** Figma side menu 1:12439 — horizontal gutter */
  menuPaddingInlinePx: 16,
  menuItemHeightPx: 40,
  /** Figma web-menu-item 1:10814 — padding inside each row */
  menuItemPaddingInlinePx: 16,
  menuItemGapPx: 4,
  menuSubIndentPx: 28,
  /** Figma page header 1:10480 — title to description */
  pageHeaderGapPx: 16,
  pageHeaderPaddingBottomPx: 32,
  pageHeaderMarginBottomPx: 32,
  paletteSectionGapPx: 48,
  paletteTitleMarginBottomPx: 8,
  paletteBodyGapPx: 24,
  previewHeightPx: 48,
  previewRadiusPx: 6,
  contrastGridGapPx: 12,
  tableRadiusPx: 6,
  /** Figma content 1:11212 */
  baseColourTableMaxWidthPx: 1080,
} as const;
