import { useContext } from "react";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { PopoverArrow, PopoverContent } from "../ui/popover";
import { AuthContext } from "~/context/authContext";
import { useConnection } from "./shemaConnection";

export function PopoverNewConnections() {
  const { createConnection } = useContext(AuthContext);

  const { errors, handleSubmit, register, reset, schema } = useConnection();
  type formDataProps = z.infer<typeof schema>;

  async function handleConnection(data: formDataProps) {
    const { name, telefone } = data;

    createConnection(name, telefone);
  }
  return (
    <PopoverContent side="left">
      <form
        onSubmit={handleSubmit(handleConnection)}
        className="flex flex-col gap-4"
      >
        <span>Adicionar um novo contato</span>
        <Label>
          <span>Telefone</span>
          <Input
            type="tel"
            pattern="^\(\d{2}\) \d{5}-\d{4}$"
            title="Exemplo: (51) 91234-5678"
            {...register("telefone")}
          />
        </Label>
        <Label>
          <span>Nome</span>
          <Input {...register("name")} />
        </Label>

        <Button>Adicionar</Button>
      </form>
      <PopoverArrow className="fill-zinc-500 drop-shadow-md" />
    </PopoverContent>
  );
}
