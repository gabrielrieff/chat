import { Connection } from "~/@types/connection";
import Image from "next/image";
import { HiUserCircle } from "react-icons/hi2";
export function Contacts({ isUser, name, photo }: Connection) {
  return (
    <>
      {isUser === true ? (
        <div className="flex items-center gap-3 p-2 border-b-[1px] border-gray-200 w-full mb-2 hover:bg-neutral-200 cursor-pointer transition-[.5s]">
          {photo ? (
            <Image
              alt=""
              src={photo}
              className="rounded-full w-16 h-16 object-cover"
            />
          ) : (
            <HiUserCircle size={35} className="text-slate-300" />
          )}

          <div className="flex flex-col">
            <span>{name}</span>
            <span className="text-xs text-zinc-500">{}</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3 p-2 border-b-[1px] border-gray-200 w-full hover:bg-neutral-100 cursor-pointer transition-[.5s]">
          <div className="flex items-center gap-2">
            <HiUserCircle size={35} className="text-slate-400" />
            <span>{name}</span>
          </div>

          <span className="text-xs font-semibold text-emerald-500 hover:text-emerald-700">
            Convidar
          </span>
        </div>
      )}
    </>
  );
}
