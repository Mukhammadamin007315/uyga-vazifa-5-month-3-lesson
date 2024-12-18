import userService from "../service/user.service.js";
class userController {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
    this.userService = new userService(socket, io);
  }
  onConnectionController(socket) {
    try {
      socket.on("join-room", (roomName) => {
        return this.userService.joinRoom(roomName);
      });
    } catch (error) {
      socket.emit("join-room", "Xatolik");
    }
  }
  offConnectionController(socket) {
    try {
      return this.userService.leaveRoom(socket);
    } catch (error) {
      socket.emit("join-room", "Xatolik");
    }
  }
}
export default userController;
