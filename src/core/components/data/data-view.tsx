import type { PaginationData } from '@/core/types/response';
import type { ColumnDef, Row, VisibilityState } from '@tanstack/react-table';
import type { Dispatch, SetStateAction } from 'react';

import React, { useState } from 'react';

import { DataPaginator } from '@/core/components/data/data-paginator';
import { DataSearch } from '@/core/components/data/data-search';
import { DataTable } from '@/core/components/data/data-table';
import { DataTableColumnSelector } from '@/core/components/data/data-table-column-selector';
import { DataViewToggle } from '@/core/components/data/data-view-toggle';
import { useUpdateEffect } from '@/core/hooks/use-update-effect';
import {
  getColumnsPreference,
  getViewModePreference,
  setColumnsPreference,
  setViewModePreference,
} from '@/core/lib/data-view';
import { cn } from '@/core/lib/utils';

export function DataView<TData>({
  preferencesNamespace,
  items,
  selectedItems,
  setSelectedItems,
  pagination,
  dataTableColumnsSettings,
  dataTableDefaultVisibleColumns = {},
  dataTableGetRowId,
  dataTableGetRowCanSelect,
  dataGridCardSlot,
  className,
  dataGridClassName,
  ...restOfProps
}: DataViewProps<TData>) {
  const [viewMode, setViewMode] = useState(() =>
    dataGridCardSlot ? getViewModePreference(preferencesNamespace) : 'table',
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    () =>
      getColumnsPreference(
        preferencesNamespace,
        dataTableDefaultVisibleColumns,
      ),
  );

  useUpdateEffect(() => {
    setColumnsPreference(preferencesNamespace, columnVisibility);
  }, [columnVisibility]);
  useUpdateEffect(() => {
    setViewModePreference(preferencesNamespace, viewMode);
  }, [viewMode]);

  return (
    <div className={cn('flex flex-col gap-2', className)} {...restOfProps}>
      <div className="flex justify-between gap-2">
        <div className="grow flex gap-2">
          <DataSearch className="w-0 grow" />
        </div>
        <div className="flex gap-2">
          {viewMode === 'table' && (
            <DataTableColumnSelector
              columns={dataTableColumnsSettings}
              visibilityState={columnVisibility}
              setVisibilityState={setColumnVisibility}
            />
          )}
          {dataGridCardSlot && (
            <DataViewToggle viewMode={viewMode} setViewMode={setViewMode} />
          )}
        </div>
      </div>
      {viewMode === 'table' && (
        <DataTable
          data={items}
          columns={dataTableColumnsSettings}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          getRowId={dataTableGetRowId}
          getRowCanSelect={dataTableGetRowCanSelect}
          className="animate-in fade-in duration-300"
        />
      )}
      {dataGridCardSlot && viewMode === 'grid' && (
        <div
          className={cn(
            'grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-2',
            'animate-in fade-in duration-300',
            dataGridClassName,
          )}
        >
          {items.map(dataGridCardSlot)}
        </div>
      )}
      <DataPaginator
        className="mt-auto"
        currentPage={pagination.currentPage}
        pageSize={pagination.pageSize}
        totalItems={pagination.totalItems}
      />
    </div>
  );
}

export type DataViewProps<TData> = {
  // Persistence related
  preferencesNamespace: string;
  // data related
  items: TData[];
  pagination: PaginationData;
  selectedItems?: TData[];
  setSelectedItems?: Dispatch<SetStateAction<TData[]>>;
  // For table
  dataTableColumnsSettings: ColumnDef<TData>[];
  dataTableDefaultVisibleColumns?: VisibilityState;
  dataTableGetRowId?: (row: TData, idx: number) => string;
  dataTableGetRowCanSelect?: (row: Row<TData>) => boolean;
  // For Grid
  dataGridCardSlot?: (item: TData) => React.JSX.Element;
  dataGridClassName?: string;
} & React.ComponentProps<'div'>;
