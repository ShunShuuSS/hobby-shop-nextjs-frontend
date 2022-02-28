import Head from "next/head";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// Components
import NavigationBar from "../../components/NavigationBar.Components";
import CardProduct from "../../components/product/CardProduct.Components";

const ProductPage = () => {
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
            <div className={`title`}>Nama Produk Nama Produk Nama Produk</div>
            <div className={`rating`}>Rating</div>
            <hr />
            <div className={`price`}>Rp99.999.999</div>
          </div>
        </div>
        <div className={`body-product`}>
          <div className={`title`}>Rincian Produk</div>
          <div className={`detail-product`}>
            <p>
              What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently
              with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum. Where does it come from? Contrary to
              popular belief, Lorem Ipsum is not simply random text. It has
              roots in a piece of classical Latin literature from 45 BC, making
              it over 2000 years old. Richard McClintock, a Latin professor at
              Hampden-Sydney College in Virginia, looked up one of the more
              obscure Latin words, consectetur, from a Lorem Ipsum passage, and
              going through the cites of the word in classical literature,
              discovered the undoubtable source. Lorem Ipsum comes from sections
              1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The
              Extremes of Good and Evil) by Cicero, written in 45 BC. This book
              is a treatise on the theory of ethics, very popular during the
              Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
              amet..", comes from a line in section 1.10.32.
            </p>
          </div>
        </div>
        <div className={`product-etc w-full`}>
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
        </div>
      </div>
    </>
  );
};

export default ProductPage;
