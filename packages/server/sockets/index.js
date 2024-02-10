import { Server } from "socket.io";
import { handleAddUser, handleSendMessage } from "./socketHandlers.js";
import { getEnvVariable } from "../utils/env.js";

function socketConnection(server) {
  const io = new Server(server, {
    cors: {
      origin: getEnvVariable("CORS_ORIGIN"),
      credentials: true,
    },
  });

  global.onlineUsers = new Map();
  global.chatSocket = null;

  io.on("connection", (socket) => {
    global.chatSocket = socket;

    // Register event handlers from the imported module
    socket.on("add-user", (userId) => handleAddUser(socket, userId));
    socket.on("send-msg", (data) => handleSendMessage(socket, data));

    // Add more event handlers here as needed
  });
}

export { socketConnection };
