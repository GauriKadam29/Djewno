import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../api/axios"; // ✅ Import the axios instance

// Async action to fetch static values (materials & gemstones)
export const fetchStaticValues = createAsyncThunk("staticValues/fetchStaticValues", async () => {
  const response = await api.get("/api/products/static/values");
  return response.data; // API returns { materials: [...], gemstones: [...] }
});

const staticValuesSlice = createSlice({
  name: "staticValues",
  initialState: {
    materials: [],
    gemstones: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaticValues.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStaticValues.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.materials = action.payload.materials;
        state.gemstones = action.payload.gemstones;
      })
      .addCase(fetchStaticValues.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default staticValuesSlice.reducer;
