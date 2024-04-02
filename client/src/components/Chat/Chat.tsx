import { useContext, useEffect, useState } from "react";
import { AuthContext } from "~/context/authContext";
import { Connection } from "~/@types/connection";

import Image from "next/image";
import { Textarea } from "../ui/textarea";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { ContainerNoChatCvs } from "./ContainerNoChatCvs";

import { BsEmojiSunglasses } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { HiUserCircle } from "react-icons/hi2";
import { AiOutlineMore } from "react-icons/ai";

interface ChatParams extends Connection {
  socket?: any;
}

export const Chat = ({
  name,
  photo,
  conversationId,
  userId,
  id_user_contact,
  socket,
}: ChatParams) => {
  const { messeges, newMessage } = useContext(AuthContext);

  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(null);

  const [messageText, setMessageText] = useState("");

  useEffect(() => {}, [isPickerVisible]);

  useEffect(() => {}, []);
  console.log(id_user_contact);
  async function handleSendMessage() {
    if (conversationId === null || conversationId === undefined) return;
    if (messageText === "") return;
    if (userId === undefined) return;

    newMessage(conversationId, messageText, userId);

    await socket.current.emit("sendMessage", {
      user_id: userId,
      conversationId,
      messageText,
      receiverId: id_user_contact,
    });

    setMessageText("");
  }

  return (
    <section className="h-full w-full flex flex-col items-center justify-between">
      <div className="h-full w-full ">
        {name ? (
          <>
            <div className="h-[8%] flex items-center justify-between gap-3 bg-gray-100 p-1">
              <div className="flex items-center gap-2">
                {photo ? (
                  <Image
                    alt={name!}
                    src={photo}
                    width={40}
                    height={40}
                    className="rounded-full w-10 h-10 bg-contain"
                  />
                ) : (
                  <HiUserCircle size={35} className="text-slate-900" />
                )}

                {name}
              </div>

              <AiOutlineMore size={28} />
            </div>

            <div className="h-[92%] bg-neutral-50 bg-center pr-0 flex flex-col justify-end relative">
              <div className="overflow-y-auto overflow-x-hidden pr-5 flex flex-col gap-3">
                {messeges !== undefined ? (
                  messeges.map((messege) => (
                    <div
                      key={messege.id}
                      className={`flex flex-col ${
                        messege.user_id === userId
                          ? "items-end bg-cyan-100 p-2 rounded-lg max-w-[48%] self-end"
                          : "items-start bg-white p-2 rounded-lg max-w-[48%] self-start"
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
              </div>
              <div className="flex items-center justify-center w-full h-16 gap-2 mt-3 bg-gray-100 p-3">
                <button
                  className="hover:text-slate-400 text-zinc-500"
                  onClick={() => setIsPickerVisible(!isPickerVisible)}
                >
                  <BsEmojiSunglasses size={25} />
                </button>

                {isPickerVisible && (
                  <div className="absolute bottom-16 left-4">
                    <Picker
                      data={data}
                      emojiSize={25}
                      emojiButtonSize={28}
                      previewPosition="none"
                      onEmojiSelect={(e: any) => {
                        setCurrentEmoji(e.native);
                        setIsPickerVisible(!isPickerVisible);
                      }}
                    />
                  </div>
                )}
                <Textarea
                  value={messageText}
                  placeholder="Mensagem"
                  className="resize-none bg-white min-h-10 max-h-10"
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleSendMessage}
                  className="bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-600 transition-[.5s] rounded-full p-2"
                >
                  <IoSend size={20} className="text-white" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <ContainerNoChatCvs />
        )}
      </div>
    </section>
  );
};

// const messege = async (event: FormEvent) => {
//   event.preventDefault();
//   if (!userMessege.trim()) return;

//   const data = {
//     messege: userMessege,
//     userName: userName,
//     socket_id: socket.id,
//     room: room,
//     color: color,
//   };
//   socket.emit("messege", data);

//   setUserMessege("");
// };

// useEffect(() => {
//   socket.on("receive_messege", (data: messegeType) => {
//     setMessegeList((current) => [...current, data]);
//   });

//   return () => socket.off("receive_messege");
// }, [socket]);
