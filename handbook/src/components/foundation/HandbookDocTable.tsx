type Props = {
  columns: string[];
  rows: string[][];
  className?: string;
  /** Info icon + tooltip on column header (label → tooltip text) */
  columnTooltips?: Record<string, string>;
};

function DocTableHeaderCell({
  label,
  tooltip,
}: {
  label: string;
  tooltip?: string;
}) {
  const labelNode = (
    <span className="handbook-doc-table__header-text">{label}</span>
  );

  if (!tooltip) {
    return labelNode;
  }

  return (
    <span className="handbook-doc-table__header-label">
      {labelNode}
      <button
        type="button"
        className="handbook-doc-table__header-info"
        aria-label={tooltip}
      >
        <i className="fa-regular fa-circle-info" aria-hidden />
        <span className="handbook-doc-table__tooltip" role="tooltip">
          {tooltip}
        </span>
      </button>
    </span>
  );
}

/** Doc tables — same shell as foundation token tables (`base-colour-table-wrap`) */
export function HandbookDocTable({
  columns,
  rows,
  className,
  columnTooltips,
}: Props) {
  return (
    <div className={['base-colour-table-wrap', className].filter(Boolean).join(' ')}>
      <table className="base-colour-table handbook-doc-table">
        <colgroup>
          {columns.map((column) => (
            <col key={column} className="handbook-doc-table__col" />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col">
                <DocTableHeaderCell
                  label={column}
                  tooltip={columnTooltips?.[column]}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, rowIndex) => (
            <tr key={rowIndex}>
              {cells.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
