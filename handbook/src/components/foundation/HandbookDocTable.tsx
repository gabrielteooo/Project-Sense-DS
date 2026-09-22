type Props = {
  columns: string[];
  rows: string[][];
  className?: string;
};

/** Doc tables — same shell as foundation token tables (`base-colour-table-wrap`) */
export function HandbookDocTable({ columns, rows, className }: Props) {
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
                {column}
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
