/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/cart.context";
import UserContext from "../../context/user.context";

const CardQuantity = ({ cart_id, productId, productQty, cartProductQty }) => {
  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);

  const [product, setProduct] = useState({
    qty: cartProductQty,
  });

  useEffect(() => {
    CheckedProductInCartDataApi();
  }, [product.qty]);

  const minusQty = () => {
    if (product.qty <= 1) return;
    setProduct({ qty: product.qty - 1 });
    updateCartQuantity(product.qty - 1);
  };

  const plusQty = () => {
    if (product.qty >= productQty) return;
    setProduct({ qty: product.qty + 1 });
    updateCartQuantity(product.qty + 1);
  };

  const updateCartQuantity = async (productQty) => {
    try {
      const updateQtyInCart = await axios.post(
        `/api/cart/updateQtyInCart`,
        {
          cart_id: cart_id,
          product_id: productId,
          cart_quantity: productQty,
        },
        {
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        }
      );
    } catch (error) {
      console.log("error");
    }
  };

  const CheckedProductInCartDataApi = async () => {
    try {
      const getData = (
        await axios.get(`api/cart/getCheckedProductInCart`, {
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        })
      ).data.data;

      if (getData.length) {
        cartContext.SetListOfCheckedProduct(getData);
      } else {
        cartContext.SetListOfCheckedProduct([]);
      }
    } catch (error) {}
  };

  return (
    <>
      <div
        className={`flex outline-offset-style-1 rounded-md w-[8rem] h-[2.5rem] `}
      >
        <div
          className={`flex items-center h-full w-[2.5rem] ${
            product.qty <= 1 ? "bg-gray-200 rounded-l-md" : ""
          } `}
          onClick={() => minusQty()}
        >
          <img
            src="global/minus.png"
            className={`h-[1.5rem] w-[1.5rem] m-auto cursor-pointer`}
            alt=""
          />
        </div>
        <div
          className={`h-full w-[3rem] outline-offset-style-1 m-auto p-[3px]`}
        >
          <div className={`text-[20px] text-center`}>{product.qty}</div>
        </div>
        <div
          className={`flex items-center w-[2.5rem] ${
            product.qty >= productQty ? "bg-gray-200 rounded-r-md" : ""
          }`}
          onClick={() => plusQty()}
        >
          <img
            src="global/plus.png"
            className={`h-[1.5rem] w-[1.5rem] m-auto cursor-pointer`}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default CardQuantity;
