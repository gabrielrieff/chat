import { Request, Response } from "express";
import { prismaClient } from "../../prisma/client";

export class DetailUserController {
  async handle(req: Request, res: Response) {
    try {
      const userID = req.userId;

      const detail = await prismaClient.user.findFirst({
        where: { id: userID },
      });

      return res.status(200).json(detail);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar os detalhes do usuario" });
    }
  }
}
