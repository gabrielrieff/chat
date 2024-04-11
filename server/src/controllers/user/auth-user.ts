import { Request, Response } from "express";
import { prismaClient } from "../../prisma/client";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class AuthUserController {
  async handle(req: Request, res: Response) {
    try {
      const { phone, password } = req.body!;

      console.log(phone, password);

      const user = await prismaClient.user.findFirst({
        where: {
          phone: phone,
        },
        select: {
          id: true,
          name: true,
          password: true,
          phone: true,
        },
      });

      if (!user) {
        return res.status(400).send("Telefone ou senha incorretos");
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).send("Telefone ou senha incorretos");
      }

      const token = sign(
        {
          phone: user.phone,
          name: user.name,
        },
        process.env.JWT_SECRET!,
        {
          subject: user.id,
          expiresIn: "30d",
        }
      );

      return res.status(200).json({ ...user, token: token });
    } catch (error) {
      return res.json({ error: error.message });
    }
  }
}
