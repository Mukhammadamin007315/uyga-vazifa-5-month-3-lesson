import { Server } from "socket.io";

const initializedSocket = (server) => {
  return new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });
};
export default initializedSocket;
