import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../api/axios"; // ✅ Import the axios instance

// Async action to fetch categories
// export const fetchCategories = createAsyncThunk(
//     "categories/fetchCategories",
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await axios.get("http://localhost:5000/api/categories/get-categories");
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );
export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
    const response = await api.get("/api/categories/get-categories");
    return response.data;
});

// Category slice
const categorySlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default categorySlice.reducer;
