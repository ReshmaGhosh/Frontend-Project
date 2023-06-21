import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/store";

import { Product } from "../../../types/type";

interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItemToWishlist: (state, action: PayloadAction<Product>) => {
      const productExist = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (!productExist) {
        state.items.push(action.payload);
      }
    },
    removeItemFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItemToWishlist, removeItemFromWishlist } =
  wishlistSlice.actions;

export const selectWishlistItems = (state: RootState) => state.wishlist.items;

export default wishlistSlice.reducer;
