import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios"; // ✅ Import the axios instance
// ✅ Fetch user profile from backend
export const fetchUserProfile = createAsyncThunk("auth/fetchUserProfile", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token"); // ✅ Get token from localStorage
        if (!token) {
            return rejectWithValue("No token found");
        }

        const response = await api.get("/api/auth/profile", {
            headers: {
                Authorization: `Bearer ${token}`, // ✅ Send token in Authorization header
            },
            withCredentials: true, // ✅ Ensure credentials are included
        });

        //   console.log("User data from API:", response.data); // Debugging step
            return { ...response.data.user, token }; 
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        status: "idle",
        error: null,
    },
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem("token"); // ✅ Clear token on logout
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
                // Ensure token is stored properly
                if (action.payload.token) {
                    localStorage.setItem("token", action.payload.token);
                }
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                if (action.payload === "Unauthorized") {
                    localStorage.removeItem("token");
                    state.user = null;
                }
            });
    },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;


