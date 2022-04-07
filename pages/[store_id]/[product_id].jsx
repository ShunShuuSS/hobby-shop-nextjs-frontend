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
import { useEffect, useState } from "react";
const ProductPage = () => {
  const [productData, setProductData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (router.query.product_id) {
      ProductDataApi();
    }
  }, [router.query.product_id]);

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
