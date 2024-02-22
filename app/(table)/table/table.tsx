"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  OnChangeFn,
  getFacetedRowModel,
  getFacetedUniqueValues,
  RowSelectionState,
  RowData,
  Row,
} from "@tanstack/react-table";

import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
} from "@/components/ui/table";

import { SelectedCount } from "./selectedCount";
import { PageIndex } from "./pageIndex";
import { Pagination } from "./pagination";
import { PageSize } from "./pageSize";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalCount: number;
  setPagination: OnChangeFn<PaginationState>;
  pageIndex: number;
  pageSize: number;
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  setRowSelection: OnChangeFn<RowSelectionState>;
  rowSelection: RowSelectionState;
  setSelectedRows?: React.Dispatch<React.SetStateAction<RowData>[]>;
  selectedRowsReset?: Boolean;
  pageSizeView?: Boolean;
  pageIndexView?: Boolean;
  selectedCountView?: Boolean;
  paginationBtn?: Boolean;
  headRender?: React.ReactElement;
  rowRender?: React.ReactElement;
  className?: string | undefined;
  placeholder?: string | React.ReactElement;
  onRowClick?: (row: TData) => void;
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean) | undefined;
}

export function useTableState() {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedRows, setSelectedRows] = useState<RowData[]>([]);
  const [selectedRowsReset, setSelectedRowsReset] = useState<Boolean>(false);

  const resetSorting = () => {
    setSorting([]);
  };

  const resetPageIndex = () => {
    setPagination({ pageIndex: 0, pageSize: pageSize });
  };

  const reset = () => {
    setSelectedRowsReset(true);
    setRowSelection({});
  };

  useEffect(() => {
    resetPageIndex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize]);

  return {
    pageIndex,
    pageSize,
    setPagination,
    setSorting,
    sorting,
    resetSorting,
    setRowSelection,
    rowSelection,
    setSelectedRows,
    selectedRows,
    selectedRowsReset,
    resetPageIndex,
    reset,
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalCount,
  setPagination,
  pageIndex,
  pageSize,
  sorting,
  setSorting,
  setRowSelection,
  rowSelection,
  setSelectedRows,
  selectedRowsReset,
  selectedCountView = true,
  pageSizeView = true,
  pageIndexView = true,
  paginationBtn = true,
  enableRowSelection = true,
  headRender,
  rowRender,
  className,
  placeholder,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const pagination = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  );

  const defaultData = useMemo(() => [], []);

  useEffect(() => {
    if (!!data) {
      setRowSelection({});
    }
  }, [data, setRowSelection]);

  // 테이블 기능 설정
  const table = useReactTable({
    data: data ?? defaultData,
    columns,
    pageCount: totalCount,
    state: {
      sorting,
      rowSelection,
      columnFilters,
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,

    /* 열 선택 기능*/
    // enableRowSelection: true,
    enableRowSelection: enableRowSelection,
    onRowSelectionChange: setRowSelection,

    /* 정렬 기능 */
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    /* 검색 창 */
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    /* 페이지 네이션 관련 */
    getPaginationRowModel: getPaginationRowModel(),

    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  useEffect(() => {
    if (setSelectedRows) {
      setSelectedRows(table.getSelectedRowModel().flatRows);
    }
  }, [table, rowSelection, setSelectedRows]);

  useEffect(() => {
    if (selectedRowsReset) {
      table.resetRowSelection();
    }
  }, [selectedRowsReset, table]);

  const checkHead =
    !!headRender ||
    pageSizeView ||
    pageIndexView ||
    paginationBtn ||
    selectedCountView;

  return (
    <>
      <div className="flex h-full flex-col">
        {checkHead && (
          <div className="flex h-[49px] items-center justify-between border-t-[1px] p-3 ">
            <div className="flex items-center">
              {headRender &&
                React.cloneElement(headRender, {
                  rows: table.getSelectedRowModel().flatRows,
                })}
              <div>{selectedCountView && <SelectedCount table={table} />}</div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center gap-[30px]">
                {pageSizeView && <PageSize table={table} />}
                {pageIndexView && <PageIndex table={table} />}
                {paginationBtn && <Pagination table={table} />}
              </div>
            </div>
          </div>
        )}

        <div className={cn("border-b-[1px] border-t-[2px]", className)}>
          <div className="overflow-auto">
            <Table>
              <TableHeader className="sticky top-[-1px]  z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="p-0 text-sm font-normal text-slate-800"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
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
                      className="group relative hover:bg-slate-50"
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          onClick={
                            !!onRowClick
                              ? () => onRowClick(cell?.row?.original)
                              : () => {}
                          }
                          className={cn(
                            "text-slate-800",
                            !!onRowClick && "cursor-pointer"
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                      {/* Hover 시 보여지는 컴포넌트 */}
                      {rowRender && (
                        <TableCell className="absolute right-0 hidden h-full items-center justify-center bg-inherit opacity-70 group-hover:flex">
                          {React.cloneElement(rowRender, { row })}
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 break-keep text-center"
                    >
                      {!!placeholder ? placeholder : "No results."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
