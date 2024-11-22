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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { ReactNode, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IUnit } from "knex/types/tables.js";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres." })
    .max(50, { message: "O nome deve ter no máximo 50 caracteres." }),
  description: z.string().max(255).optional(),
  stock: z.number().default(1),
  unit_id: z.string().optional(),
});

interface CreateFormDialogProps {
  children: ReactNode;
}

export const CreateFormDialog = ({ children }: CreateFormDialogProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    await fetch(`/api/v1/products`, {
      body: JSON.stringify(values),
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(() => {
        setOpen(false);
        router.refresh();
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
    if (open) {
      fetch(`/api/v1/units?page=1&perPage=100`)
        .then((response) => response.json())
        .then((data) => setUnits(data.data));
    }
  }, [open]);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) form.reset();
        setOpen(open);
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-8 w-full sm:w-[150px] lg:w-[250px]"
        >
          {children}
        </Button>
      </DialogTrigger>
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
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estoque</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        defaultValue={1}
                        inputMode="numeric"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
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
};
