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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TableColumns } from "./components/table-columns";
import { DataTablePagination } from "./components/table-pagination";

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
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2 ">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">React Table!</h2>
        </div>
      </div>
      <div className="space-y-4">
        {/* <TableToolbar table={table} /> */}
        <div className="rounded-md border">
          <Table
            style={{
              backgroundColor: "ghostwhite",
            }}
          >
            <TableCaption>shadcn-table</TableCaption>
            <TableHeader>
              {table?.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
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
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <TableCell
                            key={cell.id}
                            onClick={(e) => {
                              e.preventDefault();
                              console.log(">", row);
                            }}
                          >
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
                <DataTablePagination table={table} />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ShadTable;
