import React from "react";

const CartContext = React.createContext({
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
  addItem: (item) => {},
  updateItem: (item) => {},
  removeItem: (id) => {},
  emptyCart: () => {},
});

export default CartContext;
