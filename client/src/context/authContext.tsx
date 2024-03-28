"use client";

import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ReactNode, createContext, useEffect, useState } from "react";
import { Connection } from "~/@types/connection";
import { User } from "~/@types/user";
import { api } from "~/services/api";

type AuthContextData = {
  user?: User;
  connections?: Array<Connection>;
  signIn: (phone_user: string, password_user: string) => void;
  singOut: () => void;
  create_user: (name: string, password: string, phone: string) => void;
  createConnection: (name: string, phone: string) => void;
  deleteConnection: (connectionId: string) => void;
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter();

  const [user, setUser] = useState<User>();
  const [connections, setConnections] = useState<Array<Connection>>([]);

  useEffect(() => {
    const { "@nextauth.token": token } = parseCookies();
    getDetailUser();
    getConnections();
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

  async function getDetailUser() {
    try {
      const response = await api.get("/detail");

      const {
        id,
        name,
        password,
        phone,
        token,
        photoUrl,
        photoFilename,
        photoId,
      } = response.data as User;

      setUser({
        id,
        name,
        password,
        phone,
        token,
        photoUrl,
        photoFilename,
        photoId,
      });
    } catch (error) {}
  }

  async function signIn(phone_user: string, password_user: string) {
    try {
      const response = await api.post("/session", {
        phone: phone_user,
        password: password_user,
      });

      const {
        id,
        name,
        password,
        phone,
        token,
        photoUrl,
        photoFilename,
        photoId,
      } = response.data as User;
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
        photoUrl,
        photoFilename,
        photoId,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      push("/main/chat");
    } catch (error) {}
  }

  async function singOut() {
    try {
      destroyCookie(null, "@nextauth.token");
      push("/");
    } catch (error) {
      console.log("erro ao deslogar");
    }
  }

  //Connection
  async function createConnection(name: string, phone: string) {
    try {
      if (name === "" || phone === "") return;

      const response = await api.post("/connection", {
        name: name,
        phone: phone,
      });

      setConnections((prev) => [...prev, response.data]);

      console.log();
    } catch (error) {}
  }

  async function getConnections() {
    try {
      const response = await api.get("/connections");
      setConnections(response.data);
    } catch (error) {}
  }

  async function deleteConnection(connectionId: string) {
    try {
      const response = await api.delete(`/connection/${connectionId}`);

      setConnections(response.data);
    } catch (error) {}
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        create_user,
        signIn,
        singOut,
        createConnection,
        connections,
        deleteConnection,
      }}
    >
      <>{children}</>
    </AuthContext.Provider>
  );
};
