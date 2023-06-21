import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import { uniq } from "lodash";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { Product } from "../../types/type";

import BasicSwitches from "../../pages/products/Switch";

function MyNavbar() {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const products = useSelector((state: RootState) => state.products.products);

  const categories = uniq(products.map((product: Product) => product.category));

  return (
    <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
      <Container>
        <NavLink to="/" className="navbar-brand">
          ShoppingHUB
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>

            <NavDropdown title="Categories" id="basic-nav-dropdown">
              {categories &&
                categories.map((category, index) => (
                  <Link
                    to={`/category/${category}`}
                    className="dropdown-item"
                    key={index}
                  >
                    {category}
                  </Link>
                ))}
              <NavDropdown.Item href="#action/3.1">
                Electronics
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Jwelery</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Menn's Clothing
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Women's Clothing
              </NavDropdown.Item>
            </NavDropdown>
            <NavLink to="/products" className="nav-link">
              Products
            </NavLink>
            <NavLink to="/wishlist" className="nav-link">
              Wish List
              <IconButton aria-label="show wishlist items" color="inherit">
                <Badge
                  badgeContent={wishlistItems.length}
                  color="secondary"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                ></Badge>
              </IconButton>
            </NavLink>
            <NavLink to="/contact" className="nav-link">
              Contact
            </NavLink>
            <BasicSwitches />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
