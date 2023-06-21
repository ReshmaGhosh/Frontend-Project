import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/store";
import axios from "axios";

interface CartItem {
  id: number;
  quantity: number;
  price: number;
}
interface Product {
  id: number;
  title: string;
  price: number;
}

interface CartState {
  carts: CartItem[];
  product: Product | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: CartState = {
  carts: localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts")!)
    : [],
  product: null,
  error: null,
  isLoading: false,
};

export const fetchProduct = createAsyncThunk(
  "cart/fetchProduct",
  async (id: number) => {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
  }
);

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCarts: (state, action: PayloadAction<CartItem>) => {
      if (!state.carts) {
        state.carts = [action.payload];
      } else {
        const existItem = state.carts.find((i) => i.id === action.payload.id);

        if (existItem) {
          state.carts = state.carts.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          );
        } else {
          state.carts = [...state.carts, action.payload];
        }
      }

      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    increaseQuantity: (state, action: PayloadAction<{ id: number }>) => {
      state.carts = state.carts.map((product) =>
        product.id === action.payload.id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );

      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    decreaseQuantity: (state, action: PayloadAction<{ id: number }>) => {
      const item = state.carts.find(
        (product) => product.id === action.payload.id
      );

      if (item && item.quantity === 1) {
        state.carts = state.carts.filter(
          (product) => product.id !== action.payload.id
        );
      } else if (item) {
        state.carts = state.carts.map((product) =>
          product.id === action.payload.id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        );
      }

      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    removeFormCart: (state, action: PayloadAction<{ id: number }>) => {
      state.carts = state.carts.filter(
        (product) => product.id !== action.payload.id
      );

      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.product = null;
        state.error = action.error.message || null;
      });
  },
});

export const cartState = (state: RootState) => state.carts.carts;
export const selectProduct = (state: RootState) => state.carts.product;
export const selectIsLoading = (state: RootState) => state.carts.isLoading;

export const {
  addToCarts,
  increaseQuantity,
  decreaseQuantity,
  removeFormCart,
} = CartSlice.actions;

export default CartSlice.reducer;
