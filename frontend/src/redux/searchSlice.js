import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../api/axios"; // ✅ Import the axios instance

export const fetchSearchResults = createAsyncThunk(
    "search/fetchSearchResults",
    async (query) => {
        const response = await api.get(`/api/products/search?query=${query}`);
        return response.data;
    }
);

const searchSlice = createSlice({
    name: "search",
    initialState: {
        searchResults: [],
        status: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.searchResults = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchSearchResults.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchSearchResults.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default searchSlice.reducer;



