"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "~/context/authContext";
import { socket } from "~/socket/socket";

import { Chat } from "~/components/Chat/Chat";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  AiOutlineComment,
  AiOutlineMore,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { Contacts } from "~/components/Chat/Contacts";
import { Input } from "~/components/ui/input";
import { PopoverNewConnections } from "~/components/Chat/PopoverNewConnections";

import { HiUserCircle } from "react-icons/hi2";
import { io } from "socket.io-client";

export default function Conversas() {
  const { connections, user, singOut } = useContext(AuthContext);
  const [chat, setChat] = useState({
    name: "",
    photo: "",
    conversationId: "",
    userId: "",
    id_user_contact: "",
  });
  const socket = useRef();

  function toAlterChat(
    name: string,
    photo: string,
    conversationId: string,
    userId: string,
    id_user_contact: string
  ) {
    setChat({
      name,
      photo,
      conversationId,
      userId,
      id_user_contact,
    });
  }

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user?.id, user?.name);
  }, [user]);

  return (
    <main className="h-screen flex justify-center items-center relative">
      <div className="h-full w-full">
        <div className="bg-green-800 h-[20%]"></div>
        <div className="bg-slate-100 h-[80%]"></div>
      </div>
      <div className="w-4/5 xl:w-full xl:p-2 h-[90%] grid items-center grid-cols-4 grid-rows-1 absolute">
        <section className="bg-white h-full">
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
                    <AiOutlineUserAdd
                      size={28}
                      title="Adicionar novo contato"
                    />
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

          <div className="h-[5%] px-3 py-1">
            <Input
              type="search"
              placeholder="Pesquisar ou começar uma nova conversa"
            />
          </div>

          <div className="h-[83%] p-3 overflow-auto">
            {connections?.map((connetion) => (
              <Contacts
                onclick={toAlterChat}
                is_user={connetion.is_user}
                name={connetion.name}
                photo={connetion.photo}
                userId={connetion.userId}
                id={connetion.id}
                id_user_contact={connetion.id_user_contact}
                conversationId={connetion.conversationId}
                key={connetion.id}
              />
            ))}
          </div>
        </section>

        <section className="w-full h-full col-span-3 bg-neutral-700">
          <Chat
            name={chat.name}
            photo={chat.photo}
            conversationId={chat.conversationId}
            userId={chat.userId}
            id_user_contact={chat.id_user_contact}
            socket={socket}
          />
        </section>
      </div>
    </main>
  );
}
