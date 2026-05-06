import User from "../models/User.js";
import Post from "../models/Post.js";
export const followUser = async (req, res) => {
    try {
        const usertoFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user._id);

        if (!usertoFollow) {
            return res.status(404).json({ message: "User not found" });
        }

        if (currentUser.following.includes(usertoFollow._id)) {
            return res.status(400).json({ message: "Already following this user" });
        }

        currentUser.following.push(usertoFollow._id);
        usertoFollow.followers.push(currentUser._id);

        await currentUser.save();
        await usertoFollow.save();

        res.json({ message: "User followed successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const unfollowUser = async (req, res) => {
    try {
        const userToUnfollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user._id);

        if (!userToUnfollow) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!currentUser.following.includes(userToUnfollow._id)) {
            return res.status(400).json({ message: "You are not following this user" });
        }

        userToUnfollow.followers = userToUnfollow.followers.filter((id) => id.toString() !== currentUser._id.toString());
        currentUser.following = currentUser.following.filter(
            (id) => id.toString() !== userToUnfollow._id.toString()
        );

        await userToUnfollow.save();
        await currentUser.save();

        res.json({ message: "User unfollowed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select("-password");

        const posts = await Post.find({ userId: req.params.id });

        res.json({
            user,
            posts
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};