const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // Добавление пользователя
  socket.on("new-user-add", (newUserId) => {
    // если пользователь не был добавлен ранее
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("Новый пользователь зашёл", activeUsers);
    }
    // отправить всех активных пользователей новому пользователю
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    // удалить пользователя из списка активных пользователей
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("Пользователь отключен", activeUsers);
    // отправить всех активных пользователей всем пользователям
    io.emit("get-users", activeUsers);
  });

  // отправить всех активных пользователей всем пользователям
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Отправка сокета в :", receiverId)
    console.log("Data: ", data)
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
});
