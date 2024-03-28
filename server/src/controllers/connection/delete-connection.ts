import { Request, Response } from "express";
import { prismaClient } from "../../prisma/client";

export class DeleteConnectionController {
  async handle(req: Request, res: Response) {
    try {
      const userId = req.params.id as string;
      const userID = req.userId;

      if (!userId) {
        return res.status(400).json({ error: "ID de usuário ausente" });
      }

      const user = await prismaClient.connections.findFirst({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new Error("Usuário não existe");
      }

      await prismaClient.connections.deleteMany({
        where: {
          id: userId,
        },
      });

      const connections = await prismaClient.connections.findMany({
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
