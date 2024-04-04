"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "~/context/authContext";

import Image from "next/image";
import { Chat } from "~/components/Chat/index";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Input } from "~/components/ui/input";
import { HeaderUser } from "~/components/Menu/HeaderUser";
import { ContainerNoChatCvs } from "~/components/Chat/ContainerNoChatCvs";

import { HiUserCircle } from "react-icons/hi2";
import { io } from "socket.io-client";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineMore } from "react-icons/ai";
import { Messege } from "~/@types/messege";

export default function Conversas() {
  const {
    connections,
    user,
    deleteConnection,
    getMesseges,
    messeges,
    setMesseges,
    newMessage,
  } = useContext(AuthContext);

  const [messagens, setMessages] = useState<Array<Messege>>(messeges);
  const [messageText, setMessageText] = useState("");
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

  async function handleSendMessage() {
    if (chat.conversationId === null || chat.conversationId === undefined)
      return;
    if (messageText === "") return;
    if (chat.userId === undefined) return;

    await newMessage(chat.conversationId, messageText, chat.userId);

    await socket.current.emit("sendMessage", {
      user_id: chat.userId,
      conversationId: chat.conversationId,
      messageText: messageText,
      receiverId: chat.id_user_contact,
    });

    setMesseges((prev) => [
      ...prev,
      {
        id: "01",
        messegeText: messageText,
        conversationId: chat.conversationId,
        user_id: chat.userId,
        created_at: new Date().toDateString(),
        update_at: new Date().toDateString(),
      },
    ]);
    setMessageText("");
  }

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user?.id, user?.name);
  }, [user]);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setMesseges((prev) => [
        ...prev,
        {
          id: "01",
          messegeText: data.messageText,
          conversationId: data.conversationId,
          user_id: data.user_id,
          created_at: new Date().toDateString(),
          update_at: new Date().toDateString(),
        },
      ]);
    });

    return () => socket.current.off("getMessage");
  }, [socket.current]);

  return (
    <main className="h-screen flex justify-center items-center relative">
      <div className="h-full w-full">
        <div className="bg-green-800 h-[20%]"></div>
        <div className="bg-slate-100 h-[80%]"></div>
      </div>
      <div className="w-4/5 xl:w-full xl:p-2 h-[90%] grid items-center grid-cols-4 grid-rows-1 absolute">
        <section className="bg-white h-full">
          <HeaderUser />

          <div className="h-[5%] px-3 py-1">
            <Input
              type="search"
              placeholder="Pesquisar ou começar uma nova conversa"
            />
          </div>

          <div className="h-[83%] pt-3 overflow-auto">
            {connections!.map((connetion) => (
              <div
                key={connetion.id}
                onClick={() => {
                  toAlterChat(
                    connetion.name!,
                    connetion.photo!,
                    connetion.conversationId!,
                    connetion.userId!,
                    connetion.id_user_contact!
                  );
                  getMesseges(connetion.conversationId!);
                }}
                className="flex items-center justify-between gap-3 p-2 border-b-[1px] border-gray-200 w-full hover:bg-neutral-200 cursor-pointer transition-[.5s]"
              >
                <div className="flex flex-row items-center justify-center gap-2">
                  {connetion.photo ? (
                    <Image
                      alt=""
                      src={connetion.photo}
                      width={40}
                      height={40}
                      className="rounded-full w-8 h-8 bg-contain bg-no-repeat bg-center"
                    />
                  ) : (
                    <HiUserCircle size={35} className="text-slate-300" />
                  )}
                  <span>{connetion.name}</span>
                  <span className="text-xs text-zinc-500">{}</span>
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className="p-0 hover:bg-transparent"
                      variant={"ghost"}
                    >
                      <MdKeyboardArrowDown
                        className="hover:text-slate-700"
                        size={25}
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full flex flex-col p-0">
                    <Button
                      variant={"ghost"}
                      className="rounded-none"
                      onClick={() => deleteConnection(connetion.id!)}
                    >
                      Excluir contato
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full h-full col-span-3 bg-neutral-700">
          <section className="h-full w-full flex flex-col items-center justify-between">
            <div className="h-full w-full ">
              {chat.name ? (
                <>
                  <Chat.header>
                    <div className="flex items-center gap-2">
                      {chat.photo ? (
                        <Image
                          alt={chat.name!}
                          src={chat.photo}
                          width={40}
                          height={40}
                          className="rounded-full w-10 h-10 bg-contain"
                        />
                      ) : (
                        <HiUserCircle size={35} className="text-slate-900" />
                      )}

                      {chat.name}
                    </div>
                  </Chat.header>

                  <div className="h-[92%] bg-neutral-400 bg-center flex flex-col justify-end relative">
                    <Chat.main>
                      {messeges !== undefined ? (
                        messeges.map((messege) => (
                          <div
                            key={messege.id}
                            className={`flex flex-col relative ${
                              messege.user_id === chat.userId
                                ? "items-end bg-cyan-100 p-2 rounded-lg rounded-se-none max-w-[48%] self-end"
                                : "items-start bg-white p-2 rounded-lg rounded-ss-none max-w-[48%] self-start"
                            }`}
                          >
                            <p className="text-xs p-1 w-[205px] font-normal break-words">
                              {messege.messegeText}
                            </p>

                            {messege.user_id === chat.userId ? (
                              <div
                                className="absolute top-0 left-full w-0 h-0 rounded-e-sm"
                                style={{
                                  borderBottom: "15px solid transparent",
                                  borderLeft: "10px solid rgb(207 250 254)",
                                }}
                              ></div>
                            ) : (
                              <div
                                className="absolute top-0 right-full w-0 h-0 rounded-s-sm"
                                style={{
                                  borderBottom: "15px solid transparent",
                                  borderRight: "10px solid #FFF",
                                }}
                              ></div>
                            )}
                          </div>
                        ))
                      ) : (
                        <>Sem messagens</>
                      )}
                    </Chat.main>
                    <Chat.footer
                      handleSendMessage={handleSendMessage}
                      messageText={messageText}
                      setMessageText={setMessageText}
                    />
                  </div>
                </>
              ) : (
                <ContainerNoChatCvs />
              )}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
