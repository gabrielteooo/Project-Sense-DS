import type { DesignTabDocument } from '../../types/designTab';
import { DesignTabSectionRenderer } from './DesignTabSectionRenderer';

type Props = {
  document: DesignTabDocument;
};

/** Shared Design tab layout — renders ordered sections from JSON. */
export function DesignTabPage({ document }: Props) {
  return (
    <div className="design-tab-page component-doc-tab component-doc-tab--button-design">
      {document.sections.map((section, index) => (
        <DesignTabSectionRenderer key={section.id} section={section} isFirst={index === 0} />
      ))}
    </div>
  );
}
