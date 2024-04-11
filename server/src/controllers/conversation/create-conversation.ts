import { Request, Response } from "express";
import { prismaClient } from "../../prisma/client";

export class CreateConversationController {
  async handle(req: Request, res: Response) {
    try {
      const id_user_one = req.userId;
      const id_user_two = req.params.id as string;
      const { connectionId } = req.body;

      const isExistUser = await prismaClient.user.findFirst({
        where: {
          id: id_user_two,
        },
        select: {
          id: true,
          connections: true,
        },
      });

      if (!isExistUser) {
        return res.status(500).send("usuario não existe");
      }

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
          id_user_one: id_user_one,
          id_user_two: id_user_two,
        },
      });

      const updateMyConnection = await prismaClient.connection.update({
        where: {
          id: connectionId,
        },
        data: {
          conversationId: conversation.id,
        },
      });

      const filterConnectionUserTwo = await isExistUser.connections.filter(
        (item) => {
          return item.id_user_contact === id_user_one;
        }
      );

      if (filterConnectionUserTwo) {
        const update = await prismaClient.connection.update({
          where: {
            id: filterConnectionUserTwo[0].id,
          },
          data: {
            conversationId: conversation.id,
          },
        });

        console.log(update);
      }

      return res.status(200).json(conversation);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
