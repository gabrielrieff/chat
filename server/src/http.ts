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
router.post("/connection", new CreateConnection().handle);

app.use(router);

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "http://localhost:3000",
  },
});

export { serverHttp, io };
