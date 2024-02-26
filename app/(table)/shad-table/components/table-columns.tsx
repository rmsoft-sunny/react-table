import { ColumnDef } from "@tanstack/react-table";
import { Person } from "../make-data";
import { useMemo } from "react";
import DataTableRowActions from "./table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";

export const TableColumns = () => {
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            onChange={(e) => {
              e.preventDefault();
            }}
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()} // 해당 행이 선택되어 있는지 여부를 나타내는 속성
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            onChange={(e) => {
              e.preventDefault();
            }}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: "age",
        header: () => "Age",
      },
      {
        accessorKey: "visits",
        header: () => <span>Visits</span>,
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
      },
    ],
    []
  );
  return { columns };
};
