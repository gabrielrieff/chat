import React, { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import { IoSend } from "react-icons/io5";
import { BsEmojiSunglasses } from "react-icons/bs";

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

  return (
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
  );
}
