import type { ReactNode } from 'react';
import type { DesignTabHeadingLevel } from '../../../types/designTab';

export const DESIGN_TAB_SECTION_GAP = 40;
const SUBSECTION_GAP = 32;

type Props = {
  id: string;
  title: string;
  headingLevel: DesignTabHeadingLevel;
  description?: string;
  nested?: boolean;
  isFirst?: boolean;
  children: ReactNode;
};

export function DesignTabSection({
  id,
  title,
  headingLevel,
  description,
  nested,
  isFirst,
  children,
}: Props) {
  const titleId = `${id}-title`;
  const marginTop = isFirst ? undefined : nested ? SUBSECTION_GAP : DESIGN_TAB_SECTION_GAP;

  return (
    <section
      id={id}
      className={[
        'design-tab-section',
        'component-doc-section',
        nested ? 'design-tab-section--nested' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ marginTop }}
      aria-labelledby={titleId}
    >
      {headingLevel === 2 ? (
        <h2 id={titleId} className="component-doc-h2">
          {title}
        </h2>
      ) : (
        <h3 id={titleId} className="component-doc-h3">
          {title}
        </h3>
      )}
      {description ? <p className="component-doc-section__body">{description}</p> : null}
      {children}
    </section>
  );
}
