import { io } from "./http";

type RoomUser = {
  socket_id: string;
  userName: string;
  room: string;
  color: string;
};

const users: Array<RoomUser> = [];

io.on("connection", (socket) => {
  socket.on("select_room", (data) => {
    console.log(data);

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
        color: data.color,
      });
    }

    console.log(users);
  });

  socket.on("messege", (messege) => {
    io.emit("receive_messege", {
      messege,
      userID: socket.id,
      userName: socket.data.userName,
      color: socket.data.userColor,
      room: socket.data.room,
    });
  });

  // socket.on("disconnect", (reason) => {
  //   console.log("Usuário desconectado!", socket.id);
  // });
});
