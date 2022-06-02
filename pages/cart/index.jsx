/* eslint-disable react-hooks/exhaustive-deps */
import Router, { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

// Components
import CartCardProduct from "../../src/components/cart/CartCardProduct.Components";
import CartPriceDetails from "../../src/components/cart/CartPriceDetails.Components";

// useContext

import { checkCookies } from "cookies-next";
import UserContext from "../../src/context/user.context";
import CartContext from "../../src/context/cart.context";

const CartPage = () => {
  const [cartProductActive, setCartProductActive] = useState([]);
  const [cartProductInactive, setCartProductInactive] = useState([]);
  const [hideInactivePart, setHideInactivePart] = useState(false);
  const [notifSuccessDeleteAll, setNotifSuccessDeleteAll] = useState(false);
  const [loadDataComplete, setLoadDataComplete] = useState(false);

  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);

  const router = useRouter();

  useEffect(() => {
    if (checkCookies("user_token") == false) {
      router.push("/login");
    } else {
      if (userContext.CompleteLoad == true) {
        if (userContext.UserToken === "") {
          router.push(`/login`);
        }
        UserCartDataApi();
      }
    }
  }, [userContext.CompleteLoad]);

  const UserCartDataApi = async () => {
    setLoadDataComplete(false);
    try {
      const getCartData = (
        await axios.get(`api/cart/getCart`, {
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        })
      ).data.data;

      if (getCartData.length) {
        let activeProduct = [];
        let inactiveProduct = [];
        getCartData.map((cartData) => {
          if (cartData.product_status) {
            activeProduct.push(cartData);
          } else if (
            !cartData.product_status ||
            cartData.product_quantity === 0
          ) {
            inactiveProduct.push(cartData);
          }
        });

        setCartProductActive(activeProduct);
        setCartProductInactive(inactiveProduct);
      }
      setLoadDataComplete(true);
    } catch (error) {}
  };

  const handleDeleteAllUncheckedInCart = async () => {
    try {
      const deleteCart = await axios.delete(`api/cart/deleteAllCartUnchecked`, {
        headers: {
          Authorization: `Bearer ${userContext.UserToken}`,
        },
      });
      setHideInactivePart(true);
    } catch (error) {
      setNotifSuccessDeleteAll(false);
      console.log("error");
    }
  };

  return (
    <>
      <Head>
        <title>Keranjang</title>
      </Head>
      <div className={`cart-page`}>
        <div className="cart-product-section">
          {loadDataComplete ? (
            <>
              {cartProductActive.length ? (
                <>
                  {cartProductActive.map((cartProduct, i) => (
                    <React.Fragment key={i}>
                      <CartCardProduct
                        UserCartDataApi={UserCartDataApi}
                        cartId={cartProduct.cart_id}
                        storeId={cartProduct.store_id}
                        storeName={cartProduct.store_name}
                        productId={cartProduct.product_id}
                        productImg={cartProduct.product_img}
                        productName={cartProduct.product_name}
                        productPrice={cartProduct.product_price}
                        productQty={cartProduct.product_quantity}
                        cartProductQty={cartProduct.cart_quantity}
                        cartChecked={cartProduct.cart_checked}
                        productStatus={cartProduct.product_status}
                      />
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <>
                  <div className={`flex font-bold text-[20px]`}>
                    Belum ada produk yang bisa dibeli dikeranjang
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-200 rounded"></div>
                </div>
              </div>
            </>
          )}

          {notifSuccessDeleteAll ? (
            <>
              <hr className={`w-full border-solid border-blue-700`} />
              <div className={`text-red-600`}>Berhasil dihapus</div>
            </>
          ) : (
            <></>
          )}
          {!hideInactivePart ? (
            <>
              {cartProductInactive.length ? (
                <>
                  <hr className={`w-full border-solid border-blue-700`} />
                  <div className={`flex justify-between my-3`}>
                    <div className={`text-red-600`}>
                      Produk sudah tidak aktif lagi
                    </div>
                    <button
                      className={`w-auto block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                      onClick={handleDeleteAllUncheckedInCart}
                    >
                      Hapus semua
                    </button>
                  </div>

                  {cartProductInactive.map((cartProduct, i) => (
                    <React.Fragment key={i}>
                      <CartCardProduct
                        cartId={cartProduct.cart_id}
                        storeId={cartProduct.store_id}
                        storeName={cartProduct.store_name}
                        productId={cartProduct.product_id}
                        productImg={`/test1.jpg`}
                        productName={cartProduct.product_name}
                        productPrice={cartProduct.product_price}
                        productQty={cartProduct.product_quantity}
                        cartProductQty={cartProduct.cart_quantity}
                        cartChecked={cartProduct.cart_checked}
                        productStatus={cartProduct.product_status}
                      />
                    </React.Fragment>
                  ))}
                </>
              ) : null}
            </>
          ) : null}
        </div>
        <div className={`cart-price-details-section`}>
          <CartPriceDetails />
          <div className={`flex float-right mt-5`}>
            <button
              className={`border rounded-md p-[0.6rem_2rem] ${
                cartContext.TotalPrice === 0
                  ? "bg-blue-700/80 text-white/30"
                  : "bg-blue-700 text-white cursor-pointer"
              }`}
              onClick={() => router.push("/cart/checkout")}
              disabled={cartContext.TotalPrice === 0 ? true : false}
            >
              Check out sekarang
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
