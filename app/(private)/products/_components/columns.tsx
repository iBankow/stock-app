"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IProduct } from "knex/types/tables.js";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/data-column-header";
import { Actions } from "./actions";

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 64,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 200,
    meta: {
      cellClassName: "truncate",
    },
  },
  {
    accessorKey: "description",
    header: "Descrição",
    maxSize: 320,
    size: 320,
    meta: {
      headerClassName: "hidden md:table-cell",
      cellClassName: "truncate hidden md:table-cell",
    },
  },
  {
    accessorKey: "unit",
    header: "Unidade",
    accessorFn(props: any) {
      return props.unit ? props.unit.name : "--";
    },
    meta: {
      headerClassName: "hidden md:table-cell",
      cellClassName: "truncate hidden md:table-cell",
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estoque" />
    ),
    cell(props) {
      return (
        <Badge
          variant={Number(props.row.original.stock) > 50 ? "green" : "red"}
        >
          {props.row.original.stock}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Criado em",
    accessorFn: (row) => {
      const date = row.created_at;
      return format(date ? date : "2024-10-22T13:51:24.159Z", "dd/MM/yyyy");
    },
    meta: {
      headerClassName: "truncate hidden sm:table-cell",
      cellClassName: "hidden sm:table-cell",
    },
  },
  {
    accessorKey: "updated_at",
    header: "Atualizado em",
    accessorFn: (row) => {
      const date = row.updated_at;
      return format(date ? date : "2024-10-22T13:51:24.159Z", "dd/MM/yyyy");
    },
    meta: {
      headerClassName: "truncate hidden sm:table-cell",
      cellClassName: "hidden sm:table-cell",
    },
  },
  {
    header: "Ações",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <Actions product={row.original} />,
    meta: {
      cellClassName: "text-start py-0",
    },
  },
];
