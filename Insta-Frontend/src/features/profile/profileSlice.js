import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

// 🔥 GET PROFILE
export const getProfile = createAsyncThunk(
    "profile/get",
    async (userId, thunkAPI) => {
        try {
            const res = await API.get(`/users/profile/${userId}`);
            console.log("PROFILE API:", res.data);
            return res.data;

        } catch (error) {
            return thunkAPI.rejectWithValue("Profile fetch failed");
        }
    }
);
export const followUser = createAsyncThunk(
    "profile/follow",
    async (userId, thunkAPI) => {
        try {
            await API.put(`/users/follow/${userId}`);
            return userId;
        } catch (error) {
            return thunkAPI.rejectWithValue("Follow failed");
        }
    }
);
export const unfollowUser = createAsyncThunk(
    "profile/unfollow",
    async (userId, thunkAPI) => {
        try {
            await API.put(`/users/unfollow/${userId}`);
            return userId;
        } catch (error) {
            return thunkAPI.rejectWithValue("Unfollow failed");
        }
    }
);

const initialState = {
    user: null,
    posts: [],
    isLoading: false,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isLoading = false;

                state.user = action.payload.user || action.payload; // pura user object
                state.posts = action.payload.posts || [];
            })
            .addCase(getProfile.rejected, (state) => {
                state.isLoading = false;
            }).addCase(followUser.fulfilled, (state) => {
                // follower count increase
                if (state.user) {
                    state.user.followers.push("temp"); // UI update
                }
            })

            .addCase(unfollowUser.fulfilled, (state) => {
                if (state.user) {
                    state.user.followers.pop();
                }
            })
    },
});

export default profileSlice.reducer;