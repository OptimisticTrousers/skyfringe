import { createServer } from "http";
import app from "../app";
import { Server } from "socket.io";
import { config } from "dotenv";
import Chat from "../models/chat";

config();

const socketConfig = (app: Express.Application) => {
  const port = process.env.PORT || 5000;
  const httpServer = createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.on("create-chat", async (users) => {
      const chat = new Chat({
        participants: users,
        messages: [],
      });
      await chat.save()
    });
    socket.on("get-chat", async (chatId) => {
      const chat = await Chat.findById(chatId).populate("messages").populate("participants").exec()
    })
  });

  httpServer.listen(port, () => console.log("Server running..."));
};

export default socketConfig;
