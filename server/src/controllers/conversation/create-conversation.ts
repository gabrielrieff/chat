import { Request, Response } from "express";
import { prismaClient } from "../../prisma/client";

export class CreateConversationController {
  async handle(req: Request, res: Response) {
    try {
      const meId = req.userId;
      const twoUserId = req.params.id as string;
      const { connectionId } = req.body;

      const isExistConversation = await prismaClient.connection.findFirst({
        where: {
          id: connectionId,
        },
      });

      if (isExistConversation?.conversationId) {
        return res.send("error");
      }

      const conversation = await prismaClient.conversation.create({
        data: {
          userOne: meId,
          userTwo: twoUserId,
        },
      });

      const update = await prismaClient.connection.update({
        where: {
          id: connectionId,
        },
        data: {
          conversationId: conversation.id,
        },
      });

      return res.status(200).json(conversation);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
