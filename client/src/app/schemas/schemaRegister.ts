import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useSchemaRegister = () => {
  const schema = z.object({
    username: z.string().min(3, {
      message:
        "Deve ser informado um o nome do usuario com pelo menos 3 caracteres.",
    }),
    phone: z.string().min(13, {
      message: "Informe um número de telefone.",
    }),
    password: z.string().min(5, {
      message: "Informe uma senha de pelo menos 5 caracteres",
    }),
  });

  type formDataProps = z.infer<typeof schema>;

  const form = useForm<formDataProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      phone: "",
      password: "",
    },
  });

  return { form, schema };
};
