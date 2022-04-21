import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// Components
import CardProduct from "../../src/components/product/CardProduct.Components";
import { useContext, useEffect, useState } from "react";
import Quantity from "../../src/components/global/Quantity.Components";

// Context
import ProductCartQuantityContext from "../../src/context/product.cart.quantity.context";
import UserContext from "../../src/context/user.context";

const ProductPage = () => {
  const router = useRouter();
  const [productData, setProductData] = useState([]);
  const [cartProductQty, setCartProductQty] = useState({
    qty: 1,
  });

  const userContext = useContext(UserContext);

  useEffect(() => {
    if (router.query.product_id) {
      ProductDataApi();
    }
  }, [router.query.product_id]);

  useEffect(() => {}, []);

  const ProductDataApi = async () => {
    try {
      const getProductData = (
        await axios.get(`api/product/getProduct`, {
          params: {
            product_id: router.query.product_id,
          },
        })
      ).data.data[0];
      setProductData(getProductData);
    } catch (error) {}
  };

  const CheckUserLogin = () => {
    if (!userContext.UserToken) {
      router.push(`/login`);
    }
  };

  const AddToCart = async () => {
    // besok buat cek user udah login atau belum, kasih notif, arahkan ke login page
    CheckUserLogin();
    // console.log(UserContext.UserToken);
    try {
      const addToCartApi = await axios.post(
        `api/cart/addToCart`,
        {
          product_id: router.query.product_id,
          cart_quantity: cartProductQty.qty,
        },
        {
          headers: {
            Authorization: `Bearer ${UserContext.UserToken}`,
          },
        }
      );

      console.log(addToCartApi);
    } catch (error) {}
  };

  const minusQty = () => {
    if (cartProductQty.qty <= 1) return;
    setCartProductQty({ qty: cartProductQty.qty - 1 });
  };

  const plusQty = () => {
    if (cartProductQty.qty >= productData.product_quantity) return;
    setCartProductQty({ qty: cartProductQty.qty + 1 });
  };

  const StorePage = () => {
    router.push(`/${router.query.store_id}`);
  };
  return (
    <>
      <Head>
        <title>Nama Produk</title>
      </Head>
      <div className={`product-page`}>
        <div className={`head-product`}>
          <div className={`product-img`}>
            <Swiper
              pagination={{
                type: "fraction",
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img src="/test.jpg" className={`img`} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/test.jpg" className={`img`} alt="" />
              </SwiperSlide>
            </Swiper>
          </div>

          <div className={`body`}>
            <div className={`title`}>{productData.product_name}</div>
            <div className={`rating`}>
              {productData.product_rating == 0
                ? "Belum ada rating"
                : productData.product_rating}
            </div>
            <hr />
            <div className={`price`}>{"Rp" + productData.product_price}</div>
            <div>
              <div className={`flex border rounded-md w-[8rem] h-[2.5rem] `}>
                <div
                  className={`flex items-center h-full w-[2.5rem] ${
                    cartProductQty.qty <= 1 ? "bg-gray-200" : ""
                  } `}
                  onClick={() => minusQty()}
                >
                  <img
                    src="/global/minus.png"
                    className={`h-[1.5rem] w-[1.5rem] m-auto cursor-pointer`}
                    alt=""
                  />
                </div>
                <div className={`h-full w-[3rem] border m-auto p-[3px]`}>
                  <div className={`text-[20px] text-center`}>
                    {cartProductQty.qty}
                  </div>
                </div>
                <div
                  className={`flex items-center w-[2.5rem] ${
                    cartProductQty.qty >= productData.product_quantity
                      ? "bg-gray-200"
                      : ""
                  }`}
                  onClick={() => plusQty()}
                >
                  <img
                    src="/global/plus.png"
                    className={`h-[1.5rem] w-[1.5rem] m-auto cursor-pointer`}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div
              className={`flex w-[10rem] h-[2.5rem] border rounded-md cursor-pointer`}
              onClick={() => AddToCart()}
            >
              <div className={`m-auto p-auto text-[17px]`}>Keranjang</div>
            </div>
            <div className={`flex w-[10rem] h-[2.5rem] border rounded-md`}>
              <div className={`m-auto p-auto text-[17px]`}>Beli Langsung</div>
            </div>
          </div>
        </div>
        <div className={`body-product`}>
          <div className={`title`}>Rincian Produk</div>
          <div className={`detail-product`}>
            <p>{productData.product_detail}</p>
          </div>
        </div>
        <div>
          {/* <img src="" alt="" /> */}
          {/* <Link href={`/`}></Link> */}
          <div
            className={`font-bold text-[18px] cursor-pointer`}
            onClick={StorePage}
          >
            {productData.store_name}
          </div>
        </div>
        {/* <div className={`product-etc w-full`}>
          <div className={`title-product-etc`}>Produk lain dari Nama Toko</div>
          <div className={``}>
            <Swiper
              slidesPerView={6}
              spaceBetween={20}
              slidesPerGroup={6}
              // breakpoints={{
              //   // when mobile-xl =<
              //   320: {
              //     slidesPerView: 2,
              //     spaceBetween: 20,
              //     slidesPerGroup: 2,
              //   },
              //   // when mobile-xl
              //   530: {
              //     slidesPerView: 3,
              //     spaceBetween: 20,
              //     slidesPerGroup: 3,
              //   },
              //   // when tablet
              //   768: {
              //     slidesPerView: 4,
              //     spaceBetween: 10,
              //     slidesPerGroup: 4,
              //   },
              //   // when laptop
              //   1024: {
              //     slidesPerView: 5,
              //     spaceBetween: 20,
              //     slidesPerGroup: 5,
              //   },
              //   // when laptop-l
              //   1280: {
              //     slidesPerView: 6,
              //     spaceBetween: 20,
              //     slidesPerGroup: 6,
              //   },
              // }}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              <div className={`card-product`}>
                <SwiperSlide>
                  <CardProduct></CardProduct>
                </SwiperSlide>
              </div>
              <div className={`card-product`}>
                <SwiperSlide>
                  <CardProduct></CardProduct>
                </SwiperSlide>
              </div>
              <div className={`card-product`}>
                <SwiperSlide>
                  <CardProduct></CardProduct>
                </SwiperSlide>
              </div>
              <div className={`card-product`}>
                <SwiperSlide>
                  <CardProduct></CardProduct>
                </SwiperSlide>
              </div>
              <div className={`card-product`}>
                <SwiperSlide>
                  <CardProduct></CardProduct>
                </SwiperSlide>
              </div>
              <div className={`card-product`}>
                <SwiperSlide>
                  <CardProduct></CardProduct>
                </SwiperSlide>
              </div>
              <div className={`card-product`}>
                <SwiperSlide>
                  <CardProduct></CardProduct>
                </SwiperSlide>
              </div>
              <div className={`card-product`}>
                <SwiperSlide>
                  <CardProduct></CardProduct>
                </SwiperSlide>
              </div>
            </Swiper>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default ProductPage;
