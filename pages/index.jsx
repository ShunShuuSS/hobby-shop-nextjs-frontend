import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";

// Components
import CardProduct from "../src/components/product/CardProduct.Components";
import { getCookie } from "cookies-next";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../src/context/user.context";
import CustomNotification from "../src/components/notification/CustomNotification.Components";

export default function Home() {
  const [topProductData, setTopProductData] = useState([]);
  const [topProductLoadComplete, setTopProductLoadComplete] = useState(true);
  const [recommendationProductData, setRecommendationProductData] = useState(
    []
  );
  const [catchError, setCatchError] = useState(false);
  const [
    recommendationProductLoadComplete,
    setRecommendationProductLoadComplete,
  ] = useState(true);
  const userContext = useContext(UserContext);

  useEffect(() => {
    TopProductApi();
  }, []);

  const TopProductApi = async () => {
    setTopProductLoadComplete(false);
    try {
      const TopProductApi = await (
        await axios.get(`api/product`, [])
      ).data.data;
      if (TopProductApi.length) {
        setTopProductLoadComplete(true);
        setTopProductData(TopProductApi);
      }
    } catch (error) {
      setCatchError(true);
      setTopProductLoadComplete(true);
    }
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CustomNotification
        show={catchError}
        text={"Website mengalami masalah"}
        goToRouteText={"Muat ulang halaman"}
        goToRoute={"/"}
        refreshPage={true}
      />

      <Swiper modules={[Autoplay]} pagination={true} autoplay={{ delay: 3000 }}>
        <SwiperSlide>
          <div className={`slide-show`}>
            <div className={`card-slide-show`}>
              <img src="/test.jpg" className={`img`} alt="" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`slide-show`}>
            <div className={`card-slide-show`}>
              <img src="/test.jpg" className={`img`} alt="" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`slide-show`}>
            <div className={`card-slide-show`}>
              <img src="/test.jpg" className={`img`} alt="" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className={``}>
        <div className={`product-list-index`}>
          {topProductLoadComplete ? (
            <>
              {topProductData.length ? (
                <>
                  {topProductData.map((topProductList) => (
                    <div key={topProductList.product_id}>
                      <CardProduct
                        product_id={topProductList.product_id}
                        store_id={topProductList.store_id}
                        product_name={topProductList.product_name}
                        product_price={topProductList.product_price}
                        product_rating={topProductList.product_rating}
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
      <div className={`mt-[2rem]`}>
        <div className={`text-[25px] mb-[2rem]`}>Produk Rekomendasi</div>
        <div className={`product-list-index`}>
          <CardProduct></CardProduct>
        </div>
      </div>
    </>
  );
}
