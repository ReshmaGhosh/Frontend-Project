import React, { useState } from "react";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const products = useSelector((state: RootState) => state.products.products);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#90caf9" : "#1976d2",
      },
      secondary: {
        main: darkMode ? "#f48fb1" : "#ad1457",
      },
    },
  });

  const handleClick = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme} key={darkMode ? "dark" : "light"}>
        <CssBaseline />{" "}
        <Button
          onClick={() => {
            console.log("Button was clicked.");
            setDarkMode(!darkMode);
          }}
        >
          Toggle Dark Mode
        </Button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="category/:categoryName" element={<CategoryProducts />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="product/:productId" element={<SingleProductDetails />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
