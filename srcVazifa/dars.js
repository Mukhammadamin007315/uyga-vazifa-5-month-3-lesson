import express from "express";
import initializedSocket from "./config/socket.js";
import userController from "./controllers/user.controller.js";
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
  socket.on("disconnect", (socket) => {
    roomControl.offConnectionController(socket);
  });
});
