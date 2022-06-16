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
          <div className={`w-full mb-5 border border-black rounded-md`}>
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
                        <div
                          className={`relative w-full h-[6.5rem] group outline-style-1 rounded-md bg-white`}
                        >
                          {image !== "" ? (
                            <>
                              <img
                                src={image}
                                className={`object-cover w-full h-full rounded-md group-hover:opacity-30 hover:transition`}
                                alt=""
                              />
                            </>
                          ) : (
                            <svg
                              role="status"
                              className="w-[20%] h-[20%] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 absolute top-[40%] left-[40%]"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                          )}
                        </div>
                        {/* <img
                          src={image}
                          className={`w-[8rem] object-cover rounded-md`}
                          alt=""
                        /> */}
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
