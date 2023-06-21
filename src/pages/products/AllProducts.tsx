import { RootState } from "../../redux/store";
import React, { useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import ProductCard from "../../components/product/card/ProductCard";
import MyNavbar from "../../components/header/MyNavbar";
import { Product } from "../../types/type";
import {
  removeItemFromWishlist,
  addItemToWishlist,
} from "../../components/features/favourite/WishListSlice";
import {
  setFilterTerm,
  setSortOption,
  selectFilteredAndSortedProduct,
} from "../../components/features/product/ProductSlice";

type SortOption = "az" | "za" | "low-high" | "high-low";

export default function AllProducts() {
  const dispatch = useDispatch();
  const productsToShow: Product[] = useSelector(selectFilteredAndSortedProduct);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const isItemInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const handleToggleWishlist = (product: Product) => {
    if (isItemInWishlist(product.id)) {
      dispatch(removeItemFromWishlist(product.id));
    } else {
      dispatch(addItemToWishlist(product));
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterTerm(event.target.value));
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    dispatch(setSortOption(event.target.value as string));
  };

  return (
    <div>
      <MyNavbar />
      <Container>
        <h4 className="mb-4">Showing Products from</h4>
        <TextField
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          onChange={handleSearchChange}
        />
        <FormControl variant="filled">
          <InputLabel id="sort-label">Sort</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            onChange={handleSortChange}
          >
            <MenuItem value="az">A-Z</MenuItem>
            <MenuItem value="za">Z-A</MenuItem>
            <MenuItem value="low-high">Price: Low to High</MenuItem>
            <MenuItem value="high-low">Price: High to Low</MenuItem>
          </Select>
        </FormControl>

        <Row>
          {productsToShow.map((p: Product) => {
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
