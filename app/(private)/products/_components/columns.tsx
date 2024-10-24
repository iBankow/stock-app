"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IProduct } from "knex/types/tables.js";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { EditFormDialog } from "./edit-form-dialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DataTableColumnHeader } from "@/components/data-column-header";

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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() =>
                  navigator.clipboard.writeText(String(payment.id))
                }
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DialogTrigger asChild className="cursor-pointer">
                <DropdownMenuItem>Edit Profile</DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem className="cursor-pointer">
                View payment details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <EditFormDialog />
        </Dialog>
      );
    },
    meta: {
      cellClassName: "text-start",
    },
  },
];
