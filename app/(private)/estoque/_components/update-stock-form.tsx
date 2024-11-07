/* eslint-disable @typescript-eslint/no-unused-vars */
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
        quantity: z.number().default(1),
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

  function validadeStock(products: z.infer<typeof formSchema>["products"]) {}

  async function onSubmit(values: z.infer<typeof formSchema>) {
    validadeStock(
      values.products.filter((product) => product.type === "OUTBOUND"),
    );

    console.log(values.products);

    // setLoading(true);
    // await fetch(`/api/v1/products`, {
    //   body: JSON.stringify(values),
    //   method: "POST",
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //     return Promise.reject(response);
    //   })
    //   .then(() => {
    //     router.back();
    //   })
    //   .catch(async (err: any) => {
    //     const error = await err.json();
    //     toast({
    //       title: "Opa! Algo deu errado!",
    //       description: error?.err ? error?.err : "",
    //       variant: "destructive",
    //     });
    //   })
    //   .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetch(`/api/v1/units?page=1&perPage=100`)
      .then((response) => response.json())
      .then((data) => setUnits(data.data));
    fetch(`/api/v1/products?page=1&perPage=100`)
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
              <div
                key={index}
                className="relative flex gap-4 rounded border border-dashed p-4"
              >
                <RowForm
                  field={field}
                  form={form}
                  index={index}
                  products={products}
                  units={units}
                  remove={remove}
                />
              </div>
            );
          })}
          <Button
            type="button"
            variant="outline"
            className="border-dashed"
            onClick={() =>
              append({
                ratio: 1,
                quantity: 1,
                type: "INBOUND",
                product_id: undefined as unknown as string,
                unit_id: undefined as unknown as string,
              })
            }
          >
            Adicionar Produto
          </Button>
        </div>
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
