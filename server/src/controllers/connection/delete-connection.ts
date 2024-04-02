import { Request, Response } from "express";
import { prismaClient } from "../../prisma/client";

export class DeleteConnectionController {
  async handle(req: Request, res: Response) {
    try {
      const id_user_contact = req.params.id as string;
      const userID = req.userId;

      if (!id_user_contact) {
        return res.status(400).json({ error: "ID de usuário ausente" });
      }

      const user = await prismaClient.connection.findFirst({
        where: {
          id: id_user_contact,
        },
      });

      if (!user) {
        throw new Error("Usuário não existe");
      }

      await prismaClient.connection.deleteMany({
        where: {
          id: id_user_contact,
        },
      });

      const connections = await prismaClient.connection.findMany({
        where: {
          userId: userID,
        },
      });

      return res.json(connections);
    } catch (error) {
      res.status(500).json({ error: "Erro ao tentar excluir o contato" });
    }
  }
}
