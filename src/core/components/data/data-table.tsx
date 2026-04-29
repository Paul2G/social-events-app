import type {
  ColumnDef,
  OnChangeFn,
  Row,
  RowSelectionState,
  VisibilityState,
} from '@tanstack/react-table';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { DataTableColumnSelector } from '@/core/components/data/data-table-column-selector';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/components/ui/table';

export function DataTable<TData>({
  data,
  columns,
  columnVisibility,
  rowSelection = {},
  setColumnVisibility,
  setRowSelection,
  // @ts-expect-error - idx is only used as fallback, so it will never be used if row has no id
  getRowId = (row, idx) => String(row?.id ?? idx),
  getRowCanSelect,
  headerSlot,
}: DataTableProps<TData>) {
  const { t } = useTranslation();

  const table = useReactTable({
    data,
    columns,
    enableRowSelection:
      getRowCanSelect ?? Boolean(setRowSelection && rowSelection),
    getRowId,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="flex gap-2">
        {headerSlot}
        <DataTableColumnSelector table={table} className="ml-auto" />
      </div>
      <div className="overflow-hidden rounded-md border animate-in fade-in duration-300">
        <Table>
          <TableHeader className="bg-muted sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {t('dialogs.noResultsFound')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export type DataTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  columnVisibility: VisibilityState;
  rowSelection?: RowSelectionState;
  setColumnVisibility: OnChangeFn<VisibilityState>;
  setRowSelection?: OnChangeFn<RowSelectionState>;
  getRowId?: (row: TData, idx: number) => string;
  getRowCanSelect?: (row: Row<TData>) => boolean;
  headerSlot?: React.ReactNode;
};
