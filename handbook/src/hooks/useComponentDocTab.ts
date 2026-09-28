import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ComponentDocTabId } from '../types/componentDoc';

const TAB_IDS: ComponentDocTabId[] = ['design', 'usage', 'updates'];

function parseTabHash(hash: string): ComponentDocTabId {
  const id = hash.replace('#', '') as ComponentDocTabId;
  return TAB_IDS.includes(id) ? id : 'design';
}

export function useComponentDocTab(defaultTab: ComponentDocTabId = 'design') {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = useMemo(
    () => (location.hash ? parseTabHash(location.hash) : defaultTab),
    [location.hash, defaultTab],
  );

  useEffect(() => {
    if (!location.hash) {
      navigate({ hash: `#${defaultTab}` }, { replace: true });
    }
  }, [location.hash, defaultTab, navigate]);

  const setActiveTab = useCallback(
    (tab: ComponentDocTabId) => {
      navigate({ hash: `#${tab}` });
    },
    [navigate],
  );

  return { activeTab, setActiveTab };
}
