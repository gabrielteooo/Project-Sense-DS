import { NavLink } from 'react-router-dom';
import { handbookMenuItemPadding } from '../../utils/menuItemPadding';

type Props = {
  label: string;
  href?: string;
  indentLevel?: number;
  end?: boolean;
  sectionTitle?: boolean;
};

export function HandbookMenuItem({
  label,
  href,
  indentLevel = 0,
  end,
  sectionTitle = false,
}: Props) {
  const style = handbookMenuItemPadding(indentLevel);

  if (!href) {
    return (
      <span className="handbook-menu-item handbook-menu-item--placeholder" style={style}>
        {label}
      </span>
    );
  }

  return (
    <NavLink
      to={href}
      end={end}
      className={({ isActive }) =>
        [
          'handbook-menu-item',
          sectionTitle ? 'handbook-menu-item--section-title' : '',
          isActive ? 'handbook-menu-item--active' : '',
        ]
          .filter(Boolean)
          .join(' ')
      }
      style={style}
    >
      {label}
    </NavLink>
  );
}
