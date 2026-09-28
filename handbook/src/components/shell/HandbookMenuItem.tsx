import { NavLink, useLocation } from 'react-router-dom';

type Props = {
  label: string;
  href?: string;
  iconClass?: string;
  /** Root row (40px inset) vs nested child (64px inset). */
  depth?: 'root' | 'nested';
};

function hrefPathname(href: string) {
  return href.split('#')[0];
}

function isHandbookNavActive(pathname: string, href: string): boolean {
  const path = hrefPathname(href);
  if (pathname === path) return true;
  if (path === '/get-started' || path === '/foundation') {
    return pathname === path;
  }
  if (path === '/components') {
    return pathname === '/components';
  }
  return pathname.startsWith(`${path}/`);
}

/** Figma hb-menu-item 150:2225 — child / leaf row */
export function HandbookMenuItem({
  label,
  href,
  iconClass,
  depth = 'nested',
}: Props) {
  const { pathname } = useLocation();

  if (!href) {
    return (
      <span
        className={[
          'hb-menu-item',
          'hb-menu-item--placeholder',
          depth === 'root' ? 'hb-menu-item--root' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {label}
      </span>
    );
  }

  return (
    <NavLink
      to={href}
      className={() =>
        [
          'hb-menu-item',
          depth === 'root' ? 'hb-menu-item--root' : '',
          iconClass && depth === 'root' ? 'hb-menu-item--with-icon' : '',
          isHandbookNavActive(pathname, href) ? 'hb-menu-item--active' : '',
        ]
          .filter(Boolean)
          .join(' ')
      }
    >
      {iconClass && depth === 'root' ? (
        <i className={`${iconClass} hb-menu-item__icon`} aria-hidden />
      ) : null}
      <span className="hb-menu-item__label">{label}</span>
    </NavLink>
  );
}
