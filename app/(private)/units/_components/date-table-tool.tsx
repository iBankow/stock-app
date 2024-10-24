"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { IUnit } from "knex/types/tables.js";

import { CreateFormDialog } from "./create-form-dialog";
import { Plus } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar({ table }: DataTableToolbarProps<IUnit>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-0 items-start justify-between">
      <div className="flex w-full flex-1 items-center space-x-2">
        <Input
          placeholder="Filter units..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("name")?.setFilterValue(event.target.value);
          }}
          className="h-8 w-full sm:w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <CreateFormDialog>
        <Plus className="h-4 w-4 mr-2" /> Criar Unidade
      </CreateFormDialog>
    </div>
  );
}
