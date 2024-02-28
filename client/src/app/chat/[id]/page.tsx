"use client";

import { FormEvent, useContext, useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { AuthContext } from "~/context/context";

type messegeType = {
  userID: string;
  userName: string;
  messege: string;
  userColor: string;
};

export default function Chat({ params }: { params: { id: string } }) {
  const [userMessege, setUserMessege] = useState("");
  const [messegeList, setMessegeList] = useState<Array<messegeType> | []>([]);
  const { socketConnect } = useContext(AuthContext);

  const messege = async (event: FormEvent) => {
    event.preventDefault();
    if (!userMessege.trim()) return;

    await socketConnect.emit("messege", userMessege);

    setUserMessege("");
  };

  // useEffect(() => {
  //   if (socketConnect === null) return;

  //   socketConnect.on("receive_messege", (data: messegeType) => {
  //     setMessegeList((current) => [...current, data]);
  //   });

  //   return () => socketConnect.off("receive_messege");
  // }, [socketConnect]);

  //if (socketConnect === null) return;
  return (
    <section className="h-full max-w-[1220px] min-w-[500px] flex flex-col items-center justify-between">
      <div>
        <div className="bg-green-700 text-white px-2 py-3 rounded-lg rounded-b-none">
          {params.id}
        </div>
        <div className="h-[700px] bg-chat bg-no-repeat bg-cover bg-center w-[500px] rounded-lg rounded-t-none border border-spacing-1 p-5 pr-0 flex flex-col justify-end">
          <div className="overflow-y-auto overflow-x-hidden pr-5 flex flex-col gap-3">
            {messegeList.map((messege, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  messege.userID == socketConnect.id
                    ? "items-end bg-green-100 p-2 rounded-lg max-w-[48%] self-end"
                    : "items-start bg-slate-200 p-2 rounded-lg max-w-[48%] self-start"
                }`}
              >
                {messege.userID !== socketConnect.id ? (
                  <p className={`${messege.userColor} font-semibold`}>
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
            className="flex items-center justify-center gap-2 pr-5 mt-3"
          >
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
}
