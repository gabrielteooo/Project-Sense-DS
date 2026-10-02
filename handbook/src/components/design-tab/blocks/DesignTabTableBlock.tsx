import { HandbookDocTable } from '../../foundation/HandbookDocTable';
import type { DesignTabTable } from '../../../types/designTab';

type Props = {
  table: DesignTabTable;
};

export function DesignTabTableBlock({ table }: Props) {
  if (!table.rows.length) {
    return null;
  }
  return (
    <div className="design-tab-table-block">
      <HandbookDocTable
        columns={table.columns}
        rows={table.rows}
        columnTooltips={table.columnTooltips}
      />
    </div>
  );
}
