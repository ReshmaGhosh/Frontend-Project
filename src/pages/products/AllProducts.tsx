import { RootState } from "../../redux/store";
import React, { useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import ProductCard from "../../components/product/card/ProductCard";
import MyNavbar from "../../components/header/MyNavbar";
import { Product } from "../../types/type";
import { removeItemFromWishlist } from "../../components/features/favourite/WishListSlice";

export default function AllProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const allProducts: Product[] = useSelector(
    (state: RootState) => state.products.products
  );

  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // function WishList() {
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
  const products: Product[] = useSelector(
    (state: RootState) => state.products.products
  );

  return (
    <div>
      <MyNavbar />
      <Container>
        <h4 className="mb-4">Showing Produdcts from</h4>
        <TextField
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
        />

        <Row>
          {filteredProducts &&
            filteredProducts.map((p: Product) => {
              return (
                <Col xs={12} sm={6} md={4} lg={2} className="mb-4" key={p.id}>
                  <ProductCard
                    product={p}
                    handleToggleWishlist={handleToggleWishlist}
                    isItemInWishlist={isItemInWishlist}
                  />
                </Col>
              );
            })}
        </Row>
      </Container>
      <div className="mb-5"></div>
      <Footer />
    </div>
  );
}
