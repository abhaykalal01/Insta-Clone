import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ message: "Comment text is required" });
        }

        const newcomment = await Comment.create({
            postId: req.params.postId,
            userId: req.user._id,
            text
        });

        res.status(201).json({
            message: "Comment added successfully",
            comment: newcomment
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({
            postId: req.params.postId
        })
            .populate("userId", "username profilePic")
            .sort({ createdAt: -1 });

        res.json(comments);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not allowed" });
        }

        await comment.deleteOne();

        res.json({ message: "Comment deleted" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};