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
import { z } from "zod";
import { useContext } from "react";
import { AuthContext } from "~/context/authContext";
import { Button } from "../ui/button";

export function Register() {
  const { create_user } = useContext(AuthContext);

  const { form, schema } = useSchemaRegister();
  type formDataProps = z.infer<typeof schema>;

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
                <Input {...field} />
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
                <Input
                  type="tel"
                  placeholder="(51) 91234-5678"
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
                <Input type="password" {...field} />
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
