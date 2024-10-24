"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IUnit } from "knex/types/tables.js";
import { format } from "date-fns";
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

export const columns: ColumnDef<IUnit>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 64,
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const unit = row.original;

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
                  navigator.clipboard.writeText(String(unit.id))
                }
              >
                Copy unit ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DialogTrigger asChild className="cursor-pointer">
                <DropdownMenuItem>Edit Profile</DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem className="cursor-pointer">
                View unit details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <EditFormDialog unit={unit} />
        </Dialog>
      );
    },
    meta: {
      cellClassName: "text-start",
    },
  },
];
