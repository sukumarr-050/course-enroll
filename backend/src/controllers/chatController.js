import { StatusCodes } from "http-status-codes";
import ChatMessage from "../models/ChatMessage.js";

export const getConversation = async (req, res) => {
  const { userId } = req.params;
  const myId = req.user._id;

  const messages = await ChatMessage.find({
    $or: [
      { senderId: myId, receiverId: userId },
      { senderId: userId, receiverId: myId }
    ]
  }).sort({ createdAt: 1 });

  return res.status(StatusCodes.OK).json(messages);
};
