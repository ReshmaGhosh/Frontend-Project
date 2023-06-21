import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../../../redux/store";

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
  filterTerm: string;
  sortOption: string;
  error: string | null;
}

const initialState: ProductsState = {
  isLoading: false,
  products: [],
  filterTerm: " ",
  sortOption: " ",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilterTerm: (state, action: PayloadAction<string>) => {
      state.filterTerm = action.payload;
    },
    setSortOption: (state, action: PayloadAction<string>) => {
      state.sortOption = action.payload;
    },
  },
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

export const { setFilterTerm, setSortOption } = productSlice.actions;
export const selectFilteredAndSortedProduct = createSelector(
  (state: RootState) => state.products.products,
  (state: RootState) => state.products.filterTerm,
  (state: RootState) => state.products.sortOption,
  (products, filterTerm, sortOption) => {
    let filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(filterTerm.toLowerCase())
    );

    if (sortOption === "az") {
      filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "za") {
      filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "low-high") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    return filteredProducts;
  }
);

export default productSlice.reducer;
