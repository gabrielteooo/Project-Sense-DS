import { HANDBOOK_SHELL } from '../figma/metrics';

/** Figma 1:12439 bar gutter + 1:10814 row padding and nested indent */
export function handbookMenuItemPadding(indentLevel: number) {
  const base = HANDBOOK_SHELL.menuItemPaddingInlinePx;
  return {
    minHeight: HANDBOOK_SHELL.menuItemHeightPx,
    paddingRight: base,
    paddingLeft: base + indentLevel * HANDBOOK_SHELL.menuSubIndentPx,
  };
}
