import userService from "../service_2/user.service.js";
class userController {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
    this.userService = new userService(socket, io);
  }
  async onConnectionController(socket) {
    try {
      const data = await this.userService.onConnection(socket);
      if (data) {
        this.io.emit("user-connected", `User ${data} ulandi`);
      } else {
        this.socket.emit("user-connected", "Ismingizni kiriting");
      }
    } catch (error) {
      this.socket.emit("user-connected", `Xatolik`);
    }
  }
  async joinRoomController(roomName) {
    try {
      const data = await this.userService.joinRoom(roomName);
      if (data) {
        this.socket.join(roomName);
        this.io
          .to(roomName)
          .emit(
            "room-joined",
            `${this.socket.handshake.headers.username} guruhga qo'shildi`
          );
      }
    } catch (error) {
      this.socket.emit("error", "Xatolik");
    }
  }
  async messageController(roomName, message) {
    try {
      const data = await this.userService.message(roomName);
      if (data) {
        this.io
          .to(roomName)
          .emit(
            "room-message",
            `${this.socket.handshake.headers.username}dan ${message}`
          );
      } else {
        this.socket.emit("error", "Oldin biron bir guruhga qo'shiling");
      }
    } catch (error) {
      this.socket.emit("error", "Xatolik");
    }
  }
  async leaveRoomController(roomName) {
    try {
      const data = await this.userService.leaveRoom(roomName);
      if (data) {
        this.io
          .to(roomName)
          .emit(
            "room-left",
            `User ${this.socket.handshake.headers.username} guruhdan chiqib ketdi`
          );
        this.socket.leave(roomName);
      }
    } catch (error) {
      this.socket.emit("error", "Xatolik");
    }
  }
}
export default userController;
