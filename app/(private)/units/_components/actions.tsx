"use client";

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

import { IUnit } from "knex/types/tables.js";
import { useModal } from "@/hooks/use-modal";
import { DeleteDialog } from "./delete-dialog";

interface ActionsProps {
  unit: IUnit;
}

export function Actions({ unit }: ActionsProps) {
  const deleteDialog = useModal();
  const editDialog = useModal();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={editDialog.show}
            className="cursor-pointer"
          >
            Editar Unidade
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-destructive"
            onSelect={deleteDialog.show}
          >
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteDialog
        onOpenChange={deleteDialog.toggle}
        open={deleteDialog.visible}
        unit={unit}
      />
      <EditFormDialog
        open={editDialog.visible}
        onOpenChange={editDialog.toggle}
        unit={unit}
      />
    </>
  );
}
