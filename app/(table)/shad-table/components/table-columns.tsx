import { ColumnDef } from "@tanstack/react-table";
import { Person } from "../make-data";
import { useMemo } from "react";
import { TableCheckbox } from "./table-checkbox";
import DataTableRowActions from "./table-row-actions";

export const TableColumns = () => {
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "firstName",
        header: "First Name",
        cell: ({ row, getValue }) => (
          <div
            style={{
              // 행.깊이 속성을 사용
              paddingLeft: `${row.depth * 2}rem`,
            }}
          >
            <>
              <TableCheckbox
                {...{
                  checked: row.getIsSelected(), // 해당 행이 선택되어 있는지 여부를 나타내는 속성
                  indeterminate: row.getIsSomeSelected(), // 행 중 일부만 선택되어 있는지 여부를 나타내는 속성. 이 함수는 다중 선택된 행이 있는지 여부를 확인하는 데 사용
                  onChange: row.getToggleSelectedHandler(), // 특정 행의 체크박스 또는 선택 상태를 토글하는 데 사용
                }}
              />{" "}
              {/* 해당 행이 확장 가능한지 여부를 반환하는 함수,그 하위 행이 존재하는 경우에만 true를 반환 */}
              {row.getCanExpand() ? (
                <button
                  style={{
                    cursor: "pointer",
                    backgroundColor: "red",
                  }}
                  onClick={() => {
                    row.getToggleExpandedHandler(); //해당 행이 이미 확장되어 있다면 축소하고, 축소되어 있다면 확장
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
      {
        accessorKey: "age",
        header: () => "Age",
        footer: (props) => props.column.id,
      },
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
        cell: ({ row }) => <DataTableRowActions row={row} />,
        footer: (props) => props.column.id,
      },
    ],
    []
  );
  return { columns };
};
