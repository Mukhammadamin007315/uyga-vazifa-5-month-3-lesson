let userlar = 0;
class userService {
  constructor(socket, io) {
    this.socket = socket;
    this.io = io;
  }
  joinRoom(roomName) {
    if (!this.socket.rooms.has(roomName)) {
      this.socket.join(roomName);
      const data = `User ${this.socket.handshake.headers.username} guruhga qo'shildi`;
      this.io.to(roomName).emit(roomName, data);
      this.io.emit("onlineUsers", `Online bolgan userlar soni ${++userlar}`);
    } else {
      this.socket.emit(
        "onlineUsers",
        `${this.socket.handshake.headers.username} siz bu guruhga oldin ulangansiz!`
      );
    }
  }
  leaveRoom() {
    this.io.emit("onlineUsers", `Online qolgan userlar soni ${--userlar}`);
  }
}
export default userService;
