import React from "react";

const CartContext = React.createContext({
  ListOfCheckedProduct: [],
  SetListOfCheckedProduct: [],
  TotalPrice: undefined,
  TotalProduct: undefined,
});

export default CartContext;
