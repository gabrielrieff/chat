import { useContext } from "react";
import { AuthContext } from "~/context/authContext";

import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PopoverNewConnections } from "./PopoverNewConnections";
import Image from "next/image";

import { HiUserCircle } from "react-icons/hi2";
import {
  AiOutlineComment,
  AiOutlineMore,
  AiOutlineUserAdd,
} from "react-icons/ai";

export function HeaderUser() {
  const { user, singOut } = useContext(AuthContext);

  return (
    <div className="h-[8%] bg-gray-100 p-2 border-r-[1px] border-gray-400 flex justify-between items-center">
      {user?.photoUrl ? (
        <Image
          alt={user!.name}
          src={user?.photoUrl}
          width={40}
          height={40}
          className="rounded-full w-10 h-10 bg-contain"
        />
      ) : (
        <HiUserCircle size={35} className="text-slate-900" />
      )}

      <div className="flex justify-center items-center">
        <Button className="px-2" variant={"ghost"}>
          <AiOutlineComment size={28} />
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button className="px-2" variant={"ghost"}>
              <AiOutlineUserAdd size={28} title="Adicionar novo contato" />
            </Button>
          </PopoverTrigger>
          <PopoverNewConnections />
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button className="px-2" variant={"ghost"}>
              <AiOutlineMore size={28} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full flex flex-col p-0">
            <Button variant={"ghost"} className="rounded-none">
              Configurações
            </Button>
            <Button
              onClick={singOut}
              variant={"ghost"}
              className="rounded-none"
            >
              Desconectar
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
