import React from "react";

const ProductCartQuantityContext = React.createContext({
  ProductCartQuantity: 0,
  SetProductCartQuantity: undefined,
});

export default ProductCartQuantityContext;
