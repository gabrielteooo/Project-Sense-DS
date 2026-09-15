import { useCallback, useState } from 'react';
import type { HandbookNavItem } from '../../config/navigation';
import { HANDBOOK_NAV_DEFAULT_OPEN } from '../../config/navigation';
import { HANDBOOK_SHELL } from '../../figma/metrics';
import { handbookMenuItemPadding } from '../../utils/menuItemPadding';
import { HandbookMenuItem } from './HandbookMenuItem';
import { HandbookMenuSearch } from './HandbookMenuSearch';

type Props = {
  items: HandbookNavItem[];
};

function useOpenSections() {
  const [open, setOpen] = useState<Set<string>>(
    () => new Set(HANDBOOK_NAV_DEFAULT_OPEN),
  );

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

function childIndentLevel(parentId: string, parentIndent: number): number {
  if (parentId === 'colours') return parentIndent + 1;
  return parentIndent + 1;
}

function NavBranch({
  item,
  indentLevel,
  toggle,
  isOpen,
}: {
  item: HandbookNavItem;
  indentLevel: number;
  toggle: (id: string) => void;
  isOpen: (id: string) => boolean;
}) {
  const hasChildren = Boolean(item.children?.length);

  if (hasChildren) {
    const expanded = isOpen(item.id);
    return (
      <div className="handbook-menu__branch">
        <button
          type="button"
          className={[
            'handbook-menu-item handbook-menu-item--branch',
            item.id === 'colours' ? 'handbook-menu-item--section-title' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-expanded={expanded}
          style={handbookMenuItemPadding(indentLevel)}
          onClick={() => toggle(item.id)}
        >
          <span>{item.label}</span>
          <i
            className={`fa-solid fa-chevron-${expanded ? 'up' : 'down'} handbook-menu__chevron`}
            aria-hidden
          />
        </button>
        {expanded ? (
          <div
            className="handbook-menu__children"
            style={{ gap: HANDBOOK_SHELL.menuItemGapPx }}
          >
            {item.children!.map((child) => (
              <NavBranch
                key={child.id}
                item={child}
                indentLevel={childIndentLevel(item.id, indentLevel)}
                toggle={toggle}
                isOpen={isOpen}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <HandbookMenuItem
      label={item.label}
      href={item.href}
      indentLevel={indentLevel}
      end={item.href === '/foundation/colours/base'}
    />
  );
}

export function HandbookMenu({ items }: Props) {
  const { toggle, isOpen } = useOpenSections();

  return (
    <nav
      className="handbook-menu"
      aria-label="Design system"
      style={{
        width: HANDBOOK_SHELL.sidebarWidthPx,
        paddingTop: HANDBOOK_SHELL.menuPaddingTopPx,
        paddingInline: HANDBOOK_SHELL.menuPaddingInlinePx,
      }}
    >
      <HandbookMenuSearch />
      {items.map((item) => (
        <NavBranch
          key={item.id}
          item={item}
          indentLevel={0}
          toggle={toggle}
          isOpen={isOpen}
        />
      ))}
    </nav>
  );
}
