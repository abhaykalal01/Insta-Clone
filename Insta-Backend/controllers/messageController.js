import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

export const sendMessage = async (req, res) => {
    try {
        const { conversationId, receiverId, text } = req.body;

        const newMessage = await Message.create({
            conversationId,
            sender: req.user._id,
            receiver: receiverId,
            text,
        });

        // update last message
        await Conversation.findByIdAndUpdate(conversationId, {
            lastMessage: text,
        });

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.id,
    })
      .populate("sender", "username")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};