"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Register } from "~/components/notLoggedIn/Register";
import { Login } from "~/components/notLoggedIn/Login";

export default function Home() {
  return (
    <div className="h-screen w-full flex justify-center items-center flex-col">
      <Tabs defaultValue="account" className="w-[500px] h-[700px] p-8">
        <div className="flex items-center gap-1 mb-6 justify-center font-semibold text-4xl">
          <span className="text-sky-500">dev</span>
          <span>chat</span>
        </div>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Login</TabsTrigger>
          <TabsTrigger value="password">Registrar</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Já sou usuário</CardTitle>
              <CardDescription>
                Forneça o telefone e a senha para acessar a plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Login />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Quero me registrar</CardTitle>
              <CardDescription>
                Preencha o formulário com os dados requisitados para se
                registrar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Register />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
