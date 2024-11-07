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
import { ReactNode, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres." })
    .max(50, { message: "O nome deve ter no máximo 50 caracteres." }),
  description: z.string().max(255).optional(),
  ratio: z
    .number()
    .min(1, { message: "A razão deve ser no mínimo de 1 para 1." })
    .default(1),
});

interface CreateFormDialogProps {
  children: ReactNode;
}

export const CreateFormDialog = ({ children }: CreateFormDialogProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      ratio: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const unit = { ...values, ratio: "1:" + values.ratio };
    setLoading(true);

    await fetch(`/api/v1/units`, {
      body: JSON.stringify(unit),
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
          description: error.err,
          variant: "destructive",
        });
      })
      .finally(() => setLoading(false));
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
        <Button
          variant="outline"
          className="h-8 w-full sm:w-[150px] lg:w-[250px]"
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Unidade</DialogTitle>
          <DialogDescription>
            Adicione uma nova unidade ao sistema. Click em salvar para
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
                        placeholder="insira o nome da unidade..."
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
                        placeholder="insira a descrição da unidade"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Descrição da unidade se necessária.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ratio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Razão</FormLabel>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        value={1}
                        inputMode="numeric"
                        disabled
                      />
                      <p className="text-lg font-bold">:</p>
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
                    <FormDescription>
                      Razão de 1 para {form.getValues().ratio}, para quando for
                      adicinar um historico de entrada ou saido de produto.
                    </FormDescription>
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
