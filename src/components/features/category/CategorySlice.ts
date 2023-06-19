import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { axiosErrorHandler } from "../../../Utils/axiosErrorHandler";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const { data } = await axios.get("https://dummyjson.com/");
      return data;
    } catch (error) {
      return axiosErrorHandler(error as AxiosError);
    }
  }
);

interface CategoryState {
  isLoading: boolean;
  categories: string[];
  error: string | null;
}

const initialState: CategoryState = {
  isLoading: false,
  categories: [],
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
      state.error = null;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.categories = [];
      state.error = action.error.message || null;
    });
  },
});

export default categorySlice.reducer;
