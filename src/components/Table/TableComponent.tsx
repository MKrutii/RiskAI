'use client'

import React, { useEffect, useMemo, useState } from 'react'
import {
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'

import Filter from '@/components/Table/Filter'
import Asset from '@/types/asset'
import { useAssetData } from '@/components/Providers/AssetDataProvider'

export default function TableComponent() {
  const { activeAsset, activeYearData } = useAssetData()

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: 'Asset Name', value: activeAsset },
  ])
  const [globalFilter, setGlobalFilter] = useState('')
  const columns = useMemo<ColumnDef<Asset, any>[]>(
    () => [
      {
        accessorKey: 'Asset Name',
        header: 'Asset Name',
        cell: info => info.getValue(),
        footer: props => props.column.id,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'Lat',
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'Long',
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'Business Category',
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'Risk Rating',
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'Risk Factors',
        header: 'Risk Factors',
        cell: info => Object.entries(info.getValue())
          .map(([risk, val]) => <p key={info.cell.id}>{risk} : {Number(val).toFixed(2)}</p>),
        footer: props => props.column.id,
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'Year',
        cell: info => info.getValue(),
        enableSorting: false,
        enableColumnFilter: false,
      },
    ],
    [],
  )

  const table = useReactTable({
    data: activeYearData,
    columns,
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  })

  useEffect(() => {
    setColumnFilters(filters => [...filters.filter(f => f.id !== 'Asset Name'), { id: 'Asset Name', value: activeAsset }])
  }, [activeAsset])

  return (
    <div className="overflow-x-auto">
      <table className="table table-compact table-zebra w-full">
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : (
                  <>
                    <div
                      {...{
                        className: header.column.getCanSort() ? 'cursor-pointer select-none m-2' : 'm-2',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                    {header.column.getCanFilter() ? (
                      <div>
                        <Filter column={header.column} table={table} />
                      </div>
                    ) : null}
                  </>
                )}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="btn btn-primary p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {' << '}
        </button>
        <button
          className="btn btn-primary p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {' < '}
        </button>
        <button
          className="btn btn-primary p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {' > '}
        </button>
        <button
          className="btn btn-primary p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {' >> '}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="input input-bordered w-20"
          />
        </span>
        <span>{table.getPrePaginationRowModel().rows.length} Rows</span>
      </div>
    </div>
  )
}
