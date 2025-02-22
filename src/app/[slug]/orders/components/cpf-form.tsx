"use client";

import { z } from "zod";
import { isValidCpf, removeCpfPunctuation } from "../../menu/helpers/cpf";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PatternFormat } from "react-number-format";
import { usePathname, useRouter } from "next/navigation";

const formSchema = z.object({
  cpf: z
    .string()
    .trim()
    .min(1, {
      message: "O CPF é obrigatório!",
    })
    .refine((value) => isValidCpf(value), {
      message: "CPF invalido",
    }),
});

type formSchema = z.infer<typeof formSchema>;

const CpfForm = () => {
  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
  });

  //pegar a rota atual
  const pathName = usePathname();

  const router = useRouter();
  const onSubmit = (data: formSchema) => {
    router.push(`${pathName}?cpf=${removeCpfPunctuation(data.cpf)}`);
  };
  const handleCancelClick = () => {
    router.back();
  };

  return (
    <Drawer open>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Vizualizar Pedidos</DrawerTitle>
          <DrawerDescription>
            Insira o seu CPF abaixo para vizualizar seus pedidos.
          </DrawerDescription>
        </DrawerHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="px-4">
                  <FormLabel>Seu CPF</FormLabel>
                  <FormControl>
                    <PatternFormat
                      placeholder="Digite seu CPF"
                      format="###.###.###-##"
                      customInput={Input}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DrawerFooter>
              <Button variant="destructive" className="w-full rounded-full">
                Confirmar
              </Button>
              <DrawerClose asChild>
                <Button
                  variant="secondary"
                  className="w-full rounded-full"
                  onClick={handleCancelClick}
                >
                  Cancelar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default CpfForm;
