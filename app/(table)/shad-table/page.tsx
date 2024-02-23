"use client";
import React, { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { makeData } from "./make-data";
import {
  ExpandedState,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TableColumns } from "./components/table-columns";
import { TableCheckbox } from "./components/table-checkbox";

const ShadTable = () => {
  const [data, setData] = useState(() => makeData(100));
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const { columns } = TableColumns();

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded, //행의 확장 상태가 변경될 때마다 트리거
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), //정렬된 테이블
    getPaginationRowModel: getPaginationRowModel(), //페이지네이션된 테이블
    getFilteredRowModel: getFilteredRowModel(), //필터링된 테이블
    getExpandedRowModel: getExpandedRowModel(), //확장 상태를 토글
    debugTable: true, //테이블에 대해 디버그 모드를 활성화할지 여부
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted === false) return;

  return (
    <div className="space-y-4">
      {/* <TableToolbar table={table} /> */}
      <div className="rounded-md border">
        <Table
          style={{
            backgroundColor: "ghostwhite",
          }}
        >
          <TableCaption>shadcn-table</TableCaption>
          <TableHeader className="bg-blue-100">
            {table?.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableCheckbox
                  {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler(),
                  }}
                />
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <TableHead
                          style={{
                            cursor: header.column.getCanSort()
                              ? "pointer"
                              : "auto",
                            userSelect: "none",
                          }}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline">
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => header.column.getIsSorted()}
                                className="cursor-pointer"
                              >
                                🔼
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => header.column.getIsSorted()}
                                className="cursor-pointer"
                              >
                                🔽
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableHead>
                      )}
                    </th>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow key={row.id} onClick={() => alert(`${row.id}`)}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter className="bg-blue-100">
            <TableRow>
              {/* 페이지 이동하는 부분 */}
              <TableCell colSpan={5}>
                <div className="flex gap-1 items-center">
                  <p className="text-sm text-muted-foreground font-medium">
                    {table.getFilteredSelectedRowModel().rows.length}개 선택
                  </p>
                  <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    {"<<"}
                  </button>
                  <button
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    {"<"}
                  </button>
                  <button
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    {">"}
                  </button>
                  <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  >
                    {">>"}
                  </button>
                  {/* 가고 싶은 페이지를 input에 입력해 이동하는 부분 */}
                  <div className="flex items-center gap-1">
                    <p>Page</p>
                    <strong>
                      {table.getState().pagination.pageIndex + 1} of{" "}
                      {table.getPageCount()}
                    </strong>
                  </div>
                  <span className="flex items-center gap-1">
                    | Go to page:
                    <input
                      type="number"
                      defaultValue={table.getState().pagination.pageIndex + 1}
                      onChange={(e) => {
                        const page = e.target.value
                          ? Number(e.target.value) - 1
                          : 0;
                        table.setPageIndex(page);
                      }}
                      className="border p-1 rounded w-16"
                    />
                  </span>
                  {/* 페이지 사이즈 설정 */}
                  <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                      table.setPageSize(Number(e.target.value));
                    }}
                  >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
                  </select>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default ShadTable;
