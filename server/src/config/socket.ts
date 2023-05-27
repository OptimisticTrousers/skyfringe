import { createServer } from "http";
import app from "../app";
import { Server } from "socket.io";
import { config } from "dotenv";
import Chat from "../models/chat";

config();

const socketConfig = (app: Express.Application) => {
  const httpServer = createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin:
        process.env.NODE_ENV === "production"
          ? process.env.FRONTEND_URL
          : "http://localhost:5173",
    },
  });

  (global as any).onlineUsers = new Map();

  io.on("connection", (socket: any) => {
    (global as any).chatSocket = socket;
    socket.on("add-user", (userId: any) => {
      (global as any).onlineUsers.set(userId, socket.id);
    });

    // socket.on("get-connected", (data: any) => {
    //   const sendUserSocket = (global as any).onlineUsers.get(data.to);
    //   if(sendUserSocket)
    //   socket.emit()
    // });

    socket.on("send-msg", (data: any) => {
      const sendUserSocket = (global as any).onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-receive", data.message);
      }
    });
  });

  httpServer.listen(process.env.PORT || 5000 , () => console.log("Server running..."));
};

export default socketConfig;
