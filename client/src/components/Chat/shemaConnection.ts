import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const useConnection = () => {
  const schema = z.object({
    telefone: z.string().min(10, { message: "Insira um nome" }),
    name: z.string().min(3, { message: "Insira um telefone" }),
  });

  type formDataProps = z.infer<typeof schema>;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<formDataProps>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      telefone: "",
      name: "",
    },
  });

  return { handleSubmit, register, errors, schema, reset };
};
