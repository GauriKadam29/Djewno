import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../api/axios"; // ✅ Import the axios instance

// Fetch products from API
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await api.get("/api/products/get-products");
    return response.data;
});

const productSlice = createSlice({
    name: "products",
    initialState: { products: [], status: "idle", error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default productSlice.reducer;
