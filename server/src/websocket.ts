import { Server } from "socket.io";

const io = new Server(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users: User[] = [];

const addUser = (userId: string, socketId: string, name: string) => {
  !users.some((user) => user.id === userId) &&
    users.push({ id: userId, socketId, name });
};

const removeUser = (socketId: string) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId: string) => {
  return users.find((user) => user.id === userId);
};

io.on("connection", (socket) => {
  socket.on("addUser", (userId, name) => {
    addUser(userId, socket.id, name);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on(
    "sendMessage",
    ({ user_id, conversationId, messageText, receiverId }: Message) => {
      const user = getUser(receiverId);
      if (user) {
        io.to(user!.socketId).emit("getMessage", {
          conversationId,
          messageText,
          user_id,
        });
      }
    }
  );

  socket.on("disconnect", (reason) => {
    console.log("Usuário desconectado!", socket.id);
    removeUser(socket.id);
    io.emit("getUsers");
  });
});

type Message = {
  id: string;
  messageText: string;
  user_id: string;
  conversationId: string;
  receiverId: string;
};

type User = {
  id: string;
  socketId: string;
  name: string;
};
