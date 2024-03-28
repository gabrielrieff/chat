import { Request, Response } from "express";
import { prismaClient } from "../../prisma/client";

export class GetConversationController {
  async handle(req: Request, res: Response) {
    try {
      const userID = req.userId;
      const conversationId = req.params.id as string;

      const isExistConversation = await prismaClient.conversation.findFirst({
        where: {
          id: conversationId,
        },
      });

      if (!isExistConversation) {
        return res.send("error");
      }

      return res.status(200).json(isExistConversation);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
