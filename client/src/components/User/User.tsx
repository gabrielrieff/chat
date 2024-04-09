import { useContext, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { AuthContext } from "~/context/authContext";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function User() {
  const { user } = useContext(AuthContext);

  const [editName, setEditName] = useState(true);

  function handleEditName() {
    setEditName(!editName);
  }
  return (
    <div className="h-full w-[300px] flex flex-col items-center gap-6">
      <Avatar className="w-28 h-28">
        <AvatarImage src={user?.photoUrl} className="object-cover" />
        <AvatarFallback>
          {user?.name?.substring(0, 2).toLocaleUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col bg-zinc-100 w-full p-2">
        <span className="text-xs text-sky-500 py-2">Seu nome</span>

        <div className="flex justify-between items-center py-1">
          {editName ? (
            <>
              <span>{user?.name}</span>
              <CiEdit
                size={25}
                className="hover:text-sky-500 transition-[0.3s] cursor-pointer"
                onClick={handleEditName}
              />
            </>
          ) : (
            <div className="w-full flex flex-col gap-2">
              <Input value={user?.name} className="bg-white" />
              <div className="w-full flex gap-2">
                <Button className="w-full">Salvar</Button>
                <Button
                  className="w-full"
                  variant={"destructive"}
                  onClick={handleEditName}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
