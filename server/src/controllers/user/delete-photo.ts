import { Request, Response } from "express";
import { prismaClient } from "../../prisma/client";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebaseConnect";
import { deleteObject, ref } from "firebase/storage";

export class DeletePhotoController {
  async handle(req: Request, res: Response) {
    try {
      const userId = req.params.id as string;

      if (!userId) {
        return res.status(500).send("Não recebemos o ID do usuário");
      }

      const user = await prismaClient.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(500).send("Usuário não existe");
      }

      if (user) {
        await deleteDoc(doc(db, "profile", user.photoId!));
        await deleteObject(ref(storage, `profile/${user.photoFilename}`));

        user.photoFilename = null;
        user.photoId = null;
        user.photoUrl = null;
        user.update_at = new Date();
      }

      const update = await prismaClient.user.update({
        where: {
          id: user.id,
        },
        data: {
          ...user,
        },
      });

      return res.json(update);
    } catch (error) {
      return res.status(500).send("Erro ao tentar excluir a foto do usuário");
    }
  }
}
