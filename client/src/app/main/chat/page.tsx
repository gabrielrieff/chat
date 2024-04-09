"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { AuthContext } from "~/context/authContext";

import { Chat } from "~/components/Chat/index";

import { Input } from "~/components/ui/input";
import { ContainerNoChatCvs } from "~/components/Chat/ContainerNoChatCvs";

import { MenuMain } from "~/components/Menu/MainMenu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { User } from "~/components/User/User";
import { Connections } from "~/components/Connections/Connections";
import { socket } from "~/socket/socket";

export default function Conversas() {
  const {
    conversations,
    user,
    getMesseges,
    messeges,
    setMesseges,
    newMessage,
  } = useContext(AuthContext);

  const [messageText, setMessageText] = useState("");
  const [root, setRoot] = useState("chat");
  const [chat, setChat] = useState({
    name: "",
    photo: "",
    conversationId: "",
    userId: "",
    id_user_contact: "",
  });

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

  const [socketInstance] = useState(socket());

  useEffect(() => {
    socketInstance.emit("addUser", user?.id, user?.name);

    socketInstance.on("getMessage", (data) => {
      setMesseges((prev) => [
        ...prev,
        {
          id: "01",
          messegeText: data.messageText,
          conversationId: data.conversationId,
          user_id: data.user_id,
          created_at: new Date().toISOString(),
          update_at: new Date().toISOString(),
        },
      ]);
    });

    return () => {
      socketInstance.off("getMessage");
    };
  }, [socketInstance, user, setMesseges]);

  async function handleSendMessage() {
    if (chat.conversationId === null || chat.conversationId === undefined)
      return;
    if (messageText === "") return;
    if (chat.userId === undefined) return;

    await newMessage(chat.conversationId, messageText, chat.userId);

    await socketInstance.emit("sendMessage", {
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
        created_at: new Date().toISOString(),
        update_at: new Date().toISOString(),
      },
    ]);
    setMessageText("");
  }

  function handleNavegation(root: "user" | "connections" | "chat") {
    setRoot(root);
  }

  const comp = () => {
    switch (root) {
      case "user":
        return <User />;
      case "connections":
        return <Connections />;

      case "chat":
        return undefined;
    }
  };

  useEffect(() => {
    comp();
  }, [root]);

  return (
    <main className="h-screen flex flex-row bg-white">
      <section className="flex flex-col h-full">
        <div>
          <div className="flex items-center gap-1 pt-3 justify-center font-semibold text-2xl">
            <span className="text-sky-500">dev</span>
            <span>chat</span>
          </div>
        </div>

        <div className="flex h-full w-full pt-7">
          <MenuMain handleNavegation={handleNavegation} isLinkActive={root} />
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 2 }}
            >
              {comp() !== undefined ? (
                comp()
              ) : (
                <section className="h-full w-full">
                  <div className="h-[5%] px-3 py-1 flex items-center relative">
                    <Input
                      type="search"
                      className="pl-8 bg-neutral-100 placeholder:text-zinc-400"
                      placeholder="Pesquisar uma conversa"
                    />
                    <BsSearch
                      size={20}
                      className="absolute text-zinc-400 left-5"
                    />
                  </div>

                  <div className="h-[5%] px-3 py-2 flex items-center text-zinc-600 font-medium">
                    Chats
                  </div>

                  <div className="h-[90%] p-1 overflow-auto">
                    {conversations!.map((conversation) => (
                      <div
                        key={conversation.id}
                        onClick={() => {
                          toAlterChat(
                            conversation.name!,
                            conversation.photo!,
                            conversation.conversationId!,
                            conversation.userId!,
                            conversation.id_user_contact!
                          );
                          getMesseges(conversation.conversationId!);
                        }}
                        className={`flex p-2 w-full rounded-lg mt-1 hover:bg-sky-100 cursor-pointer transition-[.5s]
                  ${
                    conversation.id_user_contact === chat.id_user_contact &&
                    "bg-sky-600 hover:bg-sky-500"
                  }`}
                      >
                        <div className="flex flex-row items-center justify-center h-20 w-full gap-2">
                          <div className="h-full">
                            {conversation.photo ? (
                              <Avatar>
                                <AvatarImage src={conversation.photo} />
                                <AvatarFallback>
                                  {conversation.name
                                    ?.substring(0, 2)
                                    .toLocaleUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              <Avatar>
                                <AvatarFallback>
                                  {conversation.name
                                    ?.substring(0, 2)
                                    .toLocaleUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                          <div className="flex flex-col h-full w-full">
                            <div
                              className={`flex justify-between w-full ${
                                conversation.id_user_contact ===
                                  chat.id_user_contact && "text-white"
                              }`}
                            >
                              <span>{conversation.name}</span>

                              <span
                                className={`text-xs ${
                                  conversation.id_user_contact ===
                                  chat.id_user_contact
                                    ? "text-sky-100"
                                    : "text-zinc-500"
                                }`}
                              >
                                14:33
                              </span>
                            </div>
                            <span
                              className={`text-xs max-w-[228px] max-h-14 break-words line-clamp-3 ${
                                conversation.id_user_contact ===
                                chat.id_user_contact
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
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section
        className="h-full w-full flex flex-col items-center justify-between
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
                        {messege.messegeText.split("\n").map((line, index) => (
                          <p
                            key={index}
                            className="text-xs p-1 w-[205px] font-normal break-words"
                          >
                            {line}
                          </p>
                        ))}

                        <p className="text-[10px] absolute bottom-1 right-2">
                          {new Date(messege.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
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
