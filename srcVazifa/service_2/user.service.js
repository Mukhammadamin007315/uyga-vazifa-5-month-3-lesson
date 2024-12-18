class userService {
  constructor(socket, io) {
    this.socket = socket;
    this.io = io;
  }
  async onConnection(socket) {
    if (socket.handshake.headers.username !== undefined) {
      return socket.handshake.headers.username;
    } else {
      return false;
    }
  }
  async joinRoom(roomName) {
    if (roomName === "news" || roomName === "games") {
      return roomName;
    } else {
      return false;
    }
  }
  async message(roomName) {
    if (this.socket.rooms.has(roomName)) {
      return true;
    } else {
      return false;
    }
  }
  async leaveRoom(roomName) {
    if (this.socket.rooms.has(roomName)) {
      return roomName;
    } else {
      return false;
    }
  }
}
export default userService;
