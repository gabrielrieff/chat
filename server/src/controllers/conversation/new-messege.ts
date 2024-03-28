import { Request, Response } from "express";
import { prismaClient } from "../../prisma/client";

export class NewMessegeController {
  async handle(req: Request, res: Response) {
    try {
      const conversationId = req.params.id as string;
      const { messege, connection } = req.body;

      const isExistConversation = await prismaClient.conversation.findFirst({
        where: {
          id: conversationId,
        },
      });

      if (!isExistConversation) {
        return res.send("Esta ainda não existe uma conversa");
      }

      const createMessege = await prismaClient.messege.create({
        data: {
          messegeText: messege,
          conversationId: conversationId,
          connectionId: connection,
        },
      });

      return res.status(200).json({ createMessege });
    } catch (error) {}
  }
}
