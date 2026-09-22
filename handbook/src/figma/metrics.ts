/**
 * Figma — file 6kT7I28zU5LC7cedwE87Ce (Untitled).
 * Replace px values from Dev Mode when available.
 */
export const FIGMA_FILE_KEY = '6kT7I28zU5LC7cedwE87Ce';

export const FIGMA_NODES = {
  colourBaseFrame: '1:10452',
  coloursOverviewPage: '91:1820',
  globalHeader: '1:10878',
  globalHeaderBar: '1:10453',
  handbookContent: '1:11212',
  globalHeaderTabs: '1:12912',
  globalHeaderTab: '1:12914',
  handbookFrame: '1:10873',
  sideMenuBar: '1:12439',
  foundationsSideMenuTypography: '62:21857',
  typographyTextSystemPage: '62:21858',
  spacingOverviewPage: '91:539',
  spacingMarginPage: '91:1117',
  spacingPaddingPage: '91:1701',
  iconsOverviewPage: '92:8259',
  iconsOverviewUsageHeaderFrame: '97:1041',
  iconsDeveloperGuidePage: '97:1152',
  writingGuidelinesPage: '100:2180',
  contentFormattingPage: '100:5465',
  numbersFormattingPage: '101:5532',
  dateTimeFormattingPage: '101:5789',
  resultsFormattingPage: '100:5465',
  pageHeader: '1:10480',
  menuItem: '1:10814',
  baseColourTable: '1:10488',
  tagDefault: '48:14196',
  tagColourValue: '58:15689',
  contrast: '1:10808',
  preview: '1:10805',
} as const;

export const HANDBOOK_VIEWPORT = {
  widthPx: 1440,
  minHeightPx: 1280,
} as const;

export const HANDBOOK_SHELL = {
  sidebarWidthPx: 280,
  globalHeaderPaddingLeftPx: 32,
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
  menuPaddingInlinePx: 24,
  menuItemHeightPx: 40,
  /** Figma web-menu-item 1:10814 — padding inside each row */
  menuItemPaddingInlinePx: 16,
  menuItemGapPx: 4,
  /** Figma side menu 62:21857 — gap between foundation sections (e.g. below Colours) */
  menuSectionGapPx: 8,
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
  /** Figma base colour table 1:10488 — fixed column widths (shared across palettes) */
  baseColourTableColPreviewPx: 140,
  baseColourTableColHexPx: 140,
  baseColourTableColContrastPx: 80,
  baseColourTableColTokenPx: 280,
} as const;
