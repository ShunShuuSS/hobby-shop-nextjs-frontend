import ProductCartQuantityContext from "./product.cart.quantity.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const ProductCartQuantityContextProvider = (props) => {
  const [qty, setQty] = useState(0);
  useEffect(() => {}, []);

  const setProductCartQty = (qty) => {
    setQty(qty);
  };

  return (
    <ProductCartQuantityContext.Provider
      value={{
        ProductCartQuantity: qty,
        SetProductCartQuantity: setProductCartQty,
      }}
    >
      {props.children}
    </ProductCartQuantityContext.Provider>
  );
};

export default ProductCartQuantityContextProvider;
