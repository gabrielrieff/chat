import { FormEvent, useEffect, useState } from "react";
import { BsEmojiSunglasses } from "react-icons/bs";
import { IoSend } from "react-icons/io5";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

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
  const [userMessege, setUserMessege] = useState("");
  const [messegeList, setMessegeList] = useState<Array<messegeType> | []>([]);

  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(null);

  const messege = async (event: FormEvent) => {
    event.preventDefault();
    if (!userMessege.trim()) return;

    const data = {
      messege: userMessege,
      userName: userName,
      socket_id: socket.id,
      room: room,
      color: color,
    };
    socket.emit("messege", data);

    setUserMessege("");
  };
  // useEffect(() => {
  //   socket.on("receive_messege", (data: messegeType) => {
  //     setMessegeList((current) => [...current, data]);
  //   });

  //   return () => socket.off("receive_messege");
  // }, [socket]);

  useEffect(() => {
    console.log("true");
  }, [isPickerVisible]);

  return (
    <section className="h-full w-full flex flex-col items-center justify-between">
      <div className="h-full w-full ">
        <div className="bg-zinc-100 w-full h-[6%] p-1">
          {currentEmoji || room} - {room}
        </div>
        <div className="h-[94%] bg-chat bg-repeat bg-center pr-0 flex flex-col justify-end">
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
          <form
            onSubmit={messege}
            className="flex items-center justify-center w-full h-16 gap-2 mt-3 bg-zinc-100 p-3"
          >
            <button
              className="hover:text-slate-400 text-zinc-500"
              onClick={() => setIsPickerVisible(!isPickerVisible)}
            >
              <BsEmojiSunglasses size={25} />
            </button>

            <div className={isPickerVisible ? "block" : "none"}>
              <Picker
                data={data}
                previewPosition="top"
                onEmojiSelect={(e) => {
                  setCurrentEmoji(e.native);
                  setIsPickerVisible(!isPickerVisible);
                }}
              />
            </div>
            <textarea
              value={userMessege}
              placeholder="Mensagem"
              className="p-2 px-4 rounded-full w-full h-[40px] resize-none"
              onChange={(e) => setUserMessege(e.target.value)}
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 focus:bg-green-600 transition-[.5s] rounded-full p-2"
            >
              <IoSend size={20} className="text-white" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
