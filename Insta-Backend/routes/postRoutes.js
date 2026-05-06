import express from "express";
import { createPost, getFeedPosts, toggleLike } from "../controllers/postController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.put("/like/:id", authMiddleware, toggleLike);
router.get("/feed", authMiddleware, getFeedPosts);

export default router;


