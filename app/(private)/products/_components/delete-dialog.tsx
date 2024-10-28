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
import { IProduct } from "knex/types/tables.js";

interface DeleteDialogProps extends DialogProps {
  product: IProduct;
}

export function DeleteDialog({ product, ...props }: DeleteDialogProps) {
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
          <DialogTitle>Deletar Produto</DialogTitle>
          <DialogDescription className={`${loading ? "animate-pulse" : ""}`}>
            Desja realmente deletar esse produto?
          </DialogDescription>
        </DialogHeader>
        <DialogDescription
          className={`${loading ? "animate-pulse" : ""} text-md pl-2 font-semibold text-foreground`}
        >
          Nome: `{product.name}`<br />
          Descrição: `{product.description}`<br />
          Estoque: `{product.stock}`<br />
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
