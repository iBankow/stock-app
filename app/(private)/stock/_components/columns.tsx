"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IProductHistories } from "knex/types/tables.js";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<IProductHistories>[] = [
  {
    accessorKey: "name",
    header: "Produto",
    accessorFn(props: any) {
      return props.product ? props.product.name : "--";
    },
    meta: {
      headerClassName: "truncate w-[100px]",
      cellClassName: "truncate w-[100px]",
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
    accessorKey: "type",
    header: "Tipo",
    cell(props) {
      return (
        <Badge
          variant={props.row.original.type === "INBOUND" ? "green" : "red"}
        >
          {props.row.original.type === "INBOUND" ? "ENTRADA" : "SAÍDA"}
        </Badge>
      );
    },
    meta: {
      headerClassName: "hidden sm:table-cell",
      cellClassName: "truncate hidden sm:table-cell",
    },
  },
  {
    accessorKey: "type_mobile",
    header: "Tipo",
    cell(props) {
      return (
        <Badge
          variant={props.row.original.type === "INBOUND" ? "green" : "red"}
        >
          {props.row.original.type === "INBOUND" ? "<-" : "->"}
        </Badge>
      );
    },
    meta: {
      headerClassName: "table-cell sm:hidden",
      cellClassName: "truncate table-cell sm:hidden",
    },
  },
  {
    accessorKey: "ratio",
    header: "Razão",
    accessorFn: (row) => `1:${row.ratio}`,
    meta: {
      headerClassName: "hidden md:table-cell",
      cellClassName: "truncate hidden md:table-cell",
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantidade",
    meta: {
      headerClassName: "hidden md:table-cell",
      cellClassName: "truncate hidden md:table-cell",
    },
  },
  {
    accessorKey: "unity_quantity",
    header: "Qtd. Unitaria",
    accessorFn: (row) => row.ratio * row.quantity,
  },
  {
    accessorKey: "user",
    header: "Atualizado por",
    accessorFn(props: any) {
      return props.user.name ? props.user.name : "--";
    },
    meta: {
      headerClassName: "hidden md:table-cell",
      cellClassName: "truncate hidden md:table-cell",
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
];
