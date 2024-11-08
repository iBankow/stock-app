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

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { LogIn, LogOut, Trash } from "lucide-react";

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

  function validadeStock(productsOut: z.infer<typeof formSchema>["products"]) {
    for (let i = 0; i < productsOut.length; i++) {
      const out = productsOut[i];
      if (out.type === "OUTBOUND") {
        const stock =
          products.find((product) => product.id === Number(out.product_id))
            ?.stock || 0;

        if (stock < out.quantity * out.ratio) {
          form.setError(`products.${i}.type`, {
            message: "Estoque menor que a saída",
          });
          return false;
        }
      }
    }
    return true;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const validate = validadeStock(values.products);

    if (validate) {
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
        <div className="grid grid-cols-2 gap-6">
          {fields.map((field, index) => {
            return (
              <div
                key={index}
                className="relative rounded border border-dashed p-4"
              >
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name={`products.${index}.type`}
                    render={({ field }) => (
                      <FormItem className="col-span-2 w-full">
                        <FormLabel>Tipo</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={"INBOUND"}>
                              <span className="flex items-center">
                                <LogIn className="mr-2" width={20} />
                                ENTRADA
                              </span>
                            </SelectItem>
                            <SelectItem value={"OUTBOUND"}>
                              <span className="flex items-center">
                                <LogOut className="mr-2" width={20} />
                                SAÍDA
                              </span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`products.${index}.product_id`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Produto</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um produto" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {products.map((product) => (
                              <SelectItem
                                key={product.id}
                                value={String(product.id)}
                              >
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`products.${index}.unit_id`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Unidade</FormLabel>
                        <Select
                          onValueChange={(e) => {
                            field.onChange(e);
                            const unit = units.find(
                              (unit) => unit.id === Number(e),
                            );
                            if (unit)
                              form.setValue(
                                `products.${index}.ratio`,
                                Number(unit.ratio.split(":")[1]),
                              );
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma unidade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {units.map((unit) => (
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
                  <FormField
                    control={form.control}
                    name={`products.${index}.ratio`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Razão</FormLabel>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={1}
                            inputMode="numeric"
                            disabled
                          />
                          <p className="text-lg">:</p>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value}
                              min={1}
                              type="number"
                              inputMode="numeric"
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`products.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantidade</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value}
                            min={1}
                            type="number"
                            inputMode="numeric"
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormItem className="col-span-2 w-full">
                    <FormLabel>Total</FormLabel>
                    <FormControl>
                      <Input
                        value={
                          form.getValues(`products.${index}.quantity`) *
                          form.getValues(`products.${index}.ratio`)
                        }
                        disabled
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <Button
                    size="icon"
                    className="absolute -right-5 -top-5 h-8 w-8 rounded-full"
                    onClick={() => {
                      form.clearErrors(`products.${index}`);
                      if (remove) remove(index);
                    }}
                    variant="destructive"
                  >
                    <Trash width={16} />
                  </Button>
                </div>
              </div>
            );
          })}
          <Button
            type="button"
            variant="outline"
            className="col-span-2 border-dashed"
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
