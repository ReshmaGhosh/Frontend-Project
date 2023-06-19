import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";

import CategoryProducts from "./pages/products/CategoryProducts";
import SingleProductDetails from "./pages/products/productdetails/SingleProductDetails";
import Cart from "./pages/Cart";
import WishList from "./components/features/favourite/WishList";
import AllProducts from "./pages/products/AllProducts";

function App() {
  const products = useSelector((state: RootState) => state.products.products);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="category/:categoryName" element={<CategoryProducts />} />
        <Route path="products" element={<AllProducts />} />
        <Route path="product/:productId" element={<SingleProductDetails />} />
        <Route path="wishlist" element={<WishList />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
