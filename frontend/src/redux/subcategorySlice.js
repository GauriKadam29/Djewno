import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../api/axios"; // ✅ Import the axios instance

// Async action to fetch subcategories
export const fetchSubcategories = createAsyncThunk("subcategories/fetchSubcategories", async () => {
  const response = await api.get("/api/subcategories/get-subcategories");
  return response.data; // Assuming API returns an array of subcategories
});

const subcategorySlice = createSlice({
  name: "subcategories",
  initialState: {
    subcategories: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubcategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subcategories = action.payload;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default subcategorySlice.reducer;
