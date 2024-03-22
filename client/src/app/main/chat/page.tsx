"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { Chat } from "~/components/Chat";
import { getRandomColorClass } from "~/helpers/getColors";
import { socket } from "~/socket/socket";

import foto from "../../../../public/perfil.jpeg";

type socketUser = {
  userName: string;
  room: string;
};

export default function Conversas() {
  const [socketInstance] = useState(socket());

  const [userName, setUserName] = useState("Gabriel");
  const [roomName, setRoomName] = useState("Node");
  const [color] = useState(getRandomColorClass());
  const [socketChat, setSocketChat] = useState<any>(null);

  const connectSocket = async (event: FormEvent) => {
    event.preventDefault();
    if (!userName.trim() && !roomName.trim()) return;

    const data: socketUser = {
      userName: userName,
      room: roomName,
    };

    socketInstance.emit("select_room", data);
    setSocketChat(socketInstance);
  };

  return (
    <main className="h-screen flex justify-center p-8 bg-stone-300">
      <div className="w-4/5 h-full grid items-center grid-cols-4 grid-rows-1 ">
        <section className="bg-white h-full">
          <div className="h-[6%] bg-zinc-100 p-1 border-r-[1px] border-gray-400">
            <span>Conversas</span>
          </div>
          <div className="h-[94%] p-3 overflow-auto">
            {contacts.map((contect, index) => (
              <div
                className="flex items-center gap-3 p-2 border-b-[1px] border-gray-200 w-full mb-2 hover:bg-neutral-200 cursor-pointer transition-[.5s]"
                key={index}
              >
                <Image
                  alt=""
                  src={foto}
                  className="rounded-full w-16 h-16 object-cover"
                />

                <div className="flex flex-col">
                  <span>{contect.name}</span>
                  <span className="text-xs text-zinc-500">{contect.msg}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full h-full col-span-3 bg-neutral-700">
          <Chat
            socket={socketChat}
            room={roomName}
            userName={userName}
            color={color}
          />
        </section>
      </div>
    </main>
  );
}

const contacts = [
  { name: "Rafaela", msg: "Ola, tudo bem?" },
  { name: "John", msg: "Ola, tudo bem?" },
  { name: "Gabriel Rieff", msg: "Ola, tudo bem?" },
  { name: "Maria joaquina", msg: "Ola, tudo bem?" },
  { name: "Luiz otavio", msg: "Ola, tudo bem?" },
  { name: "Naruto", msg: "Ola, tudo bem?" },
  { name: "Ricardo", msg: "Ola, tudo bem?" },
  { name: "Paulo", msg: "Ola, tudo bem?" },
  { name: "Larissa", msg: "Ola, tudo bem?" },
  { name: "Carlos", msg: "Ola, tudo bem?" },
  { name: "Camila", msg: "Ola, tudo bem?" },
  { name: "Rafael", msg: "Ola, tudo bem?" },
  { name: "Lurdes", msg: "Ola, tudo bem?" },
  { name: "Menino ney", msg: "Ola, tudo bem?" },
];
