import type { ComponentDocTabId } from '../../types/componentDoc';

const TABS: { id: ComponentDocTabId; label: string }[] = [
  { id: 'design', label: 'Design' },
  { id: 'usage', label: 'Usage' },
  { id: 'updates', label: 'Updates' },
];

type Props = {
  activeTab: ComponentDocTabId;
  onTabChange: (tab: ComponentDocTabId) => void;
};

export function ComponentDocTabs({ activeTab, onTabChange }: Props) {
  return (
    <div
      className="component-doc-tabs"
      role="tablist"
      aria-label="Component documentation sections"
    >
      {TABS.map((tab) => {
        const selected = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`component-tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`component-tabpanel-${tab.id}`}
            className={[
              'component-doc-tabs__tab',
              selected ? 'component-doc-tabs__tab--active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
