import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

import MyNavbar from "../components/header/MyNavbar";
import Footer from "../components/footer/Footer";
import HeaderSlider from "../components/slider/HeaderSlider";
import LatestProducts from "../components/product/LatestProducts";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../components/features/favourite/WishListSlice";

function Home() {
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const products = useSelector((state: RootState) => state.products.products);

  const isItemInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const handleToggleWishlist = (productId: number) => {
    if (isItemInWishlist(productId)) {
      dispatch(removeItemFromWishlist(productId));
    } else {
      const productToAdd = Object.values(products)
        .flat()
        .find((product) => product.id === productId);
      if (productToAdd) {
        dispatch(addItemToWishlist(productToAdd));
      }
    }
  };

  return (
    <Fragment>
      <MyNavbar />
      <HeaderSlider />
      <LatestProducts
        handleToggleWishlist={handleToggleWishlist}
        isItemInWishlist={isItemInWishlist}
      />

      <Footer />
    </Fragment>
  );
}

export default Home;
