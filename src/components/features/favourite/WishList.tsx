import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Col, Row, Container } from "react-bootstrap";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { removeItemFromWishlist } from "../favourite/WishListSlice";
import ProductCard from "../../product/card/ProductCard";
import { Product } from "../../../types/type";
import MyNavbar from "../../header/MyNavbar";
import Footer from "../../footer/Footer";

function WishList() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const [open, setOpen] = useState(false);

  const isItemInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const handleToggleWishlist = (product: Product) => {
    if (isItemInWishlist(product.id)) {
      dispatch(removeItemFromWishlist(product.id));
      setOpen(true);
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <MyNavbar />
      <br />
      <br />
      <br />
      <Container>
        <h4 className="mb-4">Your Wishlist</h4>
        <Row>
          {wishlistItems.map((product) => (
            <Col xs={12} sm={6} md={4} lg={2} className="mb-4" key={product.id}>
              <ProductCard
                key={product.id}
                product={product}
                handleToggleWishlist={() => handleToggleWishlist(product)}
                isItemInWishlist={isItemInWishlist}
              />
            </Col>
          ))}
        </Row>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Product removed from wishlist!
          </Alert>
        </Snackbar>
      </Container>

      <Footer />
    </div>
  );
}

export default WishList;
