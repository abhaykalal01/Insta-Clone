import Post from "../models/Post.js";

// CREATE POST
export const createPost = async (req, res) => {
    try {
        const { image, caption } = req.body;

        if (!image) {
            return res.status(400).json({ message: "Image is required" });
        }

        const newPost = await Post.create({
            userId: req.user._id,
            image,
            caption
        });

        res.status(201).json({
            message: "Post created successfully",
            post: newPost
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

import Comment from "../models/Comment.js";

export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("userId", "username");

        // 🔥 HAR POST KE SAATH COMMENT COUNT ADD KAR
        const postsWithComments = await Promise.all(
            posts.map(async (post) => {
                const commentCount = await Comment.countDocuments({
                    postId: post._id,
                });

                return {
                    ...post.toObject(),
                    commentsCount: commentCount,
                };
            })
        );

        res.json(postsWithComments);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const toggleLike = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        const userId = req.user._id;

        const isLiked = post.likes.includes(userId);
        if (isLiked) {
            post.likes = post.likes.filter((id) => id.toString() !== userId.toString());

            await post.save();

            return res.json({ message: "post unliked" })
        }
        else {
            post.likes.push(userId);
            await post.save();

            return res.json({ message: "post liked" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

