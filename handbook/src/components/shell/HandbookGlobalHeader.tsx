import { useLayoutEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HANDBOOK_TABS } from '../../config/navigation';
import { HANDBOOK_SHELL } from '../../figma/metrics';

function tabIsActive(matchPath: string, pathname: string) {
  if (matchPath === '/get-started') {
    return pathname.startsWith('/get-started');
  }
  if (matchPath === '/foundation') {
    return pathname.startsWith('/foundation');
  }
  return pathname === matchPath || pathname.startsWith(`${matchPath}/`);
}

export function HandbookGlobalHeader() {
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty(
        '--handbook-global-header-height',
        `${el.offsetHeight}px`,
      );
    };

    syncHeaderHeight();
    const observer = new ResizeObserver(syncHeaderHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={headerRef}
      className="handbook-global-header"
      style={{
        paddingLeft: HANDBOOK_SHELL.globalHeaderPaddingLeftPx,
        paddingRight: HANDBOOK_SHELL.globalHeaderPaddingRightPx,
        ['--handbook-global-header-tab-ink-bar' as string]: `${HANDBOOK_SHELL.globalHeaderTabInkBarPx}px`,
      }}
    >
      <span
        className="handbook-global-header__title"
        style={{
          paddingBlock: HANDBOOK_SHELL.globalHeaderTitlePaddingBlockPx,
        }}
      >
        FMS Design System Handbook
      </span>
      <nav
        className="handbook-global-header__tabs"
        aria-label="Handbook sections"
        style={{ gap: HANDBOOK_SHELL.globalHeaderTabGapPx }}
      >
        {HANDBOOK_TABS.map((tab) => {
          const active = tabIsActive(tab.matchPath, pathname);
          return (
            <NavLink
              key={tab.id}
              to={tab.href}
              className={[
                'handbook-global-header__tab',
                active ? 'handbook-global-header__tab--active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-current={active ? 'page' : undefined}
            >
              {tab.label}
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
}
