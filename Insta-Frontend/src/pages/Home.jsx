import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedPosts } from "../features/posts/postSlice";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";

function Home() {
    const dispatch = useDispatch();
    const { posts, isLoading } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getFeedPosts());
    }, [dispatch]);

    return (
        <div className="bg-[#fafafa] min-h-screen">
            <Navbar />

            <div className="max-w-xl mx-auto pt-20 px-3">

                {isLoading && <p>Loading...</p>}

                {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}

            </div>
        </div>
    );
}

export default Home;