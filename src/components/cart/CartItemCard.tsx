import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/store";

import { Button, Card } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFormCart,
  selectIsLoading,
  selectProduct,
  fetchProduct,
} from "../features/cart/CartSlice";

interface CartItem {
  id: number;
  quantity: number;
}

interface CartItemCardProps {
  item: CartItem;
}

function CartItemCard({ item }: CartItemCardProps) {
  const product = useSelector((state: RootState) => selectProduct(state));
  const isLoading = useSelector((state: RootState) => selectIsLoading(state));
  const dispatch = useDispatch<AppDispatch>();

  const increaseItemQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(increaseQuantity({ id: item.id }));
  };

  const decreaseItemQuantiity = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(decreaseQuantity({ id: item.id }));
  };

  const removeItem = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(removeFormCart({ id: item.id }));
  };

  useEffect(() => {
    dispatch(fetchProduct(item.id));
  }, [dispatch, item.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (product) {
    return (
      <Card className="my-2">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div className="w-100">
              <Link
                to={`/product/${product.id}`}
                className="text-dark text-decoration-none fs-5"
              >
                {product.title ? product.title.slice(0, 20) : ""}...
              </Link>
            </div>
            <div className="d-flex w-100 justify-content-center">
              <button
                className="btn btn-sm btn-dark fs-6 me-3 text-center"
                onClick={decreaseItemQuantiity}
              >
                <FaMinus />
              </button>
              <span className="fs-4">{item.quantity}</span>
              <button
                className="btn btn-sm btn-dark fs-6 ms-3 text-center"
                onClick={increaseItemQuantity}
              >
                <FaPlus />
              </button>
            </div>
            <div className="w-100 text-center">
              <span className="fs-5">
                {product.price
                  ? (product.price * item.quantity).toFixed(2)
                  : ""}
              </span>
            </div>
            <div className="w-100 text-center">
              <Button variant="danger" onClick={removeItem}>
                Remove
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return null;
}

export default CartItemCard;
