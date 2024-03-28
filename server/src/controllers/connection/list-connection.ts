import { Request, Response } from "express";
import { prismaClient } from "../../prisma/client";

export class ListConnectionController {
  async handle(req: Request, res: Response) {
    try {
      const userID = req.userId;

      const connections = await prismaClient.connection.findMany({
        where: {
          userId: userID,
        },
      });

      return res.status(200).json(connections);
    } catch (error) {
      return res.json({ error: error.message });
    }
  }
}
