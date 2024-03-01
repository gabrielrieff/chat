import { io } from "./http";

type RoomUser = {
  socket_id: string;
  userName: string;
  room: string;
};

type messegeUser = {
  socket_id: string;
  userName: string;
  room: string;
  messege: string;
  color: string;
};

const users: Array<RoomUser> = [];

io.on("connection", (socket) => {
  socket.on("select_room", (data) => {
    socket.join(data.room);

    const userInRoom = users.find(
      (user) => user.userName === data.userName && user.room === data.room
    );

    if (userInRoom) {
      userInRoom.socket_id = socket.id;
    } else {
      users.push({
        socket_id: socket.id,
        userName: data.userName,
        room: data.room,
      });
    }

    console.log(users);
  });

  socket.on("messege", (data: messegeUser) => {
    console.log(data);
    io.to(data.room).emit("receive_messege", data);
  });

  socket.on("disconnect", (reason) => {
    console.log("Usuário desconectado!", socket.id);
  });
});
