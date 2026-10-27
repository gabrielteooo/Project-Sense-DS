import type { DesignTabLegendItem } from '../../../types/designTab';

type Props = {
  items: DesignTabLegendItem[];
};

export function DesignTabLegend({ items }: Props) {
  return (
    <ol className="component-doc-anatomy-list design-tab-legend">
      {items.map((part) => (
        <li key={part.label} className="component-doc-anatomy-list__item">
          <strong>{part.label}</strong>
          {' — '}
          {part.description}
        </li>
      ))}
    </ol>
  );
}
