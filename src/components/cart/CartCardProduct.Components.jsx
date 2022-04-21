import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/cart.context";
import UserContext from "../../context/user.context";

import CardQuantity from "./CartQuantity.Components";

const CartCardProduct = ({
  storeId,
  storeName,
  productId,
  productImg,
  productName,
  productPrice,
  productQty,
  cartProductQty,
  cartChecked,
}) => {
  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);
  const [productChecked, setProductChecked] = useState(cartChecked);

  // useEffect(() => {
  //   CheckedProductInCartDataApi();
  // }, [productChecked]);

  useEffect(() => {
    CheckedProductInCartDataApi();
  }, []);

  const handleCheckBox = (event) => {
    if (event.target.checked == true) {
      setProductChecked(1);
      updateCheckedProduct(1);
    } else {
      setProductChecked(2);
      updateCheckedProduct(2);
    }
  };

  const updateCheckedProduct = async (checkedValue) => {
    try {
      const update = await axios.post(
        `/api/cart/updateCheckedProductInCart`,
        { product_id: productId, cart_checked: checkedValue },
        {
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        }
      );

      CheckedProductInCartDataApi();
    } catch (error) {
      console.log(error);
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
      <div className={`w-full mb-5 border rounded-md`}>
        <div className={`m-3 flex`}>
          <div className={`w-[2rem] m-auto`}>
            <input
              className={`h-4 w-4 cursor-pointer`}
              type="checkbox"
              defaultChecked={productChecked == true ? "checked" : ""}
              onChange={handleCheckBox}
              value={productId}
            />
          </div>
          <div className={`w-full block`}>
            <div className={`text-[17px]`}>
              <Link href={`/${storeId}`}>{storeName}</Link>
            </div>
            <div className={`flex`}>
              <div className={`mr-5 w-[15%]`}>
                <Link href={`/${storeId}/${productId}`}>
                  <a>
                    <img
                      src={productImg}
                      className={`w-[8rem] object-cover rounded-md`}
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <div className={`block w-[85%] relative`}>
                <div
                  className={`text-[17px] break-words whitespace-normal overflow-hidden webkit-box webkit-box-vertical webkit-line-clamp-1 text-ellipsis`}
                >
                  {productName}
                </div>
                <div className={`text-[18px]`}>{productPrice}</div>
                <div className={`absolute bottom-0 right-0`}>
                  <CardQuantity
                    productId={productId}
                    productQty={productQty}
                    cartProductQty={cartProductQty}
                  ></CardQuantity>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCardProduct;
