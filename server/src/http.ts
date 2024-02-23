import cors from "cors";
import express from "express";
import http from "http";

import { Server } from "socket.io";

const app = express();
app.use(express.json());
app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "http://localhost:3000",
  },
});

export { serverHttp, io };
