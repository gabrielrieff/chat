import { Request, Response } from "express";
import { User } from "../../Model/User";
import { prismaClient } from "../../prisma/client";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { name, phone, password } = req.body;

      const isUser = await prismaClient.user.findFirst({
        where: {
          phone: phone,
        },
      });

      if (isUser) {
        throw new Error("Usuario ja existe");
      }

      const newUser = new User(name, phone, password);

      newUser.createUserValidate();
      const hashedPassword = await newUser.getHashedPassword();

      const createUser = await prismaClient.user.create({
        data: {
          name: newUser.name,
          phone: newUser.phone,
          password: hashedPassword,
        },
      });

      return res.status(200).json(createUser);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
