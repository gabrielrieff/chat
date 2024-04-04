import React from "react";
import { AiOutlineMore } from "react-icons/ai";

interface MainProps {
  children: React.ReactNode;
}

export function Main({ children }: MainProps) {
  return (
    <div className="overflow-y-auto overflow-x-hidden px-5 flex flex-col gap-3">
      {children}
    </div>
  );
}
