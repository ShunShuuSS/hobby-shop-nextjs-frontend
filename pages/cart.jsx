import Router, { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

// Components
import CardQuantity from "../src/components/cart/CartQuantity.Components";
import CartCardProduct from "../src/components/cart/CartCardProduct.Components";
import Container from "../src/components/container/Container.Components";
import CartPriceDetails from "../src/components/cart/CartPriceDetails.Components";

// useContext
import UserContext from "../src/context/user.context";
import CartContext from "../src/context/cart.context";

import { checkCookies } from "cookies-next";

const CartPage = () => {
  const [userCartData, setUserCartData] = useState([]);
  const [checkCheckoutProduct, setCheckCheckoutProduct] = useState([]);

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
    try {
      const getCartData = (
        await axios.get(`api/cart/getCart`, {
          headers: {
            Authorization: `Bearer ${userContext.UserToken}`,
          },
        })
      ).data.data;

      if (getCartData.length) {
        setUserCartData(getCartData);
      }
    } catch (error) {}
  };

  return (
    <>
      <Head>
        <title>Keranjang</title>
      </Head>
      <div className={`cart-page`}>
        <div className="cart-product-section">
          {userCartData.length ? (
            <>
              {userCartData.map((cartProduct) => (
                <div key={cartProduct.cart_id}>
                  <CartCardProduct
                    storeId={cartProduct.store_id}
                    storeName={cartProduct.store_name}
                    productId={cartProduct.product_id}
                    productImg={`/test1.jpg`}
                    productName={cartProduct.product_name}
                    productPrice={cartProduct.product_price}
                    productQty={cartProduct.product_quantity}
                    cartProductQty={cartProduct.cart_quantity}
                    cartChecked={cartProduct.cart_checked}
                  />
                </div>
              ))}
            </>
          ) : (
            <>
              <div className={`flex font-bold text-[20px]`}>
                Belum ada produk dikeranjang
              </div>
            </>
          )}
        </div>
        <div className={`cart-price-details-section`}>
          <CartPriceDetails></CartPriceDetails>
          <div className={`flex float-right mt-5`}>
            <button
              className={`border rounded-md p-[0.6rem_2rem] ${
                cartContext.TotalPrice === 0
                  ? "bg-blue-700/80 text-white/30"
                  : "bg-blue-700 text-white cursor-pointer"
              }`}
              onClick={() => router.push("/checkout")}
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
