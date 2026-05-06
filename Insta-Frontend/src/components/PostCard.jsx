import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleLike, addComment, getComments } from "../features/posts/postSlice";

function PostCard({ post }) {
    const dispatch = useDispatch(); // ✅ sabse upar

    const [commentText, setCommentText] = useState("");
    const [showComments, setShowComments] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.user?._id;

    const isLiked = post.likes?.includes(userId);

    // 🔥 LIKE
    const handleLike = () => {
        dispatch(toggleLike(post._id));
    };

    // 🔥 ADD COMMENT
    const handleComment = () => {
        if (!commentText.trim()) return;

        dispatch(addComment({ postId: post._id, text: commentText }));
        setCommentText("");
    };

    // 🔥 VIEW ALL COMMENTS (toggle)
    const handleViewComments = () => {
        if (!showComments) {
            dispatch(getComments(post._id)); // API call only once
        }
        setShowComments(!showComments);
    };

    return (
        <div className="bg-white border border-gray-300 mb-6">

            {/* Header */}
            <div className="flex items-center p-3 gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span className="font-semibold text-sm">
                    {post.userId?.username}
                </span>
            </div>

            {/* Image */}
            <img
                src={post.image || "https://via.placeholder.com/500"}
                alt="post"
                className="w-full"
            />

            {/* Actions */}
            <div className="p-3">

                <div className="flex gap-4 text-xl">
                    <span
                        onClick={handleLike}
                        className={`cursor-pointer ${isLiked ? "text-red-500" : ""}`}
                    >
                        ❤️
                    </span>

                    <span>💬</span>
                    <span>📤</span>
                </div>

                {/* Likes */}
                <p className="text-sm mt-1 font-semibold">
                    {post.likes?.length} likes
                </p>

                {/* Caption */}
                <p className="text-sm mt-1">
                    <span className="font-semibold">
                        {post.userId?.username}
                    </span>{" "}
                    {post.caption}
                </p>

                {/* View comments */}
                <p
                    onClick={handleViewComments}
                    className="text-gray-500 text-sm mt-1 cursor-pointer"
                >
                    {showComments ? "Hide comments" : `View all ${post.commentsCount || 0} comments`}
                </p>

                {/* 🔥 COMMENTS DISPLAY */}
                <div className="mt-2 space-y-1">
                    {(showComments ? post.comments : post.comments?.slice(0, 2))?.map((c, i) => (
                        <p key={i} className="text-sm">
                            <span className="font-semibold">
                                {c.userId?.username}
                            </span>{" "}
                            {c.text}
                        </p>
                    ))}
                </div>

            </div>

            {/* Add comment */}
            <div className="border-t px-3 py-2 flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 text-sm outline-none"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleComment();
                        }
                    }}
                />

                <button
                    onClick={handleComment}
                    className="text-blue-500 font-semibold text-sm"
                >
                    Post
                </button>
            </div>

        </div>
    );
}

export default PostCard;