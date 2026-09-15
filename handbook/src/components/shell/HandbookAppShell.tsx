import { Outlet, useLocation } from 'react-router-dom';
import { HANDBOOK_FOUNDATIONS_NAV } from '../../config/navigation';
import { HANDBOOK_SHELL } from '../../figma/metrics';
import { HandbookGlobalHeader } from './HandbookGlobalHeader';
import { HandbookMenu } from './HandbookMenu';

/** Figma App shell 24027:126863 */
function sidebarNavForPath(pathname: string) {
  if (pathname.startsWith('/foundation')) {
    return HANDBOOK_FOUNDATIONS_NAV;
  }
  return [];
}

export function HandbookAppShell() {
  const { pathname } = useLocation();
  const sidebarItems = sidebarNavForPath(pathname);

  return (
    <div className="handbook-app-shell">
      <HandbookGlobalHeader />
      <div className="handbook-app-shell__body">
        <HandbookMenu items={sidebarItems} />
        <div className="handbook-app-shell__main">
          <div
            className="handbook-app-shell__content"
            style={{
              paddingInline: HANDBOOK_SHELL.contentPaddingInlinePx,
              paddingBlock: HANDBOOK_SHELL.contentPaddingBlockPx,
            }}
          >
            <div
              className="handbook-app-shell__content-inner"
              style={{
                ['--handbook-base-colour-table-max-width' as string]: `${HANDBOOK_SHELL.baseColourTableMaxWidthPx}px`,
              }}
            >
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
