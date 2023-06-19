import React from "react";

import "./RightCartIcon.css";
import { HiShoppingCart } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { totalCartItem } from "../features/cart/CartSelector";

function RightCartIcon() {
  let state = useSelector((state: RootState) => state);
  let totalItems = totalCartItem(state);
  return (
    <NavLink to={`/cart`}>
      <div className="cart-icon">
        <div className="d-flex flex-column">
          <span>
            <HiShoppingCart />
          </span>
          <span>{totalItems}</span>
        </div>
      </div>
    </NavLink>
  );
}

export default RightCartIcon;
