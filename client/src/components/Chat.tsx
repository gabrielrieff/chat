import { FormEvent, useContext, useEffect, useState } from "react";
import { BsEmojiSunglasses } from "react-icons/bs";
import { IoSend } from "react-icons/io5";

import Image from "next/image";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { AuthContext } from "~/context/authContext";
import { HiUserCircle } from "react-icons/hi2";
import { Textarea } from "./ui/textarea";

type messegeType = {
  messege: string;
  socket_id: string;
  userName: string;
  color: string;
  room: string;
};

type ChatParams = {
  socket: any;
  userName: string;
  color: string;
  room: string;
};

export const Chat = ({ socket, room, userName, color }: ChatParams) => {
  const { user } = useContext(AuthContext);

  const [userMessege, setUserMessege] = useState("");
  const [messegeList, setMessegeList] = useState<Array<messegeType> | []>([]);

  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(null);

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

  useEffect(() => {}, [isPickerVisible]);

  return (
    <section className="h-full w-full flex flex-col items-center justify-between">
      <div className="h-full w-full ">
        <div className="h-[8%] flex items-center gap-3 bg-gray-100 p-1">
          {user?.photoUrl ? (
            <Image
              alt={user!.name}
              src={user?.photoUrl}
              width={40}
              height={40}
              className="rounded-full w-10 h-10 bg-contain"
            />
          ) : (
            <HiUserCircle size={35} className="text-slate-900" />
          )}

          {user?.name}
        </div>
        <div className="h-[92%] bg-neutral-50 bg-center pr-0 flex flex-col justify-end relative">
          <div className="overflow-y-auto overflow-x-hidden pr-5 flex flex-col gap-3">
            {messegeList.map((messege, index) => (
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
            ))}
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
                  onEmojiSelect={(e) => {
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
      </div>
    </section>
  );
};
