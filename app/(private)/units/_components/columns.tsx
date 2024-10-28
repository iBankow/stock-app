"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IUnit } from "knex/types/tables.js";
import { format } from "date-fns";
import { Actions } from "./actions";

export const columns: ColumnDef<IUnit>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 64,
    meta: {
      headerClassName: "hidden md:table-cell",
      cellClassName: "truncate hidden md:table-cell",
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 500,
    meta: {
      headerClassName: "w-96",
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
    accessorKey: "ratio",
    header: "Razão",
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
    accessorKey: "Ações",
    enableHiding: false,
    cell: ({ row }) => <Actions unit={row.original} />,
    meta: {
      cellClassName: "text-start",
    },
  },
];
