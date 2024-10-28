"use client";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { DialogProps } from "@radix-ui/react-dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { IProduct, IUnit } from "knex/types/tables.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres." })
    .max(50, { message: "O nome deve ter no máximo 50 caracteres." }),
  description: z.string().max(255).optional(),
  unit_id: z.string().optional().default(""),
});

interface EditFormDialogProps extends DialogProps {
  product: IProduct;
}

export function EditFormDialog({ product, ...props }: EditFormDialogProps) {
  const { toast } = useToast();
  const router = useRouter();

  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      description: product.description ? product.description : undefined,
      unit_id: product.unit_id ? String(product.unit_id) : undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    await fetch(`http://localhost:3000/api/v1/products/${product.id}`, {
      body: JSON.stringify(values),
      method: "PUT",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(() => {
        router.refresh();
        if (props.onOpenChange) props.onOpenChange(false);
      })
      .catch(async (err: any) => {
        const error = await err.json();
        toast({
          title: "Opa! Algo deu errado!",
          description: error?.err ? error?.err : "",
          variant: "destructive",
        });
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (props.open) {
      fetch(`http://localhost:3000/api/v1/units?page=1&perPage=100`)
        .then((response) => response.json())
        .then((data) => setUnits(data.data));
    }
  }, [props.open]);

  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Produto</DialogTitle>
          <DialogDescription>
            Adicione um novo produto ao seu estoque. Click em salvar para
            finalizar.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={`space-y-8 ${loading ? "animate-pulse" : ""}`}
          >
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="insira o nome do produto..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        maxLength={255}
                        placeholder="insira a descrição do produto"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Descrição do produto se necessária.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidade</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma unidade para o produto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {units.map((unit: IUnit) => (
                          <SelectItem key={unit.id} value={String(unit.id)}>
                            {unit.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  disabled={loading}
                  type="button"
                  variant={"destructive"}
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button disabled={loading} type="submit" variant={"success"}>
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
