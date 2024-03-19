import { Request, Response } from "express";
import { prismaClient } from "../../prisma/client";

export class DeleteUserController {
  async handle(req: Request, res: Response) {
    try {
      const userId = req.params.userId as string;

      if (!userId) {
        return res.status(400).json({ error: "ID de usuário ausente" });
      }

      const user = await prismaClient.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new Error("Usuário não existe");
      }

      const { count } = await prismaClient.user.deleteMany({
        where: {
          id: userId,
        },
      });

      return res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao tentar excluir um usuário" });
    }
  }
}
