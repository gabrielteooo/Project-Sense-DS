import { HANDBOOK_SHELL } from '../../figma/metrics';

export function HandbookMenuSearch() {
  return (
    <div
      className="handbook-menu__search"
      style={{ marginBottom: HANDBOOK_SHELL.menuSearchMarginBottomPx }}
    >
      <input
        type="search"
        className="handbook-menu__search-input"
        placeholder="Search"
        aria-label="Search handbook"
        style={{ height: HANDBOOK_SHELL.menuSearchHeightPx }}
      />
      <button
        type="button"
        className="handbook-btn handbook-btn--tertiary handbook-btn--icon-only handbook-menu__search-button"
        aria-label="Search"
        style={{
          width: HANDBOOK_SHELL.menuSearchIconButtonPx,
          height: HANDBOOK_SHELL.menuSearchIconButtonPx,
        }}
      >
        <i className="fa-solid fa-magnifying-glass" aria-hidden />
      </button>
    </div>
  );
}
