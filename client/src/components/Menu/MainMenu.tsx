import {
  BsFillChatLeftTextFill,
  BsFillPersonLinesFill,
  BsFillPersonPlusFill,
  BsSliders,
} from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";

import { Button } from "../ui/button";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverNewConnections } from "./PopoverNewConnections";
import { useContext } from "react";
import { AuthContext } from "~/context/authContext";

interface MenuMainProps {
  handleNavegation: (root: "user" | "connections" | "chat") => void;
  isLinkActive: string;
}

export function MenuMain({ handleNavegation, isLinkActive }: MenuMainProps) {
  const { singOut } = useContext(AuthContext);

  return (
    <div className="flex flex-col justify-between h-full p-2 pr-0 bg-white text-zinc-400">
      <div className="flex flex-col gap-4">
        <Button
          variant={"ghost"}
          onClick={() => handleNavegation("chat")}
          className={isLinkActive === "chat" ? "bg-sky-100 text-sky-500" : ""}
        >
          <BsFillChatLeftTextFill size={28} />
        </Button>
        <Button variant={"ghost"}>
          <BsFillPersonLinesFill size={28} />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"ghost"}>
              <BsFillPersonPlusFill size={28} />
            </Button>
          </PopoverTrigger>
          <PopoverNewConnections />
        </Popover>
      </div>

      <div className="flex flex-col gap-6">
        <Button
          variant={"ghost"}
          className={isLinkActive === "user" ? "bg-sky-100 text-sky-500" : ""}
          onClick={() => handleNavegation("user")}
        >
          <BsSliders size={28} />
        </Button>

        <Button variant={"ghost"} onClick={singOut}>
          <LuLogOut size={28} />
        </Button>
      </div>
    </div>
  );
}
