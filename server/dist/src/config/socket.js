"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const socketConfig = (app) => {
    const port = process.env.PORT || 5000;
    const httpServer = (0, http_1.createServer)(app);
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
        },
    });
    global.onlineUsers = new Map();
    io.on("connection", (socket) => {
        global.chatSocket = socket;
        socket.on("add-user", (userId) => {
            global.onlineUsers.set(userId, socket.id);
        });
        // socket.on("get-connected", (data: any) => {
        //   const sendUserSocket = (global as any).onlineUsers.get(data.to);
        //   if(sendUserSocket)
        //   socket.emit()
        // });
        socket.on("send-msg", (data) => {
            const sendUserSocket = global.onlineUsers.get(data.to);
            if (sendUserSocket) {
                socket.to(sendUserSocket).emit("msg-receive", data.message);
            }
        });
    });
    httpServer.listen(port, () => console.log("Server running..."));
};
exports.default = socketConfig;
