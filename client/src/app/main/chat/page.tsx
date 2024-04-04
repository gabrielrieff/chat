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
import { ContainerNoChatCvs } from "~/components/Chat/ContainerNoChatCvs";

import { HiUserCircle } from "react-icons/hi2";
import { io } from "socket.io-client";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Messege } from "~/@types/messege";
import { MenuMain } from "~/components/Menu/MainMenu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { BsSearch } from "react-icons/bs";

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
    <main className="h-screen flex flex-row bg-white">
      <section className="flex flex-col h-full w-[20%]">
        <div>
          <div className="flex items-center gap-1 pt-3 justify-center font-semibold text-2xl">
            <span className="text-sky-500">dev</span>
            <span>chat</span>
          </div>
        </div>

        <div className="flex h-full w-full pt-7">
          <MenuMain />
          <section className="h-full w-full">
            <div className="h-[5%] px-3 py-1 flex items-center relative">
              <Input
                type="search"
                className="pl-8 bg-neutral-100 placeholder:text-zinc-400"
                placeholder="Pesquisar uma conversa"
              />
              <BsSearch size={20} className="absolute text-zinc-400 left-5" />
            </div>

            <div className="h-[5%] px-3 py-2 flex items-center text-zinc-600 font-medium">
              Chats
            </div>

            <div className="h-[90%] p-1 overflow-auto">
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
                  className={`flex p-2 w-full rounded-lg mt-1 hover:bg-sky-100 cursor-pointer transition-[.5s]
                  ${
                    connetion.id_user_contact === chat.id_user_contact &&
                    "bg-sky-600 hover:bg-sky-500"
                  }`}
                >
                  <div className="flex flex-row items-center justify-center h-20 w-full gap-2">
                    <div className="h-full">
                      {connetion.photo ? (
                        <Avatar>
                          <AvatarImage src={connetion.photo} />
                          <AvatarFallback>
                            {connetion.name
                              ?.substring(0, 2)
                              .toLocaleUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <Avatar>
                          <AvatarFallback>
                            {connetion.name
                              ?.substring(0, 2)
                              .toLocaleUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                    <div className="flex flex-col h-full w-full">
                      <div
                        className={`flex justify-between w-full ${
                          connetion.id_user_contact === chat.id_user_contact &&
                          "text-white"
                        }`}
                      >
                        <span>{connetion.name}</span>

                        <span
                          className={`text-xs ${
                            connetion.id_user_contact === chat.id_user_contact
                              ? "text-sky-100"
                              : "text-zinc-500"
                          }`}
                        >
                          14:33
                        </span>
                      </div>
                      <span
                        className={`text-xs max-w-[200px] max-h-14 break-words line-clamp-3 ${
                          connetion.id_user_contact === chat.id_user_contact
                            ? "text-zinc-200"
                            : "text-zinc-500"
                        }`}
                      >
                        Olá, como
                        esta?aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section
        className="h-full w-[80%] flex flex-col items-center justify-between
      border-l-[1px] shadow-xl"
      >
        <div className="h-full w-full ">
          {chat.name ? (
            <>
              <Chat.header>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={chat.photo} />
                    <AvatarFallback>
                      {chat.name?.substring(0, 2).toLocaleUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <span className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    {chat.name}
                  </span>
                </div>
              </Chat.header>

              <div className="h-[92%] bg-center flex flex-col justify-end pt-1 relative">
                <Chat.main>
                  {messeges !== undefined ? (
                    messeges.map((messege) => (
                      <div
                        key={messege.id}
                        className={`flex flex-col relative ${
                          messege.user_id === chat.userId
                            ? "items-end bg-sky-400 text-white p-2 rounded-xl rounded-se-none max-w-[48%] self-end"
                            : "items-start bg-slate-100 p-2 rounded-xl rounded-ss-none max-w-[48%] self-start"
                        }`}
                      >
                        <p className="text-xs p-1 w-[205px] font-normal break-words">
                          {messege.messegeText}
                        </p>
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
    </main>
  );
}
