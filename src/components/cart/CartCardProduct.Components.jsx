/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import config from "../../../constants/config";
import CartContext from "../../context/cart.context";
import UserContext from "../../context/user.context";
import helper from "../../helper";

import CardQuantity from "./CartQuantity.Components";

const CartCardProduct = ({
  cartId,
  storeId,
  storeName,
  productId,
  productImg,
  productName,
  productPrice,
  productQty,
  cartProductQty,
  cartChecked,
  productStatus,
}) => {
  const [productChecked, setProductChecked] = useState(cartChecked);
  const [image, setImage] = useState("");
  const [show, setShow] = useState(true);

  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);

  useEffect(() => {
    loadImage();
  }, []);

  useEffect(() => {
    CheckedProductInCartDataApi();
    if (productChecked) {
      if (!productStatus || parseInt(productQty) === 0) {
        setProductChecked(0);
        autoUpdateInactiveProduct();
      }
    }
  }, [productChecked]);

  const loadImage = () => {
    if (productImg !== null) {
      setImage(config.imageApi + productImg + `_150` + `.webp`);
    } else {
      setImage("/no-image.png");
    }
  };

  const handleCheckBox = (event) => {
    if (event.target.checked == true) {
      setProductChecked(1);
      updateCheckedProduct(1);
    } else {
      setProductChecked(0);
      updateCheckedProduct(0);
    }
  };

  const updateCheckedProduct = async (checkedValue) => {
    try {
      const update = await axios.post(
        `/api/cart/updateCheckedProductInCart`,
        { cart_id: cartId, product_id: productId, cart_checked: checkedValue },
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

  // Update Checked Cart after rendering
  const autoUpdateInactiveProduct = async () => {
    try {
      const update = (
        await axios.post(
          `/api/cart/updateCheckedProductInCart`,
          { cart_id: cartId, product_id: productId, cart_checked: 0 },
          {
            headers: {
              Authorization: `Bearer ${userContext.UserToken}`,
            },
          }
        )
      ).data.data;
      if (update.affectedRows) {
        setProductChecked(0);
      }
    } catch (error) {
      console.log("error");
    }
  };

  // Delete Cart
  const deleteCart = async () => {
    try {
      const _deleteCart = await axios.delete("api/cart/deleteCartById", {
        params: {
          cart_id: cartId,
        },
        headers: {
          Authorization: `Bearer ${userContext.UserToken}`,
        },
      });
      setShow(false);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      {show ? (
        <>
          <div className={`w-full mb-5 border rounded-md`}>
            <div className={`m-3 flex`}>
              <div className={`w-[2rem] m-auto`}>
                {!productStatus || parseInt(productQty) === 0 ? null : (
                  <>
                    <input
                      className={`h-4 w-4 cursor-pointer`}
                      type="checkbox"
                      defaultChecked={productChecked == true ? "checked" : ""}
                      onChange={handleCheckBox}
                      value={productId}
                    />
                  </>
                )}
              </div>
              <div className={`w-full block`}>
                <div className={`text-[17px]`}>
                  <Link href={`/${storeId}`}>
                    <a className={`text-blue-700 hover:text-blue-900`}>
                      {storeName}
                    </a>
                  </Link>
                </div>
                <div className={`flex`}>
                  <div className={`mr-5 w-[15%]`}>
                    <Link href={`/${storeId}/${productId}`}>
                      <a>
                        <img
                          src={image}
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
                    <div className={`text-[18px]`}>
                      {helper.rupiahCurrency(productPrice)}
                    </div>
                    {!productStatus || parseInt(productQty) === 0 ? null : (
                      <>
                        <div
                          className={`flex my-auto absolute bottom-0 right-0`}
                        >
                          <div>
                            <img
                              src="/global/trash.png"
                              className={`h-[2.5rem] w-[2.5rem] mx-3 cursor-pointer`}
                              alt=""
                              onClick={deleteCart}
                            />
                          </div>

                          <div className={`my-auto mx-3 font-bold`}>
                            Stok {productQty}
                          </div>
                          <CardQuantity
                            cart_id={cartId}
                            productId={productId}
                            productQty={productQty}
                            cartProductQty={cartProductQty}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default CartCardProduct;
