import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../api/axios"; // ✅ Import the axios instance

// Async action to fetch brands
export const fetchBrands = createAsyncThunk("brands/fetchBrands", async () => {
  const response = await api.get("/api/brands/get-brands");
  return response.data; // Assuming API returns an array of brands
});

const brandSlice = createSlice({
  name: "brands",
  initialState: {
    brands: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default brandSlice.reducer;
