import express from "express";
import { followUser, unfollowUser, getProfile } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/follow/:id", authMiddleware, followUser);
router.put("/unfollow/:id", authMiddleware, unfollowUser);
router.get("/profile/:id", authMiddleware, getProfile);

export default router;