/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";

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
import { IProduct, IUnit } from "knex/types/tables.js";
import { Input } from "@/components/ui/input";
import { LogIn, LogOut, Trash } from "lucide-react";

interface RowFormProps {
  form: UseFormReturn<
    {
      products: {
        type: string;
        product_id: string;
        unit_id: string;
        quantity: number;
        ratio: number;
      }[];
    },
    any,
    undefined
  >;
  field: {
    ratio: number;
    product_id?: string | undefined;
    unit_id?: string | undefined;
    quantity?: number;
  } & Record<"id", string>;
  index: number;
  products: IProduct[];
  units: IUnit[];
  remove?: (index?: number | number[]) => void;
}

export const RowForm = ({
  form,
  field,
  index,
  products,
  units,
  remove,
}: RowFormProps) => {
  const filter = form.getValues("products");

  return (
    <>
      <FormField
        control={form.control}
        key={field.id}
        name={`products.${index}.product_id`}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Produto</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um produto" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem
                    key={product.id}
                    disabled={filter.some(
                      (selectedProduct) =>
                        Number(selectedProduct?.product_id) === product.id,
                    )}
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
                const unit = units.find((unit) => unit.id === Number(e));
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
        name={`products.${index}.type`}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Tipo</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
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
        name={`products.${index}.ratio`}
        render={({ field }) => (
          <FormItem className="w-2/3">
            <FormLabel>Razão</FormLabel>
            <div className="flex items-center gap-2">
              <Input type="number" value={1} inputMode="numeric" disabled />
              <p className="text-lg">:</p>
              <FormControl>
                <Input
                  {...field}
                  value={field.value}
                  min={1}
                  type="number"
                  inputMode="numeric"
                  onChange={(e) => field.onChange(Number(e.target.value))}
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
          <FormItem className="w-1/3">
            <FormLabel>Quantidade</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value}
                min={1}
                type="number"
                inputMode="numeric"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormItem className="w-1/6">
        <FormLabel>Total</FormLabel>
        <FormControl>
          <Input
            value={
              Number(form.getValues(`products.${index}.quantity`)) *
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
    </>
  );
};
