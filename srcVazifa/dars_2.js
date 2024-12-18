import express from "express";
import initializedSocket from "./config_2/socket.js";
import userController from "./controllers_2/user.controller.js";
const app = express();
app.get("/", (req, res) => {
  res.send("done");
});
const server = app.listen(4000, () => {
  console.log("Server is running", 4000);
});
const io = initializedSocket(server);
io.on("connection", (socket) => {
  const roomControl = new userController(io, socket);
  roomControl.onConnectionController(socket);
  socket.on("join-room", (roomName) => {
    roomControl.joinRoomController(roomName);
  });
  socket.on("message", ({ roomName, message }) => {
    roomControl.messageController(roomName, message);
  });
  socket.on("leave-room", (roomName) => {
    roomControl.leaveRoomController(roomName);
  });
});
