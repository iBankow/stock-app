"use client";

import { Button } from "@/components/ui/button";
import { useFieldArray, useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";

import { IProduct, IUnit } from "knex/types/tables.js";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

import { RowForm } from "./row-form";

const formSchema = z.object({
  products: z
    .array(
      z.object({
        product_id: z.string({ message: "Selecione ao menos um produto" }),
        unit_id: z.string({ message: "Selecione ao menos uma unidade" }),
        quantity: z.number().min(1).default(1),
        ratio: z
          .number()
          .min(1, { message: "A razão deve ser no mínimo de 1 para 1." })
          .default(1),
        type: z.string(),
      }),
    )
    .min(1),
});

export const UpdateStockForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [units, setUnits] = useState<IUnit[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    await fetch(`/api/v1/update-stock`, {
      body: JSON.stringify(values.products),
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(() => {
        toast({
          title: "Estoque atualizado!",
        });
        router.replace("/estoque");
      })
      .catch(async (err: any) => {
        const error = await err.json();
        toast({
          title: "Opa! Algo deu errado!",
          description: error,
          variant: "destructive",
        });
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetch(`/api/v1/units?page=1&perPage=100`)
      .then((response) => response.json())
      .then((data) => setUnits(data.data));
    fetch(`/api/v1/products?page=1&perPage=100&order_name=asc`)
      .then((response) => response.json())
      .then((data) => setProducts(data.data));
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-8 ${loading ? "animate-pulse" : ""}`}
      >
        <div className="grid gap-6">
          {fields.map((field, index) => {
            return (
              <RowForm
                key={index}
                field={field}
                form={form}
                index={index}
                products={products}
                units={units}
                remove={remove}
              />
            );
          })}
        </div>
        <Button
          type="button"
          variant="outline"
          className="col-span-2 w-full border-dashed"
          onClick={() =>
            append({
              type: "INBOUND",
              product_id: undefined as unknown as string,
              unit_id: undefined as unknown as string,
              ratio: 1,
              quantity: 1,
            })
          }
        >
          Adicionar Produto
        </Button>
        <Button disabled={loading} type="button" variant={"destructive"}>
          Cancelar
        </Button>
        <Button disabled={loading} type="submit" variant={"success"}>
          Salvar
        </Button>
      </form>
    </Form>
  );
};
