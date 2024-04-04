import React from "react";
import { AiOutlineMore } from "react-icons/ai";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

interface HeaderProps {
  children: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <div className="h-[8%] w-full flex items-center justify-between gap-3 bg-gray-100 p-1">
      <div className="flex items-center gap-2">{children}</div>

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
  );
}
