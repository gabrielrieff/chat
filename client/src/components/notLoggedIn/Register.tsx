import { z } from "zod";
import { useContext, useState } from "react";
import { TbEye, TbPasswordUser, TbPhone, TbUser } from "react-icons/tb";
import { useSchemaRegister } from "~/app/schemas/schemaRegister";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { AuthContext } from "~/context/authContext";
import { Button } from "../ui/button";

export function Register() {
  const { create_user } = useContext(AuthContext);

  const [visibilityPassword, setVisibilityPassword] = useState(false);

  const { form, schema } = useSchemaRegister();
  type formDataProps = z.infer<typeof schema>;

  function handleVisibilityPassword() {
    setVisibilityPassword(!visibilityPassword);
  }

  async function onSubmit(values: formDataProps) {
    const { username, phone, password } = values;

    create_user(username, phone, password);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input className="pl-8" {...field} />
                  <TbUser size={23} className="absolute left-1 text-zinc-400" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input
                    className="pl-8"
                    type="tel"
                    placeholder="(51) 91234-5678"
                    pattern="^\(\d{2}\) \d{5}-\d{4}$"
                    title="Exemplo: (51) 91234-5678"
                    {...field}
                  />
                  <TbPhone
                    size={23}
                    className="absolute left-1 text-zinc-400"
                  />
                </div>
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
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <TbEye
                    size={23}
                    className="absolute right-1 text-zinc-400 cursor-pointer hover:text-slate-700"
                    onClick={handleVisibilityPassword}
                  />
                  <Input
                    className="px-8"
                    type={visibilityPassword ? "text" : "password"}
                    {...field}
                  />
                  <TbPasswordUser
                    size={23}
                    className="absolute left-1 text-zinc-400"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full">Registrar</Button>
      </form>
    </Form>
  );
}
