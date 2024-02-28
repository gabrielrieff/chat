"use client";

import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "~/context/context";

export default function Home() {
  const { connectSocket } = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");

  const connect = async (event: FormEvent) => {
    event.preventDefault();
    if (!userName.trim() && !roomName.trim()) return;

    connectSocket(userName, roomName);
  };

  return (
    <main className="flex h-screen flex-col items-center justify-between p-8 bg-blue-50">
      <>
        <form
          onSubmit={connect}
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
    </main>
  );
}
