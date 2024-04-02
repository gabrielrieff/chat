import { Request, Response } from "express";
import { prismaClient } from "../../prisma/client";

export class ListMessegeController {
  async handle(req: Request, res: Response) {
    try {
      const conversationId = req.params.id as string;

      const isExistConversation = await prismaClient.conversation.findFirst({
        where: {
          id: conversationId,
        },
      });

      const arrayMesseges = await prismaClient.message.findMany({
        where: {
          conversationId: conversationId,
        },
      });

      return res.status(200).json(arrayMesseges);
    } catch (error) {}
  }
}
