import React, { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import { IoSend } from "react-icons/io5";
import { BsEmojiSunglasses } from "react-icons/bs";
import { Button } from "../ui/button";

interface FooterProps {
  handleSendMessage: () => void;
  messageText: string;
  setMessageText: React.Dispatch<React.SetStateAction<string>>;
}

export function Footer({
  handleSendMessage,
  messageText,
  setMessageText,
}: FooterProps) {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(null);

  useEffect(() => {}, [isPickerVisible]);

  function addEmoji(emoji: any) {
    setMessageText(`${messageText} ${emoji}`);
  }

  return (
    <div className="flex items-center w-full h-[300px] gap-2 mt-1 p-3">
      <section className="border-[2px] shadow-md rounded-md w-full h-full p-2 flex flex-col">
        <Textarea
          value={messageText}
          placeholder="Mensagem"
          className="resize-none bg-white border-t-0 border-x-0 rounded-none shadow-none 
          focus-visible:outline-none h-full"
          onChange={(e) => setMessageText(e.target.value)}
        />

        <div className="flex gap-2 items-center w-full p-1">
          <Button onClick={handleSendMessage}>Enviar</Button>
          {isPickerVisible && (
            <div className="absolute bottom-[220px] left-3">
              <Picker
                data={data}
                emojiSize={25}
                emojiButtonSize={28}
                previewPosition="none"
                onEmojiSelect={(e: any) => {
                  addEmoji(e.native);
                  setIsPickerVisible(!isPickerVisible);
                }}
              />
            </div>
          )}

          <button
            className="hover:text-slate-400 text-zinc-500"
            onClick={() => setIsPickerVisible(!isPickerVisible)}
          >
            <BsEmojiSunglasses size={25} />
          </button>
        </div>
      </section>
    </div>
  );
}
