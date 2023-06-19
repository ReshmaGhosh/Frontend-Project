import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import CartSlice from "../components/features/cart/CartSlice";
import CategorySlice from "../components/features/category/CategorySlice";
import ProductSlice from "../components/features/product/ProductSlice";
import WishListSlice from "../components/features/favourite/WishListSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    categories: CategorySlice,
    products: ProductSlice,
    carts: CartSlice,
    wishlist: WishListSlice,
  },
});

setupListeners(store.dispatch);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
