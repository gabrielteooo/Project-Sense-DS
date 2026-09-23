import { Outlet, useLocation } from 'react-router-dom';
import {
  HANDBOOK_FOUNDATIONS_NAV,
  HANDBOOK_GET_STARTED_NAV,
} from '../../config/navigation';
import { HANDBOOK_SHELL, HANDBOOK_VIEWPORT } from '../../figma/metrics';
import { HandbookGlobalHeader } from './HandbookGlobalHeader';
import { HandbookMenu } from './HandbookMenu';

/** Figma App shell 24027:126863 */
function sidebarNavForPath(pathname: string) {
  if (pathname.startsWith('/get-started')) {
    return HANDBOOK_GET_STARTED_NAV;
  }
  if (pathname.startsWith('/foundation')) {
    return HANDBOOK_FOUNDATIONS_NAV;
  }
  return [];
}

export function HandbookAppShell() {
  const { pathname } = useLocation();
  const sidebarItems = sidebarNavForPath(pathname);

  return (
    <div
      className="handbook-app-shell"
      style={{
        ['--handbook-layout-max-width' as string]: `${HANDBOOK_VIEWPORT.widthPx}px`,
      }}
    >
      <HandbookGlobalHeader />
      <div className="handbook-app-shell__frame">
        <div className="handbook-app-shell__body">
          <HandbookMenu
            items={sidebarItems}
            variant={pathname.startsWith('/get-started') ? 'get-started' : 'default'}
          />
          <div className="handbook-app-shell__main">
            <div
              className="handbook-app-shell__content"
              style={{
                paddingTop: HANDBOOK_SHELL.contentPaddingTopPx,
                paddingRight: HANDBOOK_SHELL.contentPaddingRightPx,
                paddingBottom: HANDBOOK_SHELL.contentPaddingBottomPx,
                paddingLeft: HANDBOOK_SHELL.contentPaddingLeftPx,
              }}
            >
              <div
                className="handbook-app-shell__content-inner"
                style={{
                  ['--handbook-base-colour-table-max-width' as string]: `${HANDBOOK_SHELL.baseColourTableMaxWidthPx}px`,
                  ['--handbook-base-colour-table-col-preview' as string]: `${HANDBOOK_SHELL.baseColourTableColPreviewPx}px`,
                  ['--handbook-base-colour-table-col-hex' as string]: `${HANDBOOK_SHELL.baseColourTableColHexPx}px`,
                  ['--handbook-base-colour-table-col-contrast' as string]: `${HANDBOOK_SHELL.baseColourTableColContrastPx}px`,
                  ['--handbook-base-colour-table-col-token' as string]: `${HANDBOOK_SHELL.baseColourTableColTokenPx}px`,
                }}
              >
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
