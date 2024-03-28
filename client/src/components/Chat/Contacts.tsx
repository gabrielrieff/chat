import { useContext } from "react";
import { AuthContext } from "~/context/authContext";

import { Button } from "../ui/button";
import Image from "next/image";
import { MdDelete } from "react-icons/md";

import { Connection } from "~/@types/connection";
import { HiUserCircle } from "react-icons/hi2";

interface ContactsProps extends Connection {
  onclick: (name: string, photo: string, conversationId: string) => void;
}

export function Contacts({
  isUser,
  name,
  photo,
  conversationId,
  onclick,
}: ContactsProps) {
  const { deleteConnection, getMesseges } = useContext(AuthContext);

  return (
    <div>
      {isUser === true ? (
        <div
          onClick={() => {
            onclick(name!, photo!, conversationId!);
            getMesseges(conversationId!);
          }}
          className="flex items-center gap-3 p-2 border-b-[1px] border-gray-200 w-full mb-2 hover:bg-neutral-200 cursor-pointer transition-[.5s]"
        >
          {photo ? (
            <Image
              alt=""
              src={photo}
              width={40}
              height={40}
              className="rounded-full w-10 h-10 bg-contain bg-no-repeat bg-center"
            />
          ) : (
            <HiUserCircle size={35} className="text-slate-300" />
          )}

          <div className="flex flex-col">
            <span>{name}</span>
            <span className="text-xs text-zinc-500">{}</span>
          </div>
          <Button
            variant={"destructive"}
            className="p-1"
            onClick={() => deleteConnection(conversationId!)}
          >
            <MdDelete size={20} />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3 p-2 border-b-[1px] border-gray-200 w-full hover:bg-neutral-100 cursor-pointer transition-[.5s]">
          <div className="flex items-center gap-2">
            <HiUserCircle size={35} className="text-slate-400" />
            <span>{name}</span>
          </div>

          <span className="text-xs font-semibold text-emerald-500 hover:text-emerald-700">
            Convidar
          </span>
          <Button
            variant={"destructive"}
            onClick={() => deleteConnection(conversationId!)}
          >
            <MdDelete size={20} />
          </Button>
        </div>
      )}
    </div>
  );
}
