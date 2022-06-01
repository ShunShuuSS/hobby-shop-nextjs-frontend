/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, FreeMode, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Components
import CardProduct from "../../src/components/product/CardProduct.Components";
import React, { useContext, useEffect, useState } from "react";
import Quantity from "../../src/components/global/Quantity.Components";

// Context
import UserContext from "../../src/context/user.context";
import helper from "../../src/helper";
import config from "../../constants/config";

const ProductPage = () => {
  const router = useRouter();
  const [productData, setProductData] = useState([]);
  const [newProductData, setNewProductData] = useState([]);
  const [cartProductQty, setCartProductQty] = useState({
    qty: 1,
  });
  const [productFirstImg, setProductFirstImg] = useState("");
  const [productImg, setProductImg] = useState([]);
  const [notifQuantityExceed, setNotifQuantityExceed] = useState(false);
  const [notifQuantityMinLimit, setNotifQuantityMinLimit] = useState(false);

  // Load data Notif
  const [loadProductComplete, setLoadProductComplete] = useState(false);

  // Swiper
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // useContext
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (router.query.product_id) {
      ProductDataApi();
      NewProductDataApi();
    }
  }, [router.query.product_id]);

  // New Product From the Store
  const NewProductDataApi = async () => {
    try {
      const newProduct = (
        await axios.get(`api/product/NewProductByStoreId`, {
          params: {
            store_id: router.query.store_id,
          },
        })
      ).data.data;

      setNewProductData(newProduct);
    } catch (error) {
      console.log("terjadi kesalahan saat memuat produk");
    }
  };

  // Product Data
  const ProductDataApi = async () => {
    setLoadProductComplete(false);
    try {
      const getProductData = (
        await axios.get(`api/product/getProduct`, {
          params: {
            product_id: router.query.product_id,
          },
        })
      ).data.data;
      if (getProductData[0].list_product_img.length) {
        setProductImg(await loadPhoto(getProductData[0].list_product_img));
      }
      setProductData(getProductData[0]);
      setLoadProductComplete(true);
    } catch (error) {
      console.log("terjadi kesalahan saat memuat produk");
    }
  };

  const loadPhoto = async (list_product_img) => {
    let list_img = [];
    const imgData = list_product_img;
    setProductFirstImg(
      config.imageApi + imgData[0].product_img_name + `_150` + `.webp`
    );

    for (let i = 1; i < imgData.length; i++) {
      list_img.push(
        config.imageApi + imgData[i].product_img_name + `_150` + `.webp`
      );
    }

    return list_img;
  };

  // Add to Cart
  const AddToCart = async () => {
    if (handleValidationCart()) {
      if (userContext.CompleteLoad == true) {
        if (userContext.UserToken === "") {
          router.push(`/login`);
        } else {
          try {
            const addToCartApi = await axios.post(
              "api/cart/addToCart",
              {
                product_id: router.query.product_id,
                cart_quantity: cartProductQty.qty,
              },
              {
                headers: {
                  Authorization: `Bearer ${userContext.UserToken}`,
                },
              }
            );

            console.log(addToCartApi);
          } catch (error) {}
        }
      }
    }
  };

  const handleValidationCart = () => {
    let cartIsValid = true;

    if (cartProductQty.qty > parseInt(productData.product_quantity)) {
      setNotifQuantityMinLimit(false);
      setNotifQuantityExceed(true);
      cartIsValid = false;
    } else {
      setNotifQuantityMinLimit(false);
      setNotifQuantityExceed(false);
    }

    if (cartProductQty.qty < 1 || cartProductQty.qty === "") {
      setNotifQuantityMinLimit(true);
      setNotifQuantityExceed(false);
      cartIsValid = false;
    } else {
      setNotifQuantityMinLimit(false);
      setNotifQuantityExceed(false);
    }
    return cartIsValid;
  };

  // All Handle Website
  const minusQty = () => {
    if (cartProductQty.qty <= 1) return;

    setCartProductQty({ qty: parseInt(cartProductQty.qty) - 1 });
  };

  const plusQty = () => {
    if (cartProductQty.qty >= productData.product_quantity) return;

    if (cartProductQty.qty + 1 <= parseInt(productData.product_quantity)) {
      setNotifQuantityMinLimit(false);
    }

    setCartProductQty({ qty: parseInt(cartProductQty.qty) + 1 });
  };

  const inputChange = (e) => {
    setCartProductQty({ qty: parseInt(e.target.value) });
    if (e.target.value > parseInt(productData.product_quantity)) {
      setNotifQuantityExceed(true);
    } else {
      setNotifQuantityExceed(false);
    }

    if (e.target.value < 1 || e.target.value === "") {
      setNotifQuantityMinLimit(true);
    } else {
      setNotifQuantityMinLimit(false);
    }
  };

  const StorePage = () => {
    router.push(`/${router.query.store_id}`);
  };
  return (
    <>
      <Head>
        <title>{productData.product_name}</title>
      </Head>
      {productData.product_status ? null : (
        <>
          <div className={`text-[25px] text-red-600`}>
            Produk sedang tidak aktif
          </div>
        </>
      )}
      <div className={`block w-full h-full`}>
        <div
          className={`w-full h-[26rem] flex justify-between relative mobile-s:block tablet:flex`}
        >
          <div className={`w-[25%]`}>
            <div
              className={`w-full border border-gray-400 bg-white rounded-md`}
            >
              <Swiper
                style={{
                  "--swiper-navigation-color": "rgb(163 163 163)",
                  "--swiper-pagination-color": "#fff",
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                {loadProductComplete ? (
                  <>
                    {productData.list_product_img?.length ? (
                      <>
                        <SwiperSlide>
                          <div className="container-img-resize bg-white rounded-md">
                            <img src={productFirstImg} />
                          </div>
                        </SwiperSlide>
                        {productImg?.map((img, i) => (
                          <SwiperSlide key={i}>
                            <div className="container-img-resize bg-white rounded-md">
                              <img src={img} />
                            </div>
                          </SwiperSlide>
                        ))}
                      </>
                    ) : (
                      <>
                        <SwiperSlide>
                          <div className="container-img-resize bg-white rounded-md">
                            <img src={"/no-image.png"} />
                          </div>
                        </SwiperSlide>
                      </>
                    )}
                  </>
                ) : (
                  <SwiperSlide>
                    <div className="container-img-resize bg-white rounded-md">
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
                    </div>
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
            <div className={`w-full h-auto pt-1`}>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                {loadProductComplete ? (
                  <>
                    {productData.list_product_img?.length ? (
                      <>
                        <SwiperSlide>
                          <div className="container-list-img-resize bg-gray-200">
                            <img src={productFirstImg} />
                          </div>
                        </SwiperSlide>
                        {productImg?.map((img, i) => (
                          <SwiperSlide key={i}>
                            <div className="container-list-img-resize bg-gray-200">
                              <img src={img} />
                            </div>
                          </SwiperSlide>
                        ))}
                      </>
                    ) : (
                      <>
                        <SwiperSlide>
                          <div className="container-list-img-resize bg-gray-200">
                            <img src={"/no-image.png"} />
                          </div>
                        </SwiperSlide>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <SwiperSlide>
                      <div className="container-img-resize bg-white rounded-md">
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
                      </div>
                    </SwiperSlide>
                  </>
                )}
              </Swiper>
            </div>
          </div>

          <div className={`w-[40%] m-0`}>
            <div
              className={`mobile-xl:text-[20px] tablet:text-[27px] laptop:text-[30px]`}
            >
              {loadProductComplete ? (
                <>{productData.product_name}</>
              ) : (
                <>
                  <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-2 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className={`text-[15px]`}>
              {loadProductComplete ? (
                <>
                  {productData.product_rating == 0
                    ? "Belum ada rating"
                    : productData.product_rating}
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
            </div>
            <hr className={`w-full border-[#c0c0c0] border-solid`} />
            <div
              className={`mobile-xl:text-[25px] tablet:text-[32px] laptop:text-[35px]`}
            >
              {loadProductComplete ? (
                <>
                  {helper.rupiahCurrency(parseInt(productData.product_price))}
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
            </div>
          </div>
          <div className={`w-[30%]`}>
            {productData.product_status ? (
              <>
                <div className={`border rounded-md px-5 py-3`}>
                  <div className={`text-center`}>Atur Jumlah</div>
                  <div className={`flex justify-center`}>
                    <div
                      className={`flex outline-offset-style-1 rounded-md w-[8rem] h-[2.5rem] `}
                    >
                      <button
                        className={`flex items-center h-full w-[2.5rem] ${
                          cartProductQty.qty <= 1
                            ? "bg-gray-200 rounded-l-md"
                            : ""
                        } `}
                        onClick={() => minusQty()}
                      >
                        <img
                          src="/global/minus.png"
                          className={`h-[1.5rem] w-[1.5rem] m-auto cursor-pointer`}
                          alt=""
                        />
                      </button>

                      <div
                        className={`h-full w-[3rem] outline-offset-style-1 m-auto`}
                      >
                        <input
                          type="number"
                          className={`w-full h-full text-[20px] text-center`}
                          min={1}
                          max={productData.product_quantity}
                          value={parseInt(cartProductQty.qty)}
                          onChange={(e) => inputChange(e)}
                        />
                        {/* <div className={`text-[20px] text-center`}>
                      {cartProductQty.qty}
                    </div> */}
                      </div>
                      <button
                        className={`flex items-center w-[2.5rem]
                    ${
                      cartProductQty.qty >=
                      parseInt(productData.product_quantity)
                        ? "bg-gray-200 rounded-r-md"
                        : ""
                    }`}
                        onClick={() => plusQty()}
                      >
                        <img
                          src="/global/plus.png"
                          className={`h-[1.5rem] w-[1.5rem] m-auto cursor-pointer`}
                          alt=""
                        />
                      </button>
                    </div>
                    <div className={`my-auto font-bold ml-2`}>
                      Stok {productData.product_quantity}
                    </div>
                  </div>
                  {notifQuantityMinLimit ? (
                    <>
                      <div className={`text-[14px] text-red-600`}>
                        Minimal pembelian produk ini 1 buah.
                      </div>
                    </>
                  ) : null}

                  {notifQuantityExceed ? (
                    <>
                      <div className={`text-[14px] text-red-600`}>
                        Maksimal pembelian produk ini hanya{" "}
                        {productData.product_quantity} buah.
                      </div>
                    </>
                  ) : null}

                  <div className={`mt-5`}>
                    <div
                      className={`flex rounded-md cursor-pointer`}
                      onClick={() => AddToCart()}
                    >
                      <button
                        className={`w-full block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                        disabled={userContext.UserToken === 0 ? true : false}
                      >
                        Keranjang
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
        <div>
          {/* <img src="" alt="" /> */}
          {/* <Link href={`/`}></Link> */}
          <div
            className={`font-bold text-[20px] cursor-pointer mb-3 text-blue-700 hover:text-blue-900 `}
            onClick={StorePage}
          >
            {productData.store_name}
          </div>
        </div>
        <div
          className={`block py-2 border-y rounded-t-md rounded-b-md border-blue-700`}
        >
          <div className={`text-[20px]`}>Rincian Produk</div>
          <hr className={`w-full border-solid border-blue-700`} />
          <div className={`text-justify`}>
            <p>{productData.product_detail}</p>
          </div>
        </div>

        <div className="my-5">
          <div className={`font-bold mb-2 text-blue-700`}>
            Produk lain dari toko
          </div>
          <div
            className={`grid gap-4 mobile-s:grid-cols-2 mobile-xl:grid-cols-3 tablet:grid-cols-4 laptop:grid-cols-6`}
          >
            {newProductData.length ? (
              <>
                {newProductData.map((newProduct, i) => (
                  <React.Fragment key={i}>
                    <CardProduct
                      product_id={newProduct.product_id}
                      store_id={newProduct.store_id}
                      product_img={newProduct.product_img}
                      product_name={newProduct.product_name}
                      product_price={newProduct.product_price}
                      product_rating={newProduct.product_rating}
                    />
                  </React.Fragment>
                ))}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
