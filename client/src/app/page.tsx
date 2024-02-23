"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [userName, setUserName] = useState("");

  const connectSocket = async () => {
    const socket = await io("http://localhost:3333/");

    redirect("/chat");

    console.log(socket.id);

    return;
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="h-full w-[1280px] flex flex-col items-center justify-center gap-8">
        <h1 className="text-3xl">Chat</h1>
        <select className="px-5 py-2 rounded-md w-[15%]">
          <option>Selecione a sala</option>
          <option value={"NodeJS"}>NodeJS</option>
          <option value={"ReactJS"}>ReactJS</option>
          <option value={"C"}>C#</option>
          <option value={"Javascript/Typescript"}>Javascript/Typescript</option>
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
          onClick={() => connectSocket()}
        >
          Entrar
        </button>
      </div>
    </main>
  );
}
