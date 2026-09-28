import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { HandbookNavItem } from '../../config/navigation';
import { navBranchIdsForPathname } from '../../config/navigation';
import { HANDBOOK_SHELL } from '../../figma/metrics';
import { HandbookMenuItem } from './HandbookMenuItem';
import { HandbookSubmenuTitle } from './HandbookSubmenuTitle';

type Props = {
  items: HandbookNavItem[];
};

function useOpenSections(items: HandbookNavItem[], pathname: string) {
  const [open, setOpen] = useState<Set<string>>(
    () => new Set(navBranchIdsForPathname(items, pathname)),
  );

  useEffect(() => {
    setOpen(new Set(navBranchIdsForPathname(items, pathname)));
  }, [pathname, items]);

  const toggle = useCallback((id: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return { open, toggle, isOpen: (id: string) => open.has(id) };
}

function NavBranch({
  item,
  depth,
  menuVariant,
  toggle,
  isOpen,
}: {
  item: HandbookNavItem;
  depth: 'root' | 'nested';
  menuVariant: MenuProps['variant'];
  toggle: (id: string) => void;
  isOpen: (id: string) => boolean;
}) {
  const leafDepth =
    menuVariant === 'components' ? 'nested' : depth;
  const hasChildren = Boolean(item.children?.length);

  if (hasChildren) {
    const expanded = isOpen(item.id);
    return (
      <div className="handbook-menu__section">
        {expanded ? (
          <div className="handbook-menu__open">
            <HandbookSubmenuTitle
              label={item.label}
              iconClass={item.iconClass}
              expanded={expanded}
              active
              onToggle={() => toggle(item.id)}
            />
            <div className="handbook-menu__list">
              {item.children!.map((child) => (
                <NavBranch
                  key={child.id}
                  item={child}
                  depth="nested"
                  menuVariant={menuVariant}
                  toggle={toggle}
                  isOpen={isOpen}
                />
              ))}
            </div>
          </div>
        ) : (
          <HandbookSubmenuTitle
            label={item.label}
            iconClass={item.iconClass}
            expanded={false}
            active={false}
            onToggle={() => toggle(item.id)}
          />
        )}
      </div>
    );
  }

  return (
    <HandbookMenuItem
      label={item.label}
      href={item.href}
      iconClass={item.iconClass}
      depth={leafDepth}
    />
  );
}

type MenuProps = Props & {
  variant?: 'default' | 'get-started' | 'components';
};

/** Figma Side-menu 151:2442 — hb-submenu-title + hb-menu-item */
export function HandbookMenu({ items, variant = 'default' }: MenuProps) {
  const { pathname } = useLocation();
  const { toggle, isOpen } = useOpenSections(items, pathname);

  const branches = items.map((item) => {
    if (item.divider) {
      return <hr key={item.id} className="handbook-menu__divider" />;
    }
    return (
      <NavBranch
        key={item.id}
        item={item}
        depth="root"
        menuVariant={variant}
        toggle={toggle}
        isOpen={isOpen}
      />
    );
  });

  return (
    <nav
      className={[
        'handbook-menu',
        variant === 'get-started' ? 'handbook-menu--get-started' : '',
        variant === 'components' ? 'handbook-menu--components' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="Design system"
      style={{
        width: HANDBOOK_SHELL.sidebarWidthPx,
        paddingTop: HANDBOOK_SHELL.menuPaddingTopPx,
        ['--handbook-menu-section-gap' as string]: `${HANDBOOK_SHELL.menuSectionGapPx}px`,
      }}
    >
      {branches}
    </nav>
  );
}
