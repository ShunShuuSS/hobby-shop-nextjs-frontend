/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
// Components
import CardProduct from "../../src/components/product/CardProduct.Components";

const StorePage = () => {
  const router = useRouter();
  console.log(router.query.store_id);

  // useEffect(() => { }, []);

  const StoreDataApi = () => {};

  return (
    <>
      <Head>
        <title>Nama Toko</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`store`}>
        <div className={`card`}>
          <img src="/test.jpg" className={`img`} alt="" />
          <div className={`body`}>
            <div className={`store-name`}>
              Nama Toko <span className={`rating`}>( Rating )</span>
            </div>
            <div className={`store-location`}>Lokasi</div>
            <div className={`store-info`}>
              <button className={`btn`}>Info Toko</button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={`store-product`}>
        <div className={`text-[30px] m-[1vw_0]`}>Produk</div>
        <div className="product-list-index">
          <div className={`card-product`}>
            <Link href={`/1/1`}>
              <a>
                <CardProduct></CardProduct>
              </a>
            </Link>
          </div>
          <div className={`card-product`}>
            <Link href={`/1/1`}>
              <a>
                <CardProduct></CardProduct>
              </a>
            </Link>
          </div>
          <div className={`card-product`}>
            <Link href={`/1/1`}>
              <a>
                <CardProduct></CardProduct>
              </a>
            </Link>
          </div>
          <div className={`card-product`}>
            <Link href={`/1/1`}>
              <a>
                <CardProduct></CardProduct>
              </a>
            </Link>
          </div>
          <div className={`card-product`}>
            <Link href={`/1/1`}>
              <a>
                <CardProduct></CardProduct>
              </a>
            </Link>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default StorePage;
