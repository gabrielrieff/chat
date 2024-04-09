import { useContext, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AuthContext } from "~/context/authContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Connection } from "~/@types/connection";
import { Input } from "../ui/input";

export function Connections() {
  const { connections } = useContext(AuthContext);

  const categorizeList = (list: Connection[]) => {
    const categorized: { [key: string]: Connection[] } = {};

    // Ordena a lista em ordem alfabética
    const sortedList = list.sort((a, b) => a!.name.localeCompare(b!.name));

    sortedList.forEach((item) => {
      const firstLetter = item!.name[0].toUpperCase();
      if (!categorized[firstLetter]) {
        categorized[firstLetter] = [];
      }
      categorized[firstLetter].push(item);
    });

    return categorized;
  };

  const categorizedItems = categorizeList(connections!);

  return (
    <div className="h-full px-1 w-[300px] pl-1 flex flex-col items-center gap-1">
      <span className="mt-4 text-left w-full">Lista de contatos</span>

      <div className="py-1 w-full flex items-center relative">
        <Input
          type="search"
          className="pl-8 bg-neutral-100 placeholder:text-zinc-400"
          placeholder="Pesquisar uma conversa"
        />
        <BsSearch size={20} className="absolute text-zinc-400 left-2" />
      </div>

      {Object.keys(categorizedItems).map((letter) => (
        <div key={letter} className="w-full">
          <h3 className="text-sky-500 pl-3 text-xl">{letter}</h3>
          {categorizedItems[letter].map((connetion) => (
            <div
              key={connetion.id}
              className={`flex p-2 border-t w-full hover:bg-sky-100 cursor-pointer transition-[.5s]`}
            >
              <div className="flex flex-row items-center justify-center w-full gap-2">
                <div className="h-full w-full flex items-center justify-start gap-3">
                  {connetion.photo ? (
                    <Avatar>
                      <AvatarImage src={connetion.photo} />
                      <AvatarFallback>
                        {connetion.name?.substring(0, 2).toLocaleUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar>
                      <AvatarFallback>
                        {connetion.name?.substring(0, 2).toLocaleUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <span>{connetion.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
