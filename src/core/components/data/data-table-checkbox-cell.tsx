import type { CellContext } from '@tanstack/react-table';

import { Checkbox } from '@/core/components/ui/checkbox';

export function DataTableCheckboxCell<TData>({
  row,
}: DataTableCheckboxCellProps<TData>) {
  return (
    <Checkbox
      className="max-sm:size-5"
      checked={row.getIsSelected()}
      disabled={!row.getCanSelect()}
      onClick={row.getToggleSelectedHandler()}
    />
  );
}

export type DataTableCheckboxCellProps<TData> = CellContext<TData, unknown>;
