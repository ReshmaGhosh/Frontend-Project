import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Col } from "react-bootstrap";

import { removeItemFromWishlist } from "../favourite/WishListSlice";
import ProductCard from "../../product/card/ProductCard";

function WishList() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const isItemInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const handleToggleWishlist = (productId: number) => {
    if (isItemInWishlist(productId)) {
      dispatch(removeItemFromWishlist(productId));
    }
  };

  return (
    <div>
      {wishlistItems.map((product) => (
        <Col xs={12} sm={6} md={4} lg={2} className="mb-4" key={product.id}>
          <ProductCard
            key={product.id}
            product={product}
            handleToggleWishlist={handleToggleWishlist}
            isItemInWishlist={isItemInWishlist}
          />
        </Col>
      ))}
    </div>
  );
}

export default WishList;
