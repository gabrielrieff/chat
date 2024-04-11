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
        select: {
          id: true,
          photoUrl: true,
          connections: true,
        },
      });

      const conversation = await isUser?.connections.filter(
        (item) => item.id_user_contact === userID
      );
      let consationsId: string | null = "";

      if (conversation !== undefined && conversation?.length >= 1) {
        consationsId = conversation[0].conversationId;
      } else {
        consationsId = null;
      }

      const connection = await prismaClient.connection.create({
        data: {
          phone: phone,
          name: name,
          photo: isUser ? isUser.photoUrl : null,
          is_user: isUser ? true : false,
          userId: userID,
          id_user_contact: isUser ? isUser.id : null,
          conversationId: consationsId,
        },
      });

      return res.status(200).json(connection);
    } catch (error) {
      return res.json({ error: error.message });
    }
  }
}
