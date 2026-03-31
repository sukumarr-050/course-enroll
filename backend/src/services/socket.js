import { Server } from "socket.io";
import ChatMessage from "../models/ChatMessage.js";
import Notification from "../models/Notification.js";

let io;

export const initSocket = (server) => {
  const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  io = new Server(server, {
    cors: {
      origin: allowedOrigins.length ? allowedOrigins : true,
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    socket.on("join:user", (userId) => {
      socket.join(`user:${userId}`);
    });

    socket.on("chat:send", async (payload) => {
      const saved = await ChatMessage.create(payload);
      io.to(`user:${payload.receiverId}`).emit("chat:receive", saved);
      io.to(`user:${payload.senderId}`).emit("chat:sent", saved);
    });
  });

  return io;
};

export const getIO = () => io;

export const sendNotification = async (userId, message) => {
  const notification = await Notification.create({ userId, message });
  if (io) {
    io.to(`user:${userId}`).emit("notification:new", notification);
  }
  return notification;
};
