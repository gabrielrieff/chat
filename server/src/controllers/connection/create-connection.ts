import { Request, Response } from "express";
import { prismaClient } from "../../prisma/client";

export class CreateConnection {
  async handle(req: Request, res: Response) {
    try {
      const { phone, name } = req.body;
      const userID = req.userId;

      const isUser = await prismaClient.user.findFirst({
        where: {
          phone: phone,
        },
      });

      const connection = await prismaClient.connections.create({
        data: {
          phone: phone,
          name: name,
          isUser: isUser ? true : false,
          userId: userID,
        },
      });

      return res.status(200).json(connection);
    } catch (error) {
      return res.json({ error: error.message });
    }
  }
}
