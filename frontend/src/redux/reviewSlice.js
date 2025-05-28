import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../api/axios"; // ✅ Import the axios instance

// Fetch reviews for a specific product
export const fetchReviews = createAsyncThunk(
    "reviews/fetchReviews",
    async (productId) => {
        const response = await api.get(`/api/reviews/${productId}`);
        return response.data; // Assuming backend returns an array of reviews
    }
);


// ✅ Add review with token
export const addReview = createAsyncThunk(
    "reviews/addReview",
    async ({ reviewData }, { getState, rejectWithValue }) => {
        try {
            // Get token from Redux store
            const token = getState().auth.user?.token; 
            if (!token) {
                return rejectWithValue("User is not authenticated.");
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // ✅ Attach token
                },
            };

            const response = await axios.post(
                `http://localhost:5000/api/reviews/add`,
                reviewData,
                config
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to add review.");
        }
    }
);



// Function to calculate average rating
const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
};

const reviewSlice = createSlice({
    name: "reviews",
    initialState: { reviews: [],averageRating: 0, status: "idle", error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                // console.log("✅ Fetched reviews:", action.payload);
                state.status = "succeeded";
                state.reviews = action.payload;
                state.averageRating = calculateAverageRating(action.payload); // Calculate and store averageRating
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.reviews.push(action.payload); // Add new review to state
                state.averageRating = calculateAverageRating(state.reviews); // Update averageRating
            });
    },
});





export default reviewSlice.reducer;
