import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { axiosErrorHandler } from "../../../Utils/axiosErrorHandler";
import { Product } from "../../../types/type";

export const getAllProducts = createAsyncThunk<Product[]>(
  "products/fetchAllProducts",
  async () => {
    try {
      const { data } = await axios.get("https://dummyjson.com/products");
      return data.products;
    } catch (error) {
      return axiosErrorHandler(error as AxiosError);
    }
  }
);

interface ProductsState {
  isLoading: boolean;
  products: Product[];
  error: string | null;
}

const initialState: ProductsState = {
  isLoading: false,
  products: [],
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getAllProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.isLoading = false;
        state.products = action.payload;
        state.error = null;
      }
    );
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.products = [];
      state.error = action.error.message || null;
    });
  },
});

export default productSlice.reducer;
