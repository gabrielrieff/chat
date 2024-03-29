import { Textarea } from "../ui/textarea";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import Image from "next/image";

import { BsEmojiSunglasses } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { HiUserCircle } from "react-icons/hi2";
import { Connection } from "~/@types/connection";
import { useEffect, useState } from "react";
import { AiOutlineMore } from "react-icons/ai";

interface ChatParams extends Connection {
  socket: any;
}

export function ContainerChatCvs({ name, photo }: Connection) {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(null);
  const [userMessege, setUserMessege] = useState("");

  useEffect(() => {}, [isPickerVisible]);

  return (
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
          {/* {messegeList.map((messege, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                messege.socket_id === socket.id
                  ? "items-end bg-green-100 p-2 rounded-lg max-w-[48%] self-end"
                  : "items-start bg-slate-200 p-2 rounded-lg max-w-[48%] self-start"
              }`}
            >
              {messege.socket_id !== socket.id ? (
                <p className={`${messege.color} font-semibold`}>
                  ~ {messege.userName}
                </p>
              ) : (
                <></>
              )}
              <p className="text-xs p-1 w-[205px] font-normal break-words">
                {messege.messege}
              </p>
            </div>
          ))} */}
        </div>
        <form className="flex items-center justify-center w-full h-16 gap-2 mt-3 bg-gray-100 p-3">
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
            value={userMessege}
            placeholder="Mensagem"
            className="resize-none bg-white min-h-10 max-h-10"
            onChange={(e) => setUserMessege(e.target.value)}
          />
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-600 transition-[.5s] rounded-full p-2"
          >
            <IoSend size={20} className="text-white" />
          </button>
        </form>
      </div>
    </>
  );
}
