import cors from "cors";
import express, { Router } from "express";
import http from "http";

import { Server } from "socket.io";
import { CreateUserController } from "./controllers/user/create-user";
import { CreateConnection } from "./controllers/connection/create-connection";
import { AuthUserController } from "./controllers/user/auth-user";
import multer from "multer";
import { isAuthenticated } from "./middleware/isAuthenticated";
import { UpdateUserController } from "./controllers/user/update-user";
import { DeletePhotoController } from "./controllers/user/delete-photo";
import { ListConnectionController } from "./controllers/connection/list-connection";
import { DetailUserController } from "./controllers/user/detail";
import { DeleteConnectionController } from "./controllers/connection/delete-connection";
import { NewMessegeController } from "./controllers/conversation/new-messege";
import { CreateConversationController } from "./controllers/conversation/create-conversation";
import { GetConversationController } from "./controllers/conversation/get-conversation";
import { ListMessegeController } from "./controllers/conversation/list-messege";

const Multer = multer({
  storage: multer.memoryStorage(),
});

const router = Router();
const app = express();
app.use(express.json());
app.use(cors());

//Routers user
router.post("/user", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/detail", isAuthenticated, new DetailUserController().handle);
router.patch(
  "/user/photo-delete/:id",
  isAuthenticated,
  new DeletePhotoController().handle
);
router.patch(
  "/user/:id",
  isAuthenticated,
  Multer.single("file"),
  new UpdateUserController().handle
);

//Routers connection
router.post("/connection", isAuthenticated, new CreateConnection().handle);
router.get(
  "/connections",
  isAuthenticated,
  new ListConnectionController().handle
);
router.delete(
  "/connection/:id",
  isAuthenticated,
  new DeleteConnectionController().handle
);

//Messeges
router.post("/message/:id", isAuthenticated, new NewMessegeController().handle);

router.get("/message/:id", isAuthenticated, new ListMessegeController().handle);

router.post(
  "/conversation/:id",
  isAuthenticated,
  new CreateConversationController().handle
);

router.get(
  "/conversation/:id",
  isAuthenticated,
  new GetConversationController().handle
);

app.use(router);

const serverHttp = http.createServer(app);

export { serverHttp };
