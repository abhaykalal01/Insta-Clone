import express from "express";
import {
    addComment,
    getComments,
    deleteComment
} from "../controllers/commentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:postId", authMiddleware, addComment);
router.get("/:postId", authMiddleware, getComments);
router.delete("/:commentId", authMiddleware, deleteComment);

export default router;