type Props = {
  label: string;
  iconClass?: string;
  expanded: boolean;
  /** Expanded section — primary label/chevron (Figma Active). */
  active: boolean;
  onToggle: () => void;
};

/** Figma hb-submenu-title 1:10815 — collapsible parent row */
export function HandbookSubmenuTitle({
  label,
  iconClass,
  expanded,
  active,
  onToggle,
}: Props) {
  return (
    <button
      type="button"
      className={[
        'hb-submenu-title',
        active ? 'hb-submenu-title--active' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-expanded={expanded}
      onClick={onToggle}
    >
      <span className="hb-submenu-title__label-group">
        {iconClass ? (
          <i className={`${iconClass} hb-submenu-title__icon`} aria-hidden />
        ) : null}
        <span className="hb-submenu-title__label">{label}</span>
      </span>
      <span className="hb-submenu-title__chevron-wrap" aria-hidden>
        <i
          className={`fa-regular fa-chevron-${expanded ? 'up' : 'down'} hb-submenu-title__chevron`}
        />
      </span>
    </button>
  );
}
