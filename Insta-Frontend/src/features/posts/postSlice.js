import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

// 🔥 GET FEED API
export const getFeedPosts = createAsyncThunk(
    "posts/feed",
    async (_, thunkAPI) => {
        try {
            const res = await API.get("/posts/feed");
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Error fetching posts"
            );
        }
    }
);
export const toggleLike = createAsyncThunk(
    "posts/like",
    async (postId, thunkAPI) => {
        try {
            const res = await API.put(`/posts/like/${postId}`);
            return { postId, data: res.data };
        } catch (error) {
            return thunkAPI.rejectWithValue("Like failed");
        }
    }
);

export const addComment = createAsyncThunk(
    "posts/comment",
    async ({ postId, text }, thunkAPI) => {
        try {
            const res = await API.post(`/comments/${postId}`, { text });
            return { postId, comment: res.data };
        } catch (error) {
            return thunkAPI.rejectWithValue("Comment failed");
        }
    }
);
export const getComments = createAsyncThunk(
    "comments/get",
    async (postId, thunkAPI) => {
        try {
            const res = await API.get(`/comments/${postId}`);
            return { postId, comments: res.data };
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to load comments");
        }
    }
);

const initialState = {
    posts: [],
    isLoading: false,
    isError: false,
};

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getFeedPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeedPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload;
            })
            .addCase(getFeedPosts.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            }).addCase(toggleLike.fulfilled, (state, action) => {
                const { postId } = action.payload;

                const post = state.posts.find((p) => p._id === postId);

                if (post) {
                    // Toggle like locally
                    const userId = JSON.parse(localStorage.getItem("user"))?.user?._id;

                    if (post.likes.includes(userId)) {
                        post.likes = post.likes.filter((id) => id !== userId);
                    } else {
                        post.likes.push(userId);
                    }
                }
            }).addCase(addComment.fulfilled, (state, action) => {
                const { postId, comment } = action.payload;

                const post = state.posts.find((p) => p._id === postId);

                if (post) {
                    if (!post.comments) {
                        post.comments = [];
                    }
                    post.comments.push(comment);
                }
            }).addCase(getComments.fulfilled, (state, action) => {
                const { postId, comments } = action.payload;

                const post = state.posts.find((p) => p._id === postId);

                if (post) {
                    post.comments = comments;
                }
            });
    },
});

export default postSlice.reducer;