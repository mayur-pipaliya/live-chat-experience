const onlineUsers = new Map();

function handleAddUser(socket, userId) {
  onlineUsers.set(userId, socket.id);
}

function handleSendMessage(socket, data) {
  const sendUserSocket = onlineUsers.get(data.to);
  if (sendUserSocket) {
    socket.to(sendUserSocket).emit("msg-receive", data.msg);
  }
}

export { handleAddUser, handleSendMessage };
