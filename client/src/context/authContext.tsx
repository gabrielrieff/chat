"use client";

import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from "nookies";
import { ReactNode, createContext, useEffect, useState } from "react";
import { Connection } from "~/@types/connection";
import { User } from "~/@types/user";
import { api } from "~/services/api";

type AuthContextData = {
  user?: User;
  create_user: (name: string, password: string, phone: string) => void;
  signIn: (phone_user: string, password_user: string) => void;
  createConnection: (name: string, phone: string) => void;
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter();

  const [user, setUser] = useState<User>();
  const [connections, setConnections] = useState<Connection>();

  useEffect(() => {
    const { "@nextauth.token": token } = parseCookies();
  }, []);

  //user
  async function create_user(name: string, password: string, phone: string) {
    try {
      await api.post("/user", {
        name: name,
        phone: phone,
        password: password,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function signIn(phone_user: string, password_user: string) {
    try {
      const response = await api.post("/session", {
        phone: phone_user,
        password: password_user,
      });

      const { id, name, password, phone, token } = response.data as User;
      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUser({
        id,
        name,
        password,
        phone,
        token,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      push("/main/chat");
    } catch (error) {}
  }

  async function createConnection(name: string, phone: string) {
    try {
      if (name === "" || phone === "") return;

      const response = await api.post("/connection", {
        name: name,
        phone: phone,
      });

      console.log(response.data);
    } catch (error) {}
  }
  return (
    <AuthContext.Provider
      value={{ user, create_user, signIn, createConnection }}
    >
      <>{children}</>
    </AuthContext.Provider>
  );
};
