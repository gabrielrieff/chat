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
import { useSchemaLogin } from "~/app/schemas/schemaLogin";
import { Button } from "../ui/button";

export function Login() {
  const { signIn } = useContext(AuthContext);

  const { form, schema } = useSchemaLogin();
  type formDataProps = z.infer<typeof schema>;

  async function onSubmit(values: formDataProps) {
    const { phone, password } = values;

    signIn(phone, password);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
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

        <Button className="w-full" type="submit">
          Login
        </Button>
      </form>
    </Form>
  );
}
