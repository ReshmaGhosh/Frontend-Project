import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/store";

export const cartsItem = (state: RootState) => state.carts.carts;

export const totalCartItem = createSelector(cartsItem, (items) => {
  let total = 0;
  if (items) {
    items.forEach((item: any) => {
      total += item.quantity;
    });
  }
  return total;
});

export const subTotalPrice = createSelector(cartsItem, (items) => {
  let total = 0;
  if (items) {
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
  }
  return total.toFixed(2);
});

export const totalTax = createSelector(subTotalPrice, (tax) =>
  (parseFloat(tax) * (2 / 100)).toFixed(2)
);

export const totalPrice = createSelector(
  subTotalPrice,
  totalTax,
  (subtotal, tax) => parseFloat(subtotal) + parseFloat(tax)
);
