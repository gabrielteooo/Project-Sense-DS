import type { ReactNode } from 'react';

type Props = {
  rowSpan: number;
  children: ReactNode;
};

/** Merged table cell — inner fill stretches to full rowspan height (Figma self-stretch). */
export function HandbookDocTableRowspanCell({ rowSpan, children }: Props) {
  return (
    <td rowSpan={rowSpan} className="handbook-doc-table__rowspan-cell">
      <span className="handbook-doc-table__rowspan-cell-fill">{children}</span>
    </td>
  );
}
