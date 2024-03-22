import { Request, Response } from "express";
import { prismaClient } from "../../prisma/client";

export class CreateConversation {
  async handle(req: Request, res: Response) {
    try {
      const { userID } = req.body;

      const conversation = await prismaClient.conversation.create({
        data: {
          userID: userID,
        },
      });

      return res.status(200).json(conversation);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
