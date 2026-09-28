import { Navigate, useParams } from 'react-router-dom';
import { getComponentDoc } from '../config/componentDocs';
import { ComponentDesignTab } from '../components/components/ComponentDesignTab';
import { ComponentDocTabs } from '../components/components/ComponentDocTabs';
import { ComponentUpdatesTab } from '../components/components/ComponentUpdatesTab';
import { ComponentUsageTab } from '../components/components/ComponentUsageTab';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';
import { useComponentDocTab } from '../hooks/useComponentDocTab';

export function ComponentDocPage() {
  const { slug } = useParams<{ slug: string }>();
  const doc = slug ? getComponentDoc(slug) : undefined;
  const { activeTab, setActiveTab } = useComponentDocTab('design');

  if (!slug || !doc) {
    return <Navigate to="/components" replace />;
  }

  return (
    <article className="component-doc-page">
      <HandbookPageHeader title={doc.pageTitle} description={doc.pageDescription} />

      <ComponentDocTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div
        role="tabpanel"
        id={`component-tabpanel-${activeTab}`}
        aria-labelledby={`component-tab-${activeTab}`}
        className="component-doc-page__panel"
      >
        {activeTab === 'design' ? <ComponentDesignTab doc={doc} /> : null}
        {activeTab === 'usage' ? <ComponentUsageTab doc={doc} /> : null}
        {activeTab === 'updates' ? <ComponentUpdatesTab doc={doc} /> : null}
      </div>
    </article>
  );
}
