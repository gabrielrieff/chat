import { useContext, useEffect, useState } from "react";
import { AuthContext } from "~/context/authContext";
import { ContainerChatCvs } from "./Chat/ContainerChatCvs";
import { Connection } from "~/@types/connection";
import { ContainerNoChatCvs } from "./Chat/ContainerNoChatCvs";

interface ChatParams extends Connection {
  socket?: any;
}

export const Chat = ({
  name,
  photo,
  conversationId,
  userOwnId,
}: ChatParams) => {
  const { messeges } = useContext(AuthContext);

  const [nameConversation, setNameConversation] = useState(name);
  const [photoConversation, setPhotoConversation] = useState(photo);
  useEffect(() => {
    if (name === undefined && photo === (null || undefined)) return;

    setNameConversation(name!);
    setPhotoConversation(photo!);
  }, [name, photo]);

  return (
    <section className="h-full w-full flex flex-col items-center justify-between">
      <div className="h-full w-full ">
        {name ? (
          <ContainerChatCvs
            userOwnId={userOwnId}
            name={nameConversation}
            photo={photoConversation}
            conversationId={conversationId}
            messeges={messeges!}
          />
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
