"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IProductHistories } from "knex/types/tables.js";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<IProductHistories>[] = [
  {
    accessorKey: "name",
    header: "Produto",
    size: 200,
    accessorFn(props: any) {
      return props.product ? props.product.name : "--";
    },
    meta: {
      cellClassName: "truncate",
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
  },
  {
    accessorKey: "ratio",
    header: "Razão",
    accessorFn: (row) => `1:${row.ratio}`,
  },
  {
    accessorKey: "quantity",
    header: "Quantidade",
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
      return props.user ? props.user.name : "--";
    },
    meta: {
      cellClassName: "truncate",
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
