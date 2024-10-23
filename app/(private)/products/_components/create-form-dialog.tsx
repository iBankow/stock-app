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
import { Plus } from "lucide-react";
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
import { useState } from "react";
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
  stock: z.number().default(1),
  unitId: z.string().optional(),
});

export const CreateFormDialog = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setLoading(false);
    setOpen(false);
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) form.reset();
        setOpen(open);
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="h-8">
          <Plus className="h-4 w-4 mr-2" /> Criar Produto
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
                name="unitId"
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
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"1"}>m@example.com</SelectItem>
                        <SelectItem value={"2"}>m@google.com</SelectItem>
                        <SelectItem value={"3"}>m@support.com</SelectItem>
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
