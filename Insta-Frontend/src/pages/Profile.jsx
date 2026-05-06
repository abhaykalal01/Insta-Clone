import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, followUser, unfollowUser } from "../features/profile/profileSlice";
import Navbar from "../components/Navbar";
import { logout } from "../features/auth/authSlice";

function Profile() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const { user, posts, isLoading } = useSelector((state) => state.profile);


    const loggedUser = JSON.parse(localStorage.getItem("user"));
    const currentUserId = loggedUser?.user?.id;

    const profileUserId = user?._id;


    const isFollowing = user?.followers?.includes(currentUserId);

    useEffect(() => {
        const userId = loggedUser?.user?.id;

        if (userId) {
            dispatch(getProfile(userId));
        }
    }, [dispatch]);


    const handleFollow = () => {
        if (!profileUserId) return;

        if (isFollowing) {
            dispatch(unfollowUser(profileUserId));
        } else {
            dispatch(followUser(profileUserId));
        }
    };

    if (isLoading) {
        return <p className="text-center mt-20">Loading...</p>;
    }

    return (
        <div className="bg-[#fafafa] min-h-screen">
            <Navbar />

            <div className="max-w-4xl mx-auto pt-20 px-4">

                {/* 🔥 TOP SECTION */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">

                    {/* Profile Image */}
                    <div className="w-24 h-24 sm:w-32 sm:h-32 relative">

                        <img
                            onClick={() => setShowMenu((prev) => !prev)}
                            src={
                                user?.profilePic ||
                                "https://images.unsplash.com/photo-1527980965255-d3b416303d12"
                            }
                            alt="profile"
                            className="w-full h-full rounded-full object-cover border cursor-pointer"
                        />

                        {/* 🔥 DROPDOWN MENU */}
                        {showMenu && (
                            <div className="absolute top-20 left-0 bg-white shadow-md rounded-md w-32 border z-50">

                                <button
                                    onClick={() => {
                                        dispatch(logout());
                                        window.location.href = "/";
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                                >
                                    Logout
                                </button>

                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="text-center sm:text-left">

                        {/* Username + Follow Button */}
                        <div className="flex items-center gap-4 justify-center sm:justify-start">
                            <h2 className="text-xl font-semibold">
                                {user?.username || "User"}
                            </h2>

                            {/* 🔥 FOLLOW BUTTON */}
                            <button
                                onClick={handleFollow}
                                className={`px-4 py-1 text-sm rounded-md font-semibold transition ${isFollowing
                                    ? "bg-gray-200 text-black"
                                    : "bg-blue-500 text-white"
                                    }`}
                            >
                                {isFollowing ? "Following" : "Follow"}
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-6 mt-4 justify-center sm:justify-start text-sm">
                            <span><b>{posts?.length || 0}</b> posts</span>
                            <span><b>{user?.followers?.length || 0}</b> followers</span>
                            <span><b>{user?.following?.length || 0}</b> following</span>
                        </div>

                        {/* Bio */}
                        <div className="mt-3 text-sm">
                            <p className="font-semibold">{user?.username}</p>
                            <p className="text-gray-600">MERN Developer 🚀</p>
                        </div>

                    </div>
                </div>

                {/* Divider */}
                <div className="border-t mt-8"></div>

                {/* POSTS GRID */}
                <div className="grid grid-cols-3 gap-1 mt-4">

                    {posts?.length > 0 ? (
                        posts.map((post) => (
                            <div key={post._id} className="relative group">
                                <img
                                    src={post.image}
                                    alt="post"
                                    className="w-full aspect-square object-cover"
                                />

                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm gap-4 transition">
                                    <span>❤️ {post.likes?.length || 0}</span>
                                    <span>💬 {post.commentsCount || 0}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-3 text-center text-gray-500 mt-10">
                            No posts yet
                        </p>
                    )}

                </div>

            </div>
        </div>
    );
}

export default Profile;