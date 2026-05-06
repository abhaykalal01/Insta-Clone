import express from "express";
import {
    createConversation,
} from "../controllers/conversationController.js";
import {
    sendMessage,
    getMessages,
} from "../controllers/messageController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/conversation", authMiddleware, createConversation);
router.post("/message", authMiddleware, sendMessage);
router.get("/message/:id", authMiddleware, getMessages);

export default router;