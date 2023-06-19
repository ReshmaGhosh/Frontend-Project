import { RootState } from "../../redux/store";
import React, { useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

export default function AllProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const allProducts: Product[] = useSelector(
    (state: RootState) => state.products.products
  );

  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const [sortOption, setSortOption] = useState("");

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
    setSearchTerm(event.target.value);
  };

  const sortProducts = (products: Product[], option: string) => {
    let sortedProducts = [...products];
    if (option === "az") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === "za") {
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (option === "low-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "high-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    return sortedProducts;
  };

  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSortProducts = sortProducts(
    allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    sortOption
  );

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
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
          >
            <MenuItem value="az">A-Z</MenuItem>
            <MenuItem value="za">Z-A</MenuItem>
            <MenuItem value="low-high">Price: Low to High</MenuItem>
            <MenuItem value="high-low">Price: High to Low</MenuItem>
          </Select>
        </FormControl>

        <Row>
          {filteredSortProducts.map((p: Product) => {
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
