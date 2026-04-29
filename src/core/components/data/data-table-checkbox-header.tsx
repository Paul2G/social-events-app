import type { HeaderContext } from '@tanstack/react-table';

import { Checkbox } from '@/core/components/ui/checkbox';

export function DataTableCheckboxHeader<TData>({
  table,
}: DataTableCheckboxHeaderProps<TData>) {
  return (
    <Checkbox
      className="max-sm:size-5"
      checked={table.getIsAllRowsSelected()}
      onClick={table.getToggleAllRowsSelectedHandler()}
    />
  );
}

export type DataTableCheckboxHeaderProps<TData> = HeaderContext<TData, unknown>;
