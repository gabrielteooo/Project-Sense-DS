import { Navigate, useParams } from 'react-router-dom';
import { getComponentDoc } from '../config/componentDocs';
import { ButtonDesignTab } from '../components/components/ButtonDesignTab';
import { ComponentDesignTab } from '../components/components/ComponentDesignTab';
import { ComponentDocTabs } from '../components/components/ComponentDocTabs';
import { ComponentUpdatesTab } from '../components/components/ComponentUpdatesTab';
import { ButtonUsageTab } from '../components/components/ButtonUsageTab';
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
    <article className={`component-doc-page${slug === 'button' ? ' component-doc-page--button' : ''}`}>
      <div className="component-doc-page__header">
        <HandbookPageHeader
          title={doc.pageTitle}
          description={doc.pageDescription}
          noBottomSpacing={slug === 'button'}
        />
        <ComponentDocTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div
        role="tabpanel"
        id={`component-tabpanel-${activeTab}`}
        aria-labelledby={`component-tab-${activeTab}`}
        className="component-doc-page__panel"
      >
        {activeTab === 'design' && slug === 'button' ? <ButtonDesignTab /> : null}
        {activeTab === 'design' && slug !== 'button' ? <ComponentDesignTab doc={doc} /> : null}
        {activeTab === 'usage' && slug === 'button' ? <ButtonUsageTab /> : null}
        {activeTab === 'usage' && slug !== 'button' ? <ComponentUsageTab doc={doc} /> : null}
        {activeTab === 'updates' ? <ComponentUpdatesTab doc={doc} /> : null}
      </div>
    </article>
  );
}
