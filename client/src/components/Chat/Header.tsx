import React from "react";
import { AiOutlineMore } from "react-icons/ai";
import { BsCameraVideoOff } from "react-icons/bs";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

interface HeaderProps {
  children: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <div className="h-[8%] w-full flex items-center justify-between border-b-[1px] gap-3 p-1 px-3">
      <div className="flex items-center gap-2">{children}</div>

      <div className="flex items-center flex-row gap-3">
        <BsCameraVideoOff
          size={28}
          className="hover:text-zinc-400 cursor-pointer"
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button className="px-2" variant={"ghost"}>
              <AiOutlineMore size={28} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full flex flex-col p-0">
            <Button variant={"ghost"} className="rounded-none">
              Limpar conversa
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
