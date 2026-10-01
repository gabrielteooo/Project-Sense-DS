import { Navigate, useParams } from 'react-router-dom';
import { getComponentDoc } from '../config/componentDocs';
import { getComponentDocRaw } from '../config/componentDocRaw';
import { ButtonDesignTab } from '../components/components/ButtonDesignTab';
import { ComponentDesignTab } from '../components/components/ComponentDesignTab';
import { ComponentDocTabs } from '../components/components/ComponentDocTabs';
import { ComponentUpdatesTab } from '../components/components/ComponentUpdatesTab';
import { ButtonUsageTab } from '../components/components/ButtonUsageTab';
import { ComponentUsageTab } from '../components/components/ComponentUsageTab';
import { ComponentPageTemplateDesignTab } from '../components/component-page-template/ComponentPageTemplateDesignTab';
import { ComponentPageTemplateUsageTab } from '../components/component-page-template/ComponentPageTemplateUsageTab';
import { ComponentPageTemplateUpdatesTab } from '../components/component-page-template/ComponentPageTemplateUpdatesTab';
import { normalizeChangelogRows } from '../components/component-page-template/validateComponentPageTemplate';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';
import { useComponentDocTab } from '../hooks/useComponentDocTab';
import { isComponentPageTemplateV2 } from '../types/componentPageTemplate';

export function ComponentDocPage() {
  const { slug } = useParams<{ slug: string }>();
  const doc = slug ? getComponentDoc(slug) : undefined;
  const raw = slug ? getComponentDocRaw(slug) : undefined;
  const template = isComponentPageTemplateV2(raw) ? raw : undefined;
  const tabs = template ? normalizeChangelogRows(template.tabs) : undefined;
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
        {template && tabs && activeTab === 'design' ? (
          <ComponentPageTemplateDesignTab tab={tabs.design} />
        ) : null}
        {template && tabs && activeTab === 'usage' ? (
          <ComponentPageTemplateUsageTab tab={tabs.usage} />
        ) : null}
        {template && tabs && activeTab === 'updates' ? (
          <ComponentPageTemplateUpdatesTab tab={tabs.updates} />
        ) : null}
        {!template && activeTab === 'design' && slug === 'button' ? <ButtonDesignTab /> : null}
        {!template && activeTab === 'design' && slug !== 'button' ? (
          <ComponentDesignTab doc={doc} />
        ) : null}
        {!template && activeTab === 'usage' && slug === 'button' ? <ButtonUsageTab /> : null}
        {!template && activeTab === 'usage' && slug !== 'button' ? (
          <ComponentUsageTab doc={doc} />
        ) : null}
        {!template && activeTab === 'updates' ? <ComponentUpdatesTab doc={doc} /> : null}
      </div>
    </article>
  );
}
