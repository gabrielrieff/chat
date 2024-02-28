"use client";

import { useRouter } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const textColorClasses = [
  "text-red-600",
  "text-sky-400",
  "text-green-600",
  "text-yellow-400",
  "text-violet-600",
  "text-pink-600",
  "text-orange-500",
  "text-lime-500",
  "text-teal-400",
  "text-emerald-400",
];

type ContextData = {
  socketConnect: any;
  connectSocket: (userName: string, room: string) => void;
};

export const AuthContext = createContext({} as ContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const Router = useRouter();
  const [socketConnect, setSocketConnect] = useState<any>(null);

  const getRandomColorClass = () => {
    return textColorClasses[
      Math.floor(Math.random() * textColorClasses.length)
    ];
  };

  const connectSocket = async (userName: string, room: string) => {
    if (userName !== "") {
      const socket = await io("http://localhost:3333");
      const data = {
        userName: userName,
        room: room,
        color: getRandomColorClass(),
      };
      await socket.emit("select_room", data);

      await socket.on("connect", () => {
        setSocketConnect(socket);
        Router.push(`/chat/room=${room}&user=${userName}&id=${socket.id}`);
      });
    }
  };

  useEffect(() => {}, [socketConnect]);

  return (
    <AuthContext.Provider value={{ socketConnect, connectSocket }}>
      <>{children}</>
    </AuthContext.Provider>
  );
};
