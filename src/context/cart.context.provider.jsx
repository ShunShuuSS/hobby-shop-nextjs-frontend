import CartContext from "./cart.context";
import { useContext, useState, useEffect } from "react";

const CartContextProvider = (props) => {
  const [listOfCheckedProduct, setListOfCheckedProduct] = useState([]);
  const [totalPriceChecked, setTotalPriceChecked] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);

  const _setCheckedProduct = (ListOfProduct) => {
    var totalPrice = 0;
    var totalProduct = 0;
    if (ListOfProduct.length) {
      ListOfProduct.forEach((element) => {
        totalPrice += element.cart_quantity * element.product_price;
        totalProduct += element.cart_quantity;
      });
    }

    setTotalPriceChecked(totalPrice);
    setTotalProduct(totalProduct);
    setListOfCheckedProduct(ListOfProduct);
  };

  return (
    <CartContext.Provider
      value={{
        ListOfCheckedProduct: listOfCheckedProduct,
        SetListOfCheckedProduct: _setCheckedProduct,
        TotalPrice: totalPriceChecked,
        TotalProduct: totalProduct,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
