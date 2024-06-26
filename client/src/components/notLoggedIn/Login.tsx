import { z } from "zod";
import { useContext, useState } from "react";
import { TbEye, TbPasswordUser, TbPhone } from "react-icons/tb";
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
import { useSchemaLogin } from "~/app/schemas/schemaLogin";
import { Button } from "../ui/button";
import { maskPhone } from "~/mask/phone";

export function Login() {
  const { signIn } = useContext(AuthContext);

  const [visibilityPassword, setVisibilityPassword] = useState(false);
  const [phoneMask, setPhoneMask] = useState("");

  const { form, schema } = useSchemaLogin();
  type formDataProps = z.infer<typeof schema>;

  function handleVisibilityPassword() {
    setVisibilityPassword(!visibilityPassword);
  }

  async function onSubmit(values: formDataProps) {
    const { phone, password } = values;
    signIn(phoneMask, password);
  }

  function handleMaskPhone(e: string) {
    const mask = maskPhone(e);
    setPhoneMask(mask);
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
                <div className="relative flex items-center">
                  <Input
                    className="pl-8"
                    type="tel"
                    placeholder="(51) 91234-5678"
                    title="Exemplo: (51) 91234-5678"
                    maxLength={15}
                    {...field}
                    value={phoneMask}
                    onChange={(e) => {
                      field.onChange(e);
                      handleMaskPhone(e.target.value);
                    }}
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

        <Button className="w-full" type="submit">
          Login
        </Button>
      </form>
    </Form>
  );
}
