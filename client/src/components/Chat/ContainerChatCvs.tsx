import { Textarea } from "../ui/textarea";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import { useEffect, useState } from "react";
import Image from "next/image";

import { BsEmojiSunglasses } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { HiUserCircle } from "react-icons/hi2";
import { AiOutlineMore } from "react-icons/ai";

import { Connection } from "~/@types/connection";
import { Messege } from "~/@types/messege";

interface ChatParams extends Connection {
  socket?: any;
  messeges: Array<Messege>;
}

export function ContainerChatCvs({
  name,
  photo,
  messeges,
  userId,
}: ChatParams) {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(null);
  const [userMessege, setUserMessege] = useState("");

  useEffect(() => {}, [isPickerVisible]);

  function handleMessege() {
    console.log(true);
  }
  return <></>;
}
