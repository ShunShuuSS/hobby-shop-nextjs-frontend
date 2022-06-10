/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { checkCookies } from "cookies-next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../context/user.context";
import CardProduct from "../product/CardProduct.Components";

const CustomNotificationAddToCart = (setOpenModalAddToCart) => {
  // Recommendation Part
  const [recommendationProductData, setRecommendationProductData] = useState(
    []
  );
  const [
    recommendationProductLoadComplete,
    setRecommendationProductLoadComplete,
  ] = useState(true);

  const userContext = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (checkCookies("user_token") === false) {
      router.push("/login");
    } else {
      if (userContext.CompleteLoad === true) {
        if (userContext.UserToken !== "") {
          recommendationProduct();
        }
      }
    }
  }, [userContext.CompleteLoad]);

  const recommendationProduct = async () => {
    if (userContext.CompleteLoad === true) {
      if (userContext.UserToken !== "") {
        setRecommendationProductLoadComplete(false);
        try {
          const product = await (
            await axios.get(`api/recommendation/basedOnTransaction`, {
              headers: {
                Authorization: `Bearer ${userContext.UserToken}`,
              },
            })
          ).data.data;
          if (product.length) {
            setRecommendationProductData(product);
          }
          setRecommendationProductLoadComplete(true);
        } catch (error) {
          setCatchError(true);
          setRecommendationProductLoadComplete(true);
        }
      }
    }
  };

  return (
    <>
      <div
        className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
        style={{ backgroundColor: "rgba(128, 128, 128, 0.5)" }}
      >
        <div className="relative p-4 w-full max-w-7xl h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-between p-2">
              <div className={`text-[20px] p-1.5`}>
                Produk telah ditambahkan keranjang
              </div>

              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xl p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={() => setOpenModalAddToCart(false)}
              >
                <svg className="w-5 h-5">
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                </svg>
              </button>
            </div>
            <div className={`px-3.5 py-2`}>
              <button
                className={`block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                onClick={() => router.push("/cart")}
              >
                Ke halaman keranjang
              </button>
            </div>

            <div className="overflow-y-auto max-h-[70vh] px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
              <div
                className={`grid gap-4 mobile-s:grid-cols-2 mobile-xl:grid-cols-3 tablet:grid-cols-4 laptop:grid-cols-6`}
              >
                {recommendationProductLoadComplete ? (
                  <>
                    {recommendationProductData.length ? (
                      <>
                        {recommendationProductData.map((product) => (
                          <div key={product.product_id}>
                            <CardProduct
                              product_id={product.product_id}
                              store_id={product.store_id}
                              product_img={product.product_img}
                              product_name={product.product_name}
                              product_price={product.product_price}
                              product_rating={product.product_rating}
                            />
                          </div>
                        ))}
                      </>
                    ) : null}
                  </>
                ) : (
                  <>
                    {[1, 2, 3, 4, 5, 6].map((index) => (
                      <React.Fragment key={index}>
                        <div className="animate-pulse flex space-x-4">
                          <div className="flex-1 space-y-6 py-1">
                            <div className="h-[15rem] bg-slate-200 rounded"></div>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomNotificationAddToCart;
