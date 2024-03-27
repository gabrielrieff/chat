"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useContext } from "react";
import { AuthContext } from "~/context/authContext";
import Link from "next/link";

export default function Login() {
  const { signIn } = useContext(AuthContext);

  const formSchema = z.object({
    phone: z.string().min(13, {
      message: "Informe um número de telefone.",
    }),
    password: z.string().min(5, {
      message: "Informe uma senha de pelo menos 5 caracteres",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { phone, password } = values;

    signIn(phone, password);
  }

  return (
    <main className="h-screen w-full flex justify-center items-center flex-col p-8">
      <Form {...form}>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          dev chat login
        </h2>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-1/3"
        >
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    type="tel"
                    pattern="^\(\d{2}\) \d{5}-\d{4}$"
                    title="Exemplo: (51) 91234-5678"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input autoComplete="off" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Fazer login</Button>
        </form>
      </Form>
      <Button variant={"link"} asChild>
        <Link href={"/"} className="text-sky-600">
          Fazer cadastro
        </Link>
      </Button>
    </main>
  );
}
