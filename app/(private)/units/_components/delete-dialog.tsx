import { DialogProps } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { IUnit } from "knex/types/tables.js";

interface DeleteDialogProps extends DialogProps {
  unit: IUnit;
}

export function DeleteDialog({ unit, ...props }: DeleteDialogProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [props.open]);

  async function onSubmit() {
    setLoading(true);
    if (props.onOpenChange) props.onOpenChange(false);
  }

  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deletar Unidade</DialogTitle>
          <DialogDescription className={`${loading ? "animate-pulse" : ""}`}>
            Desja realmente deletar essa unidade?
          </DialogDescription>
        </DialogHeader>
        <DialogDescription
          className={`${loading ? "animate-pulse" : ""} text-md pl-2 font-semibold text-foreground`}
        >
          Nome: `{unit.name}`<br />
          Descrição: `{unit.description}`<br />
          Razão: `{unit.ratio}`<br />
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={loading} type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            disabled={loading}
            onClick={onSubmit}
            type="submit"
            variant={"destructive"}
          >
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
