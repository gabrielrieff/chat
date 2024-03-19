import { Request, Response } from "express";
import { prismaClient } from "../../prisma/client";
import crypto from "crypto";
import { db, storage } from "../../firebase/firebaseConnect";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export class UpdateUserController {
  async handle(req: Request, res: Response) {
    try {
      const userId = req.params.id as string;
      const photo = req.file!;

      let body = {};

      const user = await prismaClient.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(400).json({ error: "Usuário não existe" });
      }

      const uploadImage = async () => {
        const file = req.file;

        const fileHash = crypto.randomBytes(16).toString("hex");
        const fileName = `${fileHash}-${file?.originalname}`;

        const storageRef = ref(storage, `profile/${fileName}`);
        await uploadBytesResumable(storageRef, file?.buffer!, {
          contentType: file?.mimetype,
        });

        const url = await getDownloadURL(storageRef).then((url) => {
          return url;
        });

        const imgID = await extrairToken(url);

        await setDoc(doc(db, "profile", imgID), {
          url,
          userId,
          imgID,
        });

        return { url, imgID, fileName };
      };

      if (photo) {
        const { url, imgID, fileName } = await uploadImage();

        if (user.photoId) {
          await deleteDoc(doc(db, "profile", user.photoId));
          await deleteObject(ref(storage, `profile/${user.photoFilename}`));

          body = {
            ...req.body,
            photoId: imgID,
            photoUrl: url,
          };
        }

        if (user.photoId === null) {
          body = {
            ...req.body,
            photoId: imgID,
            photoUrl: url,
            photoFileName: fileName,
          };
        }
      } else {
        body = {
          ...req.body,
        };
      }

      const userUpdate = await prismaClient.user.update({
        where: {
          id: userId,
        },
        data: {
          ...body,
        },
      });

      return res.json(userUpdate);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao tentar alterar dados do usuário" });
    }
  }
}

function extrairToken(url: string) {
  const regex = /token=([^&]+)/;
  const match = url.match(regex);

  if (match) {
    return match[1];
  }
  return "";
}
