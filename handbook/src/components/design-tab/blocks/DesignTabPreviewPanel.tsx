import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  label?: string;
};

/** Bordered preview canvas for configuration / colour demos (Figma preview panel). */
export function DesignTabPreviewPanel({ children, label = 'Component preview' }: Props) {
  return (
    <div className="design-tab-preview-panel component-doc-figure-block" aria-label={label}>
      <div className="design-tab-preview-panel__inner">{children}</div>
    </div>
  );
}
