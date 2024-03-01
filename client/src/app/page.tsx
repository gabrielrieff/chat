"use client";

import { FormEvent, useState } from "react";
import { Chat } from "~/components/Chat";
import { getRandomColorClass } from "~/helpers/getColors";
import { socket } from "~/socket/socket";

type socketUser = {
  userName: string;
  room: string;
};

export default function Home() {
  const [socketInstance] = useState(socket());

  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
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
    <main className="flex h-screen flex-col items-center justify-between p-8 bg-blue-50">
      {!socketChat ? (
        <>
          <form
            onSubmit={connectSocket}
            className="h-full w-[1280px] flex flex-col items-center justify-center gap-8"
          >
            <h1 className="text-3xl">Chat</h1>
            <select
              className="px-5 py-2 rounded-md w-[15%]"
              onChange={(e) => setRoomName(e.target.value)}
            >
              <option>Selecione a sala</option>
              <option value={"NodeJS"}>NodeJS</option>
              <option value={"ReactJS"}>ReactJS</option>
              <option value={"C#"}>C#</option>
              <option value={"Javascript/Typescript"}>
                Javascript/Typescript
              </option>
            </select>
            <input
              className="px-5 py-2 rounded-md w-[30%]"
              type="text"
              placeholder="Nome de usuário"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button
              className="bg-green-600 text-white text-xl px-8 py-3 font-bold rounded-md w-[20%]"
              type="submit"
            >
              Entrar
            </button>
          </form>
        </>
      ) : (
        <Chat
          socket={socketChat}
          room={roomName}
          userName={userName}
          color={color}
        />
      )}
    </main>
  );
}
