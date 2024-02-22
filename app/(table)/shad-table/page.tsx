"use client";
import React, { useState, HTMLProps, useRef, useEffect, useMemo } from "react";

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
import { Person, makeData } from "./make-data";
import {
  ColumnDef,
  ExpandedState,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  flexRender,
} from "@tanstack/react-table";

const ShadTable = () => {
  const [data, setData] = useState(() => makeData(100));
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        header: "Name",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "firstName",
            header: ({ table }) => (
              <>
                <IndeterminateCheckbox
                  {...{
                    checked: table.getIsAllRowsSelected(), //현재 모든 행이 선택되었는지 여부를 판별, 헤더 부분에 위치한 "전체 선택" 체크박스의 상태를 결정하는 데 사용
                    indeterminate: table.getIsSomeRowsSelected(), //일부만 선택된 상태여부 판별
                    onChange: table.getToggleAllRowsSelectedHandler(), //모든 행의 확장 또는 축소 상태를 전환
                  }}
                />{" "}
                <button
                  {...{
                    onClick: table.getToggleAllRowsExpandedHandler(), //해당 테이블의 모든 행이 확장되어 있는지 여부를 나타내는 속성
                  }}
                >
                  {table.getIsAllRowsExpanded() ? "👇" : "👉"}
                </button>{" "}
                First Name
              </>
            ),
            cell: ({ row, getValue }) => (
              <div
                style={{
                  // 행.깊이 속성을 사용
                  paddingLeft: `${row.depth * 2}rem`,
                }}
              >
                <>
                  <IndeterminateCheckbox
                    {...{
                      checked: row.getIsSelected(), // 해당 행이 선택되어 있는지 여부를 나타내는 속성
                      indeterminate: row.getIsSomeSelected(), // 행 중 일부만 선택되어 있는지 여부를 나타내는 속성. 이 함수는 다중 선택된 행이 있는지 여부를 확인하는 데 사용
                      onChange: row.getToggleSelectedHandler(), // 특정 행의 체크박스 또는 선택 상태를 토글하는 데 사용
                    }}
                  />{" "}
                  {/* 해당 행이 확장 가능한지 여부를 반환하는 함수,그 하위 행이 존재하는 경우에만 true를 반환 */}
                  {row.getCanExpand() ? (
                    <button
                      {...{
                        onClick: row.getToggleExpandedHandler(), //해당 행이 이미 확장되어 있다면 축소하고, 축소되어 있다면 확장
                        style: { cursor: "pointer" },
                      }}
                    >
                      {/* 각 행의 확장 여부를 관리하는 데 사용 */}
                      {row.getIsExpanded() ? "👇" : "👉"}
                    </button>
                  ) : (
                    "🔵"
                  )}{" "}
                  {getValue()}
                </>
              </div>
            ),
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.lastName,
            id: "lastName",
            cell: (info) => info.getValue(),
            header: () => <span>Last Name</span>,
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: "Info",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "age",
            header: () => "Age",
            footer: (props) => props.column.id,
          },
          {
            header: "More Info",
            columns: [
              {
                accessorKey: "visits",
                header: () => <span>Visits</span>,
                footer: (props) => props.column.id,
              },
              {
                accessorKey: "status",
                header: "Status",
                footer: (props) => props.column.id,
              },
              {
                accessorKey: "progress",
                header: "Profile Progress",
                footer: (props) => props.column.id,
              },
            ],
          },
        ],
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
  });

  return (
    <Table
      style={{
        backgroundColor: "ghostwhite",
      }}
    >
      <TableCaption>shadcn-table</TableCaption>
      <TableHeader
        style={{
          backgroundColor: "tomato",
        }}
      >
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <TableHead>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  )}
                </th>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows.map((row) => {
          return (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>

      <TableFooter>
        <TableRow
          style={{
            backgroundColor: "tomato",
          }}
        >
          {/* 페이지 이동하는 부분 */}
          <TableCell colSpan={5}>
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
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              | Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
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
          </TableCell>
          <div>{table.getRowModel().rows.length} Rows</div>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default ShadTable;

// 체크박스 선택
const IndeterminateCheckbox = ({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
};
